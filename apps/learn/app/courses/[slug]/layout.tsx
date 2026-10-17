import { notFound } from "next/navigation";
import StudentShell from "../../../components/student-shell";
import { getCurrentProfile, requireUser } from "../../../lib/auth";

export default async function CourseLayout({ children, params }: { children: React.ReactNode; params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { supabase, user } = await requireUser();
  const profile = await getCurrentProfile(supabase, user);
  const { data: course } = await supabase.from("courses").select("id,title,published").eq("slug", slug).maybeSingle();
  if (!course) notFound();
  if (profile.role === "student") {
    if (!course.published) notFound();
    const { data: membership } = await supabase.from("course_memberships").select("course_id").eq("course_id", course.id).eq("user_id", user.id).maybeSingle();
    if (!membership) notFound();
  }
  return <StudentShell email={user.email ?? ""} fullName={user.user_metadata.full_name} courseTitle={course.title}>{children}</StudentShell>;
}
