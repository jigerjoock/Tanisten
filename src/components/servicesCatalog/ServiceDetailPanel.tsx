import { Link } from "react-router-dom";
import type { ServiceCategory, ServiceProduct } from "../../types/serviceCatalog";
import AutomationDetailVisual from "./AutomationDetailVisual";
import DigitalDetailVisual from "./DigitalDetailVisual";
import EngineeringDetailVisual from "./EngineeringDetailVisual";
import { fallbackServiceImage, serviceDetailImages, serviceProductImages } from "./serviceCatalogAssets";
import { serviceAccentStyles } from "./serviceCatalogStyles";

interface ServiceDetailPanelProps {
  category: ServiceCategory | null;
  product: ServiceProduct | null;
  detailsTitle: string;
  selectTitle: string;
  selectText: string;
  learnMoreLabel: string;
}

export default function ServiceDetailPanel({
  category,
  product,
  detailsTitle,
  selectTitle,
  selectText,
  learnMoreLabel
}: ServiceDetailPanelProps) {
  const accent = category ? serviceAccentStyles[category.id] : serviceAccentStyles.engineering;

  if (!category || !product) {
    return (
      <section className="relative min-h-[520px] overflow-hidden rounded-lg border border-slate-800 bg-base-700/85 p-7 shadow-panel md:p-10">
        <div className={`absolute left-0 top-0 h-1 w-28 ${accent.line}`} />
        <div className="flex min-h-[420px] items-center justify-center">
          <div className="max-w-lg text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{detailsTitle}</p>
            <h3 className="mt-4 font-display text-3xl font-semibold leading-tight text-white">{selectTitle}</h3>
            <p className="mt-4 leading-relaxed text-slate-400">{selectText}</p>
          </div>
        </div>
      </section>
    );
  }

  const isEngineering = category.id === "engineering";
  const isDigital = category.id === "digital";
  const isAutomation = category.id === "automation";
  const productImage = serviceDetailImages[product.id] ?? serviceProductImages[product.id] ?? fallbackServiceImage;
  const labels = getLabels(isGermanContent(product, category));
  const deliverables = getSectionItems(product, ["deliverables"]);
  const features = getSectionItems(product, ["features", "funktionen"]);
  const businessValue = getSectionItems(product, ["business value", "geschaeftswert", "geschäftswert", "nutzen"]);
  const included = uniqueItems(deliverables.length ? deliverables : product.sections.deliverables.items);
  const featureItems = uniqueItems(features);
  const applications = uniqueItems([
    ...getSectionItems(product, ["typical use cases", "typische anwendungs", "typical tasks", "typische aufgaben"]).slice(0, 5),
    ...getSectionItems(product, ["best fit", "geeignet"]),
    ...product.sections.industries.items.slice(0, 2)
  ]);
  const valueItems = uniqueItems(businessValue.length ? businessValue : createBusinessValueItems(product, category));
  const technology = uniqueItems(
    getSectionItems(product, ["software", "tools", "technolog"]).length
      ? getSectionItems(product, ["software", "tools", "technolog"])
      : product.sections.tools.items
  );
  const methods = uniqueItems(product.sections.methods.items);

  return (
    <section
      key={product.id}
      className="relative overflow-hidden rounded-lg border border-slate-800 bg-[linear-gradient(145deg,rgba(15,23,42,0.98),rgba(11,18,32,0.99)_62%,rgba(17,24,39,0.94))] shadow-[0_30px_100px_rgba(0,0,0,0.34)]"
    >
      <div className={`absolute left-0 top-0 h-1 w-36 ${accent.line}`} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(148,163,184,0.11),transparent_34%)]" />

      <div className="relative">
        <header className="grid gap-10 px-6 pb-12 pt-12 md:px-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center">
          <div className="max-w-3xl">
            <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${accent.text}`}>{category.title}</p>
            <h3 className="mt-5 font-display text-4xl font-semibold leading-[1.04] text-white md:text-5xl">
              {product.title}
            </h3>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">{product.description}</p>
          </div>

          <div className="lg:pl-2">
            {isEngineering ? <EngineeringDetailVisual image={productImage} productId={product.id} title={product.title} /> : null}
            {isDigital ? <DigitalDetailVisual image={productImage} productId={product.id} title={product.title} /> : null}
            {isAutomation ? <AutomationDetailVisual image={productImage} productId={product.id} title={product.title} /> : null}
          </div>
        </header>

        <div className="border-t border-slate-800/80 px-6 py-12 md:px-10 md:py-14">
          <section>
            <SectionTitle eyebrow={labels.included} title={labels.includedTitle} accentText={accent.text} />

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {included.map((item, index) => (
                <ScopeCard
                  key={item}
                  item={item}
                  index={index}
                  accentLine={accent.line}
                  accentText={accent.text}
                  accentBorder={accent.border}
                  accentBg={accent.activeBg}
                />
              ))}
            </div>

            {featureItems.length ? (
              <div className="mt-7 flex flex-wrap gap-2.5">
                {featureItems.map((item) => (
                  <span key={item} className="rounded-full bg-slate-800/55 px-4 py-2 text-sm font-medium text-slate-300 ring-1 ring-slate-700/60">
                    {item}
                  </span>
                ))}
              </div>
            ) : null}
          </section>

          <section className="mt-14 grid gap-6 lg:grid-cols-2">
            <InfoBlock eyebrow={labels.applications} accentText={accent.text} accentLine={accent.line}>
              <div className="flex flex-wrap gap-2.5">
                {applications.map((item) => (
                  <span key={item} className="rounded-full bg-base-900/60 px-4 py-2.5 text-sm font-medium text-slate-200 ring-1 ring-slate-700/60">
                    {item}
                  </span>
                ))}
              </div>
            </InfoBlock>

            <InfoBlock eyebrow={labels.businessValue} accentText={accent.text} accentLine={accent.line}>
              <div className="grid gap-3 sm:grid-cols-2">
                {valueItems.map((item) => (
                  <ValueItem key={item} item={item} accentBorder={accent.border} accentBg={accent.activeBg} accentLine={accent.line} />
                ))}
              </div>
            </InfoBlock>
          </section>

          <section className="mt-14 rounded-lg bg-base-900/35 p-6 ring-1 ring-slate-800/80 md:p-7">
            <div className="grid gap-8 lg:grid-cols-2">
              <BadgeGroup label={labels.technology} items={technology} accentText={accent.text} accentBorder={accent.border} />
              <BadgeGroup label={labels.methods} items={methods} accentText="text-slate-500" />
            </div>
          </section>

          <div className="mt-12">
            <Link
              to={`/services/${product.id}`}
              className={`inline-flex rounded-md border px-6 py-3.5 text-sm font-semibold transition ${accent.border} ${accent.activeBg} ${accent.text} hover:bg-[#172033]`}
            >
              {learnMoreLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionTitle({ eyebrow, title, accentText }: { eyebrow: string; title: string; accentText: string }) {
  return (
    <div className="max-w-3xl">
      <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${accentText}`}>{eyebrow}</p>
      <h4 className="mt-3 font-display text-2xl font-semibold leading-tight text-white md:text-3xl">{title}</h4>
    </div>
  );
}

function ScopeCard({
  item,
  index,
  accentLine,
  accentText,
  accentBorder,
  accentBg
}: {
  item: string;
  index: number;
  accentLine: string;
  accentText: string;
  accentBorder: string;
  accentBg: string;
}) {
  return (
    <article className="group relative min-h-[144px] overflow-hidden rounded-lg border border-slate-800 bg-base-800/62 p-5 transition duration-300 hover:-translate-y-0.5 hover:border-slate-700 hover:bg-[#172033]/75">
      <div className={`absolute left-0 top-0 h-1 w-16 ${accentLine}`} />
      <div className="relative flex h-full flex-col justify-between gap-8">
        <span className={`flex h-9 w-9 items-center justify-center rounded-md border ${accentBorder} ${accentBg} text-xs font-semibold ${accentText}`}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <h5 className="text-lg font-semibold leading-snug text-white">{item}</h5>
      </div>
    </article>
  );
}

function InfoBlock({
  eyebrow,
  accentText,
  accentLine,
  children
}: {
  eyebrow: string;
  accentText: string;
  accentLine: string;
  children: React.ReactNode;
}) {
  return (
    <article className="rounded-lg bg-base-800/48 p-6 ring-1 ring-slate-800/90 md:p-7">
      <div className="mb-6 flex items-center gap-3">
        <span className={`h-2 w-2 rounded-full ${accentLine}`} />
        <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${accentText}`}>{eyebrow}</p>
      </div>
      {children}
    </article>
  );
}

function ValueItem({
  item,
  accentBorder,
  accentBg,
  accentLine
}: {
  item: string;
  accentBorder: string;
  accentBg: string;
  accentLine: string;
}) {
  return (
    <div className="flex min-h-[72px] items-start gap-3 rounded-md bg-base-900/48 p-4 ring-1 ring-slate-800/80">
      <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${accentBg} ring-1 ${accentBorder}`}>
        <span className={`h-1.5 w-1.5 rounded-full ${accentLine}`} />
      </span>
      <span className="text-sm font-medium leading-relaxed text-slate-200">{item}</span>
    </div>
  );
}

function BadgeGroup({
  label,
  items,
  accentText,
  accentBorder = "border-slate-700/70"
}: {
  label: string;
  items: string[];
  accentText: string;
  accentBorder?: string;
}) {
  return (
    <article>
      <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${accentText}`}>{label}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className={`rounded-md border px-3 py-1.5 text-xs font-semibold text-slate-300 ${accentBorder} bg-base-900/45`}>
            {item}
          </span>
        ))}
      </div>
    </article>
  );
}

function uniqueItems(items: string[]) {
  return Array.from(new Set(items.filter(Boolean)));
}

function getSectionItems(product: ServiceProduct, terms: string[]) {
  const sections = product.detailSections ?? [
    product.sections.description,
    product.sections.typicalTasks,
    product.sections.deliverables,
    product.sections.methods,
    product.sections.tools,
    product.sections.industries
  ];
  const normalizedTerms = terms.map(normalizeText);
  const match = sections.find((section) => {
    const title = normalizeText(section.title);
    return normalizedTerms.some((term) => title.includes(term));
  });

  return match?.items ?? [];
}

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .replace("ä", "ae")
    .replace("ö", "oe")
    .replace("ü", "ue")
    .replace("ß", "ss")
    .replace("Г¤", "ae")
    .replace("Г¶", "oe")
    .replace("Гј", "ue")
    .replace("Гџ", "ss");
}

function isGermanContent(product: ServiceProduct, category: ServiceCategory) {
  return category.title === "Automatisierung" || product.sections.description.title === "Beschreibung";
}

function getLabels(isGerman: boolean) {
  if (isGerman) {
    return {
      included: "Enthalten",
      includedTitle: "Projektumfang",
      applications: "Anwendungen",
      businessValue: "Nutzen",
      technology: "Technologie",
      methods: "Methoden & Standards"
    };
  }

  return {
    included: "Included",
    includedTitle: "Project scope",
    applications: "Applications",
    businessValue: "Business Value",
    technology: "Technology",
    methods: "Methods & Standards"
  };
}

function createBusinessValueItems(product: ServiceProduct, category: ServiceCategory) {
  const isGerman = isGermanContent(product, category);

  if (category.id === "engineering") {
    return isGerman
      ? ["Mehr Engineering-Kapazitaet", "Klarere technische Daten", "Bessere Fertigungsvorbereitung", "Schnellere Projektbearbeitung"]
      : ["Additional engineering capacity", "Clearer technical data", "Better manufacturing preparation", "Faster project execution"];
  }

  if (category.id === "automation") {
    return isGerman
      ? ["Weniger manuelle Arbeit", "Wiederholbare Workflows", "Bessere Transparenz", "Geringere Fehlerquote"]
      : ["Less manual work", "Repeatable workflows", "Better visibility", "Fewer process errors"];
  }

  return isGerman
    ? ["Bessere Kundenerfahrung", "Zentralisierte Ablaeufe", "Weniger manuelle Kommunikation", "Professioneller digitaler Zugang"]
    : ["Better customer experience", "Centralized operations", "Less manual communication", "Professional digital access"];
}
