import { notFound } from "next/navigation";
import ExerciseFocusWorkspace from "../../../../../components/exercise-focus-workspace";
import { requireUser } from "../../../../../lib/auth";
import type { Exercise, ExerciseAttempt, Submission, SubmissionReview } from "../../../../../lib/types";

export default async function ExercisePage({ params }: { params: Promise<{ slug: string; exerciseId: string }> }) {
  const { slug, exerciseId } = await params;
  const { supabase, user } = await requireUser();
  const { data: course } = await supabase.from("courses").select("id").eq("slug", slug).maybeSingle();
  if (!course) notFound();
  const { data: exercise } = await supabase.from("exercises").select("id,lesson_id,title,description,check_mode,check_config,position,kind,content,starter_code").eq("id", exerciseId).eq("course_id", course.id).maybeSingle();
  if (!exercise) notFound();
  const [siblingsResult, submissionResult, attemptsResult] = await Promise.all([
    supabase.from("exercises").select("id,title,position").eq("lesson_id", exercise.lesson_id).order("position"),
    supabase.from("submissions").select("id,exercise_id,status,answer,feedback,checked_at,created_at,updated_at").eq("exercise_id", exercise.id).eq("student_id", user.id).maybeSingle(),
    supabase.from("exercise_attempts").select("id,exercise_id,outcome,message,created_at").eq("exercise_id", exercise.id).eq("student_id", user.id).order("created_at", { ascending: false }),
  ]);
  const siblings = siblingsResult.data ?? [];
  const siblingIds = siblings.map((item) => item.id);
  const { data: siblingSubmissions } = siblingIds.length ? await supabase.from("submissions").select("exercise_id,status").eq("student_id", user.id).in("exercise_id", siblingIds) : { data: [] };
  const submission = submissionResult.data as Submission | null;
  const { data: reviews } = submission ? await supabase.from("submission_reviews").select("id,submission_id,decision,feedback,reviewed_at").eq("submission_id", submission.id).order("reviewed_at", { ascending: false }) : { data: [] };
  const statusByExercise = new Map((siblingSubmissions ?? []).map((item) => [item.exercise_id, item.status]));
  return <ExerciseFocusWorkspace courseSlug={slug} exercise={exercise as Exercise} siblings={siblings.map((item) => ({ ...item, status: statusByExercise.get(item.id) }))} submission={submission ?? undefined} attempts={(attemptsResult.data ?? []) as ExerciseAttempt[]} reviews={(reviews ?? []) as SubmissionReview[]} />;
}
