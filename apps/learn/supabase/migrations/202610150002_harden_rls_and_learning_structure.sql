-- Security hardening: all learner and reviewer writes must pass through the RPCs below.

create table public.learning_groups (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  created_at timestamptz not null default now()
);
create table public.group_members (
  group_id uuid not null references public.learning_groups(id) on delete cascade,
  student_id uuid not null references public.profiles(id) on delete cascade,
  primary key (group_id, student_id)
);
create table public.group_teachers (
  group_id uuid not null references public.learning_groups(id) on delete cascade,
  teacher_id uuid not null references public.profiles(id) on delete cascade,
  primary key (group_id, teacher_id)
);
create table public.group_courses (
  group_id uuid not null references public.learning_groups(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  primary key (group_id, course_id)
);
create table public.course_teachers (
  course_id uuid not null references public.courses(id) on delete cascade,
  teacher_id uuid not null references public.profiles(id) on delete cascade,
  primary key (course_id, teacher_id)
);
create table public.course_modules (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  title text not null,
  position integer not null default 0,
  unique (course_id, position)
);
create table public.lessons (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references public.course_modules(id) on delete cascade,
  title text not null,
  description text not null default '',
  position integer not null default 0,
  unique (module_id, position)
);
alter table public.exercises add column lesson_id uuid references public.lessons(id) on delete cascade;
create table public.submission_reviews (
  id bigint generated always as identity primary key,
  submission_id uuid not null references public.submissions(id) on delete cascade,
  reviewer_id uuid not null references public.profiles(id),
  decision public.submission_status not null check (decision in ('passed', 'rejected')),
  feedback text,
  reviewed_at timestamptz not null default now()
);

do $$
declare course_record record; v_module_id uuid; v_lesson_id uuid;
begin
  for course_record in select id from public.courses loop
    insert into public.course_modules (course_id, title, position) values (course_record.id, 'Course content', 0) returning id into v_module_id;
    insert into public.lessons (module_id, title, position) values (v_module_id, 'Exercises', 0) returning id into v_lesson_id;
    update public.exercises set lesson_id = v_lesson_id where course_id = course_record.id and lesson_id is null;
  end loop;
end $$;
alter table public.exercises alter column lesson_id set not null;
create unique index exercises_lesson_position_key on public.exercises(lesson_id, position);
create index course_teachers_teacher_id_idx on public.course_teachers(teacher_id);
create index group_teachers_teacher_id_idx on public.group_teachers(teacher_id);
create index group_members_student_id_idx on public.group_members(student_id);
create index submissions_student_status_idx on public.submissions(student_id, status);
create index exercise_attempts_student_created_idx on public.exercise_attempts(student_id, created_at desc);

drop policy if exists "profiles readable by self or staff" on public.profiles;
drop policy if exists "staff manage profiles" on public.profiles;
drop policy if exists "members read courses" on public.courses;
drop policy if exists "staff manage courses" on public.courses;
drop policy if exists "members read memberships" on public.course_memberships;
drop policy if exists "staff manage memberships" on public.course_memberships;
drop policy if exists "members read exercises" on public.exercises;
drop policy if exists "staff manage exercises" on public.exercises;
drop policy if exists "students read own submissions" on public.submissions;
drop policy if exists "students create own submissions" on public.submissions;
drop policy if exists "students update drafts" on public.submissions;
drop policy if exists "staff review submissions" on public.submissions;
drop policy if exists "students read own history" on public.exercise_attempts;
drop policy if exists "students write own history" on public.exercise_attempts;

create or replace function public.is_admin() returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;
create or replace function public.is_course_teacher(course uuid) returns boolean language sql stable security definer set search_path = public as $$
  select public.is_admin() or exists (select 1 from public.course_teachers where course_id = course and teacher_id = auth.uid())
    or exists (select 1 from public.group_teachers gt join public.group_courses gc on gc.group_id = gt.group_id where gc.course_id = course and gt.teacher_id = auth.uid());
$$;
create or replace function public.can_teach_student_in_course(student uuid, course uuid) returns boolean language sql stable security definer set search_path = public as $$
  select public.is_admin()
    or exists (select 1 from public.course_teachers where course_id = course and teacher_id = auth.uid())
    or exists (
      select 1 from public.group_teachers gt
      join public.group_members gm on gm.group_id = gt.group_id
      join public.group_courses gc on gc.group_id = gt.group_id
      where gt.teacher_id = auth.uid() and gm.student_id = student and gc.course_id = course
    );
$$;
create or replace function public.can_view_profile(profile_id uuid) returns boolean language sql stable security definer set search_path = public as $$
  select profile_id = auth.uid() or public.is_admin() or exists (
    select 1 from public.course_memberships cm where cm.user_id = profile_id and public.can_teach_student_in_course(profile_id, cm.course_id)
  );
$$;
create or replace function public.is_enrolled(course uuid) returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.course_memberships where course_id = course and user_id = auth.uid());
$$;

alter table public.learning_groups enable row level security;
alter table public.group_members enable row level security;
alter table public.group_teachers enable row level security;
alter table public.group_courses enable row level security;
alter table public.course_teachers enable row level security;
alter table public.course_modules enable row level security;
alter table public.lessons enable row level security;
alter table public.submission_reviews enable row level security;

create policy "profiles scoped select" on public.profiles for select to authenticated using (public.can_view_profile(id));
create policy "admins manage courses" on public.courses for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "course participants select courses" on public.courses for select to authenticated using (public.is_enrolled(id) or public.is_course_teacher(id));
create policy "admins manage memberships" on public.course_memberships for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "memberships scoped select" on public.course_memberships for select to authenticated using (user_id = auth.uid() or public.can_teach_student_in_course(user_id, course_id));
create policy "admins manage direct teachers" on public.course_teachers for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "teachers select own assignments" on public.course_teachers for select to authenticated using (teacher_id = auth.uid());
create policy "admins manage groups" on public.learning_groups for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admins manage group members" on public.group_members for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "teachers view own group members" on public.group_members for select to authenticated using (exists (select 1 from public.group_teachers where group_id = public.group_members.group_id and teacher_id = auth.uid()));
create policy "admins manage group teachers" on public.group_teachers for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "teachers view own groups" on public.group_teachers for select to authenticated using (teacher_id = auth.uid());
create policy "admins manage group courses" on public.group_courses for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "teachers view group courses" on public.group_courses for select to authenticated using (exists (select 1 from public.group_teachers where group_id = public.group_courses.group_id and teacher_id = auth.uid()));
create policy "admins manage modules" on public.course_modules for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "participants select modules" on public.course_modules for select to authenticated using (public.is_enrolled(course_id) or public.is_course_teacher(course_id));
create policy "admins manage lessons" on public.lessons for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "participants select lessons" on public.lessons for select to authenticated using (exists (select 1 from public.course_modules m where m.id = module_id and (public.is_enrolled(m.course_id) or public.is_course_teacher(m.course_id))));
create policy "admins manage exercises" on public.exercises for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "participants select exercises" on public.exercises for select to authenticated using (public.is_enrolled(course_id) or public.is_course_teacher(course_id));
create policy "scoped submission select" on public.submissions for select to authenticated using (student_id = auth.uid() or public.can_teach_student_in_course(student_id, (select course_id from public.exercises where id = exercise_id)));
create policy "scoped attempt select" on public.exercise_attempts for select to authenticated using (student_id = auth.uid() or public.can_teach_student_in_course(student_id, (select course_id from public.exercises where id = exercise_id)));
create policy "scoped review select" on public.submission_reviews for select to authenticated using (exists (select 1 from public.submissions s join public.exercises e on e.id = s.exercise_id where s.id = submission_id and (s.student_id = auth.uid() or public.can_teach_student_in_course(s.student_id, e.course_id))));

revoke insert, update, delete on public.submissions, public.exercise_attempts, public.submission_reviews from anon, authenticated;

create or replace function public.check_automatic_exercise(p_exercise_id uuid, p_answer text) returns jsonb language plpgsql security definer set search_path = public, pg_temp as $$
declare v_exercise public.exercises%rowtype; v_existing public.submission_status; v_answer text := btrim(coalesce(p_answer, '')); v_message text; v_passed boolean := true; v_min_length integer; v_contains text; v_equals text;
begin
  if auth.uid() is null then raise exception 'Authentication is required'; end if;
  select * into v_exercise from public.exercises where id = p_exercise_id;
  if not found or not public.is_enrolled(v_exercise.course_id) then raise exception 'Exercise is not available to this student'; end if;
  if v_exercise.check_mode <> 'automatic' then raise exception 'This exercise requires teacher review'; end if;
  select status into v_existing from public.submissions where exercise_id = p_exercise_id and student_id = auth.uid();
  if v_existing in ('submitted', 'passed') then raise exception 'This exercise cannot be checked in its current state'; end if;
  v_min_length := coalesce((v_exercise.check_config ->> 'min_length')::integer, 1);
  v_contains := nullif(v_exercise.check_config ->> 'contains', '');
  v_equals := nullif(v_exercise.check_config ->> 'equals', '');
  if length(v_answer) < v_min_length then v_passed := false; v_message := format('Add at least %s characters before checking.', v_min_length);
  elsif v_contains is not null and position(lower(v_contains) in lower(v_answer)) = 0 then v_passed := false; v_message := format('Your answer must include “%s”.', v_contains);
  elsif v_equals is not null and v_answer <> v_equals then v_passed := false; v_message := 'The answer does not match the expected result.';
  else v_message := 'Checks passed. Exercise completed.'; end if;
  insert into public.submissions (exercise_id, student_id, answer, status, feedback, checked_at) values (p_exercise_id, auth.uid(), v_answer, case when v_passed then 'passed' else 'draft' end, v_message, case when v_passed then now() else null end)
  on conflict (exercise_id, student_id) do update set answer = excluded.answer, status = excluded.status, feedback = excluded.feedback, checked_by = null, checked_at = excluded.checked_at;
  insert into public.exercise_attempts (exercise_id, student_id, answer, outcome, message) values (p_exercise_id, auth.uid(), v_answer, case when v_passed then 'passed' else 'draft' end, v_message);
  return jsonb_build_object('status', case when v_passed then 'passed' else 'draft' end, 'message', v_message);
end; $$;

create or replace function public.submit_exercise_for_review(p_exercise_id uuid, p_answer text) returns jsonb language plpgsql security definer set search_path = public, pg_temp as $$
declare v_exercise public.exercises%rowtype; v_existing public.submission_status; v_answer text := btrim(coalesce(p_answer, ''));
begin
  if auth.uid() is null then raise exception 'Authentication is required'; end if;
  if v_answer = '' then raise exception 'Add your work before submitting'; end if;
  select * into v_exercise from public.exercises where id = p_exercise_id;
  if not found or not public.is_enrolled(v_exercise.course_id) then raise exception 'Exercise is not available to this student'; end if;
  if v_exercise.check_mode <> 'teacher' then raise exception 'This exercise uses automatic checks'; end if;
  select status into v_existing from public.submissions where exercise_id = p_exercise_id and student_id = auth.uid();
  if v_existing in ('submitted', 'passed') then raise exception 'This exercise cannot be submitted in its current state'; end if;
  insert into public.submissions (exercise_id, student_id, answer, status, feedback) values (p_exercise_id, auth.uid(), v_answer, 'submitted', 'Awaiting teacher review.')
  on conflict (exercise_id, student_id) do update set answer = excluded.answer, status = 'submitted', feedback = excluded.feedback, checked_by = null, checked_at = null;
  insert into public.exercise_attempts (exercise_id, student_id, answer, outcome, message) values (p_exercise_id, auth.uid(), v_answer, 'submitted', 'Submitted for teacher review.');
  return jsonb_build_object('status', 'submitted', 'message', 'Work submitted for teacher review.');
end; $$;

create or replace function public.review_exercise_submission(p_submission_id uuid, p_decision public.submission_status, p_feedback text default null) returns jsonb language plpgsql security definer set search_path = public, pg_temp as $$
declare v_submission public.submissions%rowtype; v_course_id uuid; v_feedback text := nullif(btrim(coalesce(p_feedback, '')), '');
begin
  if auth.uid() is null then raise exception 'Authentication is required'; end if;
  if p_decision not in ('passed', 'rejected') then raise exception 'Invalid review decision'; end if;
  select s.*, e.course_id into v_submission, v_course_id from public.submissions s join public.exercises e on e.id = s.exercise_id where s.id = p_submission_id;
  if not found then raise exception 'Submission not found'; end if;
  if not public.can_teach_student_in_course(v_submission.student_id, v_course_id) then raise exception 'Teacher is not assigned to this student and course'; end if;
  if v_submission.status <> 'submitted' then raise exception 'Only pending submissions can be reviewed'; end if;
  if p_decision = 'rejected' and v_feedback is null then raise exception 'Feedback is required when returning work for changes'; end if;
  update public.submissions set status = p_decision, feedback = v_feedback, checked_by = auth.uid(), checked_at = now() where id = p_submission_id;
  insert into public.submission_reviews (submission_id, reviewer_id, decision, feedback) values (p_submission_id, auth.uid(), p_decision, v_feedback);
  return jsonb_build_object('status', p_decision, 'message', case when p_decision = 'passed' then 'Submission approved.' else 'Submission returned for changes.' end);
end; $$;

revoke all on function public.is_staff() from public;
revoke all on function public.check_automatic_exercise(uuid, text) from public;
revoke all on function public.submit_exercise_for_review(uuid, text) from public;
revoke all on function public.review_exercise_submission(uuid, public.submission_status, text) from public;
grant execute on function public.check_automatic_exercise(uuid, text) to authenticated;
grant execute on function public.submit_exercise_for_review(uuid, text) to authenticated;
grant execute on function public.review_exercise_submission(uuid, public.submission_status, text) to authenticated;
