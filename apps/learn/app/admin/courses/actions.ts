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
    const { error: assignmentError } = await supabase.from("course_teachers").insert({ course_id: course.id, teacher_id: teacherId });
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
