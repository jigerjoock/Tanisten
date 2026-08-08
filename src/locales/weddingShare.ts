export type WeddingShareLocale = "ru";
export type InvitationVoice = "groom" | "bride" | "parents";
import type { GuestGender } from "../data/weddingGuests";

type WeddingShareCopy = {
  salutation: (guestName: string, gender: GuestGender, guestCount: 1 | 2) => string;
  invitation: Record<InvitationVoice, string>;
};

export const weddingShareCopy: Record<WeddingShareLocale, WeddingShareCopy> = {
  ru: {
    salutation: (guestName, gender, guestCount) => `${guestCount === 2 ? "Уважаемые" : gender === "female" ? "Уважаемая" : "Уважаемый"} ${guestName}!`,
    invitation: {
      groom: "Пожалуйста, нажмите на фотку или ссылку ниже, чтобы открыть приглашение",
      bride: "Пожалуйста, нажмите на фотку или ссылку ниже, чтобы открыть приглашение",
      parents: "Пожалуйста, нажмите на фотку или ссылку ниже, чтобы открыть приглашение"
    }
  }
};
