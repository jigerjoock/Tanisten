-- A course has many lessons, each with positions 1..5. The legacy course-wide
-- exercise position constraint prevents that valid structure.
alter table public.exercises drop constraint if exists exercises_course_id_position_key;
create unique index if not exists exercises_lesson_position_key on public.exercises(lesson_id, position);
