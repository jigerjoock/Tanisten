import Link from "next/link";

export default function HomePage() {
  return <section className="hero"><div><div className="eyebrow">TANISTEN EDU</div><h1>Code mit Fokus.<br />Lernen mit System.</h1><p>Tanisten Edu verbindet praxisnahe Programmieraufgaben mit transparentem Feedback und Lernfortschritt.</p><Link className="button" href="/dashboard">Lernbereich öffnen</Link></div><div className="heroart">&lt;/&gt;<span>PYTHON · SCRATCH · JAVASCRIPT</span></div></section>;
}
