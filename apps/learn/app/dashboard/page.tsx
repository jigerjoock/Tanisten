import Link from "next/link";
import { requireUser } from "../../lib/auth";

export default async function DashboardPage() {
  const { supabase, user } = await requireUser();
  const { data: memberships } = await supabase.from("course_memberships").select("course:courses(id, slug, title, description)").eq("user_id", user.id);
  const courses = memberships?.flatMap((item) => item.course?.[0] ? [item.course[0]] : []) ?? [];
  return <section><section className="hero"><div><div className="eyebrow">DEIN LERNBEREICH</div><h1>Weiter so! ✨</h1><p>Entdecke neue Ideen. Programmiere. Lerne in deinem Tempo oder mit deiner Lehrkraft.</p><span className="pill">{courses.length} Kurse verfügbar</span></div><div className="heroart">&lt;/&gt;<span>Scratch · Python · JS</span></div></section><div className="heading"><h2>Meine Kurse</h2><span className="muted">Kurs wählen</span></div>{courses.length ? <div className="grid">{courses.map((course) => <Link className="course-card" key={course.id} href={`/courses/${course.slug}`}><span className="course-icon">{course.title[0]}</span><span><h2>{course.title}</h2><p className="muted">{course.description}</p></span><span className="muted">Öffnen ›</span><span className="progress"><span style={{ width: "0%" }} /></span></Link>)}</div> : <div className="panel"><h2>Noch keine Kurse</h2><p className="muted">Eine Lehrkraft kann dich über die Kurszuweisungen in Supabase einschreiben.</p></div>}</section>;
}
