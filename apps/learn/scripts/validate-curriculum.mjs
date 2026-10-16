import assert from "node:assert/strict";
import { curriculum } from "../content/curriculum.seed.mjs";

const courses = curriculum.courses;
assert.equal(courses.length, 2, "Expected exactly two courses.");

const exerciseTitles = new Set();
let lessonCount = 0;
let exerciseCount = 0;

for (const course of courses) {
  assert.equal(course.locale, "de", `${course.slug} must be German.`);
  assert.equal(course.modules.length, 5, `${course.slug} must have five modules.`);
  assert.ok(course.attribution.length > 0, `${course.slug} needs attribution.`);

  for (const [moduleIndex, module] of course.modules.entries()) {
    assert.equal(module.position, moduleIndex + 1, `${course.slug} module positions must be contiguous.`);
    assert.equal(module.lessons.length, 10, `${course.slug}/${module.title} must have ten lessons.`);

    for (const [lessonIndex, lesson] of module.lessons.entries()) {
      lessonCount += 1;
      assert.equal(lesson.position, lessonIndex + 1, `${lesson.title} position must be contiguous.`);
      assert.equal(lesson.exercises.length, 5, `${lesson.title} must have five exercises.`);

      for (const [exerciseIndex, exercise] of lesson.exercises.entries()) {
        exerciseCount += 1;
        assert.equal(exercise.position, exerciseIndex + 1, `${exercise.title} position must be contiguous.`);
        assert.ok(!exerciseTitles.has(exercise.title), `Duplicate exercise: ${exercise.title}`);
        exerciseTitles.add(exercise.title);
        assert.equal(exercise.check_mode, "teacher", `${exercise.title} must not claim automatic code execution.`);
        assert.deepEqual(exercise.check_config, {}, `${exercise.title} must not expose a hidden checker.`);
        assert.equal(exercise.content.solution_visibility, "none", `${exercise.title} must not expose a solution.`);
        assert.ok(Array.isArray(exercise.content.instructions) && exercise.content.instructions.length >= 2, `${exercise.title} needs instructions.`);
        assert.ok(Array.isArray(exercise.content.success_criteria) && exercise.content.success_criteria.length >= 2, `${exercise.title} needs success criteria.`);
        assert.ok(Array.isArray(exercise.content.hints) && exercise.content.hints.length >= 1 && exercise.content.hints.length <= 2, `${exercise.title} needs one or two hints.`);
        if (exercise.kind === "python_code") {
          assert.equal(exercise.content.submission_format, "Python-Code und kurze Testnotiz", `${exercise.title} needs a Python submission format.`);
        }
        if (exercise.kind === "scratch_project") {
          assert.ok(Array.isArray(exercise.content.scratch_blocks) && exercise.content.scratch_blocks.length >= 2, `${exercise.title} needs concrete Scratch blocks.`);
          assert.equal(exercise.content.submission_format, "Scratch-Projekt-Link oder Projektdokumentation mit Testnotiz", `${exercise.title} needs a Scratch submission format.`);
        }
      }
    }
  }
}

assert.equal(lessonCount, 100, "Expected 100 lessons.");
assert.equal(exerciseCount, 500, "Expected 500 exercises.");
console.log(`Curriculum valid: ${courses.length} courses, ${lessonCount} lessons, ${exerciseCount} exercises.`);
