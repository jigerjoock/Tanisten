export type GuestGender = "male" | "female";

export type WeddingInviter = {
  id: 1 | 2 | 3 | 4;
  name: string;
};

export type WeddingGuest = {
  name: string;
  gender: GuestGender;
  inviterId: WeddingInviter["id"];
  slug?: string;
};

export const weddingInviters: WeddingInviter[] = [
  { id: 1, name: "Асанбай Табанович" },
  { id: 2, name: "Азил Кокенович" },
  { id: 3, name: "Айдай" },
  { id: 4, name: "Айжигит" }
];

export const weddingGuests: WeddingGuest[] = [
  { name: "Айнура Кокеновна", gender: "female", inviterId: 2, slug: "ainura" },
  { name: "Василий Ким", gender: "male", inviterId: 4, slug: "vasya" },
  { name: "Жылдыз", gender: "female", inviterId: 3, slug: "zhyldyz" },
  { name: "Айназик", gender: "female", inviterId: 3, slug: "ainazik" }
];

export function findWeddingGuest(value: string | null) {
  const normalized = value?.trim().toLocaleLowerCase();
  if (!normalized) return undefined;
  return weddingGuests.find((guest) => guest.slug?.toLocaleLowerCase() === normalized || guest.name.toLocaleLowerCase() === normalized);
}

export function findWeddingInviter(id: WeddingInviter["id"] | undefined) {
  return weddingInviters.find((inviter) => inviter.id === id);
}
