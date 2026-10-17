import PendingLink from "../../components/pending-link";
import { requireUser } from "../../lib/auth";

export default async function DashboardPage() {
  const { supabase, user } = await requireUser();
  const { data: memberships, error: membershipsError } = await supabase
    .from("course_memberships")
    .select("course:courses(id, slug, title, description)")
    .eq("user_id", user.id);

  console.log("[dashboard-debug]", {
    authUserId: user.id,
    membershipsCount: memberships?.length ?? 0,
    membershipsErrorCode: membershipsError?.code ?? null,
    membershipsErrorMessage: membershipsError?.message ?? null,
    memberships: memberships?.map((membership) => ({
      hasCourse: Boolean(membership.course),
    })),
  });

  if (membershipsError) {
    throw new Error(`Kurse konnten nicht geladen werden: ${membershipsError.message}`);
  }

  const courses = (memberships ?? []).flatMap((membership) => {
    const course = membership.course;
    return course ? (Array.isArray(course) ? course : [course]) : [];
  });
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
          <div className="eyebrow">DEIN LERNBEREICH</div>
          <h1>Weiter so! ✨</h1>
          <p>
            Entdecke neue Ideen. Programmiere. Lerne in deinem Tempo oder mit
            deiner Lehrkraft.
          </p>
          <span className="pill">{passed} Aufgaben abgeschlossen</span>
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
        <h2>Meine Kurse</h2>
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
                <span className="muted">{completed}/{courseExercises.length}</span>
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
