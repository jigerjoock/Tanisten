import ManagementShell from "../../components/management-shell";
import { requireRole } from "../../lib/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { role } = await requireRole(["admin"]);
  return <ManagementShell role={role}>{children}</ManagementShell>;
}
