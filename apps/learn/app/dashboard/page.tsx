import PendingLink from "../../components/pending-link";
import { getCurrentProfile, requireUser } from "../../lib/auth";

type CourseSummary = { id: string; slug: string; title: string; description: string; published: boolean };

export default async function DashboardPage() {
  const { supabase, user } = await requireUser();
  const profile = await getCurrentProfile(supabase, user);
  let courses: CourseSummary[] = [];

  if (profile.role === "student") {
    const { data: memberships, error } = await supabase
      .from("course_memberships")
      .select("course:courses(id, slug, title, description, published)")
      .eq("user_id", user.id);
    if (error) throw new Error(`Kurse konnten nicht geladen werden: ${error.message}`);
    courses = (memberships ?? []).flatMap((membership) => {
      const course = membership.course;
      return course ? (Array.isArray(course) ? course : [course]) : [];
    }).filter((course): course is CourseSummary => course.published);
  } else {
    const { data, error } = await supabase.from("courses").select("id, slug, title, description, published").order("title");
    if (error) throw new Error(`Kurse konnten nicht geladen werden: ${error.message}`);
    courses = (data ?? []) as CourseSummary[];
  }
  const courseIds = courses.map((course) => course.id);
  const { data: exercises } = courseIds.length
    ? await supabase
        .from("exercises")
        .select("id, course_id")
        .in("course_id", courseIds)
    : { data: [] };
  const exerciseIds = (exercises ?? []).map((exercise) => exercise.id);
  const { data: submissions } = exerciseIds.length
    ? await supabase
        .from("submissions")
        .select("exercise_id, status")
        .eq("student_id", user.id)
        .in("exercise_id", exerciseIds)
    : { data: [] };
  const submissionByExercise = new Map(
    (submissions ?? []).map((submission) => [submission.exercise_id, submission.status]),
  );
  const passed = (submissions ?? []).filter(
    (submission) => submission.status === "passed",
  ).length;
  const awaitingReview = (submissions ?? []).filter(
    (submission) => submission.status === "submitted",
  ).length;

  return (
    <section>
      <section className="hero">
        <div>
          <div className="eyebrow">{profile.role === "student" ? "DEIN LERNBEREICH" : "KURSÜBERSICHT"}</div>
          <h1>{profile.role === "student" ? "Weiter so! ✨" : "Deine Kurse"}</h1>
          <p>
            Entdecke neue Ideen. Programmiere. Lerne in deinem Tempo oder mit
            deiner Lehrkraft.
          </p>
          <span className="pill">{profile.role === "student" ? `${passed} Aufgaben abgeschlossen` : `${courses.length} Kurse verwalten`}</span>
        </div>
        <div className="heroart">
          &lt;/&gt;<span>Scratch · Python · JS</span>
        </div>
      </section>

      <div className="grid" style={{ marginTop: 22 }}>
        <div className="card"><strong>{courses.length}</strong><p className="muted">Kurse</p></div>
        <div className="card"><strong>{passed}</strong><p className="muted">Abgeschlossen</p></div>
        <div className="card"><strong>{awaitingReview}</strong><p className="muted">In Überprüfung</p></div>
      </div>

      <div className="heading">
        <h2>{profile.role === "student" ? "Meine Kurse" : "Kurse"}</h2>
        <span className="muted">Kurs wählen</span>
      </div>
      {courses.length ? (
        <div className="grid">
          {courses.map((course) => {
            const courseExercises = (exercises ?? []).filter(
              (exercise) => exercise.course_id === course.id,
            );
            const completed = courseExercises.filter(
              (exercise) => submissionByExercise.get(exercise.id) === "passed",
            ).length;
            const progress = courseExercises.length
              ? Math.round((completed / courseExercises.length) * 100)
              : 0;

            return (
              <PendingLink className="course-card" key={course.id} href={`/courses/${course.slug}`}>
                <span className="course-icon">{course.title[0]}</span>
                <span>
                  <h2>{course.title}</h2>
                  <p className="muted">{course.description}</p>
                </span>
                <span className="muted">{profile.role === "student" ? `${completed}/${courseExercises.length}` : course.published ? "Veröffentlicht" : "Entwurf"}</span>
                <span className="progress"><span style={{ width: `${progress}%` }} /></span>
              </PendingLink>
            );
          })}
        </div>
      ) : (
        <div className="panel">
          <h2>Noch keine Kurse</h2>
          <p className="muted">Eine Lehrkraft kann dich über die Kurszuweisungen in Supabase einschreiben.</p>
        </div>
      )}
    </section>
  );
}
