import ManagementShell from "../../components/management-shell";
import { requireRole } from "../../lib/auth";

export default async function TeacherLayout({ children }: { children: React.ReactNode }) {
  const { role } = await requireRole(["teacher", "admin"]);
  return <ManagementShell role={role}>{children}</ManagementShell>;
}
