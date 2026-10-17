import { signIn } from "./actions";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return <section className="card login-card" style={{ maxWidth: 480, margin: "64px auto" }}><div className="eyebrow">TANISTEN EDU</div><h1>Willkommen zurück</h1><p className="muted">Melde dich mit dem Konto an, das dir von deiner Lehrkraft zugewiesen wurde.</p>{error && <p className="error">{error}</p>}<form action={signIn} className="stack"><label>E-Mail-Adresse<input className="input" name="email" type="email" required /></label><label>Passwort<input className="input" name="password" type="password" required /></label><button className="button">Anmelden</button></form></section>;
}
