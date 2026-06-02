import CardGrid from "../components/common/CardGrid";
import CtaSection from "../components/common/CtaSection";
import PageHero from "../components/common/PageHero";
import SectionHeading from "../components/common/SectionHeading";
import Container from "../components/layout/Container";
import Seo from "../components/seo/Seo";
import { useLanguage } from "../i18n/LanguageContext";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <>
      <Seo title={t.seo.aboutTitle} description={t.seo.aboutDescription} />
      <PageHero eyebrow={t.about.heroEyebrow} title={t.about.heroTitle} subtitle={t.about.heroSubtitle} />

      <section className="section-pad">
        <Container className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading title={t.about.backgroundTitle} />
          <div className="card-surface p-6 leading-relaxed text-slate-300">
            <p>{t.about.backgroundText1}</p>
            <p className="mt-4">{t.about.backgroundText2}</p>
          </div>
        </Container>
      </section>

      <section className="section-pad border-y border-slate-800/80 bg-base-800/55">
        <Container>
          <SectionHeading title={t.about.experienceTitle} />
          <CardGrid items={t.cards.experience} cols="3" />
        </Container>
      </section>

      <CtaSection
        title={t.about.contactTitle}
        text={t.about.contactText}
        primaryLabel={t.common.contact}
        primaryTo="/contact"
      />
    </>
  );
}
