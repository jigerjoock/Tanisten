import { notFound } from "next/navigation";
import { requireUser } from "../../../lib/auth";
import CourseWorkspace from "../../../components/course-workspace";
import type { CourseModule, Exercise, ExerciseAttempt, Lesson, Submission, SubmissionReview } from "../../../lib/types";

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { supabase, user } = await requireUser();
  const { data: course } = await supabase.from("courses").select("id, title, description").eq("slug", slug).single();
  if (!course) notFound();
  const { data: membership } = await supabase.from("course_memberships").select("id").eq("course_id", course.id).eq("user_id", user.id).maybeSingle();
  if (!membership) notFound();
  const { data: modulesData } = await supabase.from("course_modules").select("id, title, position").eq("course_id", course.id).order("position");
  const modules = (modulesData ?? []) as CourseModule[];
  const moduleIds = modules.map((module) => module.id);
  const { data: lessonsData } = moduleIds.length ? await supabase.from("lessons").select("id, module_id, title, description, position").in("module_id", moduleIds).order("position") : { data: [] };
  const lessons = (lessonsData ?? []) as Lesson[];
  const { data: exercisesData } = await supabase.from("exercises").select("id, lesson_id, title, description, check_mode, check_config, position, kind, content, starter_code").eq("course_id", course.id).order("position");
  const exercises = (exercisesData ?? []) as Exercise[];
  const exerciseIds = exercises.map((exercise) => exercise.id);
  const { data: submissions } = exerciseIds.length ? await supabase.from("submissions").select("id, exercise_id, status, answer, feedback, checked_at, created_at, updated_at").eq("student_id", user.id).in("exercise_id", exerciseIds) : { data: [] };
  const submissionIds = (submissions ?? []).map((submission) => submission.id);
  const { data: attempts } = exerciseIds.length ? await supabase.from("exercise_attempts").select("id, exercise_id, outcome, message, created_at").eq("student_id", user.id).in("exercise_id", exerciseIds).order("created_at", { ascending: false }) : { data: [] };
  const { data: reviews } = submissionIds.length ? await supabase.from("submission_reviews").select("id, submission_id, decision, feedback, reviewed_at").in("submission_id", submissionIds).order("reviewed_at", { ascending: false }) : { data: [] };
  const automatic = exercises.filter((exercise) => exercise.check_mode === "automatic").length;
  return <section className="stack"><div className="pageheading"><div><div className="eyebrow">KURS / AUFGABEN</div><h1>{course.title}</h1><p className="muted">{course.description}</p></div><span className="pill">{exercises.length} Aufgaben</span></div><div className="grid"><div className="card"><strong>{automatic}</strong><p className="muted">automatische Checks</p></div><div className="card"><strong>{exercises.length - automatic}</strong><p className="muted">Teacher Reviews</p></div></div><CourseWorkspace courseTitle={course.title} modules={modules} lessons={lessons} exercises={exercises} submissions={(submissions ?? []) as Submission[]} attempts={(attempts ?? []) as ExerciseAttempt[]} reviews={(reviews ?? []) as SubmissionReview[]} /></section>;
}
