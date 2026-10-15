"use client";

import { useState } from "react";
import type { Exercise, Submission } from "../lib/types";

export default function ExerciseCard({ exercise, submission }: { exercise: Exercise; submission?: Submission }) {
  const [answer, setAnswer] = useState(submission?.answer ?? "");
  const [status, setStatus] = useState(submission?.status ?? "draft");
  const [message, setMessage] = useState(submission?.feedback ?? "");
  const [loading, setLoading] = useState(false);
  async function send(intent: "check" | "submit") {
    setLoading(true); setMessage("");
    const response = await fetch(`/api/exercises/${exercise.id}`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ intent, answer }) });
    const data = await response.json(); setLoading(false);
    if (!response.ok) { setMessage(data.error ?? "Unable to save your work."); return; }
    setStatus(data.status); setMessage(data.message);
  }
  const isAutomatic = exercise.check_mode === "automatic";
  return <article className="exercise stack"><div className="row"><div><div className="eyebrow">AUFGABE {exercise.position}</div><h2>{exercise.title}</h2></div><span className={`status ${status}`}>{isAutomatic ? "Automatischer Check" : "Teacher Review"} · {status}</span></div><p className="muted">{exercise.description}</p><textarea className="input" rows={7} value={answer} onChange={(event) => setAnswer(event.target.value)} placeholder="Schreibe oder füge deine Lösung hier ein" disabled={status === "passed"} />{message && <p className={status === "rejected" || message.includes("must") || message.includes("does not") ? "error" : "success"}>{message}</p>}<div className="row">{isAutomatic ? <button className="button" disabled={loading || status === "passed"} onClick={() => send("check")}>{loading ? "Prüft…" : "✓ Check"}</button> : <button className="button" disabled={loading || status === "passed"} onClick={() => send("submit")}>{loading ? "Sendet…" : "Zur Prüfung einreichen"}</button>}{submission?.checked_at && <small>Geprüft {new Date(submission.checked_at).toLocaleDateString()}</small>}</div></article>;
}
