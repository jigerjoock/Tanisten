"use client";

import Link from "next/link";

export default function ScratchReviewFrame({ versionId }: { versionId: string }) {
  return <section className="scratch-review-frame stack">
    <div className="row"><Link className="button secondary" href="/teacher">← Zur Prüfwarteschlange</Link><span className="pill">Eingereichter Scratch-Snapshot</span></div>
    <iframe className="scratch-editor-frame" title="Eingereichtes Scratch-Projekt" src={`/scratch-editor/bridge?versionId=${encodeURIComponent(versionId)}`} sandbox="allow-scripts allow-same-origin allow-downloads" />
  </section>;
}
