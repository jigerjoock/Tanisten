import { useState } from "react";
import type { ServiceDirection } from "../../i18n/translations";
import { accentStyles } from "./serviceOverviewStyles";

interface ServicesOverviewProps {
  directions: ServiceDirection[];
  projectsLabel: string;
}

export default function ServicesOverviewHover({ directions, projectsLabel }: ServicesOverviewProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="grid items-start gap-5 lg:grid-cols-3">
      {directions.map((direction, index) => {
        const accent = accentStyles[direction.accent];
        const isOpen = openIndex === index;

        return (
          <article
            key={direction.title}
            role="button"
            tabIndex={0}
            aria-expanded={isOpen}
            onClick={() => setOpenIndex(isOpen ? null : index)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setOpenIndex(isOpen ? null : index);
              }
            }}
            className={`card-surface group relative flex min-h-[360px] cursor-pointer flex-col overflow-hidden border ${accent.border} p-6 transition duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-slate-600 ${accent.ring}`}
          >
            <div className={`absolute left-0 top-0 h-1 w-20 ${accent.bg}`} />
            <div className="flex-1">
              <h3 className={`text-2xl font-semibold leading-tight ${accent.text}`}>{direction.title}</h3>

              <div className="mt-5">
                <ul className="grid gap-3 text-[15px] font-semibold leading-relaxed text-slate-100 md:text-base">
                  {direction.services.map((service) => (
                    <li key={service} className="border-l border-slate-700 pl-3 transition-colors group-hover:border-slate-600">
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div
              className={`overflow-hidden transition-all duration-500 ease-out ${
                isOpen
                  ? "mt-6 max-h-80 border-t border-slate-800 pt-5 opacity-100"
                  : "mt-0 max-h-0 border-t border-transparent pt-0 opacity-0 lg:group-hover:mt-6 lg:group-hover:max-h-80 lg:group-hover:border-slate-800 lg:group-hover:pt-5 lg:group-hover:opacity-100"
              }`}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{projectsLabel}</p>
              <ul className="mt-3 grid gap-2 text-[13px] leading-relaxed text-slate-400 md:text-sm">
                {direction.projects.map((project) => (
                  <li key={project}>{project}</li>
                ))}
              </ul>
            </div>
          </article>
        );
      })}
    </div>
  );
}
