import { useMemo, useState } from "react";
import { weddingGuests, weddingInviters } from "../data/weddingGuests";
import "./wedding-admin.css";

const weddingUrl = "https://wedding.tanisten.com/";

export default function WeddingAdminPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const groups = useMemo(() => weddingInviters.map((inviter) => ({
    inviter,
    guests: weddingGuests.filter((guest) => guest.inviterId === inviter.id)
  })), []);

  const copyLink = async (slug: string) => {
    const link = `${weddingUrl}?guest=${encodeURIComponent(slug)}`;
    await navigator.clipboard.writeText(link);
    setCopied(slug);
    window.setTimeout(() => setCopied((current) => current === slug ? null : current), 1600);
  };

  return <main className="wadmin-shell">
    <header className="wadmin-header">
      <p>25 · 08 · 2026</p>
      <h1>Ссылки для гостей</h1>
      <span>Айжигит ✿ Айдай</span>
    </header>

    <div className="wadmin-groups">
      {groups.map(({ inviter, guests }) => <section className="wadmin-group" key={inviter.id}>
        <header>
          <div><small>Пригласитель</small><h2>{inviter.name}</h2></div>
          <b>{guests.length}</b>
        </header>
        {guests.length > 0 ? <div className="wadmin-list">
          {guests.map((guest) => {
            const slug = guest.slug ?? "";
            const link = `${weddingUrl}?guest=${encodeURIComponent(slug)}`;
            return <article key={`${inviter.id}-${guest.name}`}>
              <div><strong>{guest.name}</strong><a href={link} target="_blank" rel="noreferrer">{link}</a></div>
              <button type="button" disabled={!slug} className={copied === slug ? "copied" : ""} onClick={() => copyLink(slug)}>
                {copied === slug ? "Скопировано ✓" : "Копировать"}
              </button>
            </article>;
          })}
        </div> : <p className="wadmin-empty">Приглашённые пока не добавлены</p>}
      </section>)}
    </div>
  </main>;
}
