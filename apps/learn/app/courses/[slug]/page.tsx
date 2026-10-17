import { notFound } from "next/navigation";
import { getCurrentProfile, requireUser } from "../../../lib/auth";
import CourseWorkspace from "../../../components/course-workspace";
import type { CourseModule, Exercise, Lesson, Submission } from "../../../lib/types";

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { supabase, user } = await requireUser();
  const { data: course, error: courseError } = await supabase.from("courses").select("id, title, description, published").eq("slug", slug).single();
  if (courseError && courseError.code !== "PGRST116") throw new Error("Kurs konnte nicht geladen werden.");
  if (!course) notFound();
  const profile = await getCurrentProfile(supabase, user);
  const isStaff = profile.role === "admin" || profile.role === "teacher";
  if (!isStaff) {
    if (!course.published) notFound();
    const { data: membership, error: membershipError } = await supabase.from("course_memberships").select("course_id").eq("course_id", course.id).eq("user_id", user.id).maybeSingle();
    if (membershipError) throw new Error("Kurszuweisung konnte nicht geprüft werden.");
    if (!membership) notFound();
  }
  const { data: modulesData } = await supabase.from("course_modules").select("id, title, position").eq("course_id", course.id).order("position");
  const modules = (modulesData ?? []) as CourseModule[];
  const moduleIds = modules.map((module) => module.id);
  const { data: lessonsData } = moduleIds.length ? await supabase.from("lessons").select("id, module_id, title, description, position").in("module_id", moduleIds).order("position") : { data: [] };
  const lessons = (lessonsData ?? []) as Lesson[];
  const { data: exercisesData } = await supabase.from("exercises").select("id, lesson_id, title, description, check_mode, check_config, position, kind, content, starter_code").eq("course_id", course.id).order("position");
  const exercises = (exercisesData ?? []) as Exercise[];
  const exerciseIds = exercises.map((exercise) => exercise.id);
  const { data: submissions } = exerciseIds.length ? await supabase.from("submissions").select("id, exercise_id, status, answer, feedback, checked_at, created_at, updated_at").eq("student_id", user.id).in("exercise_id", exerciseIds) : { data: [] };
  return <section className="stack course-overview"><div className="pageheading"><div><div className="eyebrow">KURS / LERNPFAD</div><h1>{course.title}</h1><p className="muted">{course.description}</p></div><span className="pill">{exercises.length} Aufgaben</span></div><CourseWorkspace courseTitle={course.title} courseSlug={slug} modules={modules} lessons={lessons} exercises={exercises} submissions={(submissions ?? []) as Submission[]} /></section>;
}
