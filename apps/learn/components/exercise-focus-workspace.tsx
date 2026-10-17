"use client";

import Link from "next/link";
import { useMemo } from "react";
import type { Exercise, ExerciseAttempt, Submission, SubmissionReview } from "../lib/types";
import ExerciseCard from "./exercise-card";
import "./course-workspace.css";

export default function ExerciseFocusWorkspace({ courseSlug, exercise, siblings, submission, attempts, reviews }: { courseSlug: string; exercise: Exercise; siblings: Array<Pick<Exercise, "id" | "title" | "position"> & { status?: Submission["status"] }>; submission?: Submission; attempts: ExerciseAttempt[]; reviews: SubmissionReview[] }) {
  const sortedSiblings = useMemo(() => [...siblings].sort((left, right) => left.position - right.position), [siblings]);
  const currentIndex = sortedSiblings.findIndex((item) => item.id === exercise.id);
  const previous = sortedSiblings[currentIndex - 1];
  const next = sortedSiblings[currentIndex + 1];
  const hrefFor = (id: string) => `/courses/${courseSlug}/exercises/${id}`;

  return <section className="exercise-focus">
    <div className="exercise-focus-header"><Link className="course-back" href={`/courses/${courseSlug}`}>← Zur Kursübersicht</Link><span className={`status ${submission?.status ?? "draft"}`}>{submission?.status === "passed" ? "Erledigt" : submission?.status === "submitted" ? "In Prüfung" : submission?.status === "rejected" ? "Überarbeiten" : "Offen"}</span></div>
    <nav className="exercise-navigator" aria-label="Aufgaben dieser Lektion">{sortedSiblings.map((item, index) => <Link key={item.id} href={hrefFor(item.id)} className={`exercise-nav-node ${item.id === exercise.id ? "is-active" : ""} ${item.status === "passed" ? "is-done" : item.status === "submitted" ? "is-review" : ""}`} aria-current={item.id === exercise.id ? "step" : undefined} aria-label={`Aufgabe ${index + 1}: ${item.title}`}>{item.status === "passed" ? "✓" : index + 1}</Link>)}</nav>
    <div className="exercise-focus-content"><ExerciseCard exercise={exercise} submission={submission} attempts={attempts} reviews={reviews} /></div>
    <footer className="exercise-focus-footer">{previous ? <Link className="button secondary" href={hrefFor(previous.id)}>← Vorherige Aufgabe</Link> : <span />}{next ? <Link className="button" href={hrefFor(next.id)}>Nächste Aufgabe →</Link> : <Link className="button" href={`/courses/${courseSlug}`}>Zur Kursübersicht</Link>}</footer>
  </section>;
}
