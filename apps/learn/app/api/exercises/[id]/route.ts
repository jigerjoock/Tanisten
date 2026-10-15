import { NextResponse } from "next/server";
import { checkAnswer } from "../../../../lib/checker";
import { createClient } from "../../../../lib/supabase/server";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { answer, intent } = await request.json() as { answer?: string; intent?: "check" | "submit" };
  if (!answer?.trim()) return NextResponse.json({ error: "Add your work before submitting." }, { status: 400 });
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Sign in is required." }, { status: 401 });
  const { data: exercise } = await supabase.from("exercises").select("id, check_mode, check_config").eq("id", id).single();
  if (!exercise) return NextResponse.json({ error: "Exercise not found." }, { status: 404 });
  if (exercise.check_mode === "teacher" && intent !== "submit") return NextResponse.json({ error: "This exercise requires teacher review." }, { status: 400 });
  if (exercise.check_mode === "automatic" && intent !== "check") return NextResponse.json({ error: "This exercise uses automatic checks." }, { status: 400 });

  const result = exercise.check_mode === "automatic" ? checkAnswer(answer, exercise.check_config) : { passed: false, message: "Work submitted for teacher review." };
  const status = exercise.check_mode === "automatic" ? (result.passed ? "passed" : "draft") : "submitted";
  const { error } = await supabase.from("submissions").upsert({ exercise_id: id, student_id: user.id, answer, status, feedback: result.message, checked_by: null, checked_at: exercise.check_mode === "automatic" && result.passed ? new Date().toISOString() : null }, { onConflict: "exercise_id,student_id" });
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  await supabase.from("exercise_attempts").insert({ exercise_id: id, student_id: user.id, answer, outcome: status, message: result.message });
  return NextResponse.json({ status, message: result.message });
}
