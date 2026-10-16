"use server";

import { revalidatePath } from "next/cache";
import { requireRole } from "../../../lib/auth";
import { closedLmsReady, requireServiceRoleClient } from "../../../lib/closed-lms";

async function adminReady() {
  const context = await requireRole(["admin"]);
  if (!await closedLmsReady(context.supabase)) throw new Error("Schülerverwaltung wartet auf die getestete Migration 005.");
  return context;
}

async function studentRecordIdForProfile(profileId: string, supabase: Awaited<ReturnType<typeof adminReady>>["supabase"]) {
  const { data, error } = await supabase.from("student_records").select("id").eq("profile_id", profileId).maybeSingle();
  if (error || !data) throw new Error("Für dieses Schülerkonto fehlt ein aktivierbarer Schülerdatensatz.");
  return data.id;
}

export async function createStudentRecord(formData: FormData) {
  const { supabase } = await adminReady();
  const firstName = String(formData.get("firstName") ?? "").trim();
  const lastName = String(formData.get("lastName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!firstName || !lastName || !/^\S+@\S+\.\S+$/.test(email)) throw new Error("Vorname, Nachname und eine gültige E-Mail-Adresse sind erforderlich.");
  const { error } = await supabase.from("student_records").insert({ first_name: firstName, last_name: lastName, email, phone: String(formData.get("phone") ?? "").trim() || null, admin_note: String(formData.get("adminNote") ?? "").trim() || null });
  if (error) throw new Error(error.message);
  revalidatePath("/admin/students");
}

export async function assignCourse(formData: FormData) {
  const { supabase } = await adminReady();
  const profileId = String(formData.get("studentId") ?? "");
  const recordId = await studentRecordIdForProfile(profileId, supabase);
  const { error } = await supabase.rpc("grant_student_course_access", { p_student_record_id: recordId, p_course_id: String(formData.get("courseId") ?? "") });
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/students/${profileId}`);
}

export async function revokeCourse(formData: FormData) {
  const { supabase } = await adminReady();
  const profileId = String(formData.get("studentId") ?? "");
  const recordId = await studentRecordIdForProfile(profileId, supabase);
  const { error } = await supabase.rpc("revoke_student_course_access", { p_student_record_id: recordId, p_course_id: String(formData.get("courseId") ?? "") });
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/students/${profileId}`);
}

export async function setStudentStatus(formData: FormData) {
  const { supabase } = await adminReady();
  const studentId = String(formData.get("studentId") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!["active", "disabled", "archived"].includes(status)) throw new Error("Ungültiger Status.");
  const { error } = await supabase.from("profiles").update({ account_status: status, archived_at: status === "archived" ? new Date().toISOString() : null }).eq("id", studentId).eq("role", "student");
  if (error) throw new Error(error.message);
  revalidatePath("/admin/students"); revalidatePath(`/admin/students/${studentId}`);
}

export async function inviteStudent(formData: FormData) {
  const { supabase } = await adminReady();
  const studentRecordId = String(formData.get("studentRecordId") ?? "");
  const { data: record, error } = await supabase.from("student_records").select("id,email,first_name,last_name,profile_id,account_status").eq("id", studentRecordId).single();
  if (error || !record || record.profile_id || record.account_status !== "pending") throw new Error("Dieser Datensatz kann nicht eingeladen werden.");
  const admin = requireServiceRoleClient();
  const { data, error: inviteError } = await admin.auth.admin.inviteUserByEmail(record.email, { data: { full_name: `${record.first_name} ${record.last_name}` } });
  if (inviteError || !data.user) throw new Error(inviteError?.message ?? "Einladung konnte nicht erstellt werden.");
  const { error: metadataError } = await admin.auth.admin.updateUserById(data.user.id, { app_metadata: { tanisten_student_record_id: record.id } });
  if (metadataError) throw new Error("Einladung wurde nicht sicher an den Schülerdatensatz gebunden.");
  // The record remains pending; only activate_student_record() links it.
  revalidatePath("/admin/students");
}
