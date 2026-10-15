"use server";

import { revalidatePath } from "next/cache";
import { requireRole } from "../../../lib/auth";

function toSlug(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export async function createCourse(formData: FormData) {
  const { supabase, user } = await requireRole(["admin"]);
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const teacherId = String(formData.get("teacherId") ?? "");
  const requestedSlug = String(formData.get("slug") ?? "");
  const slug = toSlug(requestedSlug || title);
  if (!title || !slug) throw new Error("Course title and slug are required.");
  const { data: course, error } = await supabase.from("courses").insert({ title, slug, description, created_by: user.id }).select("id").single();
  if (error) throw new Error(error.message);
  if (teacherId) {
    const { error: assignmentError } = await supabase.from("course_teachers").insert({ course_id: course.id, teacher_id: teacherId, grants_course_wide_access: true });
    if (assignmentError) throw new Error(assignmentError.message);
  }
  revalidatePath("/admin/courses");
}

export async function setCoursePublished(formData: FormData) {
  const { supabase } = await requireRole(["admin"]);
  const courseId = String(formData.get("courseId"));
  const published = String(formData.get("published")) === "true";
  const { error } = await supabase.from("courses").update({ published }).eq("id", courseId);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/courses");
}

export async function createModule(formData: FormData) {
  const { supabase } = await requireRole(["admin"]);
  const courseId = String(formData.get("courseId") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  if (!courseId || !title) throw new Error("Course and module title are required.");
  const { count, error: countError } = await supabase.from("course_modules").select("*", { count: "exact", head: true }).eq("course_id", courseId);
  if (countError) throw new Error(countError.message);
  const { error } = await supabase.from("course_modules").insert({ course_id: courseId, title, position: count ?? 0 });
  if (error) throw new Error(error.message);
  revalidatePath("/admin/courses");
}

export async function createLesson(formData: FormData) {
  const { supabase } = await requireRole(["admin"]);
  const moduleId = String(formData.get("moduleId") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  if (!moduleId || !title) throw new Error("Module and lesson title are required.");
  const { count, error: countError } = await supabase.from("lessons").select("*", { count: "exact", head: true }).eq("module_id", moduleId);
  if (countError) throw new Error(countError.message);
  const { error } = await supabase.from("lessons").insert({ module_id: moduleId, title, description, position: count ?? 0 });
  if (error) throw new Error(error.message);
  revalidatePath("/admin/courses");
}

export async function createExercise(formData: FormData) {
  const { supabase } = await requireRole(["admin"]);
  const lessonId = String(formData.get("lessonId") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const kind = String(formData.get("kind") ?? "");
  const checkMode = String(formData.get("checkMode") ?? "");
  const expectedAnswer = String(formData.get("expectedAnswer") ?? "").trim();
  const starterCode = String(formData.get("starterCode") ?? "");
  if (!lessonId || !title || !["text_response", "scratch_project", "python_code", "javascript_code"].includes(kind) || !["automatic", "teacher"].includes(checkMode)) throw new Error("Exercise fields are invalid.");
  if (checkMode === "automatic" && kind === "text_response" && !expectedAnswer) throw new Error("Automatic text exercises require an exact expected answer.");
  const { data: lesson, error: lessonError } = await supabase.from("lessons").select("module_id").eq("id", lessonId).single();
  if (lessonError) throw new Error(lessonError.message);
  const { data: module, error: moduleError } = await supabase.from("course_modules").select("course_id").eq("id", lesson.module_id).single();
  if (moduleError) throw new Error(moduleError.message);
  const { count, error: countError } = await supabase.from("exercises").select("*", { count: "exact", head: true }).eq("lesson_id", lessonId);
  if (countError) throw new Error(countError.message);
  const checkConfig = checkMode === "teacher" ? {} : kind === "text_response" ? { version: "1", executor: "text_exact", expected_answer: expectedAnswer } : { version: "1", executor: kind === "scratch_project" ? "scratch_verifier" : "code_runner" };
  const { error } = await supabase.from("exercises").insert({ course_id: module.course_id, lesson_id: lessonId, title, description, kind, starter_code: starterCode, check_mode: checkMode, check_config: checkConfig, position: count ?? 0 });
  if (error) throw new Error(error.message);
  revalidatePath("/admin/courses");
}
