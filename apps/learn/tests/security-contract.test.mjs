import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const migration = await readFile(new URL("../supabase/migrations/202610150002_harden_rls_and_learning_structure.sql", import.meta.url), "utf8");
const exerciseRoute = await readFile(new URL("../app/api/exercises/[id]/route.ts", import.meta.url), "utf8");

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
