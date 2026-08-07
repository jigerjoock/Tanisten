const json = (body, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }
});

export async function onRequestGet({ env }) {
  const result = await env.WEDDING_DB.prepare(
    "SELECT id, name, message, guest_slug AS guestSlug, created_at AS createdAt FROM wishes ORDER BY id DESC LIMIT 500"
  ).all();
  return json({ wishes: result.results ?? [] });
}

export async function onRequestPost({ request, env }) {
  let body;
  try { body = await request.json(); } catch { return json({ error: "invalid_json" }, 400); }

  if (body.website) return json({ ok: true });
  const name = String(body.name ?? "").trim().slice(0, 80);
  const message = String(body.message ?? "").trim().slice(0, 1000);
  const guestSlug = String(body.guestSlug ?? "").trim().slice(0, 80);
  if (name.length < 2 || message.length < 2) return json({ error: "invalid_wish" }, 400);

  await env.WEDDING_DB.prepare(
    "INSERT INTO wishes (name, message, guest_slug) VALUES (?, ?, ?)"
  ).bind(name, message, guestSlug).run();
  return json({ ok: true }, 201);
}
