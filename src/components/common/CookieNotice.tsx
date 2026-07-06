import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../i18n/LanguageContext";

const storageKey = "tanisten-cookie-notice";

const copy = {
  en: {
    title: "Privacy notice",
    text: "This website does not use analytics or marketing cookies. It only stores necessary local preferences such as language and this notice status.",
    link: "Privacy"
  },
  de: {
    title: "Datenschutzhinweis",
    text: "Diese Website verwendet keine Analyse- oder Marketing-Cookies. Es werden nur notwendige lokale Einstellungen wie Sprache und Hinweisstatus gespeichert.",
    link: "Datenschutz"
  }
};

export default function CookieNotice() {
  const { language, t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(window.localStorage.getItem(storageKey) !== "accepted");
  }, []);

  const acceptNotice = () => {
    window.localStorage.setItem(storageKey, "accepted");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  const content = copy[language];

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] border-t border-slate-800 bg-base-900/96 px-4 py-4 shadow-[0_-18px_60px_rgba(0,0,0,0.32)] backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-white">{content.title}</p>
          <p className="mt-1 text-sm leading-relaxed text-slate-300">{content.text}</p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <Link to="/privacy" className="text-sm font-semibold text-slate-300 transition hover:text-teal-300">
            {content.link}
          </Link>
          <button
            type="button"
            onClick={acceptNotice}
            className="rounded-md border border-teal-400/70 bg-teal-500/10 px-4 py-2 text-sm font-semibold text-teal-200 transition hover:bg-teal-500/20"
          >
            {t.common.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
