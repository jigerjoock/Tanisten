export interface LinkItem {
  label: string;
  to: string;
}

export interface CardItem {
  title: string;
  description: string;
  accent?: "engineering" | "automation" | "digital" | "neutral";
}

export interface DetailItem {
  title: string;
  text: string;
}
