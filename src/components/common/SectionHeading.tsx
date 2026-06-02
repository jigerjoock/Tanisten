interface SectionHeadingProps {
  title: string;
  description?: string;
  eyebrow?: string;
}

export default function SectionHeading({ title, description, eyebrow }: SectionHeadingProps) {
  return (
    <div className="mb-8 md:mb-10">
      {eyebrow ? <p className="eyebrow mb-3">{eyebrow}</p> : null}
      <h2 className="max-w-4xl font-display text-2xl font-semibold leading-tight text-white md:text-3xl">{title}</h2>
      {description ? <p className="mt-3 max-w-3xl text-slate-300">{description}</p> : null}
    </div>
  );
}
