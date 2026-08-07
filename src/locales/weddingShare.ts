export type WeddingShareLocale = "ru";
export type InvitationVoice = "groom" | "bride" | "parents";
import type { GuestGender } from "../data/weddingGuests";

type WeddingShareCopy = {
  salutation: (guestName: string, gender: GuestGender) => string;
  invitation: Record<InvitationVoice, string>;
};

export const weddingShareCopy: Record<WeddingShareLocale, WeddingShareCopy> = {
  ru: {
    salutation: (guestName, gender) => `${gender === "female" ? "Уважаемая" : "Уважаемый"} ${guestName}!`,
    invitation: {
      groom: "Пожалуйста, нажмите на ссылку ниже, чтобы открыть приглашение 😊",
      bride: "Пожалуйста, нажмите на ссылку ниже, чтобы открыть приглашение 😊",
      parents: "Пожалуйста, нажмите на ссылку ниже, чтобы открыть приглашение 😊"
    }
  }
};
