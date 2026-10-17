import type { SupabaseClient, User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { cache } from "react";
import { getConfiguredSupabaseProjectRef, logAuthDiagnostic } from "./auth-diagnostics";
import { createClient } from "./supabase/server";
import type { UserRole } from "./types";

export type CurrentProfile = {
  id: string;
  role: UserRole;
  accountStatus: string | null;
  migration005Missing: boolean;
};

function logProfileLookupFailure(event: string, details: Record<string, string | null>) {
  // This path intentionally logs without LEARN_AUTH_DEBUG: an authenticated
  // user cannot be safely downgraded when their profile lookup fails. Values
  // are limited to UUIDs and Supabase error metadata; never cookies or keys.
  console.error("[learn-auth]", { event, ...details });
}

function isMissingAccountStatus(error: { code?: string; message?: string } | null) {
  return error?.code === "PGRST204" || /account_status/i.test(error?.message ?? "");
}

export async function getAuthenticatedUser(supabase: SupabaseClient) {
  const { data: { user }, error } = await supabase.auth.getUser();
  logAuthDiagnostic("require_user", {
    supabaseProjectRef: getConfiguredSupabaseProjectRef(),
    authenticated: Boolean(user),
    authUserId: user?.id ?? null,
    authErrorCode: error?.code ?? null,
    authErrorMessage: error?.message ?? null
  });
  return user;
}

// The role query intentionally uses only migration-001 columns.  In the
// current production schema account_status does not exist yet; selecting it
// together with role makes PostgREST return no profile at all.
async function loadCurrentProfile(supabase: SupabaseClient, user: User): Promise<CurrentProfile> {
  const { data: profile, error } = await supabase.from("profiles").select("id,role").eq("id", user.id).maybeSingle();
  const profileRecord = profile as { id?: string; role?: string } | null;
  logAuthDiagnostic("profile_lookup", {
    authUserId: user.id,
    profileId: profileRecord?.id ?? null,
    profileMatchesAuthUser: profileRecord?.id === user.id,
    profileQueryErrorCode: error?.code ?? null,
    profileQueryErrorMessage: error?.message ?? null
  });

  if (error) {
    logProfileLookupFailure("profile_lookup_failed", { authUserId: user.id, profileId: profileRecord?.id ?? null, code: error.code ?? null, message: error.message ?? null });
    throw new Error("Dein Profil konnte nicht geladen werden. Bitte prüfe die Server-Diagnose für den Supabase-Profilzugriff.");
  }
  if (!profileRecord) {
    logProfileLookupFailure("profile_missing", { authUserId: user.id, profileId: null, code: null, message: null });
    throw new Error("Zu diesem angemeldeten Konto wurde kein Profil gefunden. Prüfe, ob auth.users.id und public.profiles.id übereinstimmen.");
  }
  if (profileRecord.id !== user.id) {
    logProfileLookupFailure("profile_id_mismatch", { authUserId: user.id, profileId: profileRecord.id ?? null, code: null, message: null });
    throw new Error("Das geladene Profil gehört nicht zur angemeldeten Benutzer-ID.");
  }
  if (!profileRecord.role || !['student', 'teacher', 'admin'].includes(profileRecord.role)) throw new Error("Das Profil enthält keine gültige LMS-Rolle.");

  const { data: statusProfile, error: statusError } = await supabase
    .from("profiles")
    .select("id,account_status")
    .eq("id", user.id)
    .maybeSingle();
  const statusRecord = statusProfile as { id?: string; account_status?: string } | null;
  const migration005Missing = isMissingAccountStatus(statusError);
  logAuthDiagnostic("profile_status_lookup", {
    authUserId: user.id,
    profileId: statusRecord?.id ?? null,
    accountStatusErrorCode: statusError?.code ?? null,
    accountStatusErrorMessage: statusError?.message ?? null,
    migration005Missing
  });
  if (statusError && !migration005Missing) {
    logProfileLookupFailure("profile_status_lookup_failed", { authUserId: user.id, profileId: profileRecord.id ?? null, code: statusError.code ?? null, message: statusError.message ?? null });
    throw new Error("Der Kontostatus konnte nicht geprüft werden. Der Zugriff wurde vorsorglich blockiert.");
  }

  return {
    id: profileRecord.id,
    role: profileRecord.role as UserRole,
    accountStatus: statusRecord?.account_status ?? null,
    migration005Missing
  };
}

export const getCurrentProfile = cache(loadCurrentProfile);

export const getServerAuthContext = cache(async () => {
  const supabase = await createClient();
  const user = await getAuthenticatedUser(supabase);
  return { supabase, user };
});

export async function requireUser() {
  const { supabase, user } = await getServerAuthContext();
  if (!user) redirect("/login");
  return { supabase, user };
}

export async function requireRole(roles: UserRole[]) {
  const { supabase, user } = await requireUser();
  const profile = await getCurrentProfile(supabase, user);
  const accountIsActive = profile.migration005Missing || profile.accountStatus === "active";
  const authorized = roles.includes(profile.role) && accountIsActive;

  logAuthDiagnostic("require_role", {
    authUserId: user.id,
    profileId: profile.id,
    profileRole: profile.role,
    profileAccountStatus: profile.accountStatus,
    migration005Missing: profile.migration005Missing,
    requestedRoles: roles.join(","),
    authorized
  });

  if (!authorized) redirect("/dashboard");
  return { supabase, user, role: profile.role };
}
