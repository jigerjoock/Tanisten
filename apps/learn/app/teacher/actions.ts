"use server";

import { revalidatePath } from "next/cache";
import { requireRole } from "../../lib/auth";

export async function reviewSubmission(formData: FormData) {
  const { supabase } = await requireRole(["teacher", "admin"]);
  const submissionId = String(formData.get("submissionId"));
  const decision = String(formData.get("decision"));
  const feedback = String(formData.get("feedback") ?? "");
  if (decision !== "passed" && decision !== "rejected") throw new Error("Invalid review decision.");
  const { error } = await supabase.rpc("review_exercise_submission", {
    p_submission_id: submissionId,
    p_decision: decision,
    p_feedback: feedback
  });
  if (error) throw new Error(error.message);
  revalidatePath("/teacher");
}
