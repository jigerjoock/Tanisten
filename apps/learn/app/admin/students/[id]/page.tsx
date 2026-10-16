import { notFound } from "next/navigation";
import { requireRole } from "../../../../lib/auth";
import { closedLmsReady } from "../../../../lib/closed-lms";
import { assignCourse, revokeCourse, setStudentStatus } from "../actions";

export default async function StudentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { supabase } = await requireRole(["admin"]);
  if (!await closedLmsReady(supabase)) return <section className="panel"><h1>Migration 005 ausstehend</h1><p className="muted">Schülerdetails sind erst nach einem getesteten Schema-Rollout verfügbar.</p></section>;
  const [{ data: student }, { data: courses }, { data: memberships }, { data: submissions }] = await Promise.all([
    supabase.from("profiles").select("id,email,full_name,first_name,last_name,phone,admin_note,account_status,created_at").eq("id", id).eq("role", "student").maybeSingle(),
    supabase.from("courses").select("id,title,published").order("title"),
    supabase.from("course_memberships").select("course_id,course:courses(title)").eq("user_id", id),
    supabase.from("submissions").select("status").eq("student_id", id)
  ]);
  if (!student) notFound();
  const assigned = new Set((memberships ?? []).map((membership) => membership.course_id));
  const passed = (submissions ?? []).filter((submission) => submission.status === "passed").length;
  return <section className="stack"><div className="pageheading"><div><div className="eyebrow">SCHÜLERPROFIL</div><h1>{student.first_name || student.full_name || student.email} {student.last_name || ""}</h1><p className="muted">{student.email} · {student.account_status}</p></div></div><div className="grid"><div className="card"><strong>{passed}</strong><p className="muted">Bestandene Übungen</p></div><div className="card"><strong>{memberships?.length ?? 0}</strong><p className="muted">Kurszuweisungen</p></div></div><form action={setStudentStatus} className="row"><input type="hidden" name="studentId" value={id}/><select className="input" name="status" defaultValue={student.account_status}><option value="active">Aktiv</option><option value="disabled">Deaktivieren</option><option value="archived">Archivieren</option></select><button className="button danger">Status speichern</button></form><section className="panel"><h2>Zugewiesene Kurse</h2>{(memberships ?? []).map((membership) => <form action={revokeCourse} className="row" key={membership.course_id}><span>{membership.course?.[0]?.title ?? membership.course_id}</span><input type="hidden" name="studentId" value={id}/><input type="hidden" name="courseId" value={membership.course_id}/><button className="button secondary">Zugriff entziehen</button></form>)}<form action={assignCourse} className="row"><input type="hidden" name="studentId" value={id}/><select className="input" name="courseId" required defaultValue=""><option value="" disabled>Kurs auswählen</option>{(courses ?? []).filter((course) => !assigned.has(course.id)).map((course) => <option key={course.id} value={course.id}>{course.title}{course.published ? "" : " (unveröffentlicht)"}</option>)}</select><button className="button">Zuweisen</button></form></section></section>;
}
