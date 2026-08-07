import { useEffect, useMemo, useState } from "react";
import { WeddingInviter, weddingGuests, weddingInviters } from "../data/weddingGuests";
import { buildInvitationLink, buildInvitationMessage, copyInvitationLink, openWhatsApp } from "../utils/weddingSharing";
import "./wedding-admin.css";

type Wish = { id: number; name: string; message: string; guestSlug: string; createdAt: string };

type WeddingAdminPageProps = {
  inviterId?: WeddingInviter["id"];
};

export default function WeddingAdminPage({ inviterId }: WeddingAdminPageProps) {
  const [copied, setCopied] = useState<string | null>(null);
  const [wishes, setWishes] = useState<Wish[]>([]);
  const groups = useMemo(() => weddingInviters.filter((inviter) => inviterId === undefined || inviter.id === inviterId).map((inviter) => ({
    inviter,
    guests: weddingGuests.filter((guest) => guest.inviterId === inviter.id)
  })), [inviterId]);
  const selectedInviter = inviterId === undefined ? undefined : weddingInviters.find((inviter) => inviter.id === inviterId);
  const visibleWishes = useMemo(() => {
    if (inviterId === undefined) return wishes;
    const guestSlugs = new Set(weddingGuests.filter((guest) => guest.inviterId === inviterId).map((guest) => guest.slug).filter(Boolean));
    return wishes.filter((wish) => guestSlugs.has(wish.guestSlug));
  }, [inviterId, wishes]);

  useEffect(() => {
    fetch("/api/wishes").then((response) => response.ok ? response.json() : Promise.reject()).then((data) => setWishes(data.wishes ?? [])).catch(() => setWishes([]));
  }, []);

  const copyLink = async (slug: string) => {
    await copyInvitationLink(slug);
    setCopied(slug);
    window.setTimeout(() => setCopied((current) => current === slug ? null : current), 1600);
  };

  return <main className="wadmin-shell">
    <header className="wadmin-header">
      <p>25 · 08 · 2026</p>
      <h1>{selectedInviter ? `Гости — ${selectedInviter.name}` : "Ссылки для гостей"}</h1>
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
            const link = buildInvitationLink(slug);
            const message = buildInvitationMessage({ guestName: guest.name, gender: guest.gender, guestId: slug, inviterId: inviter.id });
            return <article key={`${inviter.id}-${guest.name}`}>
              <div><strong>{guest.name}</strong><a href={link} target="_blank" rel="noreferrer">{link}</a></div>
              <div className="wadmin-share-actions">
                <button type="button" disabled={!slug} className={copied === slug ? "copied" : ""} onClick={() => copyLink(slug)}>{copied === slug ? "Скопировано ✓" : "Копировать"}</button>
                <button type="button" disabled={!slug} className="wadmin-whatsapp" onClick={() => openWhatsApp(message)} aria-label={`Отправить приглашение для ${guest.name} в WhatsApp`}><span>◉</span> WhatsApp</button>
              </div>
            </article>;
          })}
        </div> : <p className="wadmin-empty">Приглашённые пока не добавлены</p>}
      </section>)}
      <section className="wadmin-group wadmin-wishes">
        <header><div><small>Книга пожеланий</small><h2>Пожелания гостей</h2></div><b>{visibleWishes.length}</b></header>
        {visibleWishes.length > 0 ? <div className="wadmin-wish-list">{visibleWishes.map((wish) => <article key={wish.id}>
          <header><strong>{wish.name}</strong><time>{new Date(`${wish.createdAt.replace(" ", "T")}Z`).toLocaleString("ru-RU")}</time></header>
          <p>{wish.message}</p>
          {wish.guestSlug && <small>?guest={wish.guestSlug}</small>}
        </article>)}</div> : <p className="wadmin-empty">Пожеланий пока нет</p>}
      </section>
    </div>
  </main>;
}
