export type WeddingShareLocale = "ru";
export type InvitationVoice = "groom" | "bride" | "parents";

type WeddingShareCopy = {
  salutation: (guestName: string) => string;
  invitation: Record<InvitationVoice, string>;
  date: string;
  venue: string;
  personalInvitation: string;
  closing: Record<InvitationVoice, string>;
};

export const weddingShareCopy: Record<WeddingShareLocale, WeddingShareCopy> = {
  ru: {
    salutation: (guestName) => `Уважаемый(ая) ${guestName}!`,
    invitation: {
      groom: "С радостью приглашаю Вас разделить с нами один из самых важных дней нашей жизни — нашу свадьбу.",
      bride: "С радостью приглашаю Вас разделить с нами один из самых важных дней нашей жизни — нашу свадьбу.",
      parents: "С радостью приглашаем Вас на свадьбу наших детей — Айжигита и Айдай."
    },
    date: "📅 25 августа 2026 года",
    venue: "📍 Банкетный зал Palazzo, Бишкек",
    personalInvitation: "Ваше персональное приглашение:",
    closing: {
      groom: "Будем искренне рады видеть Вас на нашем празднике!",
      bride: "Будем искренне рады видеть Вас на нашем празднике!",
      parents: "Будем искренне рады разделить этот счастливый день вместе с Вами!"
    }
  }
};
