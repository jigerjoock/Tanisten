import type { DetailItem } from "../../types/content";

interface DetailListProps {
  items: DetailItem[];
}

export default function DetailList({ items }: DetailListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((item) => (
        <article key={item.title} className="card-surface p-5">
          <h3 className="text-lg font-semibold text-white">{item.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.text}</p>
        </article>
      ))}
    </div>
  );
}
