begin;
create extension if not exists pgtap with schema extensions;
set local search_path to extensions, public, auth;
select plan(13);

insert into auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at)
values
  ('00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000001', 'authenticated', 'authenticated', 'student-a@example.test', '', now(), '{}', '{}', now(), now()),
  ('00000000-0000-0000-0000-000000000105', '00000000-0000-0000-0000-000000000001', 'authenticated', 'authenticated', 'student-b@example.test', '', now(), '{}', '{}', now(), now()),
  ('00000000-0000-0000-0000-000000000102', '00000000-0000-0000-0000-000000000001', 'authenticated', 'authenticated', 'course-teacher@example.test', '', now(), '{}', '{}', now(), now()),
  ('00000000-0000-0000-0000-000000000103', '00000000-0000-0000-0000-000000000001', 'authenticated', 'authenticated', 'group-teacher@example.test', '', now(), '{}', '{}', now(), now()),
  ('00000000-0000-0000-0000-000000000104', '00000000-0000-0000-0000-000000000001', 'authenticated', 'authenticated', 'admin@example.test', '', now(), '{}', '{}', now(), now());
update public.profiles set role = case id
  when '00000000-0000-0000-0000-000000000102'::uuid then 'teacher'::public.user_role
  when '00000000-0000-0000-0000-000000000103'::uuid then 'teacher'::public.user_role
  when '00000000-0000-0000-0000-000000000104'::uuid then 'admin'::public.user_role
  else 'student'::public.user_role end;

insert into public.courses (id, slug, title, created_by) values ('00000000-0000-0000-0000-000000000201', 'rls-test', 'RLS Test Course', '00000000-0000-0000-0000-000000000104');
insert into public.course_memberships (course_id, user_id) values
  ('00000000-0000-0000-0000-000000000201', '00000000-0000-0000-0000-000000000101'),
  ('00000000-0000-0000-0000-000000000201', '00000000-0000-0000-0000-000000000105');
insert into public.course_modules (id, course_id, title) values ('00000000-0000-0000-0000-000000000301', '00000000-0000-0000-0000-000000000201', 'Module');
insert into public.lessons (id, module_id, title) values ('00000000-0000-0000-0000-000000000401', '00000000-0000-0000-0000-000000000301', 'Lesson');
insert into public.exercises (id, course_id, lesson_id, title, check_mode, check_config, position) values
  ('00000000-0000-0000-0000-000000000501', '00000000-0000-0000-0000-000000000201', '00000000-0000-0000-0000-000000000401', 'Automatic exact', 'automatic', '{"version":"1","executor":"text_exact","expected_answer":"safe answer"}', 1),
  ('00000000-0000-0000-0000-000000000503', '00000000-0000-0000-0000-000000000201', '00000000-0000-0000-0000-000000000401', 'Automatic misconfigured', 'automatic', '{}', 2),
  ('00000000-0000-0000-0000-000000000502', '00000000-0000-0000-0000-000000000201', '00000000-0000-0000-0000-000000000401', 'Teacher review', 'teacher', '{}', 3);
insert into public.submissions (id, exercise_id, student_id, answer, status) values
  ('00000000-0000-0000-0000-000000000601', '00000000-0000-0000-0000-000000000502', '00000000-0000-0000-0000-000000000101', 'Student A work', 'submitted'),
  ('00000000-0000-0000-0000-000000000602', '00000000-0000-0000-0000-000000000502', '00000000-0000-0000-0000-000000000105', 'Student B work', 'submitted');

select ok((select relrowsecurity from pg_class where oid = 'public.submissions'::regclass), 'submissions has RLS enabled');
set local role authenticated;
select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-000000000101', true);
select set_config('request.jwt.claim.role', 'authenticated', true);
select throws_ok($$update public.submissions set status = 'passed' where id = '00000000-0000-0000-0000-000000000601'$$, '42501', 'permission denied for table submissions', 'student cannot set a submission to passed directly');
select throws_ok($$insert into public.exercise_attempts (exercise_id, student_id, answer, outcome) values ('00000000-0000-0000-0000-000000000501', '00000000-0000-0000-0000-000000000101', 'forged', 'passed')$$, '42501', 'permission denied for table exercise_attempts', 'student cannot forge an attempt');
select is((public.check_automatic_exercise('00000000-0000-0000-0000-000000000503', 'arbitrary text') ->> 'status'), 'draft', 'misconfigured automatic check fails closed');
select is((public.check_automatic_exercise('00000000-0000-0000-0000-000000000501', 'safe answer') ->> 'status'), 'passed', 'trusted exact automatic check can complete matching work');
select throws_ok($$select public.review_exercise_submission('00000000-0000-0000-0000-000000000601', 'passed', null)$$, 'P0001', 'Teacher is not assigned to this student and course', 'student cannot approve work');

reset role;
set local role authenticated;
select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-000000000103', true);
select set_config('request.jwt.claim.role', 'authenticated', true);
select is_empty($$select id from public.submissions where status = 'submitted'$$, 'unassigned teacher cannot read review queue items');
select throws_ok($$select public.review_exercise_submission('00000000-0000-0000-0000-000000000601', 'passed', null)$$, 'P0001', 'Teacher is not assigned to this student and course', 'unassigned teacher cannot approve work');

reset role;
insert into public.learning_groups (id, title) values ('00000000-0000-0000-0000-000000000701', 'Group A');
insert into public.group_members (group_id, student_id) values ('00000000-0000-0000-0000-000000000701', '00000000-0000-0000-0000-000000000101');
insert into public.group_teachers (group_id, teacher_id) values ('00000000-0000-0000-0000-000000000701', '00000000-0000-0000-0000-000000000103');
insert into public.group_courses (group_id, course_id) values ('00000000-0000-0000-0000-000000000701', '00000000-0000-0000-0000-000000000201');
set local role authenticated;
select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-000000000103', true);
select set_config('request.jwt.claim.role', 'authenticated', true);
select results_eq($$select count(*) from public.submissions where status = 'submitted'$$, array[1::bigint], 'group teacher sees only the assigned group student');
select lives_ok($$select public.review_exercise_submission('00000000-0000-0000-0000-000000000601', 'passed', null)$$, 'group teacher can approve assigned group work');
select throws_ok($$select public.review_exercise_submission('00000000-0000-0000-0000-000000000602', 'passed', null)$$, 'P0001', 'Teacher is not assigned to this student and course', 'group teacher cannot approve another group student');

reset role;
insert into public.course_teachers (course_id, teacher_id, grants_course_wide_access) values ('00000000-0000-0000-0000-000000000201', '00000000-0000-0000-0000-000000000102', true);
set local role authenticated;
select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-000000000102', true);
select set_config('request.jwt.claim.role', 'authenticated', true);
select lives_ok($$select public.review_exercise_submission('00000000-0000-0000-0000-000000000602', 'passed', null)$$, 'explicit course-wide teacher can approve any enrolled student');
select is((select status::text from public.submissions where id = '00000000-0000-0000-0000-000000000602'), 'passed', 'course-wide approval records passed status');

select * from finish();
rollback;
