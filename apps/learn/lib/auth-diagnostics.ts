type AuthDiagnosticDetails = Record<string, boolean | number | string | null | undefined>;

export function logAuthDiagnostic(event: string, details: AuthDiagnosticDetails) {
  if (process.env.LEARN_AUTH_DEBUG !== "true") return;

  console.info("[learn-auth]", { event, ...details });
}

export function getConfiguredSupabaseProjectRef() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) return "missing";

  try {
    const hostname = new URL(url).hostname;
    return hostname.endsWith(".supabase.co") ? hostname.split(".")[0] : "unexpected-host";
  } catch {
    return "invalid-url";
  }
}
