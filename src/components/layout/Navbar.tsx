import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import SnowflakeMark from "../common/SnowflakeMark";
import { useLanguage } from "../../i18n/LanguageContext";
import type { Language } from "../../i18n/translations";
import Container from "./Container";

const navItems = [
  { key: "home", to: "/" },
  { key: "services", to: "/services" },
  { key: "industries", to: "/clients" },
  { key: "about", to: "/about" }
] as const;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const changeLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-base-900/92 backdrop-blur-md">
      <Container className="flex min-h-[74px] items-center justify-between gap-5">
        <Link to="/" className="flex min-w-0 items-center gap-3" onClick={() => setIsOpen(false)}>
          <SnowflakeMark />
          <span className="min-w-0 leading-tight">
            <span className="block font-brand text-lg font-semibold tracking-wide text-white">{t.brand.name}</span>
            <span className="hidden max-w-[230px] truncate text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400 sm:block md:max-w-none md:text-xs md:tracking-[0.16em]">
              {t.brand.tagline}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-semibold transition-colors ${
                  isActive ? "text-teal-300" : "text-slate-300 hover:text-white"
                }`
              }
            >
              {t.nav[item.key]}
            </NavLink>
          ))}
          <div className="flex overflow-hidden rounded-md border border-slate-700 text-xs font-semibold">
            {(["en", "de"] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => changeLanguage(item)}
                className={`px-2.5 py-2 transition ${
                  language === item ? "bg-teal-500/20 text-teal-200" : "text-slate-400 hover:text-white"
                }`}
                aria-pressed={language === item}
              >
                {item.toUpperCase()}
              </button>
            ))}
          </div>
          <Link
            to="/contact"
            className="rounded-md border border-teal-400/70 bg-teal-500/10 px-4 py-2.5 text-sm font-semibold text-teal-200 transition hover:bg-teal-500/20"
          >
            {t.common.contact}
          </Link>
        </nav>

        <button
          type="button"
          className="rounded-md border border-slate-700 px-3 py-2 text-sm font-semibold text-slate-200 lg:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={t.common.menu}
          aria-expanded={isOpen}
        >
          {t.common.menu}
        </button>
      </Container>

      {isOpen && (
        <div className="border-t border-slate-800 bg-base-900/98 lg:hidden">
          <Container className="py-4">
            <nav className="flex flex-col gap-3">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `rounded-md px-2 py-2 text-sm font-semibold transition-colors ${
                      isActive ? "bg-slate-800/80 text-teal-300" : "text-slate-200 hover:bg-slate-800/70"
                    }`
                  }
                >
                  {t.nav[item.key]}
                </NavLink>
              ))}
              <div className="flex w-fit overflow-hidden rounded-md border border-slate-700 text-xs font-semibold">
                {(["en", "de"] as const).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => changeLanguage(item)}
                    className={`px-3 py-2 transition ${
                      language === item ? "bg-teal-500/20 text-teal-200" : "text-slate-400"
                    }`}
                    aria-pressed={language === item}
                  >
                    {item.toUpperCase()}
                  </button>
                ))}
              </div>
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="rounded-md border border-teal-400/70 bg-teal-500/10 px-3 py-2 text-sm font-semibold text-teal-200"
              >
                {t.common.contact}
              </Link>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
