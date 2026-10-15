# CodeLab LMS v0.2

Functional Next.js UI prototype for a hybrid self-paced / teacher-led coding learning platform.

## Start
1. Install Node.js 20+.
2. `npm install`
3. `npm run dev`
4. Open http://localhost:3000

Use the sidebar to switch **Lernbereich**, **Teacher LMS**, and **Administration**. Complete or submit a demo lesson from the student portal and then open **Teacher LMS** to see the activity and timestamp. Data persists in browser localStorage and is demo-only.

## SQL preparation
`supabase/schema.sql` defines PostgreSQL schema, relations and read-only RLS policies. It does **not** connect this prototype to a live database. Do not execute the migration on an existing production database without review: it creates enums and functions.

## Next Codex milestone
Implement Supabase Auth (no demo actor switch in production), database-backed read/write APIs, authorization and tests. See `PROJECT_SPEC.md`.

## Updated exercise checking model
See `PROJECT_SPEC.md` for automatic Check vs teacher approval and `supabase/review_modes_migration.sql` for the supplementary schema. These are requirements and a SQL migration, not yet functional validators or teacher approval APIs.
