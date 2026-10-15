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
}

export interface Submission {
  id: string;
  exercise_id: string;
  status: SubmissionStatus;
  answer: string;
  feedback: string | null;
  checked_at: string | null;
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
