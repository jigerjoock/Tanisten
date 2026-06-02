import { Link } from "react-router-dom";
import Seo from "../components/seo/Seo";
import Container from "../components/layout/Container";
import { useLanguage } from "../i18n/LanguageContext";

export default function NotFoundPage() {
  const { t } = useLanguage();

  return (
    <>
      <Seo title={t.seo.notFoundTitle} description="Requested page was not found." />
      <section className="section-pad">
        <Container>
          <div className="card-surface p-10 text-center">
            <p className="eyebrow">404</p>
            <h1 className="mt-3 font-display text-3xl font-semibold text-white">{t.common.pageNotFound}</h1>
            <p className="mt-4 text-slate-300">{t.common.pageNotFoundText}</p>
            <Link
              to="/"
              className="mt-7 inline-flex rounded-md border border-teal-400/70 bg-teal-500/10 px-5 py-2.5 text-sm font-semibold text-teal-200 transition hover:bg-teal-500/20"
            >
              {t.nav.home}
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}

