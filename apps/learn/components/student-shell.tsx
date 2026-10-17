import Link from "next/link";
import { signOut } from "../app/logout/actions";

export default function StudentShell({ children, email, fullName, courseTitle, backHref = "/dashboard" }: { children: React.ReactNode; email: string; fullName?: string | null; courseTitle?: string; backHref?: string }) {
  const displayName = fullName?.trim() || email.split("@")[0] || "Lernende:r";
  const initials = displayName.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase();
  return <div className="student-shell">
    <header className="student-topbar">
      <div className="student-topbar-start">{courseTitle ? <Link className="course-back" href={backHref}><span aria-hidden="true">←</span> Zur Übersicht</Link> : <Link className="student-brand" href="/dashboard"><span className="logo">&lt;/&gt;</span><span>TANISTEN <b>EDU</b></span></Link>}</div>
      {courseTitle && <strong className="student-course-title">{courseTitle}</strong>}
      <details className="user-menu"><summary aria-label="Kontomenü öffnen"><span className="avatar">{initials}</span><span className="user-menu-name">{displayName}</span></summary><div className="user-menu-popover"><strong>{displayName}</strong><small>{email}</small><Link href="/dashboard">Meine Kurse</Link><form action={signOut}><button type="submit">Abmelden</button></form></div></details>
    </header>
    <main className={`student-main${courseTitle ? " student-course-main" : ""}`}>{children}</main>
  </div>;
}
