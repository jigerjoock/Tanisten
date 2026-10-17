import { createHash } from "node:crypto";
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { curriculum } from "../content/curriculum.seed.mjs";

const sql = (value) => `'${String(value).replaceAll("'", "''")}'`;
const json = (value) => `${sql(JSON.stringify(value))}::jsonb`;
const uuid = (key) => {
  const hex = createHash("sha1").update(`tanisten-learn:${key}`).digest("hex");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-5${hex.slice(13, 16)}-a${hex.slice(17, 20)}-${hex.slice(20, 32)}`;
};

const courses = [];
const modules = [];
const lessons = [];
const exercises = [];

for (const course of curriculum.courses) {
  const courseId = uuid(`course:${course.slug}`);
  courses.push({ id: courseId, slug: course.slug, title: course.title, description: course.description });

  for (const module of course.modules) {
    const moduleId = uuid(`module:${course.slug}:${module.position}`);
    modules.push({ id: moduleId, courseId, position: module.position, title: module.title });

    for (const lesson of module.lessons) {
      const lessonId = uuid(`lesson:${course.slug}:${module.position}:${lesson.position}`);
      lessons.push({ id: lessonId, moduleId, position: lesson.position, title: lesson.title, description: lesson.description });

      for (const exercise of lesson.exercises) {
        exercises.push({
          id: uuid(`exercise:${course.slug}:${module.position}:${lesson.position}:${exercise.position}`),
          courseId,
          lessonId,
          position: exercise.position,
          title: exercise.title,
          description: exercise.description,
          content: exercise.content,
          starterCode: exercise.starter_code,
        });
      }
    }
  }
}

if (courses.length !== 2 || modules.length !== 10 || lessons.length !== 100 || exercises.length !== 500) {
  throw new Error("Unexpected curriculum hierarchy; repair plan was not generated.");
}

const values = (rows, columns, render) => rows.map((row) => `  (${render(row)})`).join(",\n");
const plan = `-- Generated locally from curriculum.seed.mjs. This plan has no transaction boundary.
-- It updates only curriculum-owned text fields and never deletes, inserts, or changes IDs, relations, publication, or learner records.
create temp table expected_courses (
  id uuid primary key, slug text not null, title text not null, description text not null
) on commit drop;
insert into expected_courses (id, slug, title, description) values
${values(courses, [], (row) => `${sql(row.id)}::uuid, ${sql(row.slug)}, ${sql(row.title)}, ${sql(row.description)}`)};

create temp table expected_modules (
  id uuid primary key, course_id uuid not null, position integer not null, title text not null
) on commit drop;
insert into expected_modules (id, course_id, position, title) values
${values(modules, [], (row) => `${sql(row.id)}::uuid, ${sql(row.courseId)}::uuid, ${row.position}, ${sql(row.title)}`)};

create temp table expected_lessons (
  id uuid primary key, module_id uuid not null, position integer not null, title text not null, description text not null
) on commit drop;
insert into expected_lessons (id, module_id, position, title, description) values
${values(lessons, [], (row) => `${sql(row.id)}::uuid, ${sql(row.moduleId)}::uuid, ${row.position}, ${sql(row.title)}, ${sql(row.description)}`)};

create temp table expected_exercises (
  id uuid primary key, course_id uuid not null, lesson_id uuid not null, position integer not null,
  title text not null, description text not null, content jsonb not null, starter_code text not null
) on commit drop;
insert into expected_exercises (id, course_id, lesson_id, position, title, description, content, starter_code) values
${values(exercises, [], (row) => `${sql(row.id)}::uuid, ${sql(row.courseId)}::uuid, ${sql(row.lessonId)}::uuid, ${row.position}, ${sql(row.title)}, ${sql(row.description)}, ${json(row.content)}, ${sql(row.starterCode)}`)};

do $$
begin
  if (select count(*) from public.courses where id in (select id from expected_courses)) <> 2 then raise exception 'Expected curriculum course IDs are missing'; end if;
  if (select count(*) from public.course_modules where id in (select id from expected_modules)) <> 10 then raise exception 'Expected curriculum module IDs are missing'; end if;
  if (select count(*) from public.lessons where id in (select id from expected_lessons)) <> 100 then raise exception 'Expected curriculum lesson IDs are missing'; end if;
  if (select count(*) from public.exercises where id in (select id from expected_exercises)) <> 500 then raise exception 'Expected curriculum exercise IDs are missing'; end if;
  if exists (select 1 from expected_courses e join public.courses c on c.id = e.id where c.slug <> e.slug) then raise exception 'Course ID/slug mismatch'; end if;
  if exists (select 1 from expected_modules e join public.course_modules m on m.id = e.id where m.course_id <> e.course_id or m.position <> e.position) then raise exception 'Module relation mismatch'; end if;
  if exists (select 1 from expected_lessons e join public.lessons l on l.id = e.id where l.module_id <> e.module_id or l.position <> e.position) then raise exception 'Lesson relation mismatch'; end if;
  if exists (select 1 from expected_exercises e join public.exercises x on x.id = e.id where x.course_id <> e.course_id or x.lesson_id <> e.lesson_id or x.position <> e.position) then raise exception 'Exercise relation mismatch'; end if;
end $$;

with updated as (
  update public.courses c set title = e.title, description = e.description
  from expected_courses e
  where c.id = e.id and (c.title, c.description) is distinct from (e.title, e.description)
  returning c.id
) select 'courses_updated=' || count(*) from updated;

with updated as (
  update public.course_modules m set title = e.title
  from expected_modules e
  where m.id = e.id and m.title is distinct from e.title
  returning m.id
) select 'modules_updated=' || count(*) from updated;

with updated as (
  update public.lessons l set title = e.title, description = e.description
  from expected_lessons e
  where l.id = e.id and (l.title, l.description) is distinct from (e.title, e.description)
  returning l.id
) select 'lessons_updated=' || count(*) from updated;

with updated as (
  update public.exercises x set title = e.title, description = e.description, content = e.content, starter_code = e.starter_code
  from expected_exercises e
  where x.id = e.id and (x.title, x.description, x.content, x.starter_code) is distinct from (e.title, e.description, e.content, e.starter_code)
  returning x.id
) select 'exercises_updated=' || count(*) from updated;

do $$
begin
  if exists (select 1 from expected_courses e join public.courses c on c.id = e.id where (c.title, c.description) is distinct from (e.title, e.description)) then raise exception 'Course text verification failed'; end if;
  if exists (select 1 from expected_modules e join public.course_modules m on m.id = e.id where m.title is distinct from e.title) then raise exception 'Module text verification failed'; end if;
  if exists (select 1 from expected_lessons e join public.lessons l on l.id = e.id where (l.title, l.description) is distinct from (e.title, e.description)) then raise exception 'Lesson text verification failed'; end if;
  if exists (select 1 from expected_exercises e join public.exercises x on x.id = e.id where (x.title, x.description, x.content, x.starter_code) is distinct from (e.title, e.description, e.content, e.starter_code)) then raise exception 'Exercise text verification failed'; end if;
  if exists (select 1 from public.course_modules m join expected_courses c on c.id = m.course_id group by m.course_id having count(*) <> 5) then raise exception 'Module hierarchy verification failed'; end if;
  if exists (select 1 from public.lessons l join expected_modules m on m.id = l.module_id group by l.module_id having count(*) <> 10) then raise exception 'Lesson hierarchy verification failed'; end if;
  if exists (select 1 from public.exercises x join expected_lessons l on l.id = x.lesson_id group by x.lesson_id having count(*) <> 5) then raise exception 'Exercise hierarchy verification failed'; end if;
end $$;

select 'utf8_probe=' || (select string_agg(ch, '') from (values ('ä'), ('ö'), ('ü'), ('Ä'), ('Ö'), ('Ü'), ('ß')) as probe(ch));
select 'repair_hierarchy=2/10/100/500';
`;

const outputIndex = process.argv.indexOf("--output");
if (process.argv.includes("--summary")) {
  process.stdout.write(`${JSON.stringify({ courses: courses.length, modules: modules.length, lessons: lessons.length, exercises: exercises.length, mode: "update-only-plan" }, null, 2)}\n`);
} else if (outputIndex !== -1 && process.argv[outputIndex + 1]) {
  writeFileSync(resolve(process.argv[outputIndex + 1]), plan, { encoding: "utf8" });
} else {
  process.stdout.write(plan);
}
