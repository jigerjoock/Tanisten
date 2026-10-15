import { signIn } from "./actions";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return <section className="card" style={{ maxWidth: 480, margin: "64px auto" }}><h1>Sign in</h1><p className="muted">Use the Supabase account assigned by your teacher.</p>{error && <p className="error">{error}</p>}<form action={signIn} className="stack"><label>Email<input className="input" name="email" type="email" required /></label><label>Password<input className="input" name="password" type="password" required /></label><button className="button">Sign in</button></form></section>;
}
