export interface LinkItem {
  label: string;
  to: string;
}

export interface CardItem {
  title: string;
  description: string;
  accent?: "engineering" | "automation" | "neutral";
}

export interface DetailItem {
  title: string;
  text: string;
}
