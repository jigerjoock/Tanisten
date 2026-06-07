import type { ServiceCategory, ServiceProduct } from "../../types/serviceCatalog";
import AutomationDetailVisual from "./AutomationDetailVisual";
import DigitalDetailVisual from "./DigitalDetailVisual";
import EngineeringDetailVisual from "./EngineeringDetailVisual";
import ServiceDetailCard from "./ServiceDetailCard";
import { fallbackServiceImage, serviceDetailImages, serviceProductImages } from "./serviceCatalogAssets";
import { serviceAccentStyles } from "./serviceCatalogStyles";

interface ServiceDetailPanelProps {
  category: ServiceCategory | null;
  product: ServiceProduct | null;
  detailsTitle: string;
  selectTitle: string;
  selectText: string;
}

export default function ServiceDetailPanel({
  category,
  product,
  detailsTitle,
  selectTitle,
  selectText
}: ServiceDetailPanelProps) {
  const accent = category ? serviceAccentStyles[category.id] : serviceAccentStyles.engineering;
  const isEngineering = category?.id === "engineering";
  const isDigital = category?.id === "digital";
  const isAutomation = category?.id === "automation";

  if (!category || !product) {
    return (
      <section className="relative min-h-[620px] overflow-hidden rounded-lg border border-slate-800 bg-base-700/85 p-7 shadow-panel md:p-10">
        <div className={`absolute left-0 top-0 h-1 w-28 ${accent.line}`} />
        <div className="flex min-h-[500px] items-center justify-center">
          <div className="max-w-lg text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{detailsTitle}</p>
            <h3 className="mt-4 font-display text-3xl font-semibold leading-tight text-white">{selectTitle}</h3>
            <p className="mt-4 leading-relaxed text-slate-400">{selectText}</p>
          </div>
        </div>
      </section>
    );
  }

  const baseSections =
    product.detailSections ?? [
      product.sections.description,
      product.sections.typicalTasks,
      product.sections.deliverables,
      product.sections.methods,
      product.sections.tools,
      product.sections.industries
    ];
  const sections = isAutomation
    ? [...baseSections, ...getAutomationExtraSections(product, category.title === "Automatisierung")]
    : isEngineering
      ? [...baseSections, ...getEngineeringExtraSections(product, category.title === "Engineering" && product.sections.description.title === "Beschreibung")]
      : baseSections;
  const productImage = isEngineering || isDigital || isAutomation
    ? serviceDetailImages[product.id] ?? serviceProductImages[product.id] ?? fallbackServiceImage
    : serviceProductImages[product.id] ?? fallbackServiceImage;

  return (
    <section
      key={product.id}
      className="relative overflow-hidden rounded-lg border border-slate-800 bg-base-700/85 p-6 shadow-panel md:p-8"
    >
      <div className={`absolute left-0 top-0 h-1 w-32 ${accent.line}`} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(148,163,184,0.12),transparent_34%)]" />
      <div className="relative">
        <div className={`border-b border-slate-800 pb-7 ${isEngineering || isDigital || isAutomation ? "grid gap-6 lg:grid-cols-[1fr_420px] lg:items-stretch" : ""}`}>
          <div>
            <p className={`text-xs font-semibold uppercase tracking-[0.16em] ${accent.text}`}>{category.title}</p>
            <h3 className="mt-3 font-display text-3xl font-semibold leading-tight text-white md:text-4xl">
              {product.title}
            </h3>
            <p className="mt-4 max-w-3xl leading-relaxed text-slate-300">{product.description}</p>
          </div>
          {isEngineering ? <EngineeringDetailVisual image={productImage} productId={product.id} title={product.title} /> : null}
          {isDigital ? <DigitalDetailVisual image={productImage} productId={product.id} title={product.title} /> : null}
          {isAutomation ? <AutomationDetailVisual image={productImage} productId={product.id} title={product.title} /> : null}
        </div>

        <div className="mt-7 grid gap-4 md:grid-cols-2">
          {sections.map((section, index) => (
            <div key={section.title} className={index === 0 && sections.length > 6 ? "md:col-span-2" : undefined}>
              <ServiceDetailCard section={section} visual={isEngineering || isDigital || isAutomation} index={index} variant={category.id} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function getAutomationExtraSections(product: ServiceProduct, isGerman: boolean) {
  const english: Record<string, { value: string[]; fit: string[] }> = {
    "automation-audit-workflow-cleanup": {
      value: [
        "Shows where automation will actually save time before development starts",
        "Reduces tool chaos, duplicated work and unclear handovers",
        "Creates a practical roadmap instead of isolated AI or automation experiments",
        "Helps small teams decide what to automate first and what to leave manual"
      ],
      fit: ["Companies with many spreadsheets and manual handovers", "Teams that tried automation but lack structure", "Small businesses before investing in custom tools"]
    },
    "workflow-automation": {
      value: [
        "Reduces repeated manual work across files, forms and handovers",
        "Makes routine workflows easier to follow and easier to train",
        "Creates repeatable process steps instead of individual workarounds",
        "Improves visibility where tasks usually move through email or spreadsheets"
      ],
      fit: ["Engineering teams with repeated documentation tasks", "Operations teams using spreadsheets", "Small companies without dedicated IT automation"]
    },
    "ai-assistants": {
      value: [
        "Helps teams answer recurring questions with controlled internal knowledge",
        "Reduces time spent searching through documents and previous answers",
        "Supports customer service, training and documentation without overselling AI",
        "Keeps human review in the workflow where accuracy matters"
      ],
      fit: ["Technical support teams", "Training centers", "Documentation-heavy businesses", "Companies with internal knowledge bases"]
    },
    "reporting-automation": {
      value: [
        "Saves time on recurring weekly or monthly reports",
        "Reduces copy-paste errors between spreadsheets, files and dashboards",
        "Creates consistent report formats for management and project teams",
        "Makes reporting easier to repeat when data sources stay similar"
      ],
      fit: ["Project teams", "Operations managers", "Engineering reporting workflows", "Training or service businesses"]
    },
    "business-process-automation": {
      value: [
        "Turns repeated request handling into a clear digital process",
        "Reduces missed handovers, manual notifications and duplicated entries",
        "Makes responsibilities, statuses and next steps easier to see",
        "Keeps the process practical for small and mid-size teams"
      ],
      fit: ["Service companies", "Technical administration teams", "Training centers", "Small businesses with repeated internal processes"]
    },
    "custom-business-tools": {
      value: [
        "Replaces scattered spreadsheets with a focused internal tool",
        "Connects forms, user roles, data tables and dashboards in one place",
        "Gives teams a practical tool without starting a large software project",
        "Can be deployed, handed over and improved in controlled steps"
      ],
      fit: ["Operations teams", "Technical service providers", "Education and training organizations", "Companies needing one focused internal workflow"]
    },
    "data-processing-solutions": {
      value: [
        "Reduces repetitive cleanup and conversion of files or tables",
        "Makes data preparation more repeatable and easier to validate",
        "Creates traceable outputs instead of one-off manual edits",
        "Supports engineering, reporting and administrative data workflows"
      ],
      fit: ["Engineering teams", "Reporting workflows", "Operations teams", "Companies handling recurring CSV, Excel or technical data"]
    }
  };

  const german: Record<string, { value: string[]; fit: string[] }> = {
    "automation-audit-workflow-cleanup": {
      value: [
        "Zeigt vor der Umsetzung, wo Automatisierung wirklich Zeit spart",
        "Reduziert Tool-Chaos, doppelte Arbeit und unklare Uebergaben",
        "Schafft eine praktische Roadmap statt einzelner KI- oder Automatisierungsexperimente",
        "Hilft kleinen Teams zu entscheiden, was zuerst automatisiert werden sollte"
      ],
      fit: ["Unternehmen mit vielen Tabellen und manuellen Uebergaben", "Teams mit ersten Automatisierungsversuchen ohne klare Struktur", "Kleine Unternehmen vor der Investition in individuelle Tools"]
    },
    "workflow-automation": {
      value: [
        "Reduziert wiederkehrende manuelle Arbeit mit Dateien, Formularen und Übergaben",
        "Macht Routineabläufe leichter nachvollziehbar und leichter trainierbar",
        "Schafft wiederholbare Prozessschritte statt individueller Workarounds",
        "Verbessert Sichtbarkeit, wenn Aufgaben sonst über E-Mail oder Tabellen laufen"
      ],
      fit: ["Engineering-Teams mit wiederkehrender Dokumentationsarbeit", "Operations-Teams mit Tabellenworkflows", "Kleine Unternehmen ohne eigene IT-Automatisierung"]
    },
    "ai-assistants": {
      value: [
        "Hilft Teams, wiederkehrende Fragen mit kontrolliertem internem Wissen zu beantworten",
        "Reduziert Suchaufwand in Dokumenten und früheren Antworten",
        "Unterstützt Kundenservice, Training und Dokumentation ohne KI-Übertreibung",
        "Behält Human Review dort im Workflow, wo Genauigkeit wichtig ist"
      ],
      fit: ["Technische Support-Teams", "Bildungsträger", "Dokumentationsintensive Unternehmen", "Unternehmen mit internen Wissensbeständen"]
    },
    "reporting-automation": {
      value: [
        "Spart Zeit bei wiederkehrenden wöchentlichen oder monatlichen Reports",
        "Reduziert Copy-Paste-Fehler zwischen Tabellen, Dateien und Dashboards",
        "Schafft konsistente Reportformate für Management und Projektteams",
        "Macht Reporting leichter wiederholbar, wenn Datenquellen ähnlich bleiben"
      ],
      fit: ["Projektteams", "Operations Manager", "Engineering-Reporting-Workflows", "Trainings- oder Dienstleistungsunternehmen"]
    },
    "business-process-automation": {
      value: [
        "Macht wiederkehrende Anfragebearbeitung zu einem klaren digitalen Prozess",
        "Reduziert verpasste Übergaben, manuelle Benachrichtigungen und doppelte Eingaben",
        "Macht Verantwortlichkeiten, Status und nächste Schritte leichter sichtbar",
        "Bleibt praktisch für kleine und mittelständische Teams"
      ],
      fit: ["Dienstleistungsunternehmen", "Technische Administration", "Bildungsträger", "Kleine Unternehmen mit wiederkehrenden internen Prozessen"]
    },
    "custom-business-tools": {
      value: [
        "Ersetzt verstreute Tabellen durch ein fokussiertes internes Tool",
        "Verbindet Formulare, Rollen, Datentabellen und Dashboards an einem Ort",
        "Gibt Teams ein praktisches Tool ohne großes Softwareprojekt",
        "Kann kontrolliert deployed, übergeben und schrittweise verbessert werden"
      ],
      fit: ["Operations-Teams", "Technische Dienstleister", "Bildungs- und Trainingsorganisationen", "Unternehmen mit einem klaren internen Workflow"]
    },
    "data-processing-solutions": {
      value: [
        "Reduziert wiederkehrende Bereinigung und Konvertierung von Dateien oder Tabellen",
        "Macht Datenvorbereitung wiederholbarer und leichter validierbar",
        "Schafft nachvollziehbare Outputs statt einmaliger manueller Änderungen",
        "Unterstützt Engineering-, Reporting- und administrative Datenworkflows"
      ],
      fit: ["Engineering-Teams", "Reporting-Workflows", "Operations-Teams", "Unternehmen mit wiederkehrenden CSV-, Excel- oder technischen Daten"]
    }
  };

  const copy = (isGerman ? german : english)[product.id];
  if (!copy) return [];

  return [
    {
      title: isGerman ? "Business Value" : "Business Value",
      items: copy.value
    },
    {
      title: isGerman ? "Geeignet für" : "Best Fit",
      items: copy.fit
    }
  ];
}

function getEngineeringExtraSections(product: ServiceProduct, isGerman: boolean) {
  const english: Record<string, { value: string[]; fit: string[] }> = {
    "product-development-support": {
      value: [
        "Adds practical engineering capacity during development phases",
        "Turns technical ideas and updates into usable engineering information",
        "Supports overloaded teams without requiring a permanent hire",
        "Keeps CAD, documentation and review work connected"
      ],
      fit: ["Product development teams", "Engineering consultancies", "Small technical companies", "Teams preparing products for manufacturing"]
    },
    "mechanical-design-cad": {
      value: [
        "Provides production-ready CAD models, assemblies and drawings",
        "Supports design updates without disrupting the internal engineering team",
        "Improves handover quality for suppliers and manufacturing",
        "Connects mechanical design work with documentation and change control"
      ],
      fit: ["Mechanical design offices", "Industrial companies", "Aerospace suppliers", "Semiconductor equipment suppliers"]
    },
    "aerospace-structural-design-support": {
      value: [
        "Brings aerospace and aircraft interior experience into project-based work",
        "Supports structured CAD, drawings and technical review packages",
        "Helps teams with brackets, panels, interfaces and structural documentation",
        "Keeps aerospace work practical, traceable and review-ready"
      ],
      fit: ["Aerospace suppliers", "Aircraft interiors teams", "Engineering consultancies", "Teams needing temporary aircraft structures support"]
    },
    "semiconductor-equipment-engineering": {
      value: [
        "Supports special-purpose machinery work with practical mechanical design execution",
        "Helps prepare supplier-ready CAD, drawings and documentation updates",
        "Connects design updates, production feedback and technical clarification",
        "Useful where precision modules, interfaces and documentation quality matter"
      ],
      fit: ["Special-purpose machinery teams", "Semiconductor equipment suppliers", "Precision mechanical teams", "Technical suppliers with overloaded engineering capacity"]
    },
    "technical-documentation": {
      value: [
        "Turns engineering information into structured documents and review packages",
        "Reduces friction between engineering, suppliers and manufacturing",
        "Improves clarity for internal teams and external partners",
        "Supports revision discipline and project handover"
      ],
      fit: ["Documentation-heavy engineering teams", "Manufacturing support teams", "Aerospace suppliers", "Technical service companies"]
    },
    "design-changes-product-updates": {
      value: [
        "Keeps existing product data controlled during updates",
        "Supports CAD, drawings and documentation after production feedback",
        "Reduces engineering bottlenecks during serial or production phases",
        "Helps teams process changes without losing technical clarity"
      ],
      fit: ["Serial support teams", "Manufacturing engineering", "Industrial suppliers", "Aerospace and precision equipment teams"]
    },
    "supplier-manufacturing-coordination": {
      value: [
        "Improves technical communication between engineering and suppliers",
        "Helps convert feedback into clear action lists and document updates",
        "Reduces delays caused by unclear drawings, interfaces or requirements",
        "Supports practical manufacturing readiness"
      ],
      fit: ["Supplier-facing engineering teams", "Manufacturing companies", "Semiconductor equipment suppliers", "Industrial machinery teams"]
    },
    "engineering-contracting": {
      value: [
        "Adds temporary engineering capacity for defined work packages",
        "Works well for project peaks, documentation backlogs and design updates",
        "Supports remote or hybrid cooperation with clear deliverables",
        "Lets teams buy practical execution instead of a long hiring process"
      ],
      fit: ["Overloaded engineering teams", "Engineering consultancies", "Small and mid-size technical companies", "Companies needing project-based support"]
    }
  };

  const german: Record<string, { value: string[]; fit: string[] }> = {
    "product-development-support": {
      value: [
        "Ergaenzt praktische Engineering-Kapazitaet in Entwicklungsphasen",
        "Macht aus technischen Ideen und Anpassungen nutzbare Engineering-Informationen",
        "Unterstuetzt ausgelastete Teams ohne Festanstellung",
        "Verbindet CAD, Dokumentation und Review-Arbeit"
      ],
      fit: ["Produktentwicklungsteams", "Engineering-Beratungen", "Kleine technische Unternehmen", "Teams vor der Fertigungsvorbereitung"]
    },
    "mechanical-design-cad": {
      value: [
        "Liefert produktionsreife CAD-Modelle, Baugruppen und Zeichnungen",
        "Unterstuetzt Konstruktionsupdates ohne das interne Team zu blockieren",
        "Verbessert die Uebergabequalitaet fuer Lieferanten und Fertigung",
        "Verbindet mechanische Konstruktion mit Dokumentation und Change Control"
      ],
      fit: ["Mechanische Konstruktionsbueros", "Industrieunternehmen", "Luftfahrtzulieferer", "Zulieferer fuer Halbleiterausruestung"]
    },
    "aerospace-structural-design-support": {
      value: [
        "Bringt Luftfahrt- und Kabineninterieur-Erfahrung in projektbezogene Arbeit",
        "Unterstuetzt strukturierte CAD-Daten, Zeichnungen und Review-Pakete",
        "Hilft bei Halterungen, Paneelen, Schnittstellen und struktureller Dokumentation",
        "Haelt Aerospace-Arbeit praktisch, nachvollziehbar und review-faehig"
      ],
      fit: ["Luftfahrtzulieferer", "Aircraft-Interiors-Teams", "Engineering-Beratungen", "Teams mit temporaerem Struktur-Support"]
    },
    "semiconductor-equipment-engineering": {
      value: [
        "Unterstuetzt Sondermaschinenbau-Aufgaben mit praktischer mechanischer Konstruktionsumsetzung",
        "Hilft bei CAD-, Zeichnungs- und Dokumentationsupdates fuer Lieferanten",
        "Verbindet Designupdates, Produktionsfeedback und technische Klaerung",
        "Geeignet bei Praezisionsmodulen, Schnittstellen und hoher Dokumentationsqualitaet"
      ],
      fit: ["Sondermaschinenbau-Teams", "Zulieferer fuer Halbleiterausruestung", "Praezisionsmechanik-Teams", "Technische Zulieferer mit ausgelastetem Engineering"]
    },
    "technical-documentation": {
      value: [
        "Macht Engineering-Informationen zu strukturierten Dokumenten und Review-Paketen",
        "Reduziert Reibung zwischen Engineering, Lieferanten und Fertigung",
        "Verbessert Klarheit fuer interne Teams und externe Partner",
        "Unterstuetzt Revisionsdisziplin und Projektuebergabe"
      ],
      fit: ["Dokumentationsintensive Engineering-Teams", "Manufacturing Support", "Luftfahrtzulieferer", "Technische Dienstleister"]
    },
    "design-changes-product-updates": {
      value: [
        "Haelt bestehende Produktdaten bei Updates kontrolliert",
        "Unterstuetzt CAD, Zeichnungen und Dokumentation nach Produktionsfeedback",
        "Reduziert Engineering-Engpaesse in Serien- oder Produktionsphasen",
        "Hilft Teams, Aenderungen ohne Verlust technischer Klarheit umzusetzen"
      ],
      fit: ["Serienbetreuung", "Manufacturing Engineering", "Industriezulieferer", "Aerospace- und Praezisionsanlagen-Teams"]
    },
    "supplier-manufacturing-coordination": {
      value: [
        "Verbessert technische Kommunikation zwischen Engineering und Lieferanten",
        "Macht Feedback zu klaren Aktionslisten und Dokumentationsupdates",
        "Reduziert Verzoegerungen durch unklare Zeichnungen, Schnittstellen oder Anforderungen",
        "Unterstuetzt praktische Fertigungsreife"
      ],
      fit: ["Lieferantennahe Engineering-Teams", "Fertigungsunternehmen", "Zulieferer fuer Halbleiterausruestung", "Industriemaschinenbau"]
    },
    "engineering-contracting": {
      value: [
        "Ergaenzt temporaere Engineering-Kapazitaet fuer definierte Arbeitspakete",
        "Passt fuer Projektspitzen, Dokumentationsrueckstaende und Designupdates",
        "Unterstuetzt remote oder hybrid mit klaren Deliverables",
        "Ermoeglicht praktische Umsetzung ohne langen Hiring-Prozess"
      ],
      fit: ["Ausgelastete Engineering-Teams", "Engineering-Beratungen", "Kleine und mittlere technische Unternehmen", "Unternehmen mit projektbezogenem Supportbedarf"]
    }
  };

  const copy = (isGerman ? german : english)[product.id];
  if (!copy) return [];

  return [
    {
      title: isGerman ? "Business Value" : "Business Value",
      items: copy.value
    },
    {
      title: isGerman ? "Geeignet fuer" : "Best Fit",
      items: copy.fit
    }
  ];
}
