import { Link } from "react-router-dom";
import Container from "../layout/Container";

interface CtaSectionProps {
  eyebrow?: string;
  title: string;
  text: string;
  primaryLabel?: string;
  primaryTo?: string;
  secondaryLabel?: string;
  secondaryTo?: string;
}

export default function CtaSection({
  eyebrow,
  title,
  text,
  primaryLabel,
  primaryTo = "/contact",
  secondaryLabel,
  secondaryTo
}: CtaSectionProps) {
  return (
    <section className="section-pad">
      <Container>
        <div className="technical-band rounded-lg border border-slate-800 bg-slate-950/70 p-7 shadow-panel md:p-10">
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h2 className="mt-3 max-w-4xl font-display text-3xl font-semibold leading-tight text-white md:text-4xl">
            {title}
          </h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-slate-300">{text}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to={primaryTo}
              className="rounded-md border border-teal-400/70 bg-teal-500/10 px-6 py-3 text-sm font-semibold text-teal-200 transition hover:bg-teal-500/20"
            >
              {primaryLabel}
            </Link>
            {secondaryLabel && secondaryTo ? (
              <Link
                to={secondaryTo}
                className="rounded-md border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:text-white"
              >
                {secondaryLabel}
              </Link>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
