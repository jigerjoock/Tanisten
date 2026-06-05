import type { CardItem } from "../../types/content";

interface WhyTanistenGridProps {
  items: CardItem[];
}

const accentMap = {
  engineering: {
    card: "border-engineering-500/30 hover:border-engineering-400/60 hover:bg-base-700 hover:shadow-[0_18px_60px_rgba(77,163,255,0.14)]",
    line: "bg-engineering-500/80"
  },
  automation: {
    card: "border-accent-500/30 hover:border-accent-400/60 hover:bg-base-700 hover:shadow-[0_18px_60px_rgba(0,169,157,0.14)]",
    line: "bg-accent-500/80"
  },
  digital: {
    card: "border-violet-400/30 hover:border-violet-300/60 hover:bg-base-700 hover:shadow-[0_18px_60px_rgba(139,92,246,0.14)]",
    line: "bg-violet-400/80"
  },
  neutral: {
    card: "border-slate-800 hover:border-slate-600 hover:bg-base-700 hover:shadow-[0_18px_60px_rgba(148,163,184,0.08)]",
    line: "bg-slate-500/70"
  }
};

export default function WhyTanistenGrid({ items }: WhyTanistenGridProps) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
      {items.map((item, index) => {
        const accent = accentMap[item.accent ?? "neutral"];
        const isPrimary = index === 0;

        return (
          <article
            key={item.title}
            className={`card-surface group relative min-h-[210px] overflow-hidden border p-5 transition duration-300 ease-out hover:-translate-y-1 hover:scale-[1.015] ${accent.card} ${
              isPrimary ? "xl:col-span-1" : ""
            }`}
          >
            <div className={`absolute left-0 top-0 h-1 w-16 transition-all duration-300 group-hover:w-24 ${accent.line}`} />
            <h3 className={`${isPrimary ? "text-2xl" : "text-xl"} font-semibold leading-tight text-white`}>
              {item.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-slate-400 transition-colors duration-300 group-hover:text-slate-300">
              {item.description}
            </p>
          </article>
        );
      })}
    </div>
  );
}
