"use client";

import { useState } from "react";
import type { Exercise, ExerciseAttempt, Submission, SubmissionReview } from "../lib/types";

const kindLabel = {
  text_response: "Text response",
  scratch_project: "Scratch project",
  python_code: "Python code",
  javascript_code: "JavaScript code"
} as const;

export default function ExerciseCard({ exercise, submission, attempts, reviews }: { exercise: Exercise; submission?: Submission; attempts: ExerciseAttempt[]; reviews: SubmissionReview[] }) {
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
  const requiresRunner = exercise.kind !== "text_response" && isAutomatic;
  const latestReview = reviews[0];
  return <article className="exercise stack"><div className="row"><div><div className="eyebrow">AUFGABE {exercise.position} · {kindLabel[exercise.kind]}</div><h2>{exercise.title}</h2></div><span className={`status ${status}`}>{isAutomatic ? "Automatischer Check" : "Teacher Review"} · {status}</span></div><p className="muted">{exercise.description}</p>{exercise.starter_code && <pre>{exercise.starter_code}</pre>}<textarea className="input" rows={7} value={answer} onChange={(event) => setAnswer(event.target.value)} placeholder={exercise.kind === "scratch_project" ? "Füge einen Projekt-Link oder eine Beschreibung ein" : exercise.kind === "text_response" ? "Schreibe deine Antwort hier" : "Füge deinen Code hier ein"} disabled={status === "passed"} />{requiresRunner && <p className="muted">Code- und Scratch-Ausführung wird nicht simuliert. Ohne konfigurierten trusted runner bleibt der automatische Check offen.</p>}{message && <p className={status === "rejected" || message.includes("not match") || message.includes("not configured") || message.includes("unavailable") ? "error" : "success"}>{message}</p>}{latestReview?.feedback && <div className="card"><strong>Teacher feedback</strong><p>{latestReview.feedback}</p><small>{new Date(latestReview.reviewed_at).toLocaleString()}</small></div>}<div className="row">{isAutomatic ? <button className="button" disabled={loading || status === "passed"} onClick={() => send("check")}>{loading ? "Prüft…" : "✓ Check"}</button> : <button className="button" disabled={loading || status === "passed"} onClick={() => send("submit")}>{loading ? "Sendet…" : "Zur Prüfung einreichen"}</button>}{submission?.checked_at && <small>Geprüft {new Date(submission.checked_at).toLocaleString()}</small>}</div>{attempts.length > 0 && <div><strong>Attempt history</strong><div className="lesson-list">{attempts.slice(0, 5).map((attempt) => <div className="lesson" key={attempt.id}><span className={`status ${attempt.outcome}`}>{attempt.outcome}</span><span>{attempt.message}</span><small>{new Date(attempt.created_at).toLocaleString()}</small></div>)}</div></div>}</article>;
}
