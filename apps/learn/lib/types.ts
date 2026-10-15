export type UserRole = "student" | "teacher" | "admin";
export type CheckMode = "automatic" | "teacher";
export type SubmissionStatus = "draft" | "submitted" | "passed" | "rejected";

export interface Exercise {
  id: string;
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
