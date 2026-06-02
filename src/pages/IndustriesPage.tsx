import CardGrid from "../components/common/CardGrid";
import CtaSection from "../components/common/CtaSection";
import PageHero from "../components/common/PageHero";
import SectionHeading from "../components/common/SectionHeading";
import Container from "../components/layout/Container";
import Seo from "../components/seo/Seo";
import { useLanguage } from "../i18n/LanguageContext";

export default function IndustriesPage() {
  const { t } = useLanguage();

  return (
    <>
      <Seo title={t.seo.industriesTitle} description={t.seo.industriesDescription} />
      <PageHero
        eyebrow={t.industries.heroEyebrow}
        title={t.industries.heroTitle}
        subtitle={t.industries.heroSubtitle}
      />

      <section className="section-pad">
        <Container>
          <SectionHeading title={t.industries.sectionTitle} description={t.industries.sectionDescription} />
          <CardGrid items={t.cards.industries} cols="3" />
        </Container>
      </section>

      <CtaSection
        title={t.industries.contactTitle}
        text={t.industries.contactText}
        primaryLabel={t.common.contact}
        primaryTo="/contact"
      />
    </>
  );
}
