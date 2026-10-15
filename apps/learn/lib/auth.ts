import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";
import type { UserRole } from "./types";

export async function requireUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  return { supabase, user };
}

export async function requireRole(roles: UserRole[]) {
  const { supabase, user } = await requireUser();
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  if (!profile || !roles.includes(profile.role as UserRole)) redirect("/dashboard");
  return { supabase, user, role: profile.role as UserRole };
}
