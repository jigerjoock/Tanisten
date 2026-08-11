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
  { id: 1, name: "Асанбай Пазылов", whatsapp: "996772178085" },
  { id: 2, name: "Азил Кокенович", whatsapp: "996557112241" },
  { id: 3, name: "Айдай", whatsapp: "996700918273" },
  { id: 4, name: "Айжигит", whatsapp: "491775865916" }
];

export const weddingGuests: WeddingGuest[] = [
  { name: "Нурсултан и Канымбүбү", gender: "male", inviterId: 1, guestCount: 2, slug: "nursultan", aliases: ["kanymbubu"] },
  { name: "Байыш", gender: "male", inviterId: 1, guestCount: 1, slug: "baiysh" },
  { name: "Бузайна эжем", gender: "female", inviterId: 1, guestCount: 1, slug: "buzaina-ezhem" },
  { name: "Айсулуу", gender: "female", inviterId: 1, guestCount: 1, slug: "aisuluu" },
  { name: "Зиябидин и Гүлзат", gender: "male", inviterId: 1, guestCount: 2, slug: "ziyabidin", aliases: ["gulzat"] },
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
  { name: "Азамат и Сезим", gender: "male", inviterId: 4, guestCount: 2, slug: "azamat", aliases: ["sezim-azamat"] },
  { name: "Руслан и Гуля", gender: "male", inviterId: 4, guestCount: 2, slug: "ruslan", aliases: ["gulya"] },
  { name: "Темирлан и Элина", gender: "male", inviterId: 3, guestCount: 2, slug: "temirlan", aliases: ["elina"] },
  { name: "Бакай байке", gender: "male", inviterId: 3, guestCount: 1, slug: "bakai" },
  { name: "Ален", gender: "male", inviterId: 3, guestCount: 1, slug: "alen" },
  { name: "Адинай эже и жезде", gender: "female", inviterId: 3, guestCount: 2, slug: "adinai", aliases: ["zhezde"] },
  { name: "Бегимай эже", gender: "female", inviterId: 3, guestCount: 1, slug: "begimai" },
  { name: "Тайне и Таята", gender: "female", inviterId: 3, guestCount: 2, slug: "taine", aliases: ["tayata"] },
  { name: "Бакыт тайке и жеңе", gender: "male", inviterId: 3, guestCount: 2, slug: "bakyt-taike", aliases: ["zhene"] },
  { name: "Чынара апа и Айдана", gender: "female", inviterId: 3, guestCount: 2, slug: "chynara-apa", aliases: ["aidana"] },
  { name: "Улан и Чолпон", gender: "male", inviterId: 2, guestCount: 2, slug: "ulan-zhezde", aliases: ["cholpon"] },
  { name: "Эдик и Жылдыз", gender: "male", inviterId: 2, guestCount: 2, slug: "edik-zhezde", aliases: ["zhyldyz-ezhe"] },
  { name: "Арсен байке и Салтанат жеңе", gender: "male", inviterId: 2, guestCount: 2, slug: "arsen-baike", aliases: ["saltanat-zhene"] },
  { name: "Арген и Сезим", gender: "male", inviterId: 2, guestCount: 2, slug: "argen", aliases: ["sezim-aidai"] },
  { name: "Элнура и Жулия", gender: "female", inviterId: 2, guestCount: 2, slug: "elnura", aliases: ["zhulia"] }
];

export function findWeddingGuest(value: string | null) {
  const normalized = value?.trim().toLocaleLowerCase();
  if (!normalized) return undefined;
  return weddingGuests.find((guest) => guest.slug?.toLocaleLowerCase() === normalized || guest.aliases?.some((alias) => alias.toLocaleLowerCase() === normalized) || guest.name.toLocaleLowerCase() === normalized);
}

export function findWeddingInviter(id: WeddingInviter["id"] | undefined) {
  return weddingInviters.find((inviter) => inviter.id === id);
}
