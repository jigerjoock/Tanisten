import { Link } from "react-router-dom";
import CtaSection from "../components/common/CtaSection";
import SectionHeading from "../components/common/SectionHeading";
import WhyTanistenGrid from "../components/common/WhyTanistenGrid";
import Container from "../components/layout/Container";
import ServicesOverviewHover from "../components/servicesOverview/ServicesOverviewHover";
import Seo from "../components/seo/Seo";
import { useLanguage } from "../i18n/LanguageContext";

export default function HomePage() {
  const { t } = useLanguage();

  const servicesOverviewProps = {
    directions: t.home.serviceDirections,
    projectsLabel: t.home.typicalProjectsLabel
  };

  return (
    <>
      <Seo title={t.seo.homeTitle} description={t.seo.homeDescription} />

      <section className="technical-band border-b border-slate-800/80 py-16 md:py-24">
        <Container>
          <div className="max-w-5xl">
            <p className="eyebrow">{t.brand.tagline}</p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-white md:text-6xl">
              {t.home.heroHeadline}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-300">{t.home.heroSubheadline}</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="rounded-md border border-teal-400/70 bg-teal-500/10 px-6 py-3 text-sm font-semibold text-teal-200 transition hover:bg-teal-500/20"
              >
                {t.common.contact}
              </Link>
              <Link
                to="/services"
                className="rounded-md border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:text-white"
              >
                {t.common.services}
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-pad">
        <Container>
          <SectionHeading
            eyebrow={t.home.servicesEyebrow}
            title={t.home.servicesTitle}
            description={t.home.servicesDescription}
          />

          <ServicesOverviewHover {...servicesOverviewProps} />
        </Container>
      </section>

      <section className="section-pad">
        <Container>
          <SectionHeading eyebrow={t.home.whyEyebrow} title={t.home.whyEyebrow} description={t.home.whyDescription} />
          <WhyTanistenGrid items={t.cards.whyTanisten} />
        </Container>
      </section>

      <CtaSection
        title={t.home.contactTitle}
        text={t.home.contactText}
        primaryLabel={t.common.contact}
        primaryTo="/contact"
      />
    </>
  );
}
