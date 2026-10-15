# CodeLab Learning Platform + LMS

## Exercise validation modes (critical product requirement)
The platform supports two **review modes per exercise** (not separate course delivery modes):
- `automatic`: student presses **Check**. The system executes trusted server-side or isolated-sandbox test conditions. When ALL required assertions pass, show green and mark the exercise `completed`, storing `completed_at` and validation details. On failure, show red, keep exercise unfinished, store attempt, and give actionable diagnostics without exposing hidden tests.
- `teacher`: student marks the exercise ready and presses **Submit for review** (a checkbox/submit action). Status becomes `pending_review` and appears in the teacher's review queue. Teacher checks the actual submission, then explicitly **Approve** (green, `completed`, reviewer + timestamp) or **Return for changes** (red, `changes_requested`, feedback). Student resubmits after fixes.
- `hybrid` means a single course can contain exercises of both kinds; one exercise has exactly one configured review mode, independently of whether the student attends classes.
- The browser is never trusted to claim test results or grant a pass. Scratch validation requires machine-readable project state/runtime instrumentation; Python/JS tests run in a properly isolated runner. Do not mark assignments completed from a simple UI checkbox.


## Personas / permissions
- Student: assigned/published courses, own progress, submissions, project workspace.
- Teacher: assigned groups, read student activities, review submissions.
- Admin: organizational roster, group/course management, teacher assignments.
- Organization-level boundaries: never expose another organization's students or data.

## Domain relationships
Organization 1:N Profiles, Groups, Courses. Group M:N Students, Group M:N Teachers. Course 1:N Modules 1:N Lessons 1:N Assignments. Student M:N Course through Enrollments. Student M:N Lesson through LessonProgress. Assignment 1:N Submissions. Student 1:N ActivityEvents.

## Progress semantics
Automatic: `not_started -> in_progress -> completed` on passing Check; failed Check remains `in_progress`.
Teacher review: `not_started -> in_progress -> pending_review -> completed`, or `pending_review -> changes_requested -> in_progress -> pending_review`. Approval is only by assigned teacher or authorized admin.
Exercise-level progress is authoritative; lesson completion is derived from all required exercises passing, rather than manually toggled. Preserve separate timestamps `started_at`, `submitted_at`, `completed_at`; do not infer elapsed learning time from them. For accurate active duration implement heartbeat intervals with idle detection in later releases.

## Security and data protection
RLS schema is **read-only by design** until server-side write endpoints and automated authorization tests exist. Never expose Supabase service-role credentials in the browser. Teacher privileges must only include assigned students; admin is bounded to the organization. Review parental consent, retention and GDPR requirements before enrolling minors. Never trust completion, grading or `student_id` provided by client.

## Delivery stages
1. v0.2: visual functional demo + localStorage progress, teacher list, RLS-enabled SQL schema (this archive).
2. v0.3: Supabase Auth, organization invitations, enrollment and write RPCs, enforce permissions end-to-end, server-backed progress and submission workflow.
3. v0.4: automatic Check validation runners for Python/JS and Scratch project verification, submission and test evidence storage.
4. v0.5: teacher review queue with approve/return and audit history, report export, content import/admin authoring, deployment and tests.

## Current limitations (important)
The app **does not** yet persist to Supabase. The actor switcher in the demo is not real authentication. Local records are reset by clearing browser storage and are not shared across devices. Lesson-completion buttons are a UI simulation, not verified student work. Editors, timetable, payments, messaging and real teacher permissions are not built.
