"use client";

import { useEffect, useRef, useState } from "react";
import type { Exercise, ExerciseAttempt, Submission, SubmissionReview } from "../lib/types";
import PythonEditor from "./python-editor";
import "./python-workspace.css";

type RunnerMessage =
  | { type: "ready" }
  | { type: "output"; stream: "stdout" | "stderr"; text: string }
  | { type: "finished" }
  | { type: "failed"; message: string };

function items(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : [];
}

export default function PythonWorkspace({ exercise, submission, attempts, reviews }: {
  exercise: Exercise;
  submission?: Submission;
  attempts: ExerciseAttempt[];
  reviews: SubmissionReview[];
}) {
  const defaultCode = submission?.answer || exercise.starter_code || "# Schreibe dein Python-Programm hier\n";
  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState("");
  const [engineStatus, setEngineStatus] = useState<"idle" | "loading" | "running">("idle");
  const [submissionStatus, setSubmissionStatus] = useState(submission?.status ?? "draft");
  const [feedback, setFeedback] = useState(submission?.feedback ?? "");
  const [sending, setSending] = useState(false);
  const [hintOpen, setHintOpen] = useState(false);
  const [taskOpen, setTaskOpen] = useState(true);
  const worker = useRef<Worker | null>(null);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancelled = useRef(false);
  const skipDraftSaveForKey = useRef<string | null>(null);
  const instructions = items(exercise.content.instructions);
  const criteria = items(exercise.content.success_criteria);
  const hints = items(exercise.content.hints);
  const draftKey = `tanisten-edu:python-draft:${exercise.id}`;

  function clearTimer() {
    if (timeout.current !== null) { clearTimeout(timeout.current); timeout.current = null; }
  }
  function stopRunner(message?: string) {
    clearTimer();
    worker.current?.terminate();
    worker.current = null;
    setEngineStatus("idle");
    if (message) setOutput((previous) => `${previous}${previous ? "\n" : ""}${message}`);
  }
  useEffect(() => {
    cancelled.current = false;
    return () => {
      cancelled.current = true;
      if (timeout.current !== null) clearTimeout(timeout.current);
      worker.current?.terminate();
      worker.current = null;
    };
  }, []);

  useEffect(() => {
    skipDraftSaveForKey.current = draftKey;
    const savedDraft = window.sessionStorage.getItem(draftKey);
    setCode(savedDraft ?? defaultCode);
    setOutput("");
    setSubmissionStatus(submission?.status ?? "draft");
    setFeedback(submission?.feedback ?? "");
  }, [defaultCode, draftKey, submission?.feedback, submission?.status]);

  useEffect(() => {
    if (skipDraftSaveForKey.current === draftKey) {
      skipDraftSaveForKey.current = null;
      return;
    }
    window.sessionStorage.setItem(draftKey, code);
  }, [code, draftKey]);

  function run() {
    if (engineStatus !== "idle") return;
    setOutput("");
    setEngineStatus("loading");
    const instance = new Worker("/workers/python-runner.js");
    worker.current = instance;
    let loaded = false;
    timeout.current = setTimeout(() => stopRunner("Zeitüberschreitung: Python konnte nicht geladen werden. Prüfe die Internetverbindung."), 30000);
    instance.onmessage = (event: MessageEvent<RunnerMessage>) => {
      if (cancelled.current || worker.current !== instance) return;
      const message = event.data;
      if (message.type === "ready") {
        loaded = true;
        clearTimer();
        setEngineStatus("running");
        timeout.current = setTimeout(() => stopRunner("Ausführung nach 10 Sekunden gestoppt. Prüfe Endlosschleifen im Code."), 10000);
        instance.postMessage({ type: "run", code });
      } else if (message.type === "output") {
        setOutput((previous) => (previous + message.text + "\n").slice(-15000));
      } else if (message.type === "finished") {
        stopRunner();
        setOutput((previous) => previous.trim() || "Programm beendet (keine Ausgabe)." );
      } else if (message.type === "failed") {
        stopRunner(loaded ? `Python-Fehler:\n${message.message}` : `Python konnte nicht geladen werden:\n${message.message}`);
      }
    };
    instance.onerror = () => stopRunner("Python-Worker konnte nicht gestartet werden.");
  }

  async function submit() {
    if (sending || submissionStatus === "passed" || submissionStatus === "submitted") return;
    if (!code.trim()) { setFeedback("Bitte schreibe zunächst Python-Code."); return; }
    setSending(true);
    setFeedback("");
    try {
      const response = await fetch(`/api/exercises/${exercise.id}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ intent: "submit", answer: code })
      });
      const result = await response.json() as { status?: "draft" | "submitted" | "passed" | "rejected"; message?: string; error?: string };
      if (!response.ok) throw new Error(result.error || "Die Abgabe konnte nicht gespeichert werden.");
      setSubmissionStatus(result.status ?? "submitted");
      setFeedback(result.message ?? "Die Arbeit wurde eingereicht.");
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Verbindungsfehler beim Einreichen.");
    } finally { setSending(false); }
  }

  const runBusy = engineStatus !== "idle";
  function resetCode() { setCode(exercise.starter_code || "# Schreibe dein Python-Programm hier\n"); setOutput(""); }
  return <section className={`py-workspace ${taskOpen ? "" : "is-instructions-collapsed"}`} aria-label="Python-Arbeitsbereich">
    <div className="py-workspace-toolbar">
      <div className="py-workspace-file"><span aria-hidden="true">🐍</span> main.py</div>
      <div className="py-workspace-actions">
        {runBusy ? <button className="py-secondary" onClick={() => stopRunner("Ausführung angehalten.")}>■ Stopp</button> : null}
        <button className="py-run" disabled={runBusy} onClick={run}>{engineStatus === "loading" ? "Python lädt …" : engineStatus === "running" ? "Wird ausgeführt …" : "▶ Run"}</button>
        <button className="py-secondary" type="button" onClick={() => setOutput("")}>Ausgabe löschen</button>
        <button className="py-secondary" type="button" onClick={resetCode} disabled={submissionStatus === "passed"}>Code zurücksetzen</button>
      </div>
    </div>
    <div className="py-workspace-columns">
      <div className="py-workspace-editor-column">
        <label className="py-section-label" htmlFor={`python-code-${exercise.id}`}>DEIN CODE</label>
        <div className="py-code-editor" aria-label="Python-Code-Editor"><PythonEditor value={code} onChange={setCode} readOnly={submissionStatus === "passed"} /></div>
      </div>
      <aside className="py-workspace-task">
        <button className="py-edge-toggle" type="button" aria-expanded={taskOpen} aria-controls={`python-instructions-${exercise.id}`} onClick={() => setTaskOpen((open) => !open)}><span>{taskOpen ? "Anleitung schließen" : "Anleitung öffnen"}</span></button>
        <div id={`python-instructions-${exercise.id}`} className="py-instructions" hidden={!taskOpen}>
          <div className="py-task-head"><span>AUFGABE {exercise.position + 1} · PYTHON</span><span className={`status ${submissionStatus}`}>{submissionStatus === "passed" ? "Erledigt" : submissionStatus === "submitted" ? "In Prüfung" : submissionStatus === "rejected" ? "Überarbeiten" : "Offen"}</span></div>
          <h2>{exercise.title}</h2>
          <p>{exercise.description}</p>
          {instructions.length > 0 && <><h3>Arbeitsauftrag</h3><ol>{instructions.map((text, i) => <li key={i}>{text}</li>)}</ol></>}
          {criteria.length > 0 && <><h3>Erfolgskriterien</h3><ul>{criteria.map((text, i) => <li key={i}>{text}</li>)}</ul></>}
          {hints.length > 0 && <div className="py-hints"><button type="button" aria-expanded={hintOpen} onClick={() => setHintOpen((old) => !old)}>💡 Hinweise {hintOpen ? "▲" : "▼"}</button>{hintOpen && <ul>{hints.map((text, i) => <li key={i}>{text}</li>)}</ul>}</div>}
          <div className="py-review-note">Die Schaltfläche <strong>Run</strong> führt Python im Browser aus. Das ist <strong>keine automatische Bewertung</strong>. Die Arbeit wird von einer Lehrkraft geprüft.</div>
          {feedback && <p className="py-feedback" role="status">{feedback}</p>}
          {reviews[0]?.feedback && <div className="py-feedback"><strong>Rückmeldung der Lehrkraft</strong><p>{reviews[0].feedback}</p></div>}
          <button className="py-submit" onClick={submit} disabled={sending || submissionStatus === "submitted" || submissionStatus === "passed"}>{sending ? "Wird eingereicht …" : submissionStatus === "submitted" ? "Bereits eingereicht" : submissionStatus === "passed" ? "Abgeschlossen" : "Zur Prüfung einreichen"}</button>
          {attempts.length > 0 && <small>{attempts.length} bisherige Versuche gespeichert</small>}
        </div>
        <section className="py-output-assistant" aria-label="Python-Ausgabe"><div className="py-output-header"><strong>Konsole / Ausgabe</strong><span>{engineStatus === "running" ? "läuft" : engineStatus === "loading" ? "lädt" : "bereit"}</span></div><pre className="py-output" aria-live="polite">{output || "Klicke auf Run, um deinen Code auszuführen.\n"}</pre></section>
      </aside>
    </div>
  </section>;
}
