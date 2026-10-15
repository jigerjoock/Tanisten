"use server";

import { revalidatePath } from "next/cache";
import { requireRole } from "../../lib/auth";

export async function reviewSubmission(formData: FormData) {
  const { supabase, user } = await requireRole(["teacher", "admin"]);
  const submissionId = String(formData.get("submissionId"));
  const decision = String(formData.get("decision"));
  const feedback = String(formData.get("feedback") ?? "");
  if (decision !== "passed" && decision !== "rejected") throw new Error("Invalid review decision.");
  const { error } = await supabase.from("submissions").update({ status: decision, feedback, checked_by: user.id, checked_at: new Date().toISOString() }).eq("id", submissionId).eq("status", "submitted");
  if (error) throw new Error(error.message);
  revalidatePath("/teacher");
}
