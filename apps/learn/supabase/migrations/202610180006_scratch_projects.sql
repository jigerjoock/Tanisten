-- Tanisten Edu Scratch project persistence. Do not apply without isolated RLS tests.
-- Depends only on migrations 001-004; it intentionally does not depend on migration 005.

create table public.scratch_project_versions (
  id uuid primary key default gen_random_uuid(),
  exercise_id uuid not null references public.exercises(id) on delete cascade,
  student_id uuid not null references public.profiles(id) on delete cascade,
  submission_id uuid unique references public.submissions(id) on delete set null,
  storage_path text not null unique check (storage_path ~ '^scratch-projects/[0-9a-f-]{36}/[0-9a-f-]{36}/[0-9a-f-]{36}\\.sb3$'),
  sha256 text not null check (sha256 ~ '^[0-9a-f]{64}$'),
  size_bytes integer not null check (size_bytes > 0 and size_bytes <= 10485760),
  project_summary jsonb not null default '{}'::jsonb,
  state text not null check (state in ('draft', 'submitted')),
  is_current_draft boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check ((state = 'draft' and submission_id is null) or (state = 'submitted' and submission_id is not null)),
  check (not (state = 'submitted' and is_current_draft))
);

create unique index scratch_project_versions_one_current_draft
  on public.scratch_project_versions(exercise_id, student_id) where is_current_draft;
create index scratch_project_versions_student_exercise_idx
  on public.scratch_project_versions(student_id, exercise_id, created_at desc);

create trigger scratch_project_versions_updated_at before update on public.scratch_project_versions
  for each row execute procedure public.set_updated_at();

alter table public.scratch_project_versions enable row level security;

create or replace function public.can_access_scratch_project(p_student_id uuid, p_exercise_id uuid)
returns boolean language sql stable security definer set search_path = public, pg_temp as $$
  select exists (
    select 1
    from public.exercises e
    join public.courses c on c.id = e.course_id
    where e.id = p_exercise_id
      and (
        (p_student_id = auth.uid() and c.published and public.is_enrolled(c.id))
        or public.can_teach_student_in_course(p_student_id, c.id)
      )
  );
$$;

revoke all on function public.can_access_scratch_project(uuid, uuid) from public;
grant execute on function public.can_access_scratch_project(uuid, uuid) to authenticated;

create policy "scoped scratch project versions select" on public.scratch_project_versions
  for select to authenticated using (public.can_access_scratch_project(student_id, exercise_id));

-- Version rows are created only through the function below. Submitted versions never become editable.
revoke insert, update, delete on public.scratch_project_versions from anon, authenticated;

create or replace function public.save_scratch_project_draft(
  p_exercise_id uuid,
  p_storage_path text,
  p_sha256 text,
  p_size_bytes integer,
  p_project_summary jsonb default '{}'::jsonb
) returns uuid language plpgsql security definer set search_path = public, pg_temp as $$
declare v_course_id uuid; v_version_id uuid; v_submission_status public.submission_status;
begin
  select course_id into v_course_id from public.exercises where id = p_exercise_id and kind = 'scratch_project';
  if not found then raise exception 'Scratch exercise not found'; end if;
  if not public.can_access_scratch_project(auth.uid(), p_exercise_id) then raise exception 'Scratch project access denied'; end if;
  select status into v_submission_status from public.submissions where exercise_id = p_exercise_id and student_id = auth.uid();
  if v_submission_status in ('submitted', 'passed') then raise exception 'Submitted Scratch work cannot be overwritten'; end if;
  if p_storage_path <> format('scratch-projects/%s/%s/%s.sb3', auth.uid(), p_exercise_id, split_part(regexp_replace(p_storage_path, '^.*/', ''), '.sb3', 1)) then
    raise exception 'Scratch storage path is invalid';
  end if;
  if p_size_bytes <= 0 or p_size_bytes > 10485760 or p_sha256 !~ '^[0-9a-f]{64}$' then raise exception 'Scratch project metadata is invalid'; end if;

  update public.scratch_project_versions
     set is_current_draft = false
   where exercise_id = p_exercise_id and student_id = auth.uid() and is_current_draft;

  insert into public.scratch_project_versions (exercise_id, student_id, storage_path, sha256, size_bytes, project_summary, state, is_current_draft)
  values (p_exercise_id, auth.uid(), p_storage_path, p_sha256, p_size_bytes, coalesce(p_project_summary, '{}'::jsonb), 'draft', true)
  returning id into v_version_id;
  return v_version_id;
end;
$$;

create or replace function public.submit_scratch_project_snapshot(p_version_id uuid)
returns jsonb language plpgsql security definer set search_path = public, pg_temp as $$
declare v_version public.scratch_project_versions%rowtype; v_result jsonb; v_submission_id uuid;
begin
  select * into v_version from public.scratch_project_versions where id = p_version_id for update;
  if not found or v_version.student_id <> auth.uid() or v_version.state <> 'draft' or not v_version.is_current_draft then
    raise exception 'Current Scratch draft not found';
  end if;
  if not public.can_access_scratch_project(auth.uid(), v_version.exercise_id) then raise exception 'Scratch project access denied'; end if;
  v_result := public.submit_exercise_for_review(v_version.exercise_id, format('Scratch-Projekt-Snapshot: %s', v_version.id));
  select id into v_submission_id from public.submissions where exercise_id = v_version.exercise_id and student_id = auth.uid() and status = 'submitted';
  if v_submission_id is null then raise exception 'Scratch submission was not created'; end if;
  update public.scratch_project_versions
     set state = 'submitted', is_current_draft = false, submission_id = v_submission_id
   where id = v_version.id;
  return v_result || jsonb_build_object('scratch_version_id', v_version.id);
end;
$$;

revoke all on function public.save_scratch_project_draft(uuid, text, text, integer, jsonb) from public;
revoke all on function public.submit_scratch_project_snapshot(uuid) from public;
grant execute on function public.save_scratch_project_draft(uuid, text, text, integer, jsonb) to authenticated;
grant execute on function public.submit_scratch_project_snapshot(uuid) to authenticated;

create or replace function public.check_scratch_project_structure(p_version_id uuid)
returns jsonb language plpgsql security definer set search_path = public, pg_temp as $$
declare
  v_version public.scratch_project_versions%rowtype;
  v_exercise public.exercises%rowtype;
  v_required_opcode text;
  v_passed boolean := true;
  v_message text := 'Scratch-Struktur erfüllt die konfigurierten Kriterien.';
  v_submission_id uuid;
  v_existing public.submission_status;
begin
  select * into v_version from public.scratch_project_versions where id = p_version_id for update;
  if not found or v_version.student_id <> auth.uid() or v_version.state <> 'draft' or not v_version.is_current_draft then raise exception 'Current Scratch draft not found'; end if;
  select * into v_exercise from public.exercises where id = v_version.exercise_id and kind = 'scratch_project';
  if not found or v_exercise.check_mode <> 'automatic' or v_exercise.check_config ->> 'executor' <> 'scratch_structural' then
    raise exception 'Scratch structural validation is not configured';
  end if;
  if not (
    (jsonb_typeof(v_exercise.check_config -> 'required_opcodes') = 'array' and jsonb_array_length(v_exercise.check_config -> 'required_opcodes') > 0)
    or coalesce((v_exercise.check_config ->> 'min_sprites')::integer, 0) > 0
    or coalesce((v_exercise.check_config ->> 'min_variables')::integer, 0) > 0
    or coalesce((v_exercise.check_config ->> 'min_event_handlers')::integer, 0) > 0
    or coalesce((v_exercise.check_config ->> 'min_loops')::integer, 0) > 0
    or coalesce((v_exercise.check_config ->> 'min_conditions')::integer, 0) > 0
  ) then raise exception 'Scratch structural validation has no valid criteria'; end if;
  if not public.can_access_scratch_project(auth.uid(), v_version.exercise_id) then raise exception 'Scratch project access denied'; end if;
  select status into v_existing from public.submissions where exercise_id = v_version.exercise_id and student_id = auth.uid();
  if v_existing in ('submitted', 'passed') then raise exception 'Scratch work has already been finalized'; end if;

  if coalesce((v_version.project_summary ->> 'sprites')::integer, 0) < coalesce((v_exercise.check_config ->> 'min_sprites')::integer, 0) then v_passed := false; v_message := 'Zu wenige Figuren im Projekt.'; end if;
  if coalesce((v_version.project_summary ->> 'variables')::integer, 0) < coalesce((v_exercise.check_config ->> 'min_variables')::integer, 0) then v_passed := false; v_message := 'Zu wenige Variablen im Projekt.'; end if;
  if coalesce((v_version.project_summary ->> 'eventHandlers')::integer, 0) < coalesce((v_exercise.check_config ->> 'min_event_handlers')::integer, 0) then v_passed := false; v_message := 'Geforderte Ereignisblöcke fehlen.'; end if;
  if coalesce((v_version.project_summary ->> 'loops')::integer, 0) < coalesce((v_exercise.check_config ->> 'min_loops')::integer, 0) then v_passed := false; v_message := 'Geforderte Schleifen fehlen.'; end if;
  if coalesce((v_version.project_summary ->> 'conditions')::integer, 0) < coalesce((v_exercise.check_config ->> 'min_conditions')::integer, 0) then v_passed := false; v_message := 'Geforderte Bedingungen fehlen.'; end if;
  for v_required_opcode in select jsonb_array_elements_text(coalesce(v_exercise.check_config -> 'required_opcodes', '[]'::jsonb)) loop
    if coalesce((v_version.project_summary -> 'opcodes' ->> v_required_opcode)::integer, 0) = 0 then v_passed := false; v_message := format('Geforderter Block fehlt: %s.', v_required_opcode); end if;
  end loop;

  insert into public.submissions (exercise_id, student_id, answer, status, feedback, checked_at)
  values (v_version.exercise_id, auth.uid(), format('Scratch-Projekt-Snapshot: %s', v_version.id), case when v_passed then 'passed' else 'draft' end, v_message, case when v_passed then now() else null end)
  on conflict (exercise_id, student_id) do update set answer = excluded.answer, status = excluded.status, feedback = excluded.feedback, checked_at = excluded.checked_at
  returning id into v_submission_id;
  insert into public.exercise_attempts (exercise_id, student_id, answer, outcome, message)
  values (v_version.exercise_id, auth.uid(), format('Scratch-Projekt-Snapshot: %s', v_version.id), case when v_passed then 'passed' else 'draft' end, v_message);
  if v_passed then
    update public.scratch_project_versions set state = 'submitted', is_current_draft = false, submission_id = v_submission_id where id = v_version.id;
  end if;
  return jsonb_build_object('status', case when v_passed then 'passed' else 'draft' end, 'message', v_message, 'scratch_version_id', v_version.id);
end;
$$;

revoke all on function public.check_scratch_project_structure(uuid) from public;
grant execute on function public.check_scratch_project_structure(uuid) to authenticated;

create or replace function public.can_read_scratch_storage_object(p_name text)
returns boolean language sql stable security definer set search_path = public, pg_temp as $$
  select exists (
    select 1 from public.scratch_project_versions v
    where v.storage_path = p_name and public.can_access_scratch_project(v.student_id, v.exercise_id)
  );
$$;

create or replace function public.can_upload_scratch_storage_object(p_name text)
returns boolean language sql stable security definer set search_path = public, pg_temp as $$
  select case
    when p_name ~ ('^scratch-projects/' || auth.uid()::text || '/[0-9a-f-]{36}/[0-9a-f-]{36}\\.sb3$')
      then public.can_access_scratch_project(auth.uid(), split_part(p_name, '/', 3)::uuid)
    else false
  end;
$$;

revoke all on function public.can_read_scratch_storage_object(text) from public;
revoke all on function public.can_upload_scratch_storage_object(text) from public;
grant execute on function public.can_read_scratch_storage_object(text) to authenticated;
grant execute on function public.can_upload_scratch_storage_object(text) to authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('scratch-projects', 'scratch-projects', false, 10485760, array['application/x.scratch.sb3', 'application/zip'])
on conflict (id) do update set public = false, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

create policy "students upload only own scratch object paths" on storage.objects
  for insert to authenticated with check (
    bucket_id = 'scratch-projects'
    and owner_id = auth.uid()
    and public.can_upload_scratch_storage_object(name)
  );
create policy "scoped scratch storage reads" on storage.objects
  for select to authenticated using (bucket_id = 'scratch-projects' and public.can_read_scratch_storage_object(name));
create policy "owners delete unregistered scratch uploads" on storage.objects
  for delete to authenticated using (
    bucket_id = 'scratch-projects' and owner_id = auth.uid()
    and not exists (select 1 from public.scratch_project_versions where storage_path = name)
  );

-- No update or delete policy: drafts are append-only, and submitted snapshots are immutable.
