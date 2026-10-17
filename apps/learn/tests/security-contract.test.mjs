import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const migration = await readFile(new URL("../supabase/migrations/202610150002_harden_rls_and_learning_structure.sql", import.meta.url), "utf8");
const exerciseRoute = await readFile(new URL("../app/api/exercises/[id]/route.ts", import.meta.url), "utf8");
const auth = await readFile(new URL("../lib/auth.ts", import.meta.url), "utf8");
const middleware = await readFile(new URL("../lib/supabase/middleware.ts", import.meta.url), "utf8");
const rlsTests = await readFile(new URL("../supabase/tests/rls_permissions.test.sql", import.meta.url), "utf8");
const signOutAction = await readFile(new URL("../app/logout/actions.ts", import.meta.url), "utf8");
const layout = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");
const closedLmsMigration = await readFile(new URL("../supabase/migrations/202610170005_closed_lms_admin.sql", import.meta.url), "utf8");
const studentActions = await readFile(new URL("../app/admin/students/actions.ts", import.meta.url), "utf8");
const teacherActions = await readFile(new URL("../app/admin/teachers/actions.ts", import.meta.url), "utf8");
const closedLmsRlsTests = await readFile(new URL("../supabase/tests/closed_lms_permissions.test.sql", import.meta.url), "utf8");
const rootLayout = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");
const dashboardLayout = await readFile(new URL("../app/dashboard/layout.tsx", import.meta.url), "utf8");
const loginLayout = await readFile(new URL("../app/login/layout.tsx", import.meta.url), "utf8");
const coursePage = await readFile(new URL("../app/courses/[slug]/page.tsx", import.meta.url), "utf8");
const pendingLink = await readFile(new URL("../components/pending-link.tsx", import.meta.url), "utf8");
const dashboardLoading = await readFile(new URL("../app/dashboard/loading.tsx", import.meta.url), "utf8");
const closedLms = await readFile(new URL("../lib/closed-lms.ts", import.meta.url), "utf8");
const managementShell = await readFile(new URL("../components/management-shell.tsx", import.meta.url), "utf8");
const studentShell = await readFile(new URL("../components/student-shell.tsx", import.meta.url), "utf8");
const courseLayout = await readFile(new URL("../app/courses/[slug]/layout.tsx", import.meta.url), "utf8");
const exerciseFocus = await readFile(new URL("../components/exercise-focus-workspace.tsx", import.meta.url), "utf8");
const pythonWorkspace = await readFile(new URL("../components/python-workspace.tsx", import.meta.url), "utf8");
const pythonEditor = await readFile(new URL("../components/python-editor.tsx", import.meta.url), "utf8");

test("submission writes use trusted RPC transitions", () => {
  assert.match(exerciseRoute, /rpc\(procedure/);
  assert.doesNotMatch(exerciseRoute, /from\("submissions"\)\.upsert/);
  assert.match(migration, /check_automatic_exercise/);
  assert.match(migration, /submit_exercise_for_review/);
  assert.match(migration, /review_exercise_submission/);
});

test("hardening migration blocks direct learner writes and scopes teachers", () => {
  assert.doesNotMatch(migration, /create policy "students update drafts"/);
  assert.match(migration, /create policy "scoped submission select"/);
  assert.match(migration, /can_teach_student_in_course/);
  assert.match(migration, /course_teachers/);
  assert.match(migration, /group_teachers/);
  assert.match(migration, /feedback is required when returning work for changes/i);
});

test("automatic validation and course-wide teaching access fail closed", async () => {
  const failClosedMigration = await readFile(new URL("../supabase/migrations/202610150003_fail_closed_checks_and_teacher_scopes.sql", import.meta.url), "utf8");
  assert.match(failClosedMigration, /Automatic validation is not configured/);
  assert.match(failClosedMigration, /v_passed boolean := false/);
  assert.match(failClosedMigration, /expected_answer/);
  assert.match(failClosedMigration, /Automatic code execution is not configured/);
  assert.match(failClosedMigration, /grants_course_wide_access boolean not null default false/);
  assert.match(failClosedMigration, /grants_course_wide_access\)/);
});

test("admin authorization keeps RLS and logs only safe diagnostics", () => {
  assert.match(auth, /\.maybeSingle\(\)/);
  assert.match(auth, /select\("id,role"\)/);
  assert.match(auth, /select\("id,account_status"\)/);
  assert.match(auth, /profileMatchesAuthUser/);
  assert.match(auth, /profileQueryErrorMessage/);
  assert.match(auth, /profile_lookup_failed/);
  assert.match(auth, /throw new Error\("Dein Profil konnte nicht geladen werden/);
  assert.match(auth, /logAuthDiagnostic\("require_role"/);
  assert.match(auth, /supabaseProjectRef/);
  assert.match(middleware, /supabaseCookieCount/);
  assert.doesNotMatch(middleware, /cookies\.getAll\(\).*value/);
  assert.match(rlsTests, /select plan\(15\)/);
  assert.match(rlsTests, /admin can read their own profile through RLS/);
  assert.match(rlsTests, /admin role resolves for the matching authenticated user/);
});

test("staff can inspect RLS-authorized course content without a learner membership", () => {
  assert.match(coursePage, /getCurrentProfile/);
  assert.match(coursePage, /const isStaff = profile\.role === "admin" \|\| profile\.role === "teacher"/);
  assert.match(coursePage, /if \(!isStaff\)/);
  assert.match(coursePage, /starter_code/);
  assert.match(coursePage, /content/);
});

test("sign-out clears the Supabase session and navigation stays role-aware", () => {
  assert.match(signOutAction, /supabase\.auth\.signOut\(\)/);
  assert.match(signOutAction, /redirect\("\/login"\)/);
  assert.match(managementShell, /role === "admin"/);
  assert.match(managementShell, /role === "teacher"/);
  assert.match(managementShell, /action=\{signOut\}/);
  assert.match(studentShell, /action=\{signOut\}/);
  assert.match(studentShell, /<details className="user-menu">/);
});

test("top-level navigation provides immediate pending feedback", () => {
  assert.match(pendingLink, /useState\(false\)/);
  assert.match(pendingLink, /setPending\(true\)/);
  assert.match(pendingLink, /aria-busy=\{pending\}/);
  assert.match(managementShell, /PendingLink className="nav" href="\/dashboard"/);
  assert.match(dashboardLoading, /Meine Kurse werden geladen/);
  assert.match(auth, /getServerAuthContext = cache/);
});

test("only the root layout mounts the document and each shell owns one main landmark", () => {
  assert.match(rootLayout, /<html lang="de">/);
  assert.match(rootLayout, /<body>/);
  assert.doesNotMatch(rootLayout, /<main\b/);
  assert.match(managementShell, /<main className="lms-main">/);
  assert.match(studentShell, /<main className=\{`student-main/);
  for (const nestedLayout of [dashboardLayout, loginLayout, courseLayout]) {
    assert.doesNotMatch(nestedLayout, /<\/?html\b/);
    assert.doesNotMatch(nestedLayout, /<\/?body\b/);
    assert.doesNotMatch(nestedLayout, /<\/?main\b/);
  }
});

test("student learning routes use a sidebar-free course shell and lazy Monaco workspace", () => {
  assert.doesNotMatch(courseLayout, /ManagementShell/);
  assert.match(courseLayout, /StudentShell/);
  assert.match(courseLayout, /!course\.published/);
  assert.match(courseLayout, /course_memberships/);
  assert.match(exerciseFocus, /exercise-navigator/);
  assert.match(exerciseFocus, /Nächste Aufgabe/);
  assert.match(pythonWorkspace, /PythonEditor/);
  assert.match(pythonWorkspace, /aria-expanded=\{taskOpen\}/);
  assert.match(pythonWorkspace, /py-edge-toggle/);
  assert.match(pythonWorkspace, /py-output-assistant/);
  assert.match(pythonWorkspace, /sessionStorage/);
  assert.match(pythonEditor, /dynamic\(\(\) => import\("@monaco-editor\/react"\)/);
  assert.match(pythonEditor, /defaultLanguage="python"/);
});

test("closed LMS gates learner access by active account, assignment, and publication", () => {
  assert.match(closedLmsMigration, /create type public\.account_status/);
  assert.match(closedLmsMigration, /create table public\.student_records/);
  assert.match(closedLmsMigration, /create table public\.student_course_assignments/);
  assert.match(closedLmsMigration, /account_status = 'active'/);
  assert.match(closedLmsMigration, /cm\.user_id = auth\.uid\(\) and c\.published/);
  assert.match(closedLmsMigration, /published participant courses select/);
  assert.match(closedLmsMigration, /public\.is_active_user\(\)/);
  assert.doesNotMatch(closedLmsMigration, /return \(select public\.check_automatic_exercise/);
});

test("migration 005 revokes inactive staff access and binds pending activation", () => {
  assert.match(closedLmsMigration, /role = 'admin' and account_status = 'active'/);
  assert.match(closedLmsMigration, /public\.is_active_teacher\(\)/);
  assert.match(closedLmsMigration, /Active teacher or administrator access is required/);
  assert.match(closedLmsMigration, /raw_app_meta_data ->> 'tanisten_student_record_id'/);
  assert.match(closedLmsMigration, /activate_student_record/);
  assert.match(closedLmsMigration, /grant_student_course_access/);
  assert.match(closedLmsMigration, /revoke_student_course_access/);
  assert.match(closedLmsMigration, /set_student_account_status/);
  assert.match(closedLmsMigration, /duplicate student emails exist after normalization/);
  assert.match(closedLmsMigration, /delete from public\.course_memberships/);
  assert.match(closedLmsMigration, /active scoped submission select/);
  assert.match(closedLmsRlsTests, /select plan\(26\)/);
  assert.match(closedLmsRlsTests, /disabled teacher cannot review directly by RPC/);
  assert.match(closedLmsRlsTests, /email-only access cannot claim a pending student record/);
  assert.match(closedLmsRlsTests, /revocation preserves submissions/);
});

test("administrative writes require admin role and fail safely before migration 005", () => {
  assert.match(studentActions, /requireRole\(\["admin"\]\)/);
  assert.match(studentActions, /closedLmsReady/);
  assert.match(studentActions, /requireServiceRoleClient/);
  assert.match(studentActions, /grant_student_course_access/);
  assert.match(studentActions, /tanisten_student_record_id/);
  assert.match(studentActions, /set_student_account_status/);
  assert.match(studentActions, /deleteUser\(data\.user\.id\)/);
  assert.doesNotMatch(studentActions, /from\("profiles"\)\.update/);
  assert.doesNotMatch(studentActions, /from\("course_memberships"\)\.upsert/);
  assert.match(teacherActions, /requireRole\(\["admin"\]\)/);
  assert.match(teacherActions, /closedLmsReady/);
  assert.doesNotMatch(teacherActions, /requireRole\(\["teacher"\]\)/);
});

test("closed-LMS admin pages require the complete migration 005 schema contract", () => {
  assert.match(closedLms, /student_records.*profile_id.*account_status/s);
  assert.match(closedLms, /profiles.*account_status.*first_name.*last_name.*archived_at/s);
  assert.match(closedLms, /migration_005_contract_unavailable/);
});
