import Link from "next/link";
import PendingLink from "./pending-link";
import { signOut } from "../app/logout/actions";
import type { UserRole } from "../lib/types";

export default function ManagementShell({ children, role }: { children: React.ReactNode; role: UserRole }) {
  const isAdmin = role === "admin";
  const isStaff = role === "teacher" || isAdmin;

  return <div className="shell management-shell">
    <aside className="sidebar" aria-label="Verwaltungsnavigation">
      <Link className="brand" href="/dashboard"><span className="logo">&lt;/&gt;</span><span className="brand-copy">TANISTEN EDU<small>CODE. CREATE. GROW.</small></span></Link>
      <p className="mini">LERNBEREICH</p>
      <PendingLink className="nav" href="/dashboard">Übersicht &amp; Meine Kurse</PendingLink>
      {isStaff && <><p className="mini spacing">LEHRKRAFT</p><PendingLink className="nav" href="/teacher">Einreichungen</PendingLink></>}
      {isAdmin && <><p className="mini spacing">ADMINISTRATION</p><PendingLink className="nav" href="/admin/students">Schülerverwaltung</PendingLink><PendingLink className="nav" href="/admin/teachers">Lehrerverwaltung</PendingLink><PendingLink className="nav" href="/admin/courses">Kursverwaltung</PendingLink></>}
      <form action={signOut}><button className="nav" type="submit">Abmelden</button></form>
      <div className="sidefoot">TANISTEN EDU<br /><small>Programmier-Lernplattform</small></div>
    </aside>
    <div className="area"><header className="top"><div className="top-brand">TANISTEN / <b>EDU</b></div><div className="topright"><span className="pill"><span className="dot" />{role === "admin" ? "Administration" : "Lehrbereich"}</span><span className="avatar">{role === "admin" ? "AD" : "TL"}</span></div></header><main className="lms-main">{children}</main></div>
  </div>;
}
