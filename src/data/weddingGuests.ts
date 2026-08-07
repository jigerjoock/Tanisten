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
  { name: "Карина", gender: "female", inviterId: 4, slug: "karina" },
  { name: "Алымбек Абдиев", gender: "male", inviterId: 4, slug: "alymbek" },
  { name: "Насыйкат", gender: "female", inviterId: 4, slug: "nasyikat" },
  { name: "Кузя", gender: "male", inviterId: 4, slug: "kuzya" },
  { name: "Бектемир Уланов", gender: "male", inviterId: 4, slug: "bektemir" },
  { name: "Айзат", gender: "female", inviterId: 4, slug: "aizat" },
  { name: "Марсель", gender: "male", inviterId: 4, slug: "marsel" },
  { name: "Сезим", gender: "female", inviterId: 4, slug: "sezim" },
  { name: "Саня Угай", gender: "male", inviterId: 4, slug: "sanya" },
  { name: "Снежана", gender: "female", inviterId: 4, slug: "snezhana" },
  { name: "Гүлгаакы", gender: "female", inviterId: 4, slug: "gulgaaky" },
  { name: "Бактыбек аяшата", gender: "male", inviterId: 4, slug: "baktybek" },
  { name: "Чинара аяшапа", gender: "female", inviterId: 4, slug: "chinara" },
  { name: "Виталий аяшата", gender: "male", inviterId: 4, slug: "vitaliy" },
  { name: "Людмила аяшапа", gender: "female", inviterId: 4, slug: "lyudmila" },
  { name: "Светлана аяшапа", gender: "female", inviterId: 4, slug: "svetlana" },
  { name: "Абдихалил аяшата", gender: "male", inviterId: 4, slug: "abdihalil" },
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
