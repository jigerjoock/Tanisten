import { Link, useNavigate, useParams } from "react-router-dom";
import Container from "../components/layout/Container";
import Seo from "../components/seo/Seo";
import { fallbackServiceImage, serviceDetailImages, serviceProductImages } from "../components/servicesCatalog/serviceCatalogAssets";
import { serviceAccentStyles } from "../components/servicesCatalog/serviceCatalogStyles";
import { useLanguage } from "../i18n/LanguageContext";
import type { ServiceCategory, ServiceProduct } from "../types/serviceCatalog";

const sections = {
  en: ["Problems we solve", "Our solution", "Typical use cases", "Benefits", "Technologies", "FAQ"],
  de: ["Probleme, die wir lösen", "Unsere Lösung", "Typische Anwendungsfälle", "Vorteile", "Technologien", "FAQ"]
};

export default function ProductPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const match = findProduct(t.services.catalog.categories, productId);

  if (!match) {
    return (
      <Container className="py-24">
        <div className="rounded-lg border border-slate-800 bg-base-700/85 p-8 text-center shadow-panel">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{t.common.pageNotFound}</p>
          <h1 className="mt-4 font-display text-3xl font-semibold text-white">{t.common.pageNotFoundText}</h1>
          <Link to="/services" className="mt-7 inline-flex rounded-md border border-teal-400/60 px-5 py-3 text-sm font-semibold text-teal-200 transition hover:bg-teal-500/10">
            {t.common.services}
          </Link>
        </div>
      </Container>
    );
  }

  const { category, product } = match;
  const accent = serviceAccentStyles[category.id];
  const image = serviceDetailImages[product.id] ?? serviceProductImages[product.id] ?? fallbackServiceImage;
  const title = product.cardTitle ?? product.title;
  const description = product.cardDescription ?? product.description;
  const isGerman = language === "de";
  const backLabel = isGerman ? "Zurueck" : "Back";

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate("/services");
  };

  return (
    <>
      <Seo title={`${title} | Tanisten`} description={description} />

      <section className="relative overflow-hidden border-b border-slate-800 bg-base-900 py-16 md:py-20">
        <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-22" />
        <div className="absolute inset-0 bg-gradient-to-br from-base-900 via-base-900/92 to-base-800/86" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(77,163,255,0.16),transparent_34%)]" />
        <Container className="relative">
          <button
            type="button"
            onClick={handleBack}
            aria-label={backLabel}
            className="mb-8 inline-flex h-11 w-11 items-center justify-center rounded-md border border-slate-700 bg-base-800/70 text-slate-200 transition hover:border-slate-500 hover:bg-base-700"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M15 6l-6 6 6 6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <p className={`text-xs font-semibold uppercase tracking-[0.16em] ${accent.text}`}>{category.title}</p>
          <h1 className="mt-5 max-w-4xl font-display text-4xl font-semibold leading-tight text-white md:text-6xl">{title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-300">{description}</p>
        </Container>
      </section>

      <section className="section-pad bg-base-900">
        <Container>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {sections[language].map((section) => (
              <article key={section} className="min-h-[210px] rounded-lg border border-slate-800 bg-base-800/78 p-6 shadow-panel">
                <p className={`text-xs font-semibold uppercase tracking-[0.14em] ${accent.text}`}>{isGerman ? "Demnächst" : "Coming soon"}</p>
                <h2 className="mt-4 font-display text-2xl font-semibold text-white">{section}</h2>
                <p className="mt-4 text-sm leading-relaxed text-slate-400">
                  {isGerman
                    ? "Dieser Abschnitt wird später als detaillierte produktorientierte Landingpage ausgearbeitet."
                    : "This section will be expanded later as a detailed sales-oriented product page."}
                </p>
              </article>
            ))}
          </div>

          <div className={`mt-8 rounded-lg border p-7 ${accent.border} ${accent.activeBg}`}>
            <h2 className="font-display text-2xl font-semibold text-white">
              {isGerman ? "Projekt besprechen" : "Discuss this product"}
            </h2>
            <p className="mt-3 max-w-2xl text-slate-300">
              {isGerman
                ? "Senden Sie eine kurze Beschreibung der aktuellen Aufgabe, des gewünschten Ergebnisses und der relevanten Workflows."
                : "Send a short description of the current challenge, expected outcome and relevant workflows."}
            </p>
            <Link
              to="/contact"
              className="mt-6 inline-flex rounded-md border border-teal-400/70 bg-teal-500/10 px-5 py-3 text-sm font-semibold text-teal-200 transition hover:bg-teal-500/20"
            >
              {t.common.contact}
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}

function findProduct(categories: ServiceCategory[], productId?: string) {
  if (!productId) return null;

  for (const category of categories) {
    const product = category.products.find((item: ServiceProduct) => item.id === productId);
    if (product) return { category, product };
  }

  return null;
}
