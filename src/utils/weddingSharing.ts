import { InvitationVoice, WeddingShareLocale, weddingShareCopy } from "../locales/weddingShare";
import { WeddingInviter } from "../data/weddingGuests";

const WEDDING_URL = "https://wedding.tanisten.com/";

export type InvitationMessageInput = {
  guestName: string;
  guestId: string;
  inviterId: WeddingInviter["id"];
  locale?: WeddingShareLocale;
};

const invitationVoiceByInviter: Record<WeddingInviter["id"], InvitationVoice> = {
  1: "parents",
  2: "parents",
  3: "bride",
  4: "groom"
};

export function buildInvitationLink(guestId: string): string {
  const url = new URL(WEDDING_URL);
  url.searchParams.set("guest", guestId);
  return url.toString();
}

export function buildInvitationMessage({ guestName, guestId, inviterId, locale = "ru" }: InvitationMessageInput): string {
  const copy = weddingShareCopy[locale];
  const voice = invitationVoiceByInviter[inviterId];
  const invitationLink = buildInvitationLink(guestId);

  return [
    copy.salutation(guestName),
    copy.invitation[voice],
    `${copy.date}\n${copy.venue}`,
    `${copy.personalInvitation}\n\n${invitationLink}`,
    copy.closing[voice]
  ].join("\n\n");
}

export async function copyInvitationLink(guestId: string): Promise<string> {
  const link = buildInvitationLink(guestId);
  await navigator.clipboard.writeText(link);
  return link;
}

export function openWhatsApp(message: string): void {
  const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}
