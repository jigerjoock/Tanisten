import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = { title: "Tanisten Learn", description: "CodeLab learning platform" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="de"><body><div className="shell"><aside className="sidebar"><Link className="brand" href="/"><span className="logo">&lt;/&gt;</span><span>CodeLab <em>LMS</em></span></Link><p className="mini">PLATTFORM</p><Link className="nav active" href="/dashboard">◉ Lernbereich</Link><Link className="nav" href="/teacher">◌ Teacher LMS</Link><p className="mini spacing">KURSE</p><Link className="nav" href="/dashboard">▣ Meine Kurse</Link><div className="sidefoot">CodeLab LMS v0.2<br /><small>Tanisten Learn · Supabase</small></div></aside><div className="area"><header className="top"><div><span className="muted">CodeLab / </span><b>Tanisten Learn</b></div><div className="topright"><span className="pill"><span className="dot" />Online</span><span className="avatar">TL</span></div></header><main className="lms-main">{children}</main></div></div></body></html>;
}
