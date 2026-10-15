import { notFound } from "next/navigation";
import { requireUser } from "../../../lib/auth";
import ExerciseCard from "../../../components/exercise-card";
import type { Exercise, Submission } from "../../../lib/types";

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { supabase, user } = await requireUser();
  const { data: course } = await supabase.from("courses").select("id, title, description, exercises(*)").eq("slug", slug).single();
  if (!course) notFound();
  const { data: membership } = await supabase.from("course_memberships").select("id").eq("course_id", course.id).eq("user_id", user.id).maybeSingle();
  if (!membership) notFound();
  const exercises = ((course.exercises ?? []) as Exercise[]).sort((a, b) => a.position - b.position);
  const { data: submissions } = await supabase.from("submissions").select("*").eq("student_id", user.id).in("exercise_id", exercises.map((item) => item.id));
  const byExercise = new Map((submissions ?? []).map((item) => [item.exercise_id, item as Submission]));
  const automatic = exercises.filter((exercise) => exercise.check_mode === "automatic").length;
  return <section className="stack"><div className="pageheading"><div><div className="eyebrow">KURS / AUFGABEN</div><h1>{course.title}</h1><p className="muted">{course.description}</p></div><span className="pill">{exercises.length} Aufgaben</span></div><div className="workspace"><aside className="modules"><h3>{course.title} · Übersicht</h3><div className="stack"><div className="module">{automatic} automatische Checks</div><div className="module">{exercises.length - automatic} Teacher Reviews</div><p className="muted">Der Fortschritt wird erst nach erfolgreicher Prüfung abgeschlossen.</p></div></aside><article className="lessons"><div className="lesson-list">{exercises.map((exercise) => <ExerciseCard key={exercise.id} exercise={exercise} submission={byExercise.get(exercise.id)} />)}</div></article></div></section>;
}
