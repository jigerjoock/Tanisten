import { useState } from "react";
import Container from "../components/layout/Container";
import Seo from "../components/seo/Seo";
import { useLanguage } from "../i18n/LanguageContext";
import type { Language } from "../i18n/translations";

interface ClientCategory {
  id: string;
  title: string;
  image: string;
  description: string;
  examples: string[];
  who: string;
  challenges: string[];
  solutions: string[];
  services: string[];
  cta: string;
}

const clientContent: Record<
  Language,
  {
    title: string;
    subtitle: string;
    examplesLabel: string;
    whoLabel: string;
    challengesLabel: string;
    solutionsLabel: string;
    servicesLabel: string;
    categories: ClientCategory[];
  }
> = {
  en: {
    title: "Clients",
    subtitle: "Organizations we support through engineering, automation and digital solutions.",
    examplesLabel: "Examples",
    whoLabel: "Who this category is",
    challengesLabel: "Typical challenges",
    solutionsLabel: "Example solutions from Tanisten",
    servicesLabel: "Relevant services",
    categories: [
      {
        id: "service-businesses",
        title: "Service Businesses",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&fm=webp&w=1200&q=76",
        description: "Businesses looking to improve workflows, customer interaction and operational efficiency.",
        examples: ["Service providers", "Agencies", "Consultants", "Local businesses", "Operations teams"],
        who: "Operational and service-oriented companies that need clearer processes, better customer communication and practical digital tools.",
        challenges: ["Manual processes", "Fragmented information", "Customer communication", "Scheduling", "Reporting"],
        solutions: ["Workflow mapping", "Internal tools", "Customer request workflows", "Automated reporting", "Business portals"],
        services: ["Workflow Automation", "AI Assistants", "Internal Tools", "Dashboards", "Company Websites"],
        cta: "Useful when daily work depends on repeated communication, forms, files and handovers."
      },
      {
        id: "medical-practices",
        title: "Medical & Professional Practices",
        image: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&fm=webp&w=1200&q=76",
        description: "Organizations seeking appointment systems, digital communication, automation and internal tools.",
        examples: ["Medical practices", "Clinics", "Healthcare providers", "Professional consultants", "Advisory services"],
        who: "Practices and advisory organizations where appointments, client communication and internal administration need to be reliable and easy to manage.",
        challenges: ["Appointment requests", "Repeated questions", "Client intake", "Document handling", "Administrative workload"],
        solutions: ["Booking systems", "Client intake forms", "Internal knowledge assistants", "Notification workflows", "Practice websites"],
        services: ["Booking Systems", "Customer Platforms", "AI Assistants", "Internal Tools", "Company Websites"],
        cta: "Useful when clients need a smoother way to book, submit information or receive updates."
      },
      {
        id: "training-education",
        title: "Training & Education",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&fm=webp&w=1200&q=76",
        description: "Organizations that need portals, scheduling systems, reporting tools and digital learning support.",
        examples: ["Training centers", "Educational organizations", "Instructors", "Professional training providers"],
        who: "Training providers and education teams that manage courses, participants, schedules, documents and learning workflows.",
        challenges: ["Course scheduling", "Participant management", "Learning materials", "Progress tracking", "Reporting"],
        solutions: ["Training portals", "Scheduling workflows", "Digital learning tools", "Reporting dashboards", "AI learning assistants"],
        services: ["Business Portals", "Booking Systems", "Dashboards", "AI Assistants", "Digital Learning Tools"],
        cta: "Useful when training operations need structure without becoming a large software project."
      },
      {
        id: "growing-businesses",
        title: "Growing Businesses",
        image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&fm=webp&w=1200&q=76",
        description: "Companies looking to scale operations, automate processes and strengthen their digital presence.",
        examples: ["SMEs", "Startups", "Family businesses", "Expanding organizations"],
        who: "Small and mid-size companies that are growing beyond informal spreadsheets, manual workarounds and ad-hoc communication.",
        challenges: ["Scaling operations", "Manual reporting", "Tool chaos", "Website quality", "Customer self-service"],
        solutions: ["Automation audit", "Business process automation", "Company websites", "Dashboards", "Customer platforms"],
        services: ["Automation Audit", "Process Automation", "Business Portals", "Company Websites", "Reporting Automation"],
        cta: "Useful when growth creates repeated work that should become a clear digital process."
      },
      {
        id: "engineering-manufacturing",
        title: "Engineering & Manufacturing",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&fm=webp&w=1200&q=76",
        description: "Companies involved in product development, manufacturing and technical operations.",
        examples: ["Aerospace", "Semiconductor", "Industrial equipment", "Manufacturing", "Precision engineering"],
        who: "Engineering teams and manufacturers that need practical technical capacity, CAD support, documentation and structured workflow execution.",
        challenges: ["Overloaded engineering teams", "CAD updates", "Technical documentation", "Supplier coordination", "Production feedback"],
        solutions: ["Mechanical design support", "Drawing packages", "Engineering change support", "Supplier-ready documentation", "Workflow automation"],
        services: ["Mechanical Design & CAD", "Engineering Contracting", "Technical Documentation", "Supplier Coordination", "Engineering Automation"],
        cta: "Useful when technical teams need reliable project-based engineering execution."
      },
      {
        id: "technology-innovation",
        title: "Technology & Innovation Teams",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&fm=webp&w=1200&q=76",
        description: "Teams building products, software platforms, automation systems and technical solutions.",
        examples: ["Product teams", "Software teams", "R&D departments", "Innovation groups", "Technical startups"],
        who: "Technical teams building digital products, internal systems or automation concepts that need practical execution and clear implementation steps.",
        challenges: ["Prototype scope", "Internal tooling", "Data workflows", "Technical communication", "Deployment"],
        solutions: ["Web-based technical tools", "AI assistants", "Python automation", "Internal platforms", "Deployment support"],
        services: ["Web & Python Automation", "AI Workflow Tools", "Internal Web Tools", "Server Setup", "Technical Consulting"],
        cta: "Useful when an idea needs to become a working internal tool or technical product."
      }
    ]
  },
  de: {
    title: "Kunden",
    subtitle: "Organisationen, die wir mit Engineering, Automatisierung und digitalen Lösungen unterstützen.",
    examplesLabel: "Beispiele",
    whoLabel: "Für wen diese Kategorie steht",
    challengesLabel: "Typische Herausforderungen",
    solutionsLabel: "Beispiellösungen von Tanisten",
    servicesLabel: "Relevante Leistungen",
    categories: [
      {
        id: "service-businesses",
        title: "Dienstleistungsunternehmen",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&fm=webp&w=1200&q=76",
        description: "Unternehmen, die Workflows, Kundeninteraktion und operative Effizienz verbessern möchten.",
        examples: ["Dienstleister", "Agenturen", "Beratungen", "Lokale Unternehmen", "Operations-Teams"],
        who: "Serviceorientierte Unternehmen, die klarere Prozesse, bessere Kundenkommunikation und praktische digitale Werkzeuge benötigen.",
        challenges: ["Manuelle Prozesse", "Verteilte Informationen", "Kundenkommunikation", "Terminplanung", "Reporting"],
        solutions: ["Workflow-Mapping", "Interne Tools", "Kundenanfrage-Workflows", "Automatisiertes Reporting", "Business-Portale"],
        services: ["Workflow-Automatisierung", "KI-Assistenten", "Interne Tools", "Dashboards", "Unternehmenswebsites"],
        cta: "Sinnvoll, wenn tägliche Arbeit von wiederkehrender Kommunikation, Formularen, Dateien und Übergaben abhängt."
      },
      {
        id: "medical-practices",
        title: "Medizinische & professionelle Praxen",
        image: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&fm=webp&w=1200&q=76",
        description: "Organisationen mit Bedarf an Terminlösungen, digitaler Kommunikation, Automatisierung und internen Tools.",
        examples: ["Arztpraxen", "Kliniken", "Gesundheitsanbieter", "Professionelle Berater", "Advisory Services"],
        who: "Praxen und Beratungsorganisationen, bei denen Termine, Kundenkommunikation und interne Administration zuverlässig laufen müssen.",
        challenges: ["Terminanfragen", "Wiederkehrende Fragen", "Kundenaufnahme", "Dokumentenhandling", "Administrativer Aufwand"],
        solutions: ["Buchungssysteme", "Intake-Formulare", "Interne Wissensassistenten", "Benachrichtigungsworkflows", "Praxiswebsites"],
        services: ["Buchungssysteme", "Kundenplattformen", "KI-Assistenten", "Interne Tools", "Unternehmenswebsites"],
        cta: "Sinnvoll, wenn Kunden einfacher buchen, Informationen übermitteln oder Updates erhalten sollen."
      },
      {
        id: "training-education",
        title: "Training & Bildung",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&fm=webp&w=1200&q=76",
        description: "Organisationen mit Bedarf an Portalen, Terminplanung, Reporting-Tools und digitaler Lernunterstützung.",
        examples: ["Trainingszentren", "Bildungsorganisationen", "Trainer", "Professionelle Trainingsanbieter"],
        who: "Trainingsanbieter und Bildungsteams, die Kurse, Teilnehmer, Termine, Dokumente und Lernworkflows verwalten.",
        challenges: ["Kursplanung", "Teilnehmerverwaltung", "Lernmaterialien", "Fortschrittsverfolgung", "Reporting"],
        solutions: ["Trainingsportale", "Terminworkflows", "Digitale Lernwerkzeuge", "Reporting-Dashboards", "KI-Lernassistenten"],
        services: ["Business-Portale", "Buchungssysteme", "Dashboards", "KI-Assistenten", "Digitale Lernwerkzeuge"],
        cta: "Sinnvoll, wenn Trainingsabläufe Struktur brauchen, ohne ein großes Softwareprojekt zu werden."
      },
      {
        id: "growing-businesses",
        title: "Wachsende Unternehmen",
        image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&fm=webp&w=1200&q=76",
        description: "Unternehmen, die Prozesse skalieren, Abläufe automatisieren und ihre digitale Präsenz stärken möchten.",
        examples: ["KMU", "Startups", "Familienunternehmen", "Wachsende Organisationen"],
        who: "Kleine und mittelständische Unternehmen, die über informelle Tabellen, manuelle Workarounds und Ad-hoc-Kommunikation hinauswachsen.",
        challenges: ["Skalierung von Abläufen", "Manuelles Reporting", "Tool-Chaos", "Website-Qualität", "Kunden-Self-Service"],
        solutions: ["Automatisierungs-Audit", "Geschäftsprozessautomatisierung", "Unternehmenswebsites", "Dashboards", "Kundenplattformen"],
        services: ["Workflow-Audit", "Prozessautomatisierung", "Business-Portale", "Unternehmenswebsites", "Reporting-Automatisierung"],
        cta: "Sinnvoll, wenn Wachstum wiederkehrende Arbeit erzeugt, die ein klarer digitaler Prozess werden sollte."
      },
      {
        id: "engineering-manufacturing",
        title: "Engineering & Fertigung",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&fm=webp&w=1200&q=76",
        description: "Unternehmen in Produktentwicklung, Fertigung und technischen Operations.",
        examples: ["Aerospace", "Halbleiter", "Industrieausrüstung", "Fertigung", "Präzisionstechnik"],
        who: "Engineering-Teams und Hersteller, die praktische technische Kapazität, CAD-Support, Dokumentation und strukturierte Umsetzung benötigen.",
        challenges: ["Ausgelastete Engineering-Teams", "CAD-Updates", "Technische Dokumentation", "Lieferantenkoordination", "Produktionsfeedback"],
        solutions: ["Mechanische Konstruktion", "Zeichnungspakete", "Änderungsunterstützung", "Lieferantenfähige Dokumentation", "Engineering-Automatisierung"],
        services: ["Mechanische Konstruktion & CAD", "Engineering Contracting", "Technische Dokumentation", "Lieferantenkoordination", "Engineering-Automatisierung"],
        cta: "Sinnvoll, wenn technische Teams zuverlässige projektbezogene Engineering-Umsetzung benötigen."
      },
      {
        id: "technology-innovation",
        title: "Technologie- & Innovationsteams",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&fm=webp&w=1200&q=76",
        description: "Teams, die Produkte, Softwareplattformen, Automatisierungssysteme und technische Lösungen entwickeln.",
        examples: ["Produktteams", "Softwareteams", "F&E-Abteilungen", "Innovationsgruppen", "Technische Startups"],
        who: "Technische Teams, die digitale Produkte, interne Systeme oder Automatisierungskonzepte mit praktischer Umsetzung benötigen.",
        challenges: ["Prototyp-Scope", "Interne Tools", "Datenworkflows", "Technische Kommunikation", "Deployment"],
        solutions: ["Webbasierte technische Tools", "KI-Assistenten", "Python-Automatisierung", "Interne Plattformen", "Deployment-Support"],
        services: ["Web- & Python-Automatisierung", "KI-Workflow-Tools", "Interne Web-Tools", "Server-Setup", "Technisches Consulting"],
        cta: "Sinnvoll, wenn eine Idee zu einem funktionierenden internen Tool oder technischen Produkt werden soll."
      }
    ]
  }
};

export default function ClientsPage() {
  const { language, t } = useLanguage();
  const content = clientContent[language];
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const toggleCard = (id: string) => {
    setSelectedId((current) => (current === id ? null : id));
  };

  return (
    <>
      <Seo title={t.seo.industriesTitle} description={t.seo.industriesDescription} />

      <section className="relative overflow-hidden border-b border-slate-800 bg-base-900 py-14 md:py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,169,157,0.14),transparent_32%),radial-gradient(circle_at_top_right,rgba(77,163,255,0.12),transparent_30%)]" />
        <Container className="relative">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-300">{content.title}</p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-semibold leading-tight text-white md:text-6xl">
            {content.title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-300">{content.subtitle}</p>
        </Container>
      </section>

      <section className="section-pad bg-base-900 pt-10 md:pt-12">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            {content.categories.map((category) => {
              const isSelected = selectedId === category.id;

              return (
                <div key={category.id} className="contents">
                  <button
                    type="button"
                    onClick={() => toggleCard(category.id)}
                    className={`group relative min-h-[440px] overflow-hidden rounded-lg border text-left shadow-panel transition duration-300 hover:-translate-y-1 ${
                      isSelected
                        ? "border-teal-300/45 bg-[#172033]"
                        : "border-slate-800 bg-base-800 hover:border-slate-700"
                    }`}
                    aria-expanded={isSelected}
                  >
                    <img
                      src={category.image}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover opacity-[0.58] transition duration-500 group-hover:scale-[1.03] group-hover:opacity-[0.68]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-base-900 via-base-900/72 to-base-800/18" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(77,163,255,0.16),transparent_34%)] opacity-0 transition duration-300 group-hover:opacity-100" />
                    <div className={`absolute left-0 top-0 h-1 transition-all duration-300 ${isSelected ? "w-32 bg-teal-300" : "w-20 bg-slate-600 group-hover:w-28 group-hover:bg-teal-300/70"}`} />

                    <div className="relative flex h-full min-h-[440px] flex-col justify-end p-6">
                      <h3 className="font-display text-2xl font-semibold leading-tight text-white">{category.title}</h3>
                      <p className="mt-4 text-sm leading-relaxed text-slate-300">{category.description}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {category.examples.slice(0, 3).map((item) => (
                          <span key={item} className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-xs font-semibold text-slate-200 backdrop-blur-sm">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </button>

                  {isSelected ? (
                    <ClientDetailPanel
                      category={category}
                      labels={{
                        examples: content.examplesLabel,
                        who: content.whoLabel,
                        challenges: content.challengesLabel,
                        solutions: content.solutionsLabel,
                        services: content.servicesLabel
                      }}
                    />
                  ) : null}
                </div>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}

function ClientDetailPanel({
  category,
  labels
}: {
  category: ClientCategory;
  labels: { examples: string; who: string; challenges: string; solutions: string; services: string };
}) {
  return (
    <article className="rounded-lg border border-teal-300/30 bg-[#111827]/95 p-6 shadow-[0_24px_80px_rgba(0,169,157,0.10)] lg:col-span-3">
      <div className="grid gap-7 lg:grid-cols-[1.1fr_1.8fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-300">{labels.who}</p>
          <h3 className="mt-3 font-display text-3xl font-semibold text-white">{category.title}</h3>
          <p className="mt-4 leading-relaxed text-slate-300">{category.who}</p>
          <p className="mt-5 rounded-lg border border-slate-700 bg-base-800/70 p-4 text-sm font-medium leading-relaxed text-slate-200">
            {category.cta}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <DetailBlock title={labels.challenges} items={category.challenges} />
          <DetailBlock title={labels.solutions} items={category.solutions} />
          <DetailBlock title={labels.services} items={category.services} highlight />
          <DetailBlock title={labels.examples} items={category.examples} />
        </div>
      </div>
    </article>
  );
}

function DetailBlock({ title, items, highlight = false }: { title: string; items: string[]; highlight?: boolean }) {
  return (
    <div className={`rounded-lg border p-5 ${highlight ? "border-teal-300/32 bg-teal-400/[0.06]" : "border-slate-800 bg-base-800/72"}`}>
      <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-200">{title}</h4>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-relaxed text-slate-300">
            <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${highlight ? "bg-teal-300" : "bg-slate-500"}`} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
