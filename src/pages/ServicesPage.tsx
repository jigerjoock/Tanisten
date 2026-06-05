import CtaSection from "../components/common/CtaSection";
import PageHero from "../components/common/PageHero";
import Container from "../components/layout/Container";
import Seo from "../components/seo/Seo";
import ServiceCatalog from "../components/servicesCatalog/ServiceCatalog";
import { useLanguage } from "../i18n/LanguageContext";

export default function ServicesPage() {
  const { t } = useLanguage();
  const catalog = t.services.catalog;

  return (
    <>
      <Seo title={t.seo.servicesTitle} description={t.seo.servicesDescription} />
      <PageHero eyebrow={catalog.heroEyebrow} title={catalog.heroTitle} subtitle={catalog.heroSubtitle} />

      <section className="section-pad">
        <Container>
          <div className="mb-8 md:mb-10">
            <p className="eyebrow mb-3">{catalog.catalogEyebrow}</p>
            <h2 className="max-w-4xl font-display text-2xl font-semibold leading-tight text-white md:text-3xl">
              {catalog.catalogTitle}
            </h2>
            <p className="mt-3 max-w-3xl text-slate-300">{catalog.catalogDescription}</p>
          </div>

          <ServiceCatalog content={catalog} />
        </Container>
      </section>

      <CtaSection
        title={t.services.contactTitle}
        text={t.services.contactText}
        primaryLabel={t.common.contact}
        primaryTo="/contact"
      />
    </>
  );
}
