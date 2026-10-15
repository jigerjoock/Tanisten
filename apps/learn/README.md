# Tanisten Learn

Independent Next.js LMS for `learn.tanisten.com`. It does not share runtime, dependencies, or deployment configuration with the root Vite website.

## Local setup

1. Copy `.dev.vars.example` to `.dev.vars` and set the Supabase project URL and publishable key.
2. Run `npm install` in this directory.
3. Apply `supabase/migrations/202610150001_lms.sql` in the Supabase SQL editor or with the Supabase CLI.
4. Set teacher/admin roles manually in `public.profiles` after a user first signs in.
5. Run `npm run dev`.

## Exercise modes

- `automatic` evaluates `check_config` conditions (`min_length`, `contains`, `equals`) on `Check`, records every attempt, and marks a matching submission `passed`.
- `teacher` creates a `submitted` record when the learner marks work complete; `/teacher` lets staff approve (`passed`) or reject it with feedback.

## CodeLab v0.2 archive

The archive was not present in this repository when this scaffold was created. Place/extract its supplied components or assets under `components/codelab/` and integrate them into the course/exercise route; preserve the Supabase APIs and data contracts above. No archive-derived files are included yet.

## Cloudflare Workers

`wrangler.jsonc` only defines a Worker; it does not configure a DNS route or alter `tanisten.com`. After setting Cloudflare credentials, run `npm run deploy` from this directory. Bind `learn.tanisten.com` in Cloudflare only after explicit approval and DNS readiness.
