-- Review-mode schema extension for CodeLab. Apply after schema.sql on a new database.
-- This migration models the workflows only; it DOES NOT implement secure write APIs / execution.
create type public.review_mode as enum ('automatic', 'teacher');
create type public.exercise_status as enum ('not_started','in_progress','pending_review','changes_requested','completed');
create type public.review_decision as enum ('approved','changes_requested');

alter table public.assignments add column review_mode public.review_mode not null default 'automatic';
alter table public.assignments add column validation_spec jsonb not null default '{}'::jsonb;
alter table public.assignments add column required boolean not null default true;

create table public.exercise_progress (
 student_id uuid not null references public.profiles(id) on delete cascade,
 assignment_id uuid not null references public.assignments(id) on delete cascade,
 status public.exercise_status not null default 'not_started',
 started_at timestamptz,
 submitted_at timestamptz,
 completed_at timestamptz,
 last_checked_at timestamptz,
 attempt_count integer not null default 0 check(attempt_count >= 0),
 updated_at timestamptz not null default now(),
 primary key(student_id, assignment_id)
);
create table public.validation_attempts (
 id uuid primary key default gen_random_uuid(),
 student_id uuid not null references public.profiles(id) on delete cascade,
 assignment_id uuid not null references public.assignments(id) on delete cascade,
 submission_id uuid references public.submissions(id),
 passed boolean not null,
 details jsonb not null default '{}'::jsonb,
 checked_at timestamptz not null default now()
);
create table public.submission_reviews (
 id uuid primary key default gen_random_uuid(),
 submission_id uuid not null references public.submissions(id) on delete cascade,
 reviewer_id uuid not null references public.profiles(id),
 decision public.review_decision not null,
 feedback text,
 reviewed_at timestamptz not null default now()
);
create index on public.exercise_progress(assignment_id,status);
create index on public.exercise_progress(student_id,updated_at desc);
create index on public.validation_attempts(student_id,checked_at desc);
create index on public.submission_reviews(submission_id,reviewed_at desc);
alter table public.exercise_progress enable row level security;
alter table public.validation_attempts enable row level security;
alter table public.submission_reviews enable row level security;
create policy exercise_progress_select on public.exercise_progress for select to authenticated using (public.can_view_student(student_id));
create policy validation_attempts_select on public.validation_attempts for select to authenticated using (public.can_view_student(student_id));
create policy submission_reviews_select on public.submission_reviews for select to authenticated using (
 exists (select 1 from public.submissions s where s.id=submission_id and public.can_view_student(s.student_id))
);
-- No client writes allowed. Implement writes with verified server-side role + group + enrollment checks.
