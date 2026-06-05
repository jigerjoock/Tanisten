import { useEffect, useState } from "react";
import type { ServiceAccent, ServiceCatalogContent, ServiceProduct } from "../../types/serviceCatalog";
import ServiceDetailPanel from "./ServiceDetailPanel";
import ServiceProductRow from "./ServiceProductRow";
import { serviceAccentStyles } from "./serviceCatalogStyles";

interface ServiceCatalogProps {
  content: ServiceCatalogContent;
}

export default function ServiceCatalog({ content }: ServiceCatalogProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<ServiceAccent | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ServiceProduct | null>(null);

  useEffect(() => {
    setSelectedCategoryId(null);
    setSelectedProduct(null);
  }, [content]);

  const selectedCategory = selectedCategoryId
    ? content.categories.find((category) => category.id === selectedCategoryId) ?? null
    : null;

  const handleSelectCategory = (categoryId: ServiceAccent) => {
    setSelectedCategoryId(categoryId);
    setSelectedProduct(null);
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-5 lg:grid-cols-3">
        {content.categories.map((category) => {
          const accent = serviceAccentStyles[category.id];
          const isActive = category.id === selectedCategoryId;

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => handleSelectCategory(category.id)}
              className={`group relative min-h-[230px] overflow-hidden rounded-lg border p-6 text-left transition duration-300 hover:-translate-y-1 ${
                isActive
                  ? `${accent.border} ${accent.activeBg} ${accent.shadow}`
                  : `${accent.hoverBorder} border-slate-800 bg-base-700/80 hover:bg-[#172033]/70`
              }`}
            >
              <div className={`absolute left-0 top-0 h-1 w-20 transition-all duration-300 group-hover:w-28 ${isActive ? accent.line : "bg-slate-700"}`} />
              <p className={`text-xs font-semibold uppercase tracking-[0.16em] ${isActive ? accent.text : "text-slate-400"}`}>
                {content.directionLabel}
              </p>
              <h3 className="mt-5 font-display text-2xl font-semibold leading-tight text-white">{category.title}</h3>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-400">{category.description}</p>
              <div className={`mt-8 h-2 w-2 rounded-full ${isActive ? accent.line : "bg-slate-600 group-hover:bg-slate-400"}`} />
            </button>
          );
        })}
      </div>

      {!selectedCategory ? (
        <section className="rounded-lg border border-slate-800 bg-base-700/75 p-10 text-center shadow-panel">
          <p className="mx-auto max-w-xl font-display text-2xl font-semibold leading-tight text-white">
            {content.selectTitle}
          </p>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-slate-400">{content.selectText}</p>
        </section>
      ) : (
        <section>
          <ServiceProductRow
            category={selectedCategory}
            selectedProductId={selectedProduct?.id ?? null}
            onSelectProduct={setSelectedProduct}
          />
        </section>
      )}

      {selectedCategory ? (
        <ServiceDetailPanel
          category={selectedCategory}
          product={selectedProduct}
          detailsTitle={content.detailsTitle}
          selectTitle={content.productSelectTitle}
          selectText={content.selectText}
        />
      ) : null}
    </div>
  );
}
