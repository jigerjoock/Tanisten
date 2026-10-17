"use client";

import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import type { Exercise, ExerciseAttempt, Submission, SubmissionReview } from "../lib/types";
import "./scratch-workspace.css";

type BridgeMessage =
  | { type: "tanisten-scratch:ready" }
  | { type: "tanisten-scratch:changed" }
  | { type: "tanisten-scratch:project"; requestId: string; bytes: ArrayBuffer }
  | { type: "tanisten-scratch:error"; message: string };

function textList(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function toolboxConfig(checkConfig: Record<string, unknown>) {
  const candidate = checkConfig.scratch_toolbox ?? checkConfig.toolbox;
  if (!candidate || typeof candidate !== "object" || Array.isArray(candidate)) return null;
  const config = candidate as Record<string, unknown>;
  const allowedCategories = textList(config.allowedCategories);
  const allowedBlockTypes = textList(config.allowedBlockTypes);
  return allowedCategories.length > 0 || allowedBlockTypes.length > 0 ? { allowedCategories, allowedBlockTypes } : null;
}

export default function ScratchWorkspace({ exercise, submission, reviews }: {
  exercise: Exercise;
  submission?: Submission;
  attempts: ExerciseAttempt[];
  reviews: SubmissionReview[];
}) {
  const frame = useRef<HTMLIFrameElement | null>(null);
  const requestAction = useRef<"draft" | "submit" | "check" | "download" | null>(null);
  const autosaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const restoringDraft = useRef(false);
  const [taskOpen, setTaskOpen] = useState(false);
  const [editorReady, setEditorReady] = useState(false);
  const [projectChanged, setProjectChanged] = useState(false);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [message, setMessage] = useState("Editor wird geladen …");
  const [status, setStatus] = useState(submission?.status ?? "draft");
  const instructions = textList(exercise.content.instructions);
  const criteria = textList(exercise.content.success_criteria);
  const hints = textList(exercise.content.hints);
  const configuredToolbox = toolboxConfig(exercise.check_config);
  const latestReview = reviews[0];

  const sendToBridge = useCallback((message: Record<string, unknown>, transfer?: Transferable[]) => {
    frame.current?.contentWindow?.postMessage(message, window.location.origin, transfer ?? []);
  }, []);

  const requestProject = useCallback((action: "draft" | "submit" | "check" | "download") => {
    if (!editorReady) return;
    requestAction.current = action;
    setSaveState(action === "download" ? "idle" : "saving");
    sendToBridge({ type: "tanisten-scratch:export", requestId: crypto.randomUUID() });
  }, [editorReady, sendToBridge]);

  const restoreDraft = useCallback(async () => {
    const response = await fetch(`/api/scratch/projects?exerciseId=${encodeURIComponent(exercise.id)}`, { cache: "no-store" });
    if (response.status === 404) {
      setMessage("Neues Scratch-Projekt bereit.");
      return;
    }
    if (!response.ok) {
      const result = await response.json() as { error?: string };
      setSaveState("error");
      setMessage(result.error ?? "Scratch-Entwurf konnte nicht wiederhergestellt werden.");
      return;
    }
    const bytes = await response.arrayBuffer();
    restoringDraft.current = true;
    sendToBridge({ type: "tanisten-scratch:import", bytes }, [bytes]);
    setMessage("Letzter Scratch-Entwurf wurde wiederhergestellt.");
  }, [exercise.id, sendToBridge]);

  const persistProject = useCallback(async (action: "draft" | "submit" | "check", bytes: ArrayBuffer) => {
    const body = new FormData();
    body.set("exerciseId", exercise.id);
    body.set("action", action);
    body.set("project", new File([bytes], "project.sb3", { type: "application/x.scratch.sb3" }));
    const response = await fetch("/api/scratch/projects", { method: "POST", body });
    const result = await response.json() as { error?: string; status?: "draft" | "submitted" | "passed" | "rejected"; message?: string };
    if (!response.ok) throw new Error(result.error ?? "Scratch-Projekt konnte nicht gespeichert werden.");
    setStatus(result.status ?? (action === "submit" ? "submitted" : action === "check" ? "draft" : "draft"));
    setProjectChanged(false);
    setSaveState("saved");
    setMessage(result.message ?? (action === "submit" ? "Snapshot zur Prüfung eingereicht." : action === "check" ? "Scratch-Struktur geprüft." : "Entwurf gespeichert."));
  }, [exercise.id]);

  useEffect(() => {
    const onMessage = (event: MessageEvent<BridgeMessage>) => {
      if (event.origin !== window.location.origin || event.source !== frame.current?.contentWindow) return;
      const data = event.data;
      if (data.type === "tanisten-scratch:ready") {
        setEditorReady(true);
        setMessage("Scratch-Editor bereit.");
        if (configuredToolbox) sendToBridge({ type: "tanisten-scratch:configure-toolbox", config: configuredToolbox });
        restoreDraft().catch(() => {
          setSaveState("error");
          setMessage("Scratch-Entwurf konnte nicht wiederhergestellt werden.");
        });
      }
      if (data.type === "tanisten-scratch:changed") {
        if (restoringDraft.current) {
          restoringDraft.current = false;
          return;
        }
        setProjectChanged(true);
        setSaveState("idle");
        if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
        autosaveTimer.current = setTimeout(() => requestProject("draft"), 12_000);
      }
      if (data.type === "tanisten-scratch:error") {
        setSaveState("error");
        setMessage(data.message);
      }
      if (data.type === "tanisten-scratch:project") {
        const action = requestAction.current;
        requestAction.current = null;
        if (!action) return;
        if (action === "download") {
          const url = URL.createObjectURL(new Blob([data.bytes], { type: "application/x.scratch.sb3" }));
          const link = document.createElement("a");
          link.href = url;
          link.download = "tanisten-edu-project.sb3";
          link.click();
          URL.revokeObjectURL(url);
          setMessage("Projekt wurde heruntergeladen.");
          return;
        }
        persistProject(action, data.bytes).catch((error: unknown) => {
          setSaveState("error");
          setMessage(error instanceof Error ? error.message : "Scratch-Projekt konnte nicht gespeichert werden.");
        });
      }
    };
    window.addEventListener("message", onMessage);
    return () => {
      window.removeEventListener("message", onMessage);
      if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
    };
  }, [configuredToolbox, persistProject, requestProject, restoreDraft, sendToBridge]);

  function importProject(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!file.name.toLowerCase().endsWith(".sb3") || file.size > 10 * 1024 * 1024) {
      setSaveState("error");
      setMessage("Bitte wähle ein gültiges Scratch-Projekt bis 10 MB.");
      return;
    }
    file.arrayBuffer().then((bytes) => sendToBridge({ type: "tanisten-scratch:import", bytes }, [bytes]));
  }

  return <section className={`scratch-workspace ${taskOpen ? "is-guide-open" : "is-guide-closed"}`} aria-label="Scratch-Arbeitsbereich">
    <header className="scratch-toolbar">
      <div><span className="scratch-file">Scratch 3</span><span className={`status ${status}`}>{status === "submitted" ? "In Prüfung" : status === "passed" ? "Erledigt" : "Entwurf"}</span></div>
      <div className="scratch-actions">
        <button type="button" className="button" disabled={!editorReady} onClick={() => sendToBridge({ type: "tanisten-scratch:green-flag" })}>▶ Start</button>
        <button type="button" className="button secondary" disabled={!editorReady} onClick={() => sendToBridge({ type: "tanisten-scratch:stop" })}>■ Stopp</button>
        <label className="button secondary">.sb3 importieren<input type="file" accept=".sb3,application/x.scratch.sb3" onChange={importProject} hidden /></label>
        <button type="button" className="button secondary" disabled={!editorReady} onClick={() => requestProject("download")}>Exportieren</button>
        <button type="button" className="button secondary" disabled={!editorReady || !projectChanged || status === "passed"} onClick={() => requestProject("draft")}>Speichern</button>
        {exercise.check_mode === "automatic"
          ? <button type="button" className="button" disabled={!editorReady || status === "passed"} onClick={() => requestProject("check")}>✓ Prüfen</button>
          : <button type="button" className="button" disabled={!editorReady || status === "submitted" || status === "passed"} onClick={() => requestProject("submit")}>Zur Prüfung einreichen</button>}
      </div>
    </header>
    <div className="scratch-body">
      <iframe ref={frame} className="scratch-editor-frame" title="Scratch 3 Editor" src="/vendor/scratch-gui/index.html" sandbox="allow-scripts allow-same-origin allow-downloads" />
      <aside className="scratch-guide" aria-label="Aufgabenanleitung">
        <button type="button" className="scratch-guide-toggle" aria-expanded={taskOpen} aria-controls={`scratch-guide-${exercise.id}`} onClick={() => setTaskOpen((open) => !open)}><span>{taskOpen ? "Anleitung schließen" : "Anleitung öffnen"}</span></button>
        <div id={`scratch-guide-${exercise.id}`} className="scratch-guide-content" hidden={!taskOpen}>
          <div className="eyebrow">AUFGABE {exercise.position + 1} · SCRATCH</div>
          <h2>{exercise.title}</h2><p>{exercise.description}</p>
          {instructions.length > 0 && <><h3>Arbeitsauftrag</h3><ol>{instructions.map((item, index) => <li key={index}>{item}</li>)}</ol></>}
          {criteria.length > 0 && <><h3>Erfolgskriterien</h3><ul>{criteria.map((item, index) => <li key={index}>{item}</li>)}</ul></>}
          {hints.length > 0 && <section className="scratch-hints"><strong>Hinweise</strong><ul>{hints.map((item, index) => <li key={index}>{item}</li>)}</ul></section>}
          {latestReview?.feedback && <section className="scratch-feedback"><strong>Feedback der Lehrkraft</strong><p>{latestReview.feedback}</p></section>}
          <p className={`scratch-save-status is-${saveState}`} role="status">{message}</p>
        </div>
      </aside>
    </div>
  </section>;
}
