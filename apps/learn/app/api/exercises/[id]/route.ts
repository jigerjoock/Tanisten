import { NextResponse } from "next/server";
import { createClient } from "../../../../lib/supabase/server";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { answer, intent } = await request.json() as { answer?: string; intent?: "check" | "submit" };
  if (!answer?.trim()) return NextResponse.json({ error: "Add your work before submitting." }, { status: 400 });
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Sign in is required." }, { status: 401 });
  if (intent !== "check" && intent !== "submit") return NextResponse.json({ error: "Invalid exercise action." }, { status: 400 });
  const procedure = intent === "check" ? "check_automatic_exercise" : "submit_exercise_for_review";
  const { data, error } = await supabase.rpc(procedure, { p_exercise_id: id, p_answer: answer });
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  const result = data as { status: string; message: string };
  return NextResponse.json(result);
}
