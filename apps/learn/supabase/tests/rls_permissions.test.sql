begin;
create extension if not exists pgtap with schema extensions;
set local search_path to extensions, public, auth;
select plan(8);

insert into auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at)
values
  ('00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000001', 'authenticated', 'authenticated', 'student@example.test', '', now(), '{}', '{}', now(), now()),
  ('00000000-0000-0000-0000-000000000102', '00000000-0000-0000-0000-000000000001', 'authenticated', 'authenticated', 'teacher@example.test', '', now(), '{}', '{}', now(), now()),
  ('00000000-0000-0000-0000-000000000103', '00000000-0000-0000-0000-000000000001', 'authenticated', 'authenticated', 'other-teacher@example.test', '', now(), '{}', '{}', now(), now()),
  ('00000000-0000-0000-0000-000000000104', '00000000-0000-0000-0000-000000000001', 'authenticated', 'authenticated', 'admin@example.test', '', now(), '{}', '{}', now(), now());
update public.profiles set role = case id
  when '00000000-0000-0000-0000-000000000102'::uuid then 'teacher'::public.user_role
  when '00000000-0000-0000-0000-000000000103'::uuid then 'teacher'::public.user_role
  when '00000000-0000-0000-0000-000000000104'::uuid then 'admin'::public.user_role
  else 'student'::public.user_role end;

insert into public.courses (id, slug, title, created_by) values ('00000000-0000-0000-0000-000000000201', 'rls-test', 'RLS Test Course', '00000000-0000-0000-0000-000000000104');
insert into public.course_memberships (course_id, user_id) values ('00000000-0000-0000-0000-000000000201', '00000000-0000-0000-0000-000000000101');
insert into public.course_modules (id, course_id, title) values ('00000000-0000-0000-0000-000000000301', '00000000-0000-0000-0000-000000000201', 'Module');
insert into public.lessons (id, module_id, title) values ('00000000-0000-0000-0000-000000000401', '00000000-0000-0000-0000-000000000301', 'Lesson');
insert into public.exercises (id, course_id, lesson_id, title, check_mode, check_config, position) values
  ('00000000-0000-0000-0000-000000000501', '00000000-0000-0000-0000-000000000201', '00000000-0000-0000-0000-000000000401', 'Automatic', 'automatic', '{"equals":"safe answer"}', 1),
  ('00000000-0000-0000-0000-000000000502', '00000000-0000-0000-0000-000000000201', '00000000-0000-0000-0000-000000000401', 'Teacher review', 'teacher', '{}', 2);
insert into public.submissions (id, exercise_id, student_id, answer, status) values ('00000000-0000-0000-0000-000000000601', '00000000-0000-0000-0000-000000000502', '00000000-0000-0000-0000-000000000101', 'Initial work', 'submitted');

select ok((select relrowsecurity from pg_class where oid = 'public.submissions'::regclass), 'submissions has RLS enabled');
set local role authenticated;
select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-000000000101', true);
select set_config('request.jwt.claim.role', 'authenticated', true);
select is_empty($$update public.submissions set status = 'passed' where id = '00000000-0000-0000-0000-000000000601' returning 1$$, 'student cannot set a submission to passed directly');
select throws_ok($$insert into public.exercise_attempts (exercise_id, student_id, answer, outcome) values ('00000000-0000-0000-0000-000000000501', '00000000-0000-0000-0000-000000000101', 'forged', 'passed')$$, '42501', 'new row violates row-level security policy for table "exercise_attempts"', 'student cannot forge an attempt');
select is((public.check_automatic_exercise('00000000-0000-0000-0000-000000000501', 'safe answer') ->> 'status'), 'passed', 'trusted automatic RPC can complete matching work');
select throws_ok($$select public.review_exercise_submission('00000000-0000-0000-0000-000000000601', 'passed', null)$$, 'P0001', 'Teacher is not assigned to this student and course', 'student cannot approve work');

reset role;
set local role authenticated;
select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-000000000103', true);
select set_config('request.jwt.claim.role', 'authenticated', true);
select is_empty($$select id from public.submissions where id = '00000000-0000-0000-0000-000000000601'$$, 'unassigned teacher cannot read review queue item');
select throws_ok($$select public.review_exercise_submission('00000000-0000-0000-0000-000000000601', 'passed', null)$$, 'P0001', 'Teacher is not assigned to this student and course', 'unassigned teacher cannot approve work');

reset role;
insert into public.course_teachers (course_id, teacher_id) values ('00000000-0000-0000-0000-000000000201', '00000000-0000-0000-0000-000000000102');
set local role authenticated;
select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-000000000102', true);
select set_config('request.jwt.claim.role', 'authenticated', true);
select lives_ok($$select public.review_exercise_submission('00000000-0000-0000-0000-000000000601', 'passed', null)$$, 'assigned teacher can approve pending work');
select is((select status::text from public.submissions where id = '00000000-0000-0000-0000-000000000601'), 'passed', 'approved submission records passed status');

select * from finish();
rollback;
