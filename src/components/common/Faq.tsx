import type { DetailItem } from "../../types/content";

interface FaqProps {
  items: DetailItem[];
}

export default function Faq({ items }: FaqProps) {
  return (
    <div className="divide-y divide-slate-800 overflow-hidden rounded-lg border border-slate-800 bg-slate-950/55">
      {items.map((item) => (
        <details key={item.title} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-white md:text-base">
            {item.title}
            <span className="text-accent-400 transition group-open:rotate-45">+</span>
          </summary>
          <p className="px-5 pb-5 text-sm leading-relaxed text-slate-300">{item.text}</p>
        </details>
      ))}
    </div>
  );
}
