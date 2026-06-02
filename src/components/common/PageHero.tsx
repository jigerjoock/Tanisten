import type { ReactNode } from "react";
import Container from "../layout/Container";

interface PageHeroProps {
  title: string;
  subtitle: string;
  eyebrow?: string;
  children?: ReactNode;
}

export default function PageHero({ title, subtitle, eyebrow, children }: PageHeroProps) {
  return (
    <section className="technical-band section-pad border-b border-slate-800/80">
      <Container>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1 className="mt-3 max-w-4xl font-display text-4xl font-semibold leading-tight text-white md:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-300">{subtitle}</p>
        {children ? <div className="mt-8">{children}</div> : null}
      </Container>
    </section>
  );
}
