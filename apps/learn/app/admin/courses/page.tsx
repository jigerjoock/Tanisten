import Link from "next/link";
import { requireRole } from "../../../lib/auth";
import { createCourse, createExercise, createLesson, createModule, setCoursePublished } from "./actions";

export default async function AdminCoursesPage() {
  const { supabase } = await requireRole(["admin"]);
  const { data: courses, error: coursesError } = await supabase
    .from("courses")
    .select("id, title, slug, description, published, course_teachers(teacher_id, teacher:profiles(full_name, email))")
    .order("created_at", { ascending: false });
  if (coursesError) throw new Error("Kurse konnten nicht geladen werden.");
  const { data: teachers } = await supabase.from("profiles").select("id, full_name, email").eq("role", "teacher").order("full_name");
  const { data: modules } = await supabase.from("course_modules").select("id, course_id, title").order("position");
  const { data: lessons } = await supabase.from("lessons").select("id, module_id, title").order("position");

  return <section className="stack">
    <div className="pageheading"><div><div className="eyebrow">ADMINISTRATION</div><h1>Kursverwaltung</h1><p className="muted">Erstelle Kurse, weise Lehrkräfte ausdrücklich zu und steuere die Veröffentlichung.</p></div><span className="pill">Nur Admins</span></div>
    <section className="panel"><h2>Kurs erstellen</h2><form action={createCourse} className="grid">
      <label>Titel<input className="input" name="title" required /></label><label>Slug (optional)<input className="input" name="slug" placeholder="python-einstieg" /></label>
      <label>Lehrkraft für den ganzen Kurs<select className="input" name="teacherId" defaultValue=""><option value="">Später zuweisen</option>{(teachers ?? []).map((teacher) => <option key={teacher.id} value={teacher.id}>{teacher.full_name || teacher.email}</option>)}</select><small>Diese explizite Admin-Zuweisung erlaubt die Prüfung aller eingeschriebenen Lernenden dieses Kurses.</small></label>
      <label style={{ gridColumn: "1 / -1" }}>Beschreibung<textarea className="input" name="description" rows={3} /></label><div><button className="button">Kurs erstellen</button></div>
    </form></section>
    <section className="panel"><h2>Inhaltsstruktur</h2><div className="grid">
      <form action={createModule} className="stack"><strong>Modul hinzufügen</strong><select className="input" name="courseId" required defaultValue=""><option value="" disabled>Kurs wählen</option>{(courses ?? []).map((course) => <option key={course.id} value={course.id}>{course.title}</option>)}</select><input className="input" name="title" placeholder="Modultitel" required /><button className="button">Modul hinzufügen</button></form>
      <form action={createLesson} className="stack"><strong>Lektion hinzufügen</strong><select className="input" name="moduleId" required defaultValue=""><option value="" disabled>Modul wählen</option>{(modules ?? []).map((module) => <option key={module.id} value={module.id}>{module.title}</option>)}</select><input className="input" name="title" placeholder="Lektionstitel" required /><textarea className="input" name="description" placeholder="Lektionsbeschreibung" rows={2} /><button className="button">Lektion hinzufügen</button></form>
      <form action={createExercise} className="stack"><strong>Aufgabe hinzufügen</strong><select className="input" name="lessonId" required defaultValue=""><option value="" disabled>Lektion wählen</option>{(lessons ?? []).map((lesson) => <option key={lesson.id} value={lesson.id}>{lesson.title}</option>)}</select><input className="input" name="title" placeholder="Aufgabentitel" required /><select className="input" name="kind" defaultValue="text_response"><option value="text_response">Textantwort</option><option value="scratch_project">Scratch-Projekt</option><option value="python_code">Python-Code</option><option value="javascript_code">JavaScript-Code</option></select><select className="input" name="checkMode" defaultValue="teacher"><option value="teacher">Prüfung durch Lehrkraft</option><option value="automatic">Automatische Prüfung</option></select><input className="input" name="expectedAnswer" placeholder="Exakte Antwort (nur für automatischen Text-Check)" /><textarea className="input" name="starterCode" placeholder="Starter-Code (optional)" rows={2} /><textarea className="input" name="description" placeholder="Aufgabenbeschreibung" rows={2} /><button className="button">Aufgabe hinzufügen</button></form>
    </div></section>
    <section className="panel"><h2>Kurse</h2><div className="lesson-list">{(courses ?? []).map((course) => {
      const assignments = course.course_teachers ?? [];
      const courseModules = (modules ?? []).filter((module) => module.course_id === course.id);
      return <article className="lesson" key={course.id}><div className="row"><div><Link href={`/courses/${course.slug}`}><strong>{course.title}</strong></Link><p className="muted">/{course.slug} · {course.description}</p><small>Kursweite Lehrkraft: {assignments.length ? assignments.map((assignment) => assignment.teacher?.[0]?.full_name || assignment.teacher?.[0]?.email).join(", ") : "Nicht zugewiesen"}</small><small>Module: {courseModules.map((module) => module.title).join(", ") || "Keine"}</small></div><form action={setCoursePublished}><input type="hidden" name="courseId" value={course.id} /><input type="hidden" name="published" value={String(!course.published)} /><button className="button secondary">{course.published ? "Veröffentlichung aufheben" : "Veröffentlichen"}</button></form></div></article>;
    })}</div></section>
  </section>;
}
