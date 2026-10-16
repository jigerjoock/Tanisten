import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@supabase/supabase-js";

export async function closedLmsReady(supabase: SupabaseClient) {
  const { error } = await supabase.from("student_records").select("id", { head: true, count: "exact" }).limit(1);
  return !error;
}

export function requireServiceRoleClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) throw new Error("Die serverseitige Einladungsfunktion ist noch nicht konfiguriert.");
  // Imported only by server actions; never pass this client to a component.
  return createClient(url, serviceRoleKey, { auth: { autoRefreshToken: false, persistSession: false } });
}
