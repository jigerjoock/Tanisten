import CardGrid from "../components/common/CardGrid";
import CtaSection from "../components/common/CtaSection";
import PageHero from "../components/common/PageHero";
import SectionHeading from "../components/common/SectionHeading";
import Container from "../components/layout/Container";
import Seo from "../components/seo/Seo";
import { useLanguage } from "../i18n/LanguageContext";

export default function ServicesPage() {
  const { t } = useLanguage();

  return (
    <>
      <Seo title={t.seo.servicesTitle} description={t.seo.servicesDescription} />
      <PageHero eyebrow={t.services.heroEyebrow} title={t.services.heroTitle} subtitle={t.services.heroSubtitle} />

      <section className="section-pad">
        <Container>
          <SectionHeading title={t.services.engineeringTitle} />
          <CardGrid items={t.cards.engineeringServices} cols="3" />
        </Container>
      </section>

      <section className="section-pad border-y border-slate-800/80 bg-base-800/55">
        <Container>
          <SectionHeading title={t.services.automationTitle} />
          <CardGrid items={t.cards.automationServices} cols="3" />
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
