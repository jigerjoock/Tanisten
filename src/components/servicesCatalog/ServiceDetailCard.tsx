import type { ServiceDetailSection } from "../../types/serviceCatalog";
import ToolBadge from "./ToolBadge";

interface ServiceDetailCardProps {
  section: ServiceDetailSection;
  visual?: boolean;
  index?: number;
}

export default function ServiceDetailCard({ section, visual = false, index = 0 }: ServiceDetailCardProps) {
  const visualPatterns = [
    "before:left-3 before:top-3 after:bottom-3 after:right-3",
    "before:right-3 before:top-3 after:bottom-3 after:left-3",
    "before:left-1/2 before:top-3 after:bottom-3 after:left-3"
  ];

  return (
    <article className="rounded-lg border border-slate-800 bg-base-800/80 p-5 transition duration-300 hover:border-slate-700 hover:bg-[#172033]/75">
      <div className="flex items-start gap-3">
        {visual ? (
          <div
            className={`relative h-10 w-10 shrink-0 overflow-hidden rounded-md border border-violet-300/25 bg-violet-300/10 before:absolute before:h-2 before:w-2 before:rounded-full before:bg-violet-300/80 after:absolute after:h-2 after:w-5 after:rounded-full after:bg-sky-300/55 ${
              visualPatterns[index % visualPatterns.length]
            }`}
          >
            <span className="absolute inset-x-2 top-1/2 h-px bg-violet-200/25" />
            <span className="absolute inset-y-2 left-1/2 w-px bg-sky-200/20" />
          </div>
        ) : null}
        <h4 className="text-lg font-semibold text-white">{section.title}</h4>
      </div>
      {section.badge ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {section.items.map((item) => (
            <ToolBadge key={item} label={item} />
          ))}
        </div>
      ) : (
        <ul className="mt-4 space-y-2.5">
          {section.items.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-relaxed text-slate-300">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-500" />
              {item}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
