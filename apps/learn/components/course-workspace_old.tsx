"use client";

import { useMemo, useState } from "react";
import type { CourseModule, Exercise, ExerciseAttempt, Lesson, Submission, SubmissionReview } from "../lib/types";
import ExerciseCard from "./exercise-card";

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
  const firstLessonId = lessons[0]?.id ?? null;
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(firstLessonId);
  const submissionByExercise = useMemo(() => new Map(submissions.map((submission) => [submission.exercise_id, submission])), [submissions]);
  const selectedLesson = lessons.find((lesson) => lesson.id === selectedLessonId) ?? null;
  const selectedExercises = exercises.filter((exercise) => exercise.lesson_id === selectedLessonId).sort((left, right) => left.position - right.position);

  return <section className="workspace"><aside className="modules"><h3>{courseTitle} · Module</h3><div className="stack">{modules.map((module, moduleIndex) => <div key={module.id}><div className="module">{moduleIndex + 1}. {module.title}</div>{lessons.filter((lesson) => lesson.module_id === module.id).map((lesson) => { const lessonExercises = exercises.filter((exercise) => exercise.lesson_id === lesson.id); const completed = lessonExercises.filter((exercise) => submissionByExercise.get(exercise.id)?.status === "passed").length; return <button type="button" className={`nav ${lesson.id === selectedLessonId ? "active" : ""}`} key={lesson.id} onClick={() => setSelectedLessonId(lesson.id)}>{lesson.title}<small>{completed}/{lessonExercises.length} abgeschlossen</small></button>; })}</div>)}</div></aside><article className="lessons"><div className="row"><div><div className="eyebrow">{selectedLesson ? "LEKTION" : "KURS"}</div><h2>{selectedLesson?.title ?? "Keine Lektionen"}</h2><p className="muted">{selectedLesson?.description}</p></div><span className="pill">{selectedExercises.length} Aufgaben</span></div><div className="lesson-list">{selectedExercises.length ? selectedExercises.map((exercise) => { const submission = submissionByExercise.get(exercise.id); return <ExerciseCard key={exercise.id} exercise={exercise} submission={submission} attempts={attempts.filter((attempt) => attempt.exercise_id === exercise.id)} reviews={submission ? reviews.filter((review) => review.submission_id === submission.id) : []} />; }) : <div className="card"><p className="muted">Für diese Lektion sind noch keine Aufgaben veröffentlicht.</p></div>}</div></article></section>;
}
