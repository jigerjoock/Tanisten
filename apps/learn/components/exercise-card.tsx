"use client";
import { useState } from "react";
import type { Exercise, ExerciseAttempt, Submission, SubmissionReview } from "../lib/types";
import PythonWorkspace from "./python-workspace";
import ScratchWorkspace from "./scratch-workspace";

const kindLabel = { text_response: "Textantwort", scratch_project: "Scratch-Projekt", python_code: "Python-Code", javascript_code: "JavaScript-Code" } as const;
function textList(value: unknown): string[] { return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : []; }

export default function ExerciseCard(props: { exercise: Exercise; submission?: Submission; attempts: ExerciseAttempt[]; reviews: SubmissionReview[] }) {
  if (props.exercise.kind === "python_code") return <PythonWorkspace {...props} />;
  if (props.exercise.kind === "scratch_project") return <ScratchWorkspace {...props} />;
  return <OtherExerciseCard {...props} />;
}

function OtherExerciseCard({ exercise, submission, attempts, reviews }: { exercise: Exercise; submission?: Submission; attempts: ExerciseAttempt[]; reviews: SubmissionReview[] }) {
  const [answer, setAnswer] = useState(submission?.answer ?? "");
  const [status, setStatus] = useState(submission?.status ?? "draft");
  const [message, setMessage] = useState(submission?.feedback ?? "");
  const [loading, setLoading] = useState(false);
  const instructions = textList(exercise.content.instructions);
  const criteria = textList(exercise.content.success_criteria);
  const hints = textList(exercise.content.hints);
  const scratchBlocks = textList(exercise.content.scratch_blocks);
  const submissionFormat = typeof exercise.content.submission_format === "string" ? exercise.content.submission_format : null;
  const isAutomatic = exercise.check_mode === "automatic";
  const latestReview = reviews[0];
  async function send(intent: "check" | "submit") {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch(`/api/exercises/${exercise.id}`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ intent, answer }) });
      const data = await response.json() as { error?: string; status?: Submission["status"]; message?: string };
      if (!response.ok) throw new Error(data.error ?? "Die Abgabe konnte nicht gespeichert werden.");
      if (data.status) setStatus(data.status);
      setMessage(data.message ?? "Abgabe gespeichert.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Verbindungsfehler.");
    } finally { setLoading(false); }
  }
  return <article className="exercise stack">
    <div className="row"><div><div className="eyebrow">AUFGABE {exercise.position + 1} · {kindLabel[exercise.kind]}</div><h2>{exercise.title}</h2></div><span className={`status ${status}`}>{isAutomatic ? "Automatischer Check" : "Lehrkraft-Prüfung"} · {status}</span></div>
    <p className="muted">{exercise.description}</p>
    {instructions.length > 0 && <div><strong>Arbeitsauftrag</strong><ol>{instructions.map((item, i) => <li key={i}>{item}</li>)}</ol></div>}
    {criteria.length > 0 && <div><strong>Erfolgskriterien</strong><ul>{criteria.map((item, i) => <li key={i}>{item}</li>)}</ul></div>}
    {scratchBlocks.length > 0 && <div><strong>Geforderte Scratch-Blöcke</strong><ul>{scratchBlocks.map((item, i) => <li key={i}>{item}</li>)}</ul></div>}
    {hints.length > 0 && <div className="card"><strong>Hinweise</strong><ul>{hints.map((item, i) => <li key={i}>{item}</li>)}</ul></div>}
    {exercise.starter_code && <><strong>Starter-Code</strong><pre>{exercise.starter_code}</pre></>}
    {submissionFormat && <p className="muted"><strong>Abgabe:</strong> {submissionFormat}</p>}
    <textarea className="input" rows={7} value={answer} onChange={(event) => setAnswer(event.target.value)} placeholder={exercise.kind === "scratch_project" ? "Füge einen Projekt-Link oder eine Projektdokumentation ein" : "Füge deine Antwort hier ein"} disabled={status === "passed"} />
    {isAutomatic && exercise.kind !== "text_response" && <p className="muted">Code- und Scratch-Ausführung wird nicht simuliert. Ohne konfigurierten vertrauenswürdigen Runner bleibt die automatische Prüfung offen.</p>}
    {message && <p className={status === "rejected" ? "error" : "success"}>{message}</p>}
    {latestReview?.feedback && <div className="card"><strong>Feedback der Lehrkraft</strong><p>{latestReview.feedback}</p><small>{new Date(latestReview.reviewed_at).toLocaleString("de-DE")}</small></div>}
    <div className="row"><button className="button" disabled={loading || status === "passed" || status === "submitted"} onClick={() => send(isAutomatic ? "check" : "submit")}>{loading ? "Wird gesendet …" : isAutomatic ? "✓ Prüfen" : "Zur Prüfung einreichen"}</button>{submission?.checked_at && <small>Geprüft {new Date(submission.checked_at).toLocaleString("de-DE")}</small>}</div>
    {attempts.length > 0 && <div><strong>Versuchsverlauf</strong><div className="lesson-list">{attempts.slice(0,5).map((attempt) => <div className="lesson" key={attempt.id}><span className={`status ${attempt.outcome}`}>{attempt.outcome}</span><span>{attempt.message}</span><small>{new Date(attempt.created_at).toLocaleString("de-DE")}</small></div>)}</div></div>}
  </article>;
}
