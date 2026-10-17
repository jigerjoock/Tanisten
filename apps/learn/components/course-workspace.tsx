"use client";

import { useMemo, useState } from "react";
import type { CourseModule, Exercise, ExerciseAttempt, Lesson, Submission, SubmissionReview } from "../lib/types";
import ExerciseCard from "./exercise-card";
import "./course-workspace.css";

interface CourseWorkspaceProps {
  courseTitle: string;
  modules: CourseModule[];
  lessons: Lesson[];
  exercises: Exercise[];
  submissions: Submission[];
  attempts: ExerciseAttempt[];
  reviews: SubmissionReview[];
}

export default function CourseWorkspace({ courseTitle, modules, lessons, exercises, submissions, attempts, reviews }: CourseWorkspaceProps) {
  const sortedModules = useMemo(() => [...modules].sort((a, b) => a.position - b.position), [modules]);
  const sortedLessons = useMemo(() => [...lessons].sort((a, b) => a.position - b.position), [lessons]);
  const sortedExercises = useMemo(() => [...exercises].sort((a, b) => a.position - b.position), [exercises]);
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(sortedModules[0]?.id ?? null);
  const [selectedExerciseId, setSelectedExerciseId] = useState<string | null>(null);
  const submissionByExercise = useMemo(() => new Map(submissions.map((item) => [item.exercise_id, item])), [submissions]);
  const visibleLessons = sortedLessons.filter((lesson) => lesson.module_id === selectedModuleId);
  const moduleExercises = visibleLessons.flatMap((lesson) => sortedExercises.filter((exercise) => exercise.lesson_id === lesson.id));
  const selectedExercise = sortedExercises.find((exercise) => exercise.id === selectedExerciseId) ?? null;
  const selectedSubmission = selectedExercise ? submissionByExercise.get(selectedExercise.id) : undefined;
  const moduleIndex = sortedModules.findIndex((module) => module.id === selectedModuleId);
  const activeModule = sortedModules.find((module) => module.id === selectedModuleId);
  const activeExerciseIndex = moduleExercises.findIndex((exercise) => exercise.id === selectedExerciseId);

  function selectModule(moduleId: string) {
    setSelectedModuleId(moduleId);
    setSelectedExerciseId(null);
  }
  function openExercise(exerciseId: string) {
    setSelectedExerciseId(exerciseId);
  }
  function closeExercise() {
    setSelectedExerciseId(null);
  }
  function nextExercise() {
    if (activeExerciseIndex >= 0 && activeExerciseIndex < moduleExercises.length - 1) {
      setSelectedExerciseId(moduleExercises[activeExerciseIndex + 1].id);
    } else {
      closeExercise();
    }
  }
  function progressForModule(moduleId: string) {
    const moduleLessonIds = new Set(sortedLessons.filter((lesson) => lesson.module_id === moduleId).map((lesson) => lesson.id));
    const relevant = sortedExercises.filter((exercise) => moduleLessonIds.has(exercise.lesson_id));
    const passed = relevant.filter((exercise) => submissionByExercise.get(exercise.id)?.status === "passed").length;
    return { passed, total: relevant.length, percent: relevant.length ? Math.round((passed / relevant.length) * 100) : 0 };
  }

  return <section className="learning-path">
    <aside className="learning-path-sidebar" aria-label="Kursmodule">
      <div className="learning-path-course-card">
        <span className="learning-path-course-emoji" aria-hidden="true">{courseTitle.toLowerCase().includes("scratch") ? "🧩" : "🐍"}</span>
        <strong>{courseTitle}</strong>
        <small>{sortedModules.length} Module · {sortedExercises.length} Aufgaben</small>
      </div>
      <div className="learning-path-module-list">
        {sortedModules.map((module, index) => {
          const progress = progressForModule(module.id);
          return <button key={module.id} type="button" className={`learning-path-module ${selectedModuleId === module.id ? "is-selected" : ""}`} onClick={() => selectModule(module.id)} aria-current={selectedModuleId === module.id ? "step" : undefined}>
            <span className="learning-path-module-ring" style={{ background: `conic-gradient(#32bf67 ${progress.percent}%, #e7f5e8 ${progress.percent}%)` }}><span>{progress.percent === 100 && progress.total > 0 ? "✓" : index + 1}</span></span>
            <span className="learning-path-module-copy"><strong>{index + 1}. {module.title}</strong><small>{progress.passed}/{progress.total} abgeschlossen</small></span>
          </button>;
        })}
      </div>
    </aside>

    <div className="learning-path-main">
      {selectedExercise ? <>
        <div className="learning-path-header learning-path-exercise-header">
          <button type="button" className="learning-path-back" onClick={closeExercise}>← Zur Lernübersicht</button>
          <span className="learning-path-count">Aufgabe {activeExerciseIndex + 1} von {moduleExercises.length}</span>
        </div>
        <div className="learning-path-level-strip" aria-label="Aufgaben dieser Lerneinheit">
          {moduleExercises.map((exercise, i) => <button type="button" key={exercise.id} className={`learning-path-mini-level ${exercise.id === selectedExercise.id ? "is-active" : ""} ${submissionByExercise.get(exercise.id)?.status === "passed" ? "is-done" : ""}`} onClick={() => openExercise(exercise.id)} aria-label={`Aufgabe ${i + 1}: ${exercise.title}`} title={exercise.title}>{i + 1}</button>)}
        </div>
        <div className="learning-path-exercise-panel">
          <ExerciseCard key={selectedExercise.id} exercise={selectedExercise} submission={selectedSubmission} attempts={attempts.filter((attempt) => attempt.exercise_id === selectedExercise.id)} reviews={selectedSubmission ? reviews.filter((review) => review.submission_id === selectedSubmission.id) : []} />
        </div>
        <div className="learning-path-bottom-nav"><button type="button" className="button secondary" onClick={closeExercise}>← Alle Aufgaben</button><button type="button" className="button" onClick={nextExercise} disabled={activeExerciseIndex >= moduleExercises.length - 1}>Nächste Aufgabe →</button></div>
      </> : <>
        <div className="learning-path-header"><div><div className="eyebrow">DEIN LERNPFAD</div><h2>{moduleIndex + 1}. {activeModule?.title ?? "Noch keine Module"}</h2><p className="muted">Wähle eine Aufgabe aus. Dein Lernfortschritt wird darunter angezeigt.</p></div><span className="pill">{progressForModule(selectedModuleId ?? "").passed}/{progressForModule(selectedModuleId ?? "").total} erledigt</span></div>
        {visibleLessons.length ? visibleLessons.map((lesson, lessonIndex) => {
          const lessonExercises = sortedExercises.filter((exercise) => exercise.lesson_id === lesson.id);
          const completed = lessonExercises.filter((exercise) => submissionByExercise.get(exercise.id)?.status === "passed").length;
          return <section key={lesson.id} className="learning-path-lesson" aria-label={`Lektion ${lessonIndex + 1}`}>
            <div className="learning-path-lesson-heading"><div><div className="eyebrow">LEKTION {lessonIndex + 1}</div><h3>{lesson.title}</h3>{lesson.description && <p className="muted">{lesson.description}</p>}</div><small>{completed}/{lessonExercises.length} abgeschlossen</small></div>
            <div className="learning-path-levels">{lessonExercises.map((exercise, index) => {
              const state = submissionByExercise.get(exercise.id)?.status;
              const isDone = state === "passed";
              const inReview = state === "submitted";
              return <button key={exercise.id} type="button" className="learning-path-level" onClick={() => openExercise(exercise.id)} aria-label={`${exercise.title}, ${isDone ? "abgeschlossen" : inReview ? "in Überprüfung" : "offen"}`}>
                <span className={`learning-path-level-bubble ${isDone ? "is-done" : ""} ${inReview ? "is-review" : ""}`}><span>{index + 1}</span>{isDone && <span className="learning-path-level-check" aria-hidden="true">✓</span>}{inReview && <span className="learning-path-level-check is-review" aria-hidden="true">◷</span>}</span>
                <span className="learning-path-level-title">{exercise.title}</span>
              </button>;
            })}</div>
          </section>;
        }) : <div className="panel">Für dieses Modul sind noch keine Lektionen vorhanden.</div>}
      </>}
    </div>
  </section>;
}
