-- Automatic validation is intentionally fail-closed. Code execution requires a future trusted runner.

create type public.exercise_kind as enum ('text_response', 'scratch_project', 'python_code', 'javascript_code');
alter table public.exercises add column kind public.exercise_kind not null default 'text_response';
alter table public.exercises add column content jsonb not null default '{}'::jsonb check (jsonb_typeof(content) = 'object');
alter table public.exercises add column starter_code text not null default '';
alter table public.course_teachers add column grants_course_wide_access boolean not null default false;
comment on column public.course_teachers.grants_course_wide_access is 'Explicit administrator grant allowing a teacher to review every enrolled student in this course. Group assignments remain scoped to their own group.';

create or replace function public.is_course_teacher(course uuid) returns boolean language sql stable security definer set search_path = public as $$
  select public.is_admin()
    or exists (select 1 from public.course_teachers where course_id = course and teacher_id = auth.uid() and grants_course_wide_access)
    or exists (select 1 from public.group_teachers gt join public.group_courses gc on gc.group_id = gt.group_id where gc.course_id = course and gt.teacher_id = auth.uid());
$$;
create or replace function public.can_teach_student_in_course(student uuid, course uuid) returns boolean language sql stable security definer set search_path = public as $$
  select public.is_admin()
    or exists (select 1 from public.course_teachers where course_id = course and teacher_id = auth.uid() and grants_course_wide_access)
    or exists (
      select 1 from public.group_teachers gt
      join public.group_members gm on gm.group_id = gt.group_id
      join public.group_courses gc on gc.group_id = gt.group_id
      where gt.teacher_id = auth.uid() and gm.student_id = student and gc.course_id = course
    );
$$;

create or replace function public.check_automatic_exercise(p_exercise_id uuid, p_answer text) returns jsonb language plpgsql security definer set search_path = public, pg_temp as $$
declare
  v_exercise public.exercises%rowtype;
  v_existing public.submission_status;
  v_answer text := btrim(coalesce(p_answer, ''));
  v_message text;
  v_passed boolean := false;
  v_executor text;
  v_expected text;
begin
  if auth.uid() is null then raise exception 'Authentication is required'; end if;
  select * into v_exercise from public.exercises where id = p_exercise_id;
  if not found or not public.is_enrolled(v_exercise.course_id) then raise exception 'Exercise is not available to this student'; end if;
  if v_exercise.check_mode <> 'automatic' then raise exception 'This exercise requires teacher review'; end if;
  select status into v_existing from public.submissions where exercise_id = p_exercise_id and student_id = auth.uid();
  if v_existing in ('submitted', 'passed') then raise exception 'This exercise cannot be checked in its current state'; end if;

  if jsonb_typeof(v_exercise.check_config) <> 'object' or v_exercise.check_config ->> 'version' <> '1' or nullif(v_exercise.check_config ->> 'executor', '') is null then
    v_message := 'Automatic validation is not configured for this exercise. It remains incomplete.';
  else
    v_executor := v_exercise.check_config ->> 'executor';
    if v_exercise.kind = 'text_response' and v_executor = 'text_exact' and jsonb_typeof(v_exercise.check_config -> 'expected_answer') = 'string' then
      v_expected := btrim(v_exercise.check_config ->> 'expected_answer');
      if v_expected = '' then
        v_message := 'Automatic validation is not configured for this exercise. It remains incomplete.';
      elsif v_answer = v_expected then
        v_passed := true;
        v_message := 'Checks passed. Exercise completed.';
      else
        v_message := 'The answer does not match the configured result.';
      end if;
    elsif v_exercise.kind in ('python_code', 'javascript_code') and v_executor = 'code_runner' then
      v_message := 'Automatic code execution is not configured on this deployment. This exercise cannot pass automatically.';
    elsif v_exercise.kind = 'scratch_project' and v_executor = 'scratch_verifier' then
      v_message := 'Scratch project verification is not configured on this deployment. This exercise cannot pass automatically.';
    else
      v_message := 'Automatic validation configuration is invalid for this exercise. It remains incomplete.';
    end if;
  end if;

  insert into public.submissions (exercise_id, student_id, answer, status, feedback, checked_at)
  values (p_exercise_id, auth.uid(), v_answer, case when v_passed then 'passed' else 'draft' end, v_message, case when v_passed then now() else null end)
  on conflict (exercise_id, student_id) do update set answer = excluded.answer, status = excluded.status, feedback = excluded.feedback, checked_by = null, checked_at = excluded.checked_at;
  insert into public.exercise_attempts (exercise_id, student_id, answer, outcome, message)
  values (p_exercise_id, auth.uid(), v_answer, case when v_passed then 'passed' else 'draft' end, v_message);
  return jsonb_build_object('status', case when v_passed then 'passed' else 'draft' end, 'message', v_message);
end; $$;
