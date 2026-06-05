import type { ServiceAccent } from "../../types/serviceCatalog";

export const serviceAccentStyles: Record<
  ServiceAccent,
  {
    text: string;
    border: string;
    hoverBorder: string;
    activeBg: string;
    line: string;
    shadow: string;
  }
> = {
  engineering: {
    text: "text-engineering-300",
    border: "border-engineering-500/55",
    hoverBorder: "hover:border-engineering-400/65",
    activeBg: "bg-engineering-500/10",
    line: "bg-engineering-500",
    shadow: "shadow-[0_18px_55px_rgba(77,163,255,0.10)]"
  },
  automation: {
    text: "text-teal-300",
    border: "border-accent-500/55",
    hoverBorder: "hover:border-accent-400/65",
    activeBg: "bg-accent-500/10",
    line: "bg-accent-500",
    shadow: "shadow-[0_18px_55px_rgba(0,169,157,0.10)]"
  },
  digital: {
    text: "text-violet-300",
    border: "border-violet-400/55",
    hoverBorder: "hover:border-violet-300/65",
    activeBg: "bg-violet-400/10",
    line: "bg-violet-400",
    shadow: "shadow-[0_18px_55px_rgba(139,92,246,0.10)]"
  }
};
