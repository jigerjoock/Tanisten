export type UserRole = "student" | "teacher" | "admin";
export type CheckMode = "automatic" | "teacher";
export type SubmissionStatus = "draft" | "submitted" | "passed" | "rejected";

export interface Exercise {
  id: string;
  lesson_id: string;
  title: string;
  description: string;
  check_mode: CheckMode;
  check_config: Record<string, unknown>;
  position: number;
  kind: "text_response" | "scratch_project" | "python_code" | "javascript_code";
  content: Record<string, unknown>;
  starter_code: string;
}

export interface Submission {
  id: string;
  exercise_id: string;
  status: SubmissionStatus;
  answer: string;
  feedback: string | null;
  checked_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ExerciseAttempt {
  id: number;
  exercise_id: string;
  outcome: SubmissionStatus;
  message: string | null;
  created_at: string;
}

export interface SubmissionReview {
  id: number;
  submission_id: string;
  decision: Extract<SubmissionStatus, "passed" | "rejected">;
  feedback: string | null;
  reviewed_at: string;
}

export interface CourseModule {
  id: string;
  title: string;
  position: number;
}

export interface Lesson {
  id: string;
  module_id: string;
  title: string;
  description: string;
  position: number;
}
