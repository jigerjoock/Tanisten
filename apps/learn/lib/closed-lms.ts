import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@supabase/supabase-js";

export async function closedLmsReady(supabase: SupabaseClient) {
  const [records, profiles] = await Promise.all([
    supabase.from("student_records").select("id,profile_id,account_status", { head: true }).limit(1),
    supabase.from("profiles").select("id,account_status,first_name,last_name,phone,archived_at", { head: true }).limit(1),
  ]);
  const ready = !records.error && !profiles.error;
  if (!ready && process.env.LEARN_AUTH_DEBUG === "true") {
    console.warn("[learn-closed-lms]", {
      event: "migration_005_contract_unavailable",
      studentRecordsErrorCode: records.error?.code ?? null,
      profilesErrorCode: profiles.error?.code ?? null,
    });
  }
  return ready;
}

export function requireServiceRoleClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) throw new Error("Die serverseitige Einladungsfunktion ist noch nicht konfiguriert.");
  // Imported only by server actions; never pass this client to a component.
  return createClient(url, serviceRoleKey, { auth: { autoRefreshToken: false, persistSession: false } });
}
