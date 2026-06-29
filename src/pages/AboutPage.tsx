import CardGrid from "../components/common/CardGrid";
import CtaSection from "../components/common/CtaSection";
import PageHero from "../components/common/PageHero";
import SectionHeading from "../components/common/SectionHeading";
import Container from "../components/layout/Container";
import Seo from "../components/seo/Seo";
import { useLanguage } from "../i18n/LanguageContext";
import founderOfficeImage from "../assets/founder-office.jpeg";
import aircraftCadImage from "../assets/project-aircraft-cad.jfif";
import semiconductorEquipmentImage from "../assets/project-semiconductor-equipment.jpg";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <>
      <Seo title={t.seo.aboutTitle} description={t.seo.aboutDescription} />
      <PageHero eyebrow={t.about.heroEyebrow} title={t.about.heroTitle} subtitle={t.about.heroSubtitle} />

      <section className="section-pad">
        <Container className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <SectionHeading title={t.about.backgroundTitle} />
          <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
            <figure className="relative min-h-[420px] overflow-hidden rounded-lg border border-slate-800 bg-base-800 shadow-panel">
              <img
                src={founderOfficeImage}
                alt="Tanisten technical consulting background"
                className="absolute inset-0 h-full w-full object-cover object-[52%_48%] opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-base-900 via-base-900/35 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-300">{t.brand.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-200">{t.brand.tagline}</p>
              </div>
            </figure>
            <div className="card-surface p-6 leading-relaxed text-slate-300">
              <p>{t.about.backgroundText1}</p>
              <p className="mt-4">{t.about.backgroundText2}</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-pad border-y border-slate-800/80 bg-base-800/40">
        <Container>
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-300">{t.about.projectEnvironmentTitle}</p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-white">
              {t.about.projectEnvironmentHeadline}
            </h2>
            <p className="mt-4 leading-relaxed text-slate-300">{t.about.projectEnvironmentSubtitle}</p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {[
              { image: semiconductorEquipmentImage, item: t.about.projectEnvironmentItems[0], accent: "bg-teal-300" },
              { image: aircraftCadImage, item: t.about.projectEnvironmentItems[1], accent: "bg-engineering-400" }
            ].map((card) => (
              <article key={card.item.title} className="group overflow-hidden rounded-lg border border-slate-800 bg-base-700/80 shadow-panel">
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={card.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover opacity-78 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-base-900 via-base-900/35 to-transparent" />
                  <div className={`absolute left-0 top-0 h-1 w-24 ${card.accent}`} />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl font-semibold leading-tight text-white">{card.item.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-slate-300">{card.item.description}</p>
                </div>
              </article>
            ))}
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
