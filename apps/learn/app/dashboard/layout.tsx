export const metadata = {
  title: "Lernbereich | Tanisten Edu",
  description: "Dein Lernbereich in Tanisten Edu"
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { supabase, user } = await requireUser();
  const profile = await getCurrentProfile(supabase, user);
  if (profile.role === "student") return <StudentShell email={user.email ?? ""} fullName={user.user_metadata.full_name}>{children}</StudentShell>;
  return <ManagementShell role={profile.role}>{children}</ManagementShell>;
}
import ManagementShell from "../../components/management-shell";
import StudentShell from "../../components/student-shell";
import { getCurrentProfile, requireUser } from "../../lib/auth";
