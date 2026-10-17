import type { Metadata } from "next";
import Link from "next/link";
import PendingLink from "../components/pending-link";
import { signOut } from "./logout/actions";
import { getCurrentProfile, getServerAuthContext } from "../lib/auth";
import type { UserRole } from "../lib/types";
import "./globals.css";

export const metadata: Metadata = { title: "Tanisten Learn", description: "Geschlossene Lernplattform" };

function Navigation({ authenticated, role, profileError }: { authenticated: boolean; role: UserRole | null; profileError: string | null }) {
  const isAdmin = role === "admin";
  const isStaff = role === "teacher" || isAdmin;
  return <aside className="sidebar">
    <Link className="brand" href="/"><span className="logo">&lt;/&gt;</span><span>CodeLab <em>LMS</em></span></Link>
    {profileError ? <><p className="error">Profilzugriff fehlgeschlagen</p><p className="muted">{profileError}</p><form action={signOut}><button className="nav" type="submit">Abmelden</button></form></> : authenticated ? <>
      <p className="mini">LERNEN</p><PendingLink className="nav" href="/dashboard">Lernbereich</PendingLink><PendingLink className="nav" href="/dashboard">Meine Kurse</PendingLink>
      {isStaff && <><p className="mini spacing">LEHRKRAFT</p><PendingLink className="nav" href="/teacher">Einreichungen</PendingLink></>}
      {isAdmin && <><p className="mini spacing">ADMINISTRATION</p><PendingLink className="nav" href="/admin/students">Schülerverwaltung</PendingLink><PendingLink className="nav" href="/admin/teachers">Lehrerverwaltung</PendingLink><PendingLink className="nav" href="/admin/courses">Kursverwaltung</PendingLink></>}
      <form action={signOut}><button className="nav" type="submit">Abmelden</button></form>
    </> : <><p className="mini">LERNEN</p><Link className="nav" href="/login">Anmelden</Link></>}
    <div className="sidefoot">CodeLab LMS v0.2<br /><small>Tanisten Learn · Supabase</small></div>
  </aside>;
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { supabase, user } = await getServerAuthContext();
  let role: UserRole | null = null;
  let profileError: string | null = null;

  if (user) {
    try {
      role = (await getCurrentProfile(supabase, user)).role;
    } catch (error) {
      profileError = error instanceof Error ? error.message : "Das Profil konnte nicht geprüft werden.";
    }
  }

  const avatar = role === "admin" ? "AD" : role === "teacher" ? "TL" : role === "student" ? "ST" : "!";
  return <html lang="de"><body><div className="shell"><Navigation authenticated={Boolean(user)} role={role} profileError={profileError} /><div className="area"><header className="top"><div><span className="muted">CodeLab / </span><b>Tanisten Learn</b></div><div className="topright"><span className="pill"><span className="dot" />{profileError ? "Profilfehler" : user ? "Angemeldet" : "Offline"}</span>{user && <span className="avatar">{avatar}</span>}</div></header><main className="lms-main">{profileError ? <section className="panel"><h1>Profil konnte nicht geladen werden</h1><p className="error">{profileError}</p><p className="muted">Melde dich ab und wieder an. Wenn der Fehler bleibt, prüfe mit aktivem <code>LEARN_AUTH_DEBUG</code> die Server-Logs auf übereinstimmende Benutzer- und Profil-ID.</p></section> : children}</main></div></div></body></html>;
}
