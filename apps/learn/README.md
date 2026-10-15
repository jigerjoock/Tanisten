# Tanisten Learn

Independent Next.js LMS for `learn.tanisten.com`. It does not share runtime, dependencies, or deployment configuration with the root Vite website.

## Local setup

1. Copy `.dev.vars.example` to `.dev.vars` and set the Supabase project URL and publishable key.
2. Run `npm install` in this directory.
3. Apply `supabase/migrations/202610150001_lms.sql` in the Supabase SQL editor or with the Supabase CLI.
4. Set teacher/admin roles manually in `public.profiles` after a user first signs in.
5. Run `npm run dev`.

## Exercise modes

- `automatic` fails closed. A `text_response` can pass only when `check_config` declares `version: "1"`, `executor: "text_exact"`, and a non-empty `expected_answer`, then the trimmed answer matches exactly. Scratch, Python and JavaScript store an extensible exercise schema but stay incomplete until a trusted verifier/runner is deployed; the UI never claims to execute code locally.
- `teacher` creates a `submitted` record when the learner marks work complete; `/teacher` lets staff approve (`passed`) or reject it with feedback.

Teacher access is group-scoped by default. A direct `course_teachers` assignment reaches every enrolled student only when an admin explicitly sets `grants_course_wide_access`; the admin UI makes that scope explicit.

## CodeLab v0.2 archive

The archive was not present in this repository when this scaffold was created. Place/extract its supplied components or assets under `components/codelab/` and integrate them into the course/exercise route; preserve the Supabase APIs and data contracts above. No archive-derived files are included yet.

## Cloudflare Workers

`wrangler.jsonc` only defines a Worker; it does not configure a DNS route or alter `tanisten.com`. After setting Cloudflare credentials, run `npm run deploy` from this directory. Bind `learn.tanisten.com` in Cloudflare only after explicit approval and DNS readiness.

## Security tests

Run `npm test` for fast route/migration security contracts. `npm run test:rls` runs the pgTAP permission suite against a started local Supabase stack; it verifies direct learner writes are denied, unassigned teachers cannot access or approve work, and assigned teachers can review. Start the local stack first with `supabase start`.
