import type { ServiceAccent, ServiceDetailSection } from "../../types/serviceCatalog";
import { technologyIcons } from "./serviceCatalogAssets";
import ToolBadge from "./ToolBadge";

interface ServiceDetailCardProps {
  section: ServiceDetailSection;
  visual?: boolean;
  index?: number;
  variant?: ServiceAccent;
}

const visualPatterns = [
  "before:left-3 before:top-3 after:bottom-3 after:right-3",
  "before:right-3 before:top-3 after:bottom-3 after:left-3",
  "before:left-1/2 before:top-3 after:bottom-3 after:left-3"
];

export default function ServiceDetailCard({ section, visual = false, index = 0, variant = "digital" }: ServiceDetailCardProps) {
  const sectionKey = section.title.toLowerCase();
  const isAutomation = variant === "automation";
  const accent = getAccentClasses(variant);
  const isUseCaseSection =
    visual &&
    (sectionKey.includes("use case") ||
      sectionKey.includes("anwendungs") ||
      sectionKey.includes("typical tasks") ||
      sectionKey.includes("typische aufgaben"));
  const isTechnologySection =
    visual &&
    (sectionKey.includes("method") ||
      sectionKey.includes("technolog") ||
      sectionKey.includes("software") ||
      sectionKey.includes("tools"));
  const isBusinessValueSection =
    visual && (sectionKey.includes("business value") || sectionKey.includes("geschäftswert") || sectionKey.includes("nutzen"));

  const cardClassName = isBusinessValueSection
    ? `rounded-lg border ${accent.borderStrong} ${accent.valueBg} p-6 ${accent.valueShadow} transition duration-300 ${accent.hoverStrong}`
    : isUseCaseSection
      ? `rounded-lg border ${accent.borderSoft} bg-base-800/80 p-5 transition duration-300 ${accent.hoverSoft} hover:bg-[#172033]/75`
      : "rounded-lg border border-slate-800 bg-base-800/80 p-5 transition duration-300 hover:border-slate-700 hover:bg-[#172033]/75";

  return (
    <article className={cardClassName}>
      <div className="flex items-start gap-3">
        {isUseCaseSection || isTechnologySection || isBusinessValueSection ? (
          <div
            className={`relative h-10 w-10 shrink-0 overflow-hidden rounded-md border ${accent.iconBorder} ${accent.iconBg} before:absolute before:h-2 before:w-2 before:rounded-full ${accent.iconDot} after:absolute after:h-2 after:w-5 after:rounded-full after:bg-sky-300/55 ${
              visualPatterns[index % visualPatterns.length]
            }`}
          >
            <span className={`absolute inset-x-2 top-1/2 h-px ${accent.iconLine}`} />
            <span className="absolute inset-y-2 left-1/2 w-px bg-sky-200/20" />
          </div>
        ) : null}
        <h4 className="text-lg font-semibold text-white">{section.title}</h4>
      </div>

      {isUseCaseSection ? (
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {section.items.map((item) => (
            <li key={item} className="flex items-center gap-3 rounded-md border border-slate-800 bg-base-700/70 px-3 py-2.5 text-sm leading-snug text-slate-200">
              <DetailUseCaseIcon label={item} variant={variant} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : isTechnologySection ? (
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {section.items.map((item) => (
            <TechnologyTile key={item} label={item} variant={variant} />
          ))}
        </div>
      ) : section.badge ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {section.items.map((item) => (
            <ToolBadge key={item} label={item} />
          ))}
        </div>
      ) : (
        <ul className={isBusinessValueSection ? "mt-5 space-y-3" : "mt-4 space-y-2.5"}>
          {section.items.map((item) => (
            <li
              key={item}
              className={`flex gap-3 leading-relaxed ${
                isBusinessValueSection ? "text-[15px] font-medium text-slate-100" : "text-sm text-slate-300"
              }`}
            >
              <span className={`mt-2 shrink-0 rounded-full ${isBusinessValueSection ? `h-2 w-2 ${accent.bullet}` : "h-1.5 w-1.5 bg-slate-500"}`} />
              {item}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

function getAccentClasses(variant: ServiceAccent) {
  if (variant === "automation") {
    return {
        borderStrong: "border-accent-300/40",
        borderSoft: "border-accent-300/22",
        hoverStrong: "hover:border-accent-300/60",
        hoverSoft: "hover:border-accent-300/40",
        iconBorder: "border-accent-300/25",
        iconBg: "bg-accent-300/10",
        iconDot: "before:bg-accent-300/80",
        iconLine: "bg-accent-200/25",
        iconText: "text-accent-200",
        bullet: "bg-accent-200",
        valueBg: "bg-[linear-gradient(135deg,rgba(0,169,157,0.18),rgba(77,163,255,0.08)_58%,rgba(17,24,39,0.88))]",
        valueShadow: "shadow-[0_18px_55px_rgba(0,169,157,0.13)]"
      };
  }

  if (variant === "engineering") {
    return {
      borderStrong: "border-blue-300/40",
      borderSoft: "border-blue-300/22",
      hoverStrong: "hover:border-blue-300/60",
      hoverSoft: "hover:border-blue-300/40",
      iconBorder: "border-blue-300/25",
      iconBg: "bg-blue-300/10",
      iconDot: "before:bg-blue-300/80",
      iconLine: "bg-blue-200/25",
      iconText: "text-blue-200",
      bullet: "bg-blue-200",
      valueBg: "bg-[linear-gradient(135deg,rgba(77,163,255,0.18),rgba(0,169,157,0.08)_58%,rgba(17,24,39,0.88))]",
      valueShadow: "shadow-[0_18px_55px_rgba(77,163,255,0.13)]"
    };
  }

  return {
    borderStrong: "border-violet-300/40",
    borderSoft: "border-violet-300/22",
    hoverStrong: "hover:border-violet-300/60",
    hoverSoft: "hover:border-violet-300/40",
    iconBorder: "border-violet-300/25",
    iconBg: "bg-violet-300/10",
    iconDot: "before:bg-violet-300/80",
    iconLine: "bg-violet-200/25",
    iconText: "text-violet-200",
    bullet: "bg-violet-200",
    valueBg: "bg-[linear-gradient(135deg,rgba(139,92,246,0.18),rgba(56,189,248,0.08)_58%,rgba(17,24,39,0.88))]",
    valueShadow: "shadow-[0_18px_55px_rgba(139,92,246,0.13)]"
  };
}

function DetailUseCaseIcon({ label, variant }: { label: string; variant: ServiceAccent }) {
  const normalized = label.toLowerCase();
  const tone = getIconTone(variant);
  const iconKind = normalized.includes("report") || normalized.includes("dashboard")
    ? "dashboard"
    : normalized.includes("document") || normalized.includes("template") || normalized.includes("dokument")
      ? "document"
      : normalized.includes("data") || normalized.includes("daten") || normalized.includes("csv") || normalized.includes("file")
        ? "data"
        : normalized.includes("approval") || normalized.includes("freigabe") || normalized.includes("review")
          ? "approval"
          : normalized.includes("support") || normalized.includes("assistant") || normalized.includes("assistent")
            ? "support"
            : normalized.includes("booking") || normalized.includes("termin")
              ? "calendar"
              : "workflow";

  return (
    <span className={`relative h-9 w-9 shrink-0 overflow-hidden rounded-md border ${tone.border} ${tone.bg}`}>
      {iconKind === "dashboard" ? (
        <>
          <span className={`absolute left-2 top-2 h-3 w-3 rounded-sm ${tone.fill}`} />
          <span className="absolute right-2 top-2 h-3 w-3 rounded-sm bg-sky-200/45" />
          <span className="absolute bottom-2 left-2 right-2 h-2 rounded-sm bg-white/20" />
        </>
      ) : iconKind === "document" ? (
        <>
          <span className={`absolute left-2 top-2 h-5 w-4 rounded-sm border ${tone.lineBorder}`} />
          <span className="absolute left-3 top-4 h-px w-5 bg-sky-200/45" />
          <span className="absolute left-3 top-6 h-px w-4 bg-sky-200/35" />
        </>
      ) : iconKind === "data" ? (
        <>
          <span className="absolute left-2 right-2 top-2 h-2 rounded-[50%] border border-sky-200/45 bg-sky-200/10" />
          <span className="absolute left-2 right-2 top-4 h-2 rounded-[50%] border border-sky-200/35 bg-sky-200/10" />
          <span className="absolute bottom-2 left-2 right-2 h-2 rounded-[50%] border border-sky-200/25 bg-sky-200/10" />
        </>
      ) : iconKind === "approval" ? (
        <span className={`absolute left-2 top-3 h-3 w-5 -rotate-45 border-b-2 border-l-2 ${tone.checkBorder}`} />
      ) : iconKind === "support" ? (
        <>
          <span className="absolute left-2 top-3 h-3 w-3 rounded-full border border-sky-200/55" />
          <span className={`absolute right-2 top-3 h-3 w-3 rounded-full border ${tone.lineBorder}`} />
          <span className={`absolute bottom-2 left-3 right-3 h-1.5 rounded-full ${tone.fill}`} />
        </>
      ) : iconKind === "calendar" ? (
        <>
          <span className={`absolute left-2 right-2 top-2 h-1 rounded-full ${tone.strongFill}`} />
          <span className="absolute bottom-2 left-2 h-3 w-3 rounded-sm border border-sky-200/55" />
          <span className={`absolute bottom-2 right-2 h-3 w-3 rounded-sm border ${tone.softBorder}`} />
        </>
      ) : (
        <>
          <span className={`absolute left-2 top-2 h-4 w-4 rounded-sm border ${tone.lineBorder}`} />
          <span className="absolute bottom-2 right-2 h-4 w-4 rounded-sm border border-sky-200/45" />
          <span className="absolute left-4 top-4 h-px w-4 rotate-45 bg-white/30" />
        </>
      )}
    </span>
  );
}

function TechnologyTile({ label, variant }: { label: string; variant: ServiceAccent }) {
  const icon = findTechnologyIcon(label);
  const tone = getIconTone(variant);

  return (
    <div className="flex items-center gap-3 rounded-md border border-slate-800 bg-base-700/70 px-3 py-2.5">
      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md border ${tone.border} bg-white/[0.04]`}>
        {icon ? (
          <img src={icon} alt="" className="h-5 w-5 object-contain" />
        ) : (
          <span className={`text-[10px] font-bold uppercase tracking-[0.08em] ${tone.text}`}>
            {getInitials(label)}
          </span>
        )}
      </span>
      <span className="text-sm font-semibold leading-tight text-slate-100">{label}</span>
    </div>
  );
}

function getIconTone(variant: ServiceAccent) {
  if (variant === "automation") {
    return {
      border: "border-accent-300/25",
      bg: "bg-accent-300/10",
      fill: "bg-accent-200/45",
      strongFill: "bg-accent-200/70",
      lineBorder: "border-accent-200/55",
      softBorder: "border-accent-200/45",
      checkBorder: "border-accent-200/75",
      text: "text-accent-200"
    };
  }

  if (variant === "engineering") {
    return {
      border: "border-blue-300/25",
      bg: "bg-blue-300/10",
      fill: "bg-blue-200/45",
      strongFill: "bg-blue-200/70",
      lineBorder: "border-blue-200/55",
      softBorder: "border-blue-200/45",
      checkBorder: "border-blue-200/75",
      text: "text-blue-200"
    };
  }

  return {
    border: "border-violet-300/25",
    bg: "bg-violet-300/10",
    fill: "bg-violet-200/45",
    strongFill: "bg-violet-200/70",
    lineBorder: "border-violet-200/55",
    softBorder: "border-violet-200/45",
    checkBorder: "border-violet-200/75",
    text: "text-violet-200"
  };
}

function findTechnologyIcon(label: string) {
  const normalized = label.toLowerCase();
  const match = Object.entries(technologyIcons).find(([key]) => normalized.includes(key.toLowerCase()));

  if (match) return match[1];
  if (normalized.includes("api")) return null;
  if (normalized.includes("database") || normalized.includes("datenbank")) return technologyIcons.PostgreSQL;
  if (normalized.includes("cloud")) return technologyIcons.Cloudflare;
  if (normalized.includes("python")) return technologyIcons.Python;
  if (normalized.includes("node")) return technologyIcons["Node.js"];
  if (normalized.includes("tailwind")) return technologyIcons.Tailwind;
  if (normalized.includes("vite")) return technologyIcons.Vite;
  if (normalized.includes("excel")) return null;

  return null;
}

function getInitials(label: string) {
  const words = label
    .replace("/", " ")
    .split(" ")
    .filter(Boolean);

  return words
    .slice(0, 2)
    .map((word) => word[0])
    .join("");
}
