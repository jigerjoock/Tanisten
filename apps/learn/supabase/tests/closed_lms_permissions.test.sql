begin;
create extension if not exists pgtap with schema extensions;
set local search_path to extensions, public, auth;
select plan(21);

-- These fixtures are created after migration 005, so the Auth trigger must
-- leave every account pending until an administrator-approved activation.
insert into public.student_records (id, email, first_name, last_name) values
  ('00000000-0000-0000-0000-000000005901', 'activation@example.test', 'Aktiv', 'Test');
insert into auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at)
values
  ('00000000-0000-0000-0000-000000005101', '00000000-0000-0000-0000-000000000001', 'authenticated', 'authenticated', 'active-student@example.test', '', now(), '{}', '{}', now(), now()),
  ('00000000-0000-0000-0000-000000005102', '00000000-0000-0000-0000-000000000001', 'authenticated', 'authenticated', 'disabled-student@example.test', '', now(), '{}', '{}', now(), now()),
  ('00000000-0000-0000-0000-000000005103', '00000000-0000-0000-0000-000000000001', 'authenticated', 'authenticated', 'disabled-teacher@example.test', '', now(), '{}', '{}', now(), now()),
  ('00000000-0000-0000-0000-000000005104', '00000000-0000-0000-0000-000000000001', 'authenticated', 'authenticated', 'disabled-admin@example.test', '', now(), '{}', '{}', now(), now()),
  ('00000000-0000-0000-0000-000000005105', '00000000-0000-0000-0000-000000000001', 'authenticated', 'authenticated', 'activation@example.test', '', now(), '{"tanisten_student_record_id":"00000000-0000-0000-0000-000000005901"}', '{}', now(), now());

select is((select account_status::text from public.profiles where id = '00000000-0000-0000-0000-000000005105'), 'pending', 'new Auth users start pending');
update public.profiles set account_status = case id
  when '00000000-0000-0000-0000-000000005101'::uuid then 'active'::public.account_status
  when '00000000-0000-0000-0000-000000005102'::uuid then 'disabled'::public.account_status
  when '00000000-0000-0000-0000-000000005103'::uuid then 'disabled'::public.account_status
  when '00000000-0000-0000-0000-000000005104'::uuid then 'disabled'::public.account_status
  else account_status end,
  role = case id
    when '00000000-0000-0000-0000-000000005103'::uuid then 'teacher'::public.user_role
    when '00000000-0000-0000-0000-000000005104'::uuid then 'admin'::public.user_role
    else role end
where id between '00000000-0000-0000-0000-000000005101'::uuid and '00000000-0000-0000-0000-000000005105'::uuid;

insert into public.courses (id, slug, title, published) values
  ('00000000-0000-0000-0000-000000005201', 'closed-lms-published', 'Published', true),
  ('00000000-0000-0000-0000-000000005202', 'closed-lms-unpublished', 'Unpublished', false);
insert into public.course_modules (id, course_id, title) values ('00000000-0000-0000-0000-000000005301', '00000000-0000-0000-0000-000000005201', 'Module');
insert into public.lessons (id, module_id, title) values ('00000000-0000-0000-0000-000000005401', '00000000-0000-0000-0000-000000005301', 'Lesson');
insert into public.exercises (id, course_id, lesson_id, title, check_mode, position) values ('00000000-0000-0000-0000-000000005501', '00000000-0000-0000-0000-000000005201', 'Review task', 'teacher', 1);
insert into public.course_memberships (course_id, user_id) values
  ('00000000-0000-0000-0000-000000005201', '00000000-0000-0000-0000-000000005101'),
  ('00000000-0000-0000-0000-000000005202', '00000000-0000-0000-0000-000000005101'),
  ('00000000-0000-0000-0000-000000005201', '00000000-0000-0000-0000-000000005102');

set local role authenticated;
select set_config('request.jwt.claim.role', 'authenticated', true);
select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-000000005101', true);
select results_eq($$select slug from public.courses order by slug$$, array['closed-lms-published'::text], 'active student sees assigned published course only');
select is_empty($$select * from public.courses where slug = 'closed-lms-unpublished'$$, 'active student cannot read assigned unpublished course');
select throws_ok($$select public.activate_student_record('00000000-0000-0000-0000-000000005901')$$, 'P0001', 'Invitation binding is invalid', 'email-only access cannot claim a pending student record');

reset role;
set local role authenticated;
select set_config('request.jwt.claim.role', 'authenticated', true);
select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-000000005102', true);
select is_empty($$select * from public.courses$$, 'disabled student cannot read courses through an existing session');
select results_eq($$select id from public.profiles where id = auth.uid()$$, array['00000000-0000-0000-0000-000000005102'::uuid], 'disabled student can read only own profile for disabled-state UX');

reset role;
insert into public.course_teachers (course_id, teacher_id, grants_course_wide_access) values ('00000000-0000-0000-0000-000000005201', '00000000-0000-0000-0000-000000005103', true);
set local role authenticated;
select set_config('request.jwt.claim.role', 'authenticated', true);
select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-000000005103', true);
select ok(not public.is_course_teacher('00000000-0000-0000-0000-000000005201'), 'disabled teacher loses course-teacher privilege');
select is_empty($$select * from public.submissions$$, 'disabled teacher cannot read review queue');
select throws_ok($$select public.review_exercise_submission('00000000-0000-0000-0000-000000000601', 'passed', null)$$, 'P0001', 'Active teacher or administrator access is required', 'disabled teacher cannot review directly by RPC');

reset role;
set local role authenticated;
select set_config('request.jwt.claim.role', 'authenticated', true);
select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-000000005104', true);
select ok(not public.is_admin(), 'disabled admin loses administrator privilege');
select throws_ok($$select public.grant_student_course_access('00000000-0000-0000-0000-000000005901', '00000000-0000-0000-0000-000000005201')$$, 'P0001', 'Active administrator access is required', 'disabled admin cannot grant course access');

reset role;
insert into public.student_course_assignments (student_record_id, course_id) values ('00000000-0000-0000-0000-000000005901', '00000000-0000-0000-0000-000000005201');
set local role authenticated;
select set_config('request.jwt.claim.role', 'authenticated', true);
select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-000000005105', true);
select lives_ok($$select public.activate_student_record('00000000-0000-0000-0000-000000005901')$$, 'bound invited student can activate exactly one record');
select is((select profile_id from public.student_records where id = '00000000-0000-0000-0000-000000005901'), '00000000-0000-0000-0000-000000005105'::uuid, 'activation links the pending record to the authenticated user');
select results_eq($$select count(*) from public.course_memberships where user_id = '00000000-0000-0000-0000-000000005105' and course_id = '00000000-0000-0000-0000-000000005201'$$, array[1::bigint], 'activation transfers active assignments once');
select lives_ok($$select public.activate_student_record('00000000-0000-0000-0000-000000005901')$$, 'repeat activation is idempotent');
select results_eq($$select count(*) from public.course_memberships where user_id = '00000000-0000-0000-0000-000000005105' and course_id = '00000000-0000-0000-0000-000000005201'$$, array[1::bigint], 'repeat activation does not duplicate memberships');

reset role;
insert into public.submissions (id, exercise_id, student_id, answer, status) values ('00000000-0000-0000-0000-000000005601', '00000000-0000-0000-0000-000000005501', '00000000-0000-0000-0000-000000005105', 'work', 'passed');
insert into public.exercise_attempts (exercise_id, student_id, answer, outcome) values ('00000000-0000-0000-0000-000000005501', '00000000-0000-0000-0000-000000005105', 'work', 'passed');
insert into public.submission_reviews (submission_id, reviewer_id, decision) values ('00000000-0000-0000-0000-000000005601', '00000000-0000-0000-0000-000000005103', 'passed');
update public.profiles set account_status = 'active' where id = '00000000-0000-0000-0000-000000005104';
set local role authenticated;
select set_config('request.jwt.claim.role', 'authenticated', true);
select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-000000005104', true);
select lives_ok($$select public.revoke_student_course_access('00000000-0000-0000-0000-000000005901', '00000000-0000-0000-0000-000000005201')$$, 'active admin can revoke an assignment');
select results_eq($$select count(*) from public.course_memberships where user_id = '00000000-0000-0000-0000-000000005105' and course_id = '00000000-0000-0000-0000-000000005201'$$, array[0::bigint], 'revocation removes current course access');
select results_eq($$select count(*) from public.submissions where id = '00000000-0000-0000-0000-000000005601'$$, array[1::bigint], 'revocation preserves submissions');
select results_eq($$select count(*) from public.exercise_attempts where student_id = '00000000-0000-0000-0000-000000005105'$$, array[1::bigint], 'revocation preserves attempts');
select results_eq($$select count(*) from public.submission_reviews where submission_id = '00000000-0000-0000-0000-000000005601'$$, array[1::bigint], 'revocation preserves reviews');

select * from finish();
rollback;
