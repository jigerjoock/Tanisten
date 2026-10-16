import { redirect } from "next/navigation";
import { getConfiguredSupabaseProjectRef, logAuthDiagnostic } from "./auth-diagnostics";
import { createClient } from "./supabase/server";
import type { UserRole } from "./types";

export async function requireUser() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  logAuthDiagnostic("require_user", {
    supabaseProjectRef: getConfiguredSupabaseProjectRef(),
    authenticated: Boolean(user),
    authErrorCode: error?.code ?? null
  });
  if (!user) redirect("/login");
  return { supabase, user };
}

export async function requireRole(roles: UserRole[]) {
  const { supabase, user } = await requireUser();
  const { data: profile, error } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
  const role = profile?.role as UserRole | undefined;
  const authorized = Boolean(role && roles.includes(role));

  logAuthDiagnostic("require_role", {
    authUserId: user.id,
    profileFound: Boolean(profile),
    profileRole: role ?? null,
    profileErrorCode: error?.code ?? null,
    requestedRoles: roles.join(","),
    authorized
  });

  if (!authorized) redirect("/dashboard");
  return { supabase, user, role };
}
