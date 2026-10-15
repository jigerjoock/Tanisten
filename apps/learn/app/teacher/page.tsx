import { requireRole } from "../../lib/auth";
import { reviewSubmission } from "./actions";

export default async function TeacherPage() {
  const { supabase } = await requireRole(["teacher", "admin"]);
  const { data: submissions } = await supabase.from("submissions").select("id, answer, created_at, exercise:exercises(title), student:profiles!submissions_student_id_fkey(full_name, email)").eq("status", "submitted").order("created_at", { ascending: true });
  return <section className="stack"><div><p className="brand">TEACHER DESK</p><h1>Pending reviews</h1></div>{submissions?.length ? submissions.map((submission) => { const exercise = submission.exercise?.[0]; const student = submission.student?.[0]; return <article className="card stack" key={submission.id}><div className="row"><h2>{exercise?.title}</h2><span className="badge">Awaiting review</span></div><p className="muted">{student?.full_name ?? student?.email}</p><pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>{submission.answer}</pre><form action={reviewSubmission} className="stack"><input type="hidden" name="submissionId" value={submission.id} /><label>Feedback<textarea className="input" name="feedback" rows={3} placeholder="Optional feedback for the learner" /></label><div className="row"><button className="button" name="decision" value="passed">Approve</button><button className="button danger" name="decision" value="rejected">Reject</button></div></form></article>; }) : <div className="card"><p className="muted">No submissions need review.</p></div>}</section>;
}
