import type { ServiceCategory, ServiceProduct } from "../../types/serviceCatalog";
import DigitalDetailVisual from "./DigitalDetailVisual";
import ServiceDetailCard from "./ServiceDetailCard";
import { fallbackServiceImage, serviceProductImages } from "./serviceCatalogAssets";
import { serviceAccentStyles } from "./serviceCatalogStyles";

interface ServiceDetailPanelProps {
  category: ServiceCategory | null;
  product: ServiceProduct | null;
  detailsTitle: string;
  selectTitle: string;
  selectText: string;
}

export default function ServiceDetailPanel({
  category,
  product,
  detailsTitle,
  selectTitle,
  selectText
}: ServiceDetailPanelProps) {
  const accent = category ? serviceAccentStyles[category.id] : serviceAccentStyles.engineering;
  const isDigital = category?.id === "digital";

  if (!category || !product) {
    return (
      <section className="relative min-h-[620px] overflow-hidden rounded-lg border border-slate-800 bg-base-700/85 p-7 shadow-panel md:p-10">
        <div className={`absolute left-0 top-0 h-1 w-28 ${accent.line}`} />
        <div className="flex min-h-[500px] items-center justify-center">
          <div className="max-w-lg text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{detailsTitle}</p>
            <h3 className="mt-4 font-display text-3xl font-semibold leading-tight text-white">{selectTitle}</h3>
            <p className="mt-4 leading-relaxed text-slate-400">{selectText}</p>
          </div>
        </div>
      </section>
    );
  }

  const sections =
    product.detailSections ?? [
      product.sections.description,
      product.sections.typicalTasks,
      product.sections.deliverables,
      product.sections.methods,
      product.sections.tools,
      product.sections.industries
    ];
  const productImage = serviceProductImages[product.id] ?? fallbackServiceImage;

  return (
    <section
      key={product.id}
      className="relative overflow-hidden rounded-lg border border-slate-800 bg-base-700/85 p-6 shadow-panel md:p-8"
    >
      <div className={`absolute left-0 top-0 h-1 w-32 ${accent.line}`} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(148,163,184,0.12),transparent_34%)]" />
      <div className="relative">
        <div className={`border-b border-slate-800 pb-7 ${isDigital ? "grid gap-6 lg:grid-cols-[1fr_420px] lg:items-stretch" : ""}`}>
          <div>
            <p className={`text-xs font-semibold uppercase tracking-[0.16em] ${accent.text}`}>{category.title}</p>
            <h3 className="mt-3 font-display text-3xl font-semibold leading-tight text-white md:text-4xl">
              {product.title}
            </h3>
            <p className="mt-4 max-w-3xl leading-relaxed text-slate-300">{product.description}</p>
          </div>
          {isDigital ? <DigitalDetailVisual image={productImage} title={product.title} /> : null}
        </div>

        <div className="mt-7 grid gap-4 md:grid-cols-2">
          {sections.map((section, index) => (
            <div key={section.title} className={index === 0 && sections.length > 6 ? "md:col-span-2" : undefined}>
              <ServiceDetailCard section={section} visual={isDigital} index={index} />
            </div>
          ))}
        </div>

        <div className={`mt-7 rounded-lg border p-5 ${accent.border} ${accent.activeBg}`}>
          <p className="text-sm font-semibold text-white">{product.cta}</p>
        </div>
      </div>
    </section>
  );
}
