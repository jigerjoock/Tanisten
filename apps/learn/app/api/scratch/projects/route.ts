import { NextResponse } from "next/server";
import { createClient } from "../../../../lib/supabase/server";
import { scratchStoragePath, validateScratchProjectArchive } from "../../../../lib/scratch-project";

export const runtime = "nodejs";

function persistenceUnavailable(error: { code?: string; message?: string } | null) {
  return error?.code === "PGRST202" || /scratch_project_versions|save_scratch_project_draft|submit_scratch_project_snapshot/i.test(error?.message ?? "");
}

export async function GET(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  const versionId = new URL(request.url).searchParams.get("versionId");
  const exerciseId = new URL(request.url).searchParams.get("exerciseId");
  let query = supabase.from("scratch_project_versions").select("id, storage_path, state, created_at").order("created_at", { ascending: false }).limit(1);
  query = versionId ? query.eq("id", versionId) : query.eq("exercise_id", exerciseId ?? "").eq("student_id", user.id).eq("is_current_draft", true);
  const { data: version, error } = await query.maybeSingle();
  if (error) return NextResponse.json({ error: persistenceUnavailable(error) ? "Scratch-Speicherung benötigt Migration 006." : "Scratch-Projekt konnte nicht geladen werden." }, { status: persistenceUnavailable(error) ? 503 : 403 });
  if (!version) return NextResponse.json({ error: "Scratch-Projekt nicht gefunden." }, { status: 404 });
  const { data: file, error: storageError } = await supabase.storage.from("scratch-projects").download(version.storage_path);
  if (storageError || !file) return NextResponse.json({ error: "Scratch-Datei konnte nicht geladen werden." }, { status: 404 });
  return new NextResponse(file.stream(), { headers: { "content-type": "application/x.scratch.sb3", "cache-control": "private, no-store" } });
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  const form = await request.formData();
  const exerciseId = String(form.get("exerciseId") ?? "");
  const action = form.get("action");
  const project = form.get("project");
  if (!exerciseId || (action !== "draft" && action !== "submit" && action !== "check") || !(project instanceof File)) return NextResponse.json({ error: "Ungültige Scratch-Anfrage." }, { status: 400 });
  if (!project.name.toLowerCase().endsWith(".sb3")) return NextResponse.json({ error: "Nur .sb3-Dateien sind erlaubt." }, { status: 400 });
  let validation;
  try { validation = validateScratchProjectArchive(await project.arrayBuffer()); } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Ungültiges Scratch-Projekt." }, { status: 400 }); }
  const { data: exercise, error: exerciseError } = await supabase.from("exercises").select("id, kind").eq("id", exerciseId).maybeSingle();
  if (exerciseError || !exercise || exercise.kind !== "scratch_project") return NextResponse.json({ error: "Scratch-Aufgabe nicht gefunden oder nicht zugänglich." }, { status: 403 });
  const storagePath = scratchStoragePath(user.id, exerciseId);
  const { error: uploadError } = await supabase.storage.from("scratch-projects").upload(storagePath, project, { contentType: "application/x.scratch.sb3", upsert: false });
  if (uploadError) return NextResponse.json({ error: "Scratch-Datei konnte nicht hochgeladen werden." }, { status: 502 });
  const { data: versionId, error: versionError } = await supabase.rpc("save_scratch_project_draft", {
    p_exercise_id: exerciseId,
    p_storage_path: storagePath,
    p_sha256: validation.sha256,
    p_size_bytes: validation.sizeBytes,
    p_project_summary: validation.summary
  });
  if (versionError) {
    await supabase.storage.from("scratch-projects").remove([storagePath]);
    return NextResponse.json({ error: persistenceUnavailable(versionError) ? "Scratch-Speicherung benötigt Migration 006." : "Scratch-Entwurf konnte nicht gespeichert werden." }, { status: persistenceUnavailable(versionError) ? 503 : 403 });
  }
  if (action === "submit" || action === "check") {
    const procedure = action === "check" ? "check_scratch_project_structure" : "submit_scratch_project_snapshot";
    const { data, error } = await supabase.rpc(procedure, { p_version_id: versionId });
    if (error) return NextResponse.json({ error: "Scratch-Snapshot konnte nicht eingereicht werden." }, { status: 409 });
    return NextResponse.json({ ...(data as object), status: action === "check" ? (data as { status?: string }).status ?? "draft" : "submitted", message: action === "check" ? (data as { message?: string }).message ?? "Scratch-Struktur geprüft." : "Scratch-Snapshot wurde zur Prüfung eingereicht." });
  }
  return NextResponse.json({ status: "draft", versionId, message: "Scratch-Entwurf gespeichert." });
}
