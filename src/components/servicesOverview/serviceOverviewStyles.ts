import type { ServiceDirectionAccent } from "../../i18n/translations";

export const accentStyles: Record<
  ServiceDirectionAccent,
  {
    border: string;
    text: string;
    bg: string;
    softBg: string;
    ring: string;
  }
> = {
  engineering: {
    border: "border-engineering-500/45",
    text: "text-engineering-300",
    bg: "bg-engineering-500",
    softBg: "bg-engineering-500/10",
    ring: "hover:shadow-[0_18px_60px_rgba(77,163,255,0.12)]"
  },
  automation: {
    border: "border-accent-500/45",
    text: "text-teal-300",
    bg: "bg-accent-500",
    softBg: "bg-accent-500/10",
    ring: "hover:shadow-[0_18px_60px_rgba(0,169,157,0.12)]"
  },
  digital: {
    border: "border-violet-400/45",
    text: "text-violet-300",
    bg: "bg-violet-400",
    softBg: "bg-violet-400/10",
    ring: "hover:shadow-[0_18px_60px_rgba(139,92,246,0.13)]"
  }
};
