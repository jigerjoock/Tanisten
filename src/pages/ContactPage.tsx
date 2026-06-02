import PageHero from "../components/common/PageHero";
import Container from "../components/layout/Container";
import Seo from "../components/seo/Seo";
import { useLanguage } from "../i18n/LanguageContext";

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <>
      <Seo title={t.seo.contactTitle} description={t.seo.contactDescription} />
      <PageHero eyebrow={t.contact.heroEyebrow} title={t.contact.heroTitle} subtitle={t.contact.heroSubtitle} />

      <section className="section-pad">
        <Container className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="card-surface p-6">
            <h2 className="font-display text-2xl font-semibold text-white">{t.contact.formTitle}</h2>
            <form className="mt-5 space-y-4" aria-label={t.contact.formTitle}>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block text-sm">
                  <span className="text-slate-300">{t.contact.name}</span>
                  <input className="field" name="name" placeholder={t.contact.name} />
                </label>
                <label className="block text-sm">
                  <span className="text-slate-300">{t.contact.company}</span>
                  <input className="field" name="company" placeholder={t.contact.company} />
                </label>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block text-sm">
                  <span className="text-slate-300">{t.contact.email}</span>
                  <input className="field" type="email" name="email" placeholder="name@company.com" />
                </label>
                <label className="block text-sm">
                  <span className="text-slate-300">{t.contact.projectType}</span>
                  <select className="field" name="projectType" defaultValue="">
                    <option value="" disabled>
                      {t.contact.selectProjectType}
                    </option>
                    {t.contact.projectTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <label className="block text-sm">
                <span className="text-slate-300">{t.contact.message}</span>
                <textarea className="field min-h-40" name="message" placeholder={t.contact.messagePlaceholder} />
              </label>
              <button
                type="submit"
                className="rounded-md border border-teal-400/70 bg-teal-500/10 px-5 py-2.5 text-sm font-semibold text-teal-200 transition hover:bg-teal-500/20"
              >
                {t.contact.submit}
              </button>
            </form>
          </div>

          <div className="space-y-5">
            <article className="card-surface p-6">
              <h3 className="text-lg font-semibold text-white">{t.common.contactDetails}</h3>
              <div className="mt-4 space-y-2 text-sm text-slate-300">
                <p>{t.contact.email}: {t.brand.email}</p>
                <p>{t.common.phone}: {t.brand.phone}</p>
                <p>{t.common.location}: {t.brand.location}</p>
              </div>
            </article>
            <article className="card-surface p-6">
              <h3 className="text-lg font-semibold text-white">{t.common.usefulProjectInfo}</h3>
              <ul className="mt-4 grid gap-2 text-sm leading-relaxed text-slate-300">
                {t.contact.infoItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="card-surface p-6">
              <h3 className="text-lg font-semibold text-white">{t.common.cooperationFormat}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{t.contact.cooperationText}</p>
            </article>
          </div>
        </Container>
      </section>
    </>
  );
}
