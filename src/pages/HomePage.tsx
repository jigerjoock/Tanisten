import { Link } from "react-router-dom";
import CardGrid from "../components/common/CardGrid";
import CtaSection from "../components/common/CtaSection";
import SectionHeading from "../components/common/SectionHeading";
import Container from "../components/layout/Container";
import Seo from "../components/seo/Seo";
import { useLanguage } from "../i18n/LanguageContext";

function ServiceGroup({ title, items, accent }: { title: string; items: string[]; accent: "engineering" | "automation" }) {
  const isEngineering = accent === "engineering";
  const border = isEngineering ? "border-engineering-500/45" : "border-accent-500/45";
  const text = isEngineering ? "text-engineering-300" : "text-teal-300";
  const line = isEngineering ? "bg-engineering-500" : "bg-accent-500";

  return (
    <article className={`card-surface relative overflow-hidden p-6 ${border}`}>
      <div className={`absolute left-0 top-0 h-1 w-20 ${line}`} />
      <h3 className={`text-xl font-semibold ${text}`}>{title}</h3>
      <ul className="mt-5 grid gap-3 text-sm text-slate-300">
        {items.map((item) => (
          <li key={item} className="border-l border-slate-700 pl-3">
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function HomePage() {
  const { t } = useLanguage();

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
          <div className="grid gap-5 lg:grid-cols-2">
            <ServiceGroup title={t.home.engineeringGroupTitle} items={t.home.engineeringItems} accent="engineering" />
            <ServiceGroup title={t.home.automationGroupTitle} items={t.home.automationItems} accent="automation" />
          </div>
        </Container>
      </section>

      <section className="section-pad border-y border-slate-800/80 bg-base-800/55">
        <Container>
          <SectionHeading eyebrow={t.home.industriesEyebrow} title={t.home.industriesTitle} />
          <CardGrid items={t.cards.homeIndustries} cols="4" />
        </Container>
      </section>

      <section className="section-pad">
        <Container>
          <SectionHeading eyebrow={t.home.whyEyebrow} title={t.home.whyTitle} />
          <CardGrid items={t.cards.whyTanisten} cols="3" />
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
