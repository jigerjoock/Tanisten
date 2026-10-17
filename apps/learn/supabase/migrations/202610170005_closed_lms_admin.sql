-- Closed-LMS security contract.  This migration is additive and intentionally
-- not applied to the linked production project until its pgTAP suite runs in
-- an isolated Supabase environment.

create type public.account_status as enum ('pending', 'active', 'disabled', 'archived');

alter table public.profiles
  add column account_status public.account_status not null default 'active',
  add column first_name text,
  add column last_name text,
  add column phone text,
  add column archived_at timestamptz;

-- `profiles.email` predates this migration and is not unique.  A normalized
-- duplicate would make the one-record-per-student backfill ambiguous, so
-- stop before creating any closed-LMS records rather than silently skipping
-- one of the affected learners.
do $$
begin
  if exists (
    select 1
    from public.profiles
    where role = 'student'
    group by lower(email)
    having count(*) > 1
  ) then
    raise exception 'Cannot backfill student records: duplicate student emails exist after normalization';
  end if;
end;
$$;

create table public.student_records (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid unique references public.profiles(id) on delete set null,
  email text not null unique,
  first_name text not null,
  last_name text not null,
  phone text,
  admin_note text,
  account_status public.account_status not null default 'pending',
  activated_at timestamptz,
  archived_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (email = lower(email))
);

create table public.student_course_assignments (
  student_record_id uuid not null references public.student_records(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete restrict,
  assigned_at timestamptz not null default now(),
  revoked_at timestamptz,
  primary key (student_record_id, course_id)
);

create index student_records_profile_id_idx on public.student_records(profile_id);
create index student_course_assignments_active_idx on public.student_course_assignments(student_record_id, course_id) where revoked_at is null;
create trigger student_records_updated_at before update on public.student_records for each row execute procedure public.set_updated_at();

-- Preserve the lifecycle of existing learners: their current membership is a
-- pre-approved assignment, not a reason to delete or recreate any history.
insert into public.student_records (profile_id, email, first_name, last_name, phone, account_status, activated_at, archived_at)
select p.id,
       lower(p.email),
       coalesce(nullif(split_part(btrim(coalesce(p.full_name, '')), ' ', 1), ''), 'Schüler'),
       coalesce(nullif(btrim(regexp_replace(coalesce(p.full_name, ''), '^\S+\s*', '')), ''), ''),
       p.phone,
       p.account_status,
       case when p.account_status = 'active' then now() else null end,
       p.archived_at
from public.profiles p
where p.role = 'student'
on conflict (profile_id) do nothing;

insert into public.student_course_assignments (student_record_id, course_id)
select sr.id, cm.course_id
from public.student_records sr
join public.course_memberships cm on cm.user_id = sr.profile_id
on conflict (student_record_id, course_id) do nothing;

-- New Auth users are never granted LMS access merely by creating a session.
-- An invitation created by server-only code must bind the signed-in user to a
-- pending record through immutable app metadata before activation can succeed.
create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path = public, pg_temp as $$
begin
  insert into public.profiles (id, email, full_name, account_status)
  values (new.id, lower(new.email), coalesce(new.raw_user_meta_data ->> 'full_name', ''), 'pending');
  return new;
end;
$$;

create or replace function public.is_active_user() returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and account_status = 'active');
$$;

create or replace function public.is_active_teacher() returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'teacher' and account_status = 'active');
$$;

-- Keep the historical helper name, but make every existing dependent policy
-- and SECURITY DEFINER function reject disabled, archived, and pending admins.
create or replace function public.is_admin() returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin' and account_status = 'active');
$$;

create or replace function public.is_staff() returns boolean language sql stable security definer set search_path = public as $$
  select public.is_admin() or public.is_active_teacher();
$$;

create or replace function public.is_course_teacher(course uuid) returns boolean language sql stable security definer set search_path = public as $$
  select public.is_admin()
    or (public.is_active_teacher() and exists (
      select 1 from public.course_teachers
      where course_id = course and teacher_id = auth.uid() and grants_course_wide_access
    ))
    or (public.is_active_teacher() and exists (
      select 1 from public.group_teachers gt
      join public.group_courses gc on gc.group_id = gt.group_id
      where gc.course_id = course and gt.teacher_id = auth.uid()
    ));
$$;

create or replace function public.can_teach_student_in_course(student uuid, course uuid) returns boolean language sql stable security definer set search_path = public as $$
  select public.is_admin()
    or (public.is_active_teacher() and exists (
      select 1 from public.course_teachers
      where course_id = course and teacher_id = auth.uid() and grants_course_wide_access
    ))
    or (public.is_active_teacher() and exists (
      select 1 from public.group_teachers gt
      join public.group_members gm on gm.group_id = gt.group_id
      join public.group_courses gc on gc.group_id = gt.group_id
      where gt.teacher_id = auth.uid() and gm.student_id = student and gc.course_id = course
    ));
$$;

-- Disabled identities may read only their own profile so the application can
-- render an account-disabled state and sign them out.  They cannot read LMS
-- data, assignments, submissions, or staff queues.
create or replace function public.can_view_profile(profile_id uuid) returns boolean language sql stable security definer set search_path = public as $$
  select profile_id = auth.uid() or public.is_admin() or exists (
    select 1 from public.course_memberships cm
    where cm.user_id = profile_id and public.can_teach_student_in_course(profile_id, cm.course_id)
  );
$$;

create or replace function public.is_enrolled(course uuid) returns boolean language sql stable security definer set search_path = public as $$
  select public.is_active_user() and exists (
    select 1
    from public.course_memberships cm
    join public.courses c on c.id = cm.course_id
    where cm.course_id = course and cm.user_id = auth.uid() and c.published
  );
$$;

-- The existing review RPC already uses can_teach_student_in_course.  The
-- explicit active-staff check makes its transition guard self-contained.
create or replace function public.review_exercise_submission(p_submission_id uuid, p_decision public.submission_status, p_feedback text default null) returns jsonb language plpgsql security definer set search_path = public, pg_temp as $$
declare v_submission public.submissions%rowtype; v_course_id uuid; v_feedback text := nullif(btrim(coalesce(p_feedback, '')), '');
begin
  if auth.uid() is null or not (public.is_active_teacher() or public.is_admin()) then raise exception 'Active teacher or administrator access is required'; end if;
  if p_decision not in ('passed', 'rejected') then raise exception 'Invalid review decision'; end if;
  select s.* into v_submission from public.submissions s where s.id = p_submission_id;
  if not found then raise exception 'Submission not found'; end if;
  select course_id into v_course_id from public.exercises where id = v_submission.exercise_id;
  if not public.can_teach_student_in_course(v_submission.student_id, v_course_id) then raise exception 'Teacher is not assigned to this student and course'; end if;
  if v_submission.status <> 'submitted' then raise exception 'Only pending submissions can be reviewed'; end if;
  if p_decision = 'rejected' and v_feedback is null then raise exception 'Feedback is required when returning work for changes'; end if;
  update public.submissions set status = p_decision, feedback = v_feedback, checked_by = auth.uid(), checked_at = now() where id = p_submission_id;
  insert into public.submission_reviews (submission_id, reviewer_id, decision, feedback) values (p_submission_id, auth.uid(), p_decision, v_feedback);
  return jsonb_build_object('status', p_decision, 'message', case when p_decision = 'passed' then 'Submission approved.' else 'Submission returned for changes.' end);
end;
$$;

-- Called only by the invited, authenticated user.  Email equality is an
-- additional check, never the binding mechanism: app_metadata must contain
-- the pending-record UUID set by the server-only invitation action.
create or replace function public.activate_student_record(p_student_record_id uuid) returns uuid language plpgsql security definer set search_path = public, auth, pg_temp as $$
declare v_record public.student_records%rowtype; v_email text; v_binding text; v_profile public.profiles%rowtype;
begin
  if auth.uid() is null then raise exception 'Authentication is required'; end if;
  select * into v_record from public.student_records where id = p_student_record_id for update;
  if not found or v_record.account_status in ('archived', 'disabled') then raise exception 'Student record is not activatable'; end if;
  if v_record.profile_id is not null and v_record.profile_id <> auth.uid() then raise exception 'Student record is already linked'; end if;
  select lower(email), raw_app_meta_data ->> 'tanisten_student_record_id' into v_email, v_binding from auth.users where id = auth.uid();
  if v_email is null or v_email <> v_record.email or v_binding is distinct from v_record.id::text then raise exception 'Invitation binding is invalid'; end if;
  select * into v_profile from public.profiles where id = auth.uid() for update;
  if not found or v_profile.role <> 'student' or v_profile.account_status not in ('pending', 'active') then raise exception 'Student profile is not activatable'; end if;
  update public.profiles set account_status = 'active', first_name = coalesce(first_name, v_record.first_name), last_name = coalesce(last_name, v_record.last_name), phone = coalesce(phone, v_record.phone) where id = auth.uid();
  insert into public.course_memberships (course_id, user_id)
    select course_id, auth.uid() from public.student_course_assignments
    where student_record_id = v_record.id and revoked_at is null
    on conflict (course_id, user_id) do nothing;
  update public.student_records set profile_id = auth.uid(), account_status = 'active', activated_at = coalesce(activated_at, now()) where id = v_record.id;
  return auth.uid();
end;
$$;

create or replace function public.grant_student_course_access(p_student_record_id uuid, p_course_id uuid) returns void language plpgsql security definer set search_path = public, pg_temp as $$
declare v_profile_id uuid;
begin
  if not public.is_admin() then raise exception 'Active administrator access is required'; end if;
  select profile_id into v_profile_id from public.student_records where id = p_student_record_id and account_status <> 'archived' for update;
  if not found then raise exception 'Student record is not available'; end if;
  perform 1 from public.courses where id = p_course_id;
  if not found then raise exception 'Course not found'; end if;
  insert into public.student_course_assignments (student_record_id, course_id) values (p_student_record_id, p_course_id)
    on conflict (student_record_id, course_id) do update set revoked_at = null;
  if v_profile_id is not null then
    insert into public.course_memberships (course_id, user_id) values (p_course_id, v_profile_id) on conflict do nothing;
  end if;
end;
$$;

create or replace function public.revoke_student_course_access(p_student_record_id uuid, p_course_id uuid) returns void language plpgsql security definer set search_path = public, pg_temp as $$
declare v_profile_id uuid;
begin
  if not public.is_admin() then raise exception 'Active administrator access is required'; end if;
  select profile_id into v_profile_id from public.student_records where id = p_student_record_id for update;
  if not found then raise exception 'Student record not found'; end if;
  update public.student_course_assignments set revoked_at = coalesce(revoked_at, now()) where student_record_id = p_student_record_id and course_id = p_course_id;
  if v_profile_id is not null then
    delete from public.course_memberships where course_id = p_course_id and user_id = v_profile_id;
  end if;
end;
$$;

-- Status changes must not use a broad profiles UPDATE policy.  This keeps
-- direct PostgREST writes from changing roles or staff/admin account status,
-- and synchronizes the profile and its pending-record lifecycle.
create or replace function public.set_student_account_status(p_student_record_id uuid, p_status public.account_status) returns void language plpgsql security definer set search_path = public, pg_temp as $$
declare v_record public.student_records%rowtype; v_role public.user_role;
begin
  if not public.is_admin() then raise exception 'Active administrator access is required'; end if;
  if p_status not in ('active', 'disabled', 'archived') then raise exception 'Invalid student account status'; end if;

  select * into v_record from public.student_records where id = p_student_record_id for update;
  if not found then raise exception 'Student record not found'; end if;

  if v_record.profile_id is null then
    if p_status = 'active' then raise exception 'A pending student must activate their invitation before becoming active'; end if;
    update public.student_records
      set account_status = p_status,
          archived_at = case when p_status = 'archived' then coalesce(archived_at, now()) else null end
      where id = v_record.id;
    return;
  end if;

  select role into v_role from public.profiles where id = v_record.profile_id for update;
  if not found or v_role <> 'student' then raise exception 'Linked profile is not a student'; end if;

  update public.profiles
    set account_status = p_status,
        archived_at = case when p_status = 'archived' then coalesce(archived_at, now()) else null end
    where id = v_record.profile_id;
  update public.student_records
    set account_status = p_status,
        archived_at = case when p_status = 'archived' then coalesce(archived_at, now()) else null end
    where id = v_record.id;
end;
$$;

alter table public.student_records enable row level security;
alter table public.student_course_assignments enable row level security;
create policy "active admins manage student records" on public.student_records for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "active admins manage student assignments" on public.student_course_assignments for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Recreate every policy that previously allowed a self, teacher, or staff
-- identity without an account-status gate.
drop policy if exists "course participants select courses" on public.courses;
drop policy if exists "memberships scoped select" on public.course_memberships;
drop policy if exists "teachers select own assignments" on public.course_teachers;
drop policy if exists "teachers view own group members" on public.group_members;
drop policy if exists "teachers view own groups" on public.group_teachers;
drop policy if exists "teachers view group courses" on public.group_courses;
drop policy if exists "participants select modules" on public.course_modules;
drop policy if exists "participants select lessons" on public.lessons;
drop policy if exists "participants select exercises" on public.exercises;
drop policy if exists "scoped submission select" on public.submissions;
drop policy if exists "scoped attempt select" on public.exercise_attempts;
drop policy if exists "scoped review select" on public.submission_reviews;

create policy "published participant courses select" on public.courses for select to authenticated using (public.is_enrolled(id) or public.is_course_teacher(id));
create policy "active memberships scoped select" on public.course_memberships for select to authenticated using ((user_id = auth.uid() and public.is_active_user()) or public.can_teach_student_in_course(user_id, course_id));
create policy "active teachers select own assignments" on public.course_teachers for select to authenticated using (teacher_id = auth.uid() and public.is_active_teacher());
create policy "active teachers view own group members" on public.group_members for select to authenticated using (public.is_active_teacher() and exists (select 1 from public.group_teachers where group_id = public.group_members.group_id and teacher_id = auth.uid()));
create policy "active teachers view own groups" on public.group_teachers for select to authenticated using (teacher_id = auth.uid() and public.is_active_teacher());
create policy "active teachers view group courses" on public.group_courses for select to authenticated using (public.is_active_teacher() and exists (select 1 from public.group_teachers where group_id = public.group_courses.group_id and teacher_id = auth.uid()));
create policy "active participants select modules" on public.course_modules for select to authenticated using (public.is_enrolled(course_id) or public.is_course_teacher(course_id));
create policy "active participants select lessons" on public.lessons for select to authenticated using (exists (select 1 from public.course_modules m where m.id = module_id and (public.is_enrolled(m.course_id) or public.is_course_teacher(m.course_id))));
create policy "active participants select exercises" on public.exercises for select to authenticated using (public.is_enrolled(course_id) or public.is_course_teacher(course_id));
create policy "active scoped submission select" on public.submissions for select to authenticated using ((student_id = auth.uid() and public.is_active_user()) or public.can_teach_student_in_course(student_id, (select course_id from public.exercises where id = exercise_id)));
create policy "active scoped attempt select" on public.exercise_attempts for select to authenticated using ((student_id = auth.uid() and public.is_active_user()) or public.can_teach_student_in_course(student_id, (select course_id from public.exercises where id = exercise_id)));
create policy "active scoped review select" on public.submission_reviews for select to authenticated using (exists (select 1 from public.submissions s join public.exercises e on e.id = s.exercise_id where s.id = submission_id and ((s.student_id = auth.uid() and public.is_active_user()) or public.can_teach_student_in_course(s.student_id, e.course_id))));

revoke all on function public.activate_student_record(uuid) from public;
revoke all on function public.grant_student_course_access(uuid, uuid) from public;
revoke all on function public.revoke_student_course_access(uuid, uuid) from public;
revoke all on function public.set_student_account_status(uuid, public.account_status) from public;
revoke all on function public.is_course_member(uuid) from public, anon, authenticated;
revoke all on function public.is_active_user() from public, anon;
revoke all on function public.is_active_teacher() from public, anon;
revoke all on function public.is_admin() from public, anon;
revoke all on function public.is_staff() from public, anon;
revoke all on function public.is_course_teacher(uuid) from public, anon;
revoke all on function public.can_teach_student_in_course(uuid, uuid) from public, anon;
revoke all on function public.can_view_profile(uuid) from public, anon;
revoke all on function public.is_enrolled(uuid) from public, anon;
grant execute on function public.activate_student_record(uuid) to authenticated;
grant execute on function public.grant_student_course_access(uuid, uuid) to authenticated;
grant execute on function public.revoke_student_course_access(uuid, uuid) to authenticated;
grant execute on function public.set_student_account_status(uuid, public.account_status) to authenticated;
grant execute on function public.is_active_user() to authenticated;
grant execute on function public.is_active_teacher() to authenticated;
grant execute on function public.is_admin() to authenticated;
grant execute on function public.is_staff() to authenticated;
grant execute on function public.is_course_teacher(uuid) to authenticated;
grant execute on function public.can_teach_student_in_course(uuid, uuid) to authenticated;
grant execute on function public.can_view_profile(uuid) to authenticated;
grant execute on function public.is_enrolled(uuid) to authenticated;
