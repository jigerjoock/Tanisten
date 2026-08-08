export type GuestGender = "male" | "female";

export type WeddingInviter = {
  id: 1 | 2 | 3 | 4;
  name: string;
  whatsapp: string;
};

export type WeddingGuest = {
  name: string;
  gender: GuestGender;
  inviterId: WeddingInviter["id"];
  guestCount: 1 | 2;
  slug?: string;
  aliases?: string[];
};

export const weddingInviters: WeddingInviter[] = [
  { id: 1, name: "Асанбай Табанович", whatsapp: "996772178085" },
  { id: 2, name: "Азил Кокенович", whatsapp: "996557112241" },
  { id: 3, name: "Айдай", whatsapp: "996700918273" },
  { id: 4, name: "Айжигит", whatsapp: "491775865916" }
];

export const weddingGuests: WeddingGuest[] = [
  { name: "Айнура Кокеновна", gender: "female", inviterId: 2, guestCount: 1, slug: "ainura" },
  { name: "Василий и Карина", gender: "male", inviterId: 4, guestCount: 2, slug: "vasya", aliases: ["karina"] },
  { name: "Алымбек и Насыйкат", gender: "male", inviterId: 4, guestCount: 2, slug: "alymbek", aliases: ["nasyikat"] },
  { name: "Кузя", gender: "male", inviterId: 4, guestCount: 1, slug: "kuzya" },
  { name: "Бектемир и Айзат", gender: "male", inviterId: 4, guestCount: 2, slug: "bektemir", aliases: ["aizat"] },
  { name: "Марсель и Сезим", gender: "male", inviterId: 4, guestCount: 2, slug: "marsel", aliases: ["sezim"] },
  { name: "Саня и Снежана", gender: "male", inviterId: 4, guestCount: 2, slug: "sanya", aliases: ["snezhana"] },
  { name: "Гүлгаакы", gender: "female", inviterId: 4, guestCount: 1, slug: "gulgaaky" },
  { name: "Бактыбек аяшата и Чинара аяшапа", gender: "male", inviterId: 4, guestCount: 2, slug: "baktybek", aliases: ["chinara"] },
  { name: "Виталий аяшата и Людмила аяшапа", gender: "male", inviterId: 4, guestCount: 2, slug: "vitaliy", aliases: ["lyudmila"] },
  { name: "Абдихалил аяшата и Светлана аяшапа", gender: "male", inviterId: 4, guestCount: 2, slug: "abdihalil", aliases: ["svetlana"] },
  { name: "Жылдыз", gender: "female", inviterId: 2, guestCount: 1, slug: "zhyldyz" },
  { name: "Айназик", gender: "female", inviterId: 2, guestCount: 1, slug: "ainazik" },
  { name: "Темирлан и Элина", gender: "male", inviterId: 3, guestCount: 2, slug: "temirlan", aliases: ["elina"] },
  { name: "Бакай байке", gender: "male", inviterId: 3, guestCount: 1, slug: "bakai" },
  { name: "Ален", gender: "male", inviterId: 3, guestCount: 1, slug: "alen" },
  { name: "Адинай эже и жезде", gender: "female", inviterId: 3, guestCount: 2, slug: "adinai", aliases: ["zhezde"] },
  { name: "Бегимай эже", gender: "female", inviterId: 3, guestCount: 1, slug: "begimai" },
  { name: "Айжан", gender: "female", inviterId: 3, guestCount: 1, slug: "aizhan" },
  { name: "Тайне и Таята", gender: "female", inviterId: 3, guestCount: 2, slug: "taine", aliases: ["tayata"] },
  { name: "Бакыт тайке и жеңе", gender: "male", inviterId: 3, guestCount: 2, slug: "bakyt-taike", aliases: ["zhene"] },
  { name: "Чынара апа", gender: "female", inviterId: 3, guestCount: 1, slug: "chynara-apa" },
  { name: "Улан жезде и Чолпон эже", gender: "male", inviterId: 3, guestCount: 2, slug: "ulan-zhezde", aliases: ["cholpon"] },
  { name: "Эдик жезде и Жылдыз эже", gender: "male", inviterId: 3, guestCount: 2, slug: "edik-zhezde", aliases: ["zhyldyz-ezhe"] },
  { name: "Арсен байке и Салтанат жеңе", gender: "male", inviterId: 3, guestCount: 2, slug: "arsen-baike", aliases: ["saltanat-zhene"] },
  { name: "Арген и Сезим", gender: "male", inviterId: 3, guestCount: 2, slug: "argen", aliases: ["sezim-aidai"] }
];

export function findWeddingGuest(value: string | null) {
  const normalized = value?.trim().toLocaleLowerCase();
  if (!normalized) return undefined;
  return weddingGuests.find((guest) => guest.slug?.toLocaleLowerCase() === normalized || guest.aliases?.some((alias) => alias.toLocaleLowerCase() === normalized) || guest.name.toLocaleLowerCase() === normalized);
}

export function findWeddingInviter(id: WeddingInviter["id"] | undefined) {
  return weddingInviters.find((inviter) => inviter.id === id);
}
