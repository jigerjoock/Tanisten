import type { CardItem } from "../../types/content";

interface CardGridProps {
  items: CardItem[];
  cols?: "2" | "3" | "4";
}

const colsMap = {
  "2": "md:grid-cols-2",
  "3": "md:grid-cols-2 xl:grid-cols-3",
  "4": "md:grid-cols-2 xl:grid-cols-4"
};

const accentMap = {
  engineering: "bg-engineering-500/80",
  automation: "bg-accent-500/80",
  digital: "bg-violet-400/80",
  neutral: "bg-slate-500/70"
};

export default function CardGrid({ items, cols = "3" }: CardGridProps) {
  return (
    <div className={`grid gap-5 ${colsMap[cols]}`}>
      {items.map((item) => (
        <article
          key={item.title}
          className="card-surface group relative overflow-hidden p-6 transition duration-300 hover:-translate-y-1"
        >
          <div className={`absolute left-0 top-0 h-1 w-16 ${accentMap[item.accent ?? "neutral"]}`} />
          <h3 className="text-xl font-semibold text-white">{item.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">{item.description}</p>
        </article>
      ))}
    </div>
  );
}
