import Link from "next/link";

export default function HomePage() {
  return <section className="hero"><div><div className="eyebrow">CODELAB LMS v0.2</div><h1>Praktisch lernen. Klar prüfen.</h1><p>Tanisten Learn verbindet automatische Checks und von Lehrkräften geprüfte Aufgaben in einer Lernumgebung.</p><Link className="button" href="/dashboard">Lernbereich öffnen</Link></div><div className="heroart">&lt;/&gt;<span>Scratch · Python · JS</span></div></section>;
}
