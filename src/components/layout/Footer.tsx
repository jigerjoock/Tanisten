import { Link } from "react-router-dom";
import { useLanguage } from "../../i18n/LanguageContext";
import Container from "./Container";

const footerLinks = [
  { key: "home", to: "/" },
  { key: "services", to: "/services" },
  { key: "industries", to: "/industries" },
  { key: "about", to: "/about" },
  { key: "contact", to: "/contact" }
] as const;

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-slate-800 bg-base-900/95 py-12">
      <Container className="grid gap-10 md:grid-cols-3">
        <div>
          <p className="font-brand text-lg font-semibold text-white">{t.brand.name}</p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{t.brand.tagline}</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">{t.footer.text}</p>
          <div className="mt-5 space-y-1 text-sm text-slate-300">
            <p>{t.brand.location}</p>
            <p>{t.brand.email}</p>
            <p>{t.brand.phone}</p>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-200">{t.footer.quickLinks}</p>
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-slate-300">
            {footerLinks.map((item) => (
              <Link key={item.to} to={item.to} className="transition-colors hover:text-teal-300">
                {t.nav[item.key]}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-200">{t.footer.technicalFocus}</p>
          <p className="mt-4 text-sm leading-relaxed text-slate-300">{t.footer.technicalFocusText}</p>
        </div>
      </Container>
    </footer>
  );
}
