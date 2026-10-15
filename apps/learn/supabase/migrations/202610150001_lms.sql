create type public.user_role as enum ('student', 'teacher', 'admin');
create type public.check_mode as enum ('automatic', 'teacher');
create type public.submission_status as enum ('draft', 'submitted', 'passed', 'rejected');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  role public.user_role not null default 'student',
  created_at timestamptz not null default now()
);
create table public.courses (
  id uuid primary key default gen_random_uuid(), slug text not null unique, title text not null, description text not null default '', published boolean not null default false, created_by uuid references public.profiles(id), created_at timestamptz not null default now()
);
create table public.course_memberships (
  course_id uuid not null references public.courses(id) on delete cascade, user_id uuid not null references public.profiles(id) on delete cascade, enrolled_at timestamptz not null default now(), primary key (course_id, user_id)
);
create table public.exercises (
  id uuid primary key default gen_random_uuid(), course_id uuid not null references public.courses(id) on delete cascade, title text not null, description text not null default '', check_mode public.check_mode not null, check_config jsonb not null default '{}'::jsonb, position integer not null default 0, created_at timestamptz not null default now(), unique(course_id, position)
);
create table public.submissions (
  id uuid primary key default gen_random_uuid(), exercise_id uuid not null references public.exercises(id) on delete cascade, student_id uuid not null references public.profiles(id) on delete cascade, answer text not null, status public.submission_status not null default 'draft', feedback text, checked_by uuid references public.profiles(id), checked_at timestamptz, created_at timestamptz not null default now(), updated_at timestamptz not null default now(), unique(exercise_id, student_id)
);
create table public.exercise_attempts (
  id bigint generated always as identity primary key, exercise_id uuid not null references public.exercises(id) on delete cascade, student_id uuid not null references public.profiles(id) on delete cascade, answer text not null, outcome public.submission_status not null, message text, created_at timestamptz not null default now()
);

create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path = public as $$ begin insert into public.profiles (id, email, full_name) values (new.id, new.email, coalesce(new.raw_user_meta_data ->> 'full_name', '')); return new; end; $$;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();
create or replace function public.is_staff() returns boolean language sql stable security definer set search_path = public as $$ select exists (select 1 from public.profiles where id = auth.uid() and role in ('teacher', 'admin')); $$;
create or replace function public.is_course_member(course uuid) returns boolean language sql stable security definer set search_path = public as $$ select exists (select 1 from public.course_memberships where course_id = course and user_id = auth.uid()); $$;
create or replace function public.set_updated_at() returns trigger language plpgsql as $$ begin new.updated_at = now(); return new; end; $$;
create trigger submissions_updated_at before update on public.submissions for each row execute procedure public.set_updated_at();

alter table public.profiles enable row level security; alter table public.courses enable row level security; alter table public.course_memberships enable row level security; alter table public.exercises enable row level security; alter table public.submissions enable row level security; alter table public.exercise_attempts enable row level security;
create policy "profiles readable by self or staff" on public.profiles for select using (id = auth.uid() or public.is_staff());
create policy "staff manage profiles" on public.profiles for all using (public.is_staff()) with check (public.is_staff());
create policy "members read courses" on public.courses for select using (public.is_staff() or public.is_course_member(id));
create policy "staff manage courses" on public.courses for all using (public.is_staff()) with check (public.is_staff());
create policy "members read memberships" on public.course_memberships for select using (user_id = auth.uid() or public.is_staff());
create policy "staff manage memberships" on public.course_memberships for all using (public.is_staff()) with check (public.is_staff());
create policy "members read exercises" on public.exercises for select using (public.is_staff() or public.is_course_member(course_id));
create policy "staff manage exercises" on public.exercises for all using (public.is_staff()) with check (public.is_staff());
create policy "students read own submissions" on public.submissions for select using (student_id = auth.uid() or public.is_staff());
create policy "students create own submissions" on public.submissions for insert with check (student_id = auth.uid());
create policy "students update drafts" on public.submissions for update using (student_id = auth.uid() and status in ('draft', 'rejected')) with check (student_id = auth.uid());
create policy "staff review submissions" on public.submissions for update using (public.is_staff()) with check (public.is_staff());
create policy "students read own history" on public.exercise_attempts for select using (student_id = auth.uid() or public.is_staff());
create policy "students write own history" on public.exercise_attempts for insert with check (student_id = auth.uid());
