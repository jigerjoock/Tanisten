import type { Metadata } from "next";
import Link from "next/link";
import { signOut } from "./logout/actions";
import { createClient } from "../lib/supabase/server";
import type { UserRole } from "../lib/types";
import "./globals.css";

export const metadata: Metadata = { title: "Tanisten Learn", description: "CodeLab learning platform" };

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  let role: UserRole | null = null;

  if (user) {
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
    role = (profile?.role as UserRole | undefined) ?? null;
  }

  const canReview = role === "teacher" || role === "admin";
  const isAdmin = role === "admin";

  return <html lang="de"><body><div className="shell"><aside className="sidebar"><Link className="brand" href="/"><span className="logo">&lt;/&gt;</span><span>CodeLab <em>LMS</em></span></Link><p className="mini">PLATFORM</p>{user ? <><Link className="nav active" href="/dashboard">Learning area</Link>{canReview && <Link className="nav" href="/teacher">Teacher LMS</Link>}{isAdmin && <Link className="nav" href="/admin/courses">Administration</Link>}<p className="mini spacing">COURSES</p><Link className="nav" href="/dashboard">My courses</Link><form action={signOut}><button className="nav" type="submit">Abmelden</button></form></> : <Link className="nav" href="/login">Anmelden</Link>}<div className="sidefoot">CodeLab LMS v0.2<br /><small>Tanisten Learn · Supabase</small></div></aside><div className="area"><header className="top"><div><span className="muted">CodeLab / </span><b>Tanisten Learn</b></div><div className="topright"><span className="pill"><span className="dot" />{user ? "Angemeldet" : "Offline"}</span>{user && <span className="avatar">{role === "admin" ? "AD" : role === "teacher" ? "TL" : "ST"}</span>}</div></header><main className="lms-main">{children}</main></div></div></body></html>;
}
