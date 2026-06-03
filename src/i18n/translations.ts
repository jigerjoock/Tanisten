import type { CardItem, DetailItem } from "../types/content";

export type Language = "en" | "de";

interface Translations {
  brand: {
    name: string;
    tagline: string;
    email: string;
    phone: string;
    location: string;
  };
  nav: {
    home: string;
    services: string;
    industries: string;
    about: string;
    contact: string;
  };
  common: {
    contact: string;
    services: string;
    why: string;
    projectInquiry: string;
    usefulProjectInfo: string;
    contactDetails: string;
    cooperationFormat: string;
    pageNotFound: string;
    pageNotFoundText: string;
    menu: string;
    phone: string;
    location: string;
  };
  seo: {
    homeTitle: string;
    homeDescription: string;
    servicesTitle: string;
    servicesDescription: string;
    industriesTitle: string;
    industriesDescription: string;
    aboutTitle: string;
    aboutDescription: string;
    contactTitle: string;
    contactDescription: string;
    notFoundTitle: string;
  };
  home: {
    heroHeadline: string;
    heroSubheadline: string;
    servicesEyebrow: string;
    servicesTitle: string;
    servicesDescription: string;
    engineeringGroupTitle: string;
    automationGroupTitle: string;
    engineeringItems: string[];
    automationItems: string[];
    industriesEyebrow: string;
    industriesTitle: string;
    whyEyebrow: string;
    whyTitle: string;
    contactTitle: string;
    contactText: string;
  };
  services: {
    heroEyebrow: string;
    heroTitle: string;
    heroSubtitle: string;
    engineeringTitle: string;
    automationTitle: string;
    contactTitle: string;
    contactText: string;
  };
  industries: {
    heroEyebrow: string;
    heroTitle: string;
    heroSubtitle: string;
    sectionTitle: string;
    sectionDescription: string;
    contactTitle: string;
    contactText: string;
  };
  about: {
    heroEyebrow: string;
    heroTitle: string;
    heroSubtitle: string;
    backgroundTitle: string;
    backgroundText1: string;
    backgroundText2: string;
    experienceTitle: string;
    contactTitle: string;
    contactText: string;
  };
  contact: {
    heroEyebrow: string;
    heroTitle: string;
    heroSubtitle: string;
    formTitle: string;
    name: string;
    company: string;
    email: string;
    projectType: string;
    selectProjectType: string;
    message: string;
    messagePlaceholder: string;
    submit: string;
    projectTypes: string[];
    infoItems: string[];
    cooperationText: string;
  };
  footer: {
    text: string;
    quickLinks: string;
    technicalFocus: string;
    technicalFocusText: string;
  };
  cards: {
    homeIndustries: CardItem[];
    whyTanisten: CardItem[];
    engineeringServices: CardItem[];
    automationServices: CardItem[];
    industries: CardItem[];
    experience: CardItem[];
  };
  faq: {
    title: string;
    items: DetailItem[];
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    brand: {
      name: "Tanisten",
      tagline: "Engineering • Automation • Digital Solutions",
      email: "info@tanisten.com",
      phone: "+996 XXX XXX XXX",
      location: "Germany / Kyrgyzstan / Remote"
    },
    nav: {
      home: "Home",
      services: "Services",
      industries: "Industries",
      about: "About",
      contact: "Contact"
    },
    common: {
      contact: "Contact",
      services: "Services",
      why: "Why Tanisten",
      projectInquiry: "Project Inquiry",
      usefulProjectInfo: "Useful Project Information",
      contactDetails: "Contact Details",
      cooperationFormat: "Cooperation Format",
      pageNotFound: "Page not found",
      pageNotFoundText: "The page you are looking for does not exist.",
      menu: "Menu",
      phone: "Phone",
      location: "Location"
    },
    seo: {
      homeTitle: "Tanisten | Engineering, Automation & Digital Solutions",
      homeDescription:
        "Tanisten supports companies with mechanical engineering, CAD development, technical documentation, aerospace and semiconductor engineering, and workflow automation.",
      servicesTitle: "Services | Tanisten",
      servicesDescription:
        "Engineering and automation services from Tanisten: CAD, documentation, engineering contracting, workflow automation, Python tools and internal web applications.",
      industriesTitle: "Industries | Tanisten",
      industriesDescription:
        "Tanisten supports aerospace, semiconductor equipment, industrial machinery, precision mechanical systems, engineering education and technical documentation.",
      aboutTitle: "About | Tanisten",
      aboutDescription:
        "Tanisten is a technical consulting initiative built on practical engineering and automation experience.",
      contactTitle: "Contact | Tanisten",
      contactDescription: "Contact Tanisten for engineering, automation, digital solutions and technical documentation.",
      notFoundTitle: "Page Not Found | Tanisten"
    },
    home: {
      heroHeadline: "Engineering & Automation for Technical Projects",
      heroSubheadline:
        "Supporting engineering teams with mechanical design, CAD development, technical documentation, workflow automation and digital solutions.",
      servicesEyebrow: "Services",
      servicesTitle: "Engineering and automation support in two clear service groups",
      servicesDescription:
        "Tanisten focuses on practical technical work for engineering teams, technical suppliers and companies improving repetitive workflows.",
      engineeringGroupTitle: "Engineering",
      automationGroupTitle: "Automation",
      engineeringItems: ["Mechanical Design", "CAD Development", "Technical Documentation", "Engineering Contracting"],
      automationItems: ["Engineering Automation", "AI Workflow Tools", "Python Solutions", "Internal Web Applications"],
      industriesEyebrow: "Industries",
      industriesTitle: "Industry focus for technical work",
      whyEyebrow: "Why Tanisten",
      whyTitle: "A practical technical partner for engineering and automation work",
      contactTitle: "Discuss a technical project with Tanisten",
      contactText:
        "Send a short project description, current technical need and expected deliverables. We will respond with a practical next step."
    },
    services: {
      heroEyebrow: "Services",
      heroTitle: "Engineering, automation and digital technical solutions",
      heroSubtitle:
        "Services are organized around three directions: engineering support, automation of repetitive workflows and practical digital tools for technical teams.",
      engineeringTitle: "Engineering",
      automationTitle: "Automation",
      contactTitle: "Need support for an engineering or automation work package?",
      contactText:
        "Share the scope, current workflow, tools in use and expected output. Tanisten can help define a clear technical work package."
    },
    industries: {
      heroEyebrow: "Industries",
      heroTitle: "Technical support for engineering-driven industries",
      heroSubtitle:
        "Tanisten supports companies where engineering detail, documentation quality and workflow discipline matter.",
      sectionTitle: "Industries served",
      sectionDescription:
        "The focus is practical and technical: engineering support, documentation, automation and digital tools for selected industrial environments.",
      contactTitle: "Discuss support for your industry or project phase",
      contactText: "Send the project area, current technical need and preferred cooperation model."
    },
    about: {
      heroEyebrow: "About",
      heroTitle: "Built around practical engineering and automation experience",
      heroSubtitle:
        "Tanisten is a technical consulting initiative for companies that need engineering support, automation and digital technical solutions.",
      backgroundTitle: "Real technical experience behind the company",
      backgroundText1:
        "Tanisten combines mechanical and aviation engineering background with practical experience in aircraft structures and interiors, semiconductor equipment development, high-precision mechanical systems, CAD, technical documentation and engineering automation.",
      backgroundText2:
        "The company is also built around practical digital work: AI assistants, Python tools, websites, internal web applications and server setup. The background includes Germany and international engineering education and project environments.",
      experienceTitle: "Experience areas",
      contactTitle: "Work with a technical partner for practical execution",
      contactText:
        "Tanisten can support defined engineering, automation, documentation and digital solution work packages."
    },
    contact: {
      heroEyebrow: "Contact",
      heroTitle: "Contact Tanisten",
      heroSubtitle:
        "Send a short description of the technical task, expected deliverables, tools involved and project timing.",
      formTitle: "Contact Form",
      name: "Name",
      company: "Company",
      email: "Email",
      projectType: "Project Type",
      selectProjectType: "Select project type",
      message: "Message",
      messagePlaceholder: "Describe the project scope, current challenge, tools, expected deliverables and timeline.",
      submit: "Send Inquiry",
      projectTypes: ["Engineering", "Automation", "Digital Solutions", "Technical Documentation", "Other"],
      infoItems: [
        "Required engineering or workflow area",
        "CAD, documentation, automation or digital tools currently used",
        "Expected deliverables and review process",
        "Project timing, workload level and cooperation preference"
      ],
      cooperationText:
        "Remote and hybrid cooperation can be arranged for defined work packages, engineering support, automation projects, digital tools and technical documentation."
    },
    footer: {
      text: "Independent technical consulting for engineering, automation and digital solutions.",
      quickLinks: "Quick Links",
      technicalFocus: "Technical Focus",
      technicalFocusText:
        "Engineering support, workflow automation and digital technical tools for companies that need practical execution."
    },
    cards: {
      homeIndustries: [
        { title: "Aerospace", description: "Support for aircraft structures, interiors, documentation and technical workflows." },
        { title: "Semiconductor Equipment", description: "Engineering support for precision equipment, modules and production updates." },
        { title: "Industrial Machinery", description: "CAD, documentation and automation support for machine builders and suppliers." },
        { title: "Engineering Education & Training", description: "Digital learning tools, technical assistants and structured training workflows." }
      ],
      whyTanisten: [
        { title: "Practical engineering experience", description: "Work is grounded in real mechanical, aviation and documentation tasks." },
        { title: "Aerospace and semiconductor background", description: "Experience with aircraft structures, interiors and precision semiconductor equipment." },
        { title: "Engineering plus automation", description: "Mechanical and technical work can be connected with scripts, tools and internal applications." },
        { title: "Flexible remote cooperation", description: "Project-based support with clear inputs, reviews, open points and handover." },
        { title: "Clear technical communication", description: "Structured communication for engineers, suppliers and technical decision-makers." }
      ],
      engineeringServices: [
        { title: "Mechanical Design & CAD", description: "Component design, assemblies, layouts, CAD models, drawings and design updates.", accent: "engineering" },
        { title: "Structural Design Support", description: "Support for brackets, panels, load paths, installation details and structural packages.", accent: "engineering" },
        { title: "Product Development Support", description: "Practical engineering execution from early layouts to production-ready information.", accent: "engineering" },
        { title: "Technical Documentation", description: "Technical documents, drawing packages, work instructions, reports and structured content.", accent: "engineering" },
        { title: "Engineering Contracting", description: "Temporary and project-based engineering capacity for overloaded technical teams.", accent: "engineering" },
        { title: "Production / Serial Support", description: "Support for design updates, production questions, nonconformance follow-up and documentation.", accent: "engineering" }
      ],
      automationServices: [
        { title: "Engineering Workflow Automation", description: "Automation for repetitive calculations, templates, reports, data handling and documentation.", accent: "automation" },
        { title: "AI-Assisted Documentation", description: "Controlled support for drafting, organizing, summarizing and searching technical documents.", accent: "automation" },
        { title: "Python Tools", description: "Python utilities for technical data, file handling, templates, reports and internal processes.", accent: "automation" },
        { title: "Internal Web Tools", description: "Browser-based calculators, forms, dashboards and lightweight internal technical applications.", accent: "automation" },
        { title: "Browser Extensions", description: "Small workflow helpers for repeated browser tasks, data capture and internal processes.", accent: "automation" },
        { title: "Server Setup & Deployment", description: "Deployment and hosting support for internal tools and technical web applications.", accent: "automation" },
        { title: "Digital Learning Tools", description: "Training workflows, structured learning content and technical education assistants.", accent: "automation" }
      ],
      industries: [
        { title: "Aerospace & Aircraft Structures", description: "Engineering support for structures, brackets, panels, fittings and documentation." },
        { title: "Aircraft Interiors", description: "Support for interior systems, installation details, CAD updates and technical records." },
        { title: "Semiconductor Equipment", description: "Support for precision modules, equipment updates, tooling and production documentation." },
        { title: "Precision Mechanical Systems", description: "Work for systems where interfaces, tolerances and documentation quality matter." },
        { title: "Industrial Machinery", description: "Technical support for machine builders, suppliers and production-related updates." },
        { title: "Engineering Education", description: "Digital tools and training workflows for technical education and internal learning." }
      ],
      experience: [
        { title: "Mechanical and aviation engineering background", description: "Experience base across engineering education and technical project environments." },
        { title: "Aircraft structures and interiors", description: "Practical work connected to structural and interior engineering contexts." },
        { title: "Semiconductor equipment development", description: "Experience with high-precision equipment and technical documentation requirements." },
        { title: "CAD and technical documentation", description: "CAD execution, drawings, structured technical content and engineering change support." },
        { title: "Engineering automation", description: "Automation of technical workflows using practical scripts and internal tools." },
        { title: "AI, Python, websites and servers", description: "AI assistants, Python tools, websites, web applications and server setup." }
      ]
    },
    faq: {
      title: "FAQ",
      items: [
        { title: "Do you work remotely?", text: "Yes. Tanisten supports remote and hybrid cooperation for defined technical work packages." },
        { title: "Do you support short-term projects?", text: "Yes. Work can be scoped around short assignments, specific deliverables or temporary capacity." },
        { title: "Can you support existing engineering teams?", text: "Yes. Tanisten can support internal engineering teams, consultancies, suppliers and design offices." },
        { title: "Do you provide automation solutions for engineering workflows?", text: "Yes. Tanisten builds practical tools for repetitive technical and documentation workflows." },
        { title: "Which industries do you support?", text: "Tanisten supports aerospace, semiconductor equipment, industrial machinery, precision systems, education and documentation." }
      ]
    }
  },
  de: {
    brand: {
      name: "Tanisten",
      tagline: "Engineering • Automatisierung • Digitale Lösungen",
      email: "info@tanisten.com",
      phone: "+996 XXX XXX XXX",
      location: "Deutschland / Kirgisistan / Remote"
    },
    nav: {
      home: "Start",
      services: "Leistungen",
      industries: "Branchen",
      about: "Über uns",
      contact: "Kontakt"
    },
    common: {
      contact: "Kontakt",
      services: "Leistungen",
      why: "Warum Tanisten",
      projectInquiry: "Projektanfrage",
      usefulProjectInfo: "Hilfreiche Projektinformationen",
      contactDetails: "Kontaktdaten",
      cooperationFormat: "Zusammenarbeit",
      pageNotFound: "Seite nicht gefunden",
      pageNotFoundText: "Die gesuchte Seite existiert nicht.",
      menu: "Menü",
      phone: "Telefon",
      location: "Standort"
    },
    seo: {
      homeTitle: "Tanisten | Engineering, Automatisierung & Digitale Lösungen",
      homeDescription:
        "Tanisten unterstützt Unternehmen bei mechanischer Konstruktion, CAD-Entwicklung, technischer Dokumentation, Luft- und Raumfahrttechnik, Halbleitertechnik und Workflow-Automatisierung.",
      servicesTitle: "Leistungen | Tanisten",
      servicesDescription:
        "Engineering- und Automatisierungsleistungen von Tanisten: CAD, Dokumentation, Engineering Contracting, Workflow-Automatisierung, Python-Tools und interne Webanwendungen.",
      industriesTitle: "Branchen | Tanisten",
      industriesDescription:
        "Tanisten unterstützt Luft- und Raumfahrt, Halbleiterausrüstung, Industriemaschinen, Präzisionssysteme, Engineering-Ausbildung und technische Dokumentation.",
      aboutTitle: "Über uns | Tanisten",
      aboutDescription:
        "Tanisten ist eine technische Consulting-Initiative auf Basis praktischer Engineering- und Automatisierungserfahrung.",
      contactTitle: "Kontakt | Tanisten",
      contactDescription: "Kontaktieren Sie Tanisten für Engineering, Automatisierung, digitale Lösungen und technische Dokumentation.",
      notFoundTitle: "Seite nicht gefunden | Tanisten"
    },
    home: {
      heroHeadline: "Engineering & Automatisierung für technische Projekte",
      heroSubheadline:
        "Tanisten unterstützt Engineering-Teams bei mechanischer Konstruktion, technischer Dokumentation, Luft- und Raumfahrttechnik, Halbleitertechnik und der Automatisierung technischer Workflows.",
      servicesEyebrow: "Leistungen",
      servicesTitle: "Engineering- und Automatisierungsunterstützung in zwei klaren Leistungsgruppen",
      servicesDescription:
        "Tanisten konzentriert sich auf praktische technische Arbeit für Engineering-Teams, technische Zulieferer und Unternehmen, die wiederholbare Workflows verbessern möchten.",
      engineeringGroupTitle: "Engineering",
      automationGroupTitle: "Automatisierung",
      engineeringItems: ["Mechanische Konstruktion", "CAD-Entwicklung", "Technische Dokumentation", "Engineering Contracting"],
      automationItems: ["Engineering-Automatisierung", "AI-Workflow-Tools", "Python-Lösungen", "Interne Webanwendungen"],
      industriesEyebrow: "Branchen",
      industriesTitle: "Branchenfokus für technische Arbeit",
      whyEyebrow: "Warum Tanisten",
      whyTitle: "Ein praktischer technischer Partner für Engineering und Automatisierung",
      contactTitle: "Besprechen Sie ein technisches Projekt mit Tanisten",
      contactText:
        "Senden Sie eine kurze Projektbeschreibung, den aktuellen technischen Bedarf und die erwarteten Ergebnisse. Wir antworten mit einem praktikablen nächsten Schritt."
    },
    services: {
      heroEyebrow: "Leistungen",
      heroTitle: "Engineering, Automatisierung und digitale technische Lösungen",
      heroSubtitle:
        "Die Leistungen sind um drei Richtungen strukturiert: Engineering-Unterstützung, Automatisierung wiederholbarer Workflows und praktische digitale Tools für technische Teams.",
      engineeringTitle: "Engineering",
      automationTitle: "Automatisierung",
      contactTitle: "Benötigen Sie Unterstützung für ein Engineering- oder Automatisierungspaket?",
      contactText:
        "Teilen Sie Umfang, aktuellen Workflow, eingesetzte Tools und erwartete Ergebnisse. Tanisten kann helfen, ein klares technisches Arbeitspaket zu definieren."
    },
    industries: {
      heroEyebrow: "Branchen",
      heroTitle: "Technische Unterstützung für engineering-geprägte Branchen",
      heroSubtitle:
        "Tanisten unterstützt Unternehmen, bei denen Engineering-Details, Dokumentationsqualität und Workflow-Disziplin entscheidend sind.",
      sectionTitle: "Branchen",
      sectionDescription:
        "Der Fokus ist praktisch und technisch: Engineering-Unterstützung, Dokumentation, Automatisierung und digitale Tools für ausgewählte industrielle Umgebungen.",
      contactTitle: "Besprechen Sie Unterstützung für Ihre Branche oder Projektphase",
      contactText: "Senden Sie den Projektbereich, den aktuellen technischen Bedarf und das bevorzugte Kooperationsmodell."
    },
    about: {
      heroEyebrow: "Über uns",
      heroTitle: "Aufgebaut auf praktischer Engineering- und Automatisierungserfahrung",
      heroSubtitle:
        "Tanisten ist eine technische Consulting-Initiative für Unternehmen, die Engineering-Unterstützung, Automatisierung und digitale technische Lösungen benötigen.",
      backgroundTitle: "Echte technische Erfahrung als Grundlage",
      backgroundText1:
        "Tanisten verbindet einen Hintergrund in Maschinenbau und Luftfahrttechnik mit praktischer Erfahrung in Flugzeugstrukturen und Innenausstattung, Halbleiterausrüstung, hochpräzisen mechanischen Systemen, CAD, technischer Dokumentation und Engineering-Automatisierung.",
      backgroundText2:
        "Die Initiative ist außerdem auf praktische digitale Arbeit ausgerichtet: AI-Assistenten, Python-Tools, Websites, interne Webanwendungen und Server-Setup. Der Hintergrund umfasst Deutschland sowie internationale Engineering-Ausbildung und Projektumgebungen.",
      experienceTitle: "Erfahrungsbereiche",
      contactTitle: "Arbeiten Sie mit einem technischen Partner für praktische Umsetzung",
      contactText:
        "Tanisten kann definierte Arbeitspakete in Engineering, Automatisierung, Dokumentation und digitalen Lösungen unterstützen."
    },
    contact: {
      heroEyebrow: "Kontakt",
      heroTitle: "Kontakt zu Tanisten",
      heroSubtitle:
        "Senden Sie eine kurze Beschreibung der technischen Aufgabe, der erwarteten Ergebnisse, der eingesetzten Tools und des Projektzeitplans.",
      formTitle: "Kontaktformular",
      name: "Name",
      company: "Unternehmen",
      email: "E-Mail",
      projectType: "Projekttyp",
      selectProjectType: "Projekttyp auswählen",
      message: "Nachricht",
      messagePlaceholder: "Beschreiben Sie Projektumfang, aktuelle Herausforderung, Tools, erwartete Ergebnisse und Zeitplan.",
      submit: "Anfrage senden",
      projectTypes: ["Engineering", "Automatisierung", "Digitale Lösungen", "Technische Dokumentation", "Sonstiges"],
      infoItems: [
        "Erforderlicher Engineering- oder Workflow-Bereich",
        "Aktuell genutzte CAD-, Dokumentations-, Automatisierungs- oder Digital-Tools",
        "Erwartete Ergebnisse und Review-Prozess",
        "Projektzeitpunkt, Auslastung und gewünschtes Kooperationsmodell"
      ],
      cooperationText:
        "Remote- und hybride Zusammenarbeit ist für definierte Arbeitspakete, Engineering-Unterstützung, Automatisierungsprojekte, digitale Tools und technische Dokumentation möglich."
    },
    footer: {
      text: "Unabhängiges technisches Consulting für Engineering, Automatisierung und digitale Lösungen.",
      quickLinks: "Navigation",
      technicalFocus: "Technischer Fokus",
      technicalFocusText:
        "Engineering-Unterstützung, Workflow-Automatisierung und digitale technische Tools für Unternehmen, die praktische Umsetzung benötigen."
    },
    cards: {
      homeIndustries: [
        { title: "Luft- und Raumfahrt", description: "Unterstützung für Strukturen, Innenausstattung, Dokumentation und technische Workflows." },
        { title: "Halbleiterausrüstung", description: "Engineering-Unterstützung für Präzisionsausrüstung, Module und Produktionsupdates." },
        { title: "Industriemaschinen", description: "CAD-, Dokumentations- und Automatisierungsunterstützung für Maschinenbauer und Zulieferer." },
        { title: "Engineering-Ausbildung & Training", description: "Digitale Lernwerkzeuge, technische Assistenten und strukturierte Trainings-Workflows." }
      ],
      whyTanisten: [
        { title: "Praktische Engineering-Erfahrung", description: "Die Arbeit basiert auf realen mechanischen, luftfahrttechnischen und dokumentationsbezogenen Aufgaben." },
        { title: "Aerospace- und Halbleiter-Hintergrund", description: "Erfahrung mit Flugzeugstrukturen, Innenausstattung und präziser Halbleiterausrüstung." },
        { title: "Engineering plus Automatisierung", description: "Mechanische und technische Arbeit kann mit Skripten, Tools und internen Anwendungen verbunden werden." },
        { title: "Flexible Remote-Zusammenarbeit", description: "Projektbasierte Unterstützung mit klaren Inputs, Reviews, offenen Punkten und Übergabe." },
        { title: "Klare technische Kommunikation", description: "Strukturierte Kommunikation für Engineering-Teams, Zulieferer und technische Entscheider." }
      ],
      engineeringServices: [
        { title: "Mechanische Konstruktion & CAD", description: "Komponentenkonstruktion, Baugruppen, Layouts, CAD-Modelle, Zeichnungen und Designupdates.", accent: "engineering" },
        { title: "Strukturelle Konstruktionsunterstützung", description: "Unterstützung für Halterungen, Panels, Lastpfade, Einbaudetails und Strukturpakete.", accent: "engineering" },
        { title: "Produktentwicklungsunterstützung", description: "Praktische Engineering-Umsetzung von frühen Layouts bis zu produktionsreifen Informationen.", accent: "engineering" },
        { title: "Technische Dokumentation", description: "Technische Dokumente, Zeichnungspakete, Arbeitsanweisungen, Berichte und strukturierte Inhalte.", accent: "engineering" },
        { title: "Engineering Contracting", description: "Temporäre und projektbasierte Engineering-Kapazität für ausgelastete technische Teams.", accent: "engineering" },
        { title: "Produktions- / Serienunterstützung", description: "Unterstützung bei Designupdates, Produktionsfragen, Abweichungen und Dokumentation.", accent: "engineering" }
      ],
      automationServices: [
        { title: "Engineering-Workflow-Automatisierung", description: "Automatisierung wiederholbarer Berechnungen, Vorlagen, Berichte, Datenverarbeitung und Dokumentation.", accent: "automation" },
        { title: "AI-gestützte Dokumentation", description: "Kontrollierte Unterstützung beim Erstellen, Strukturieren, Zusammenfassen und Durchsuchen technischer Dokumente.", accent: "automation" },
        { title: "Python-Tools", description: "Python-Utilities für technische Daten, Dateien, Vorlagen, Berichte und interne Prozesse.", accent: "automation" },
        { title: "Interne Web-Tools", description: "Browserbasierte Rechner, Formulare, Dashboards und schlanke interne technische Anwendungen.", accent: "automation" },
        { title: "Browser Extensions", description: "Kleine Workflow-Helfer für wiederholte Browseraufgaben, Datenerfassung und interne Prozesse.", accent: "automation" },
        { title: "Server-Setup & Deployment", description: "Deployment- und Hosting-Unterstützung für interne Tools und technische Webanwendungen.", accent: "automation" },
        { title: "Digitale Lernwerkzeuge", description: "Trainings-Workflows, strukturierte Lerninhalte und technische Bildungsassistenten.", accent: "automation" }
      ],
      industries: [
        { title: "Luft- und Raumfahrt & Flugzeugstrukturen", description: "Engineering-Unterstützung für Strukturen, Halterungen, Panels, Fittings und Dokumentation." },
        { title: "Flugzeuginterieurs", description: "Unterstützung für Innenraumsysteme, Einbaudetails, CAD-Updates und technische Unterlagen." },
        { title: "Halbleiterausrüstung", description: "Unterstützung für Präzisionsmodule, Ausrüstungsupdates, Tooling und Produktionsdokumentation." },
        { title: "Präzise mechanische Systeme", description: "Arbeit für Systeme, bei denen Schnittstellen, Toleranzen und Dokumentationsqualität wichtig sind." },
        { title: "Industriemaschinen", description: "Technische Unterstützung für Maschinenbauer, Zulieferer und produktionsnahe Updates." },
        { title: "Engineering-Ausbildung", description: "Digitale Tools und Trainings-Workflows für technische Ausbildung und internes Lernen." }
      ],
      experience: [
        { title: "Maschinenbau- und Luftfahrttechnik-Hintergrund", description: "Erfahrungsbasis aus Engineering-Ausbildung und technischen Projektumgebungen." },
        { title: "Flugzeugstrukturen und Innenausstattung", description: "Praktische Arbeit im Kontext struktureller und innenraumbezogener Engineering-Aufgaben." },
        { title: "Entwicklung von Halbleiterausrüstung", description: "Erfahrung mit hochpräziser Ausrüstung und Anforderungen an technische Dokumentation." },
        { title: "CAD und technische Dokumentation", description: "CAD-Umsetzung, Zeichnungen, strukturierte technische Inhalte und Änderungsunterstützung." },
        { title: "Engineering-Automatisierung", description: "Automatisierung technischer Workflows mit praktischen Skripten und internen Tools." },
        { title: "AI, Python, Websites und Server", description: "AI-Assistenten, Python-Tools, Websites, Webanwendungen und Server-Setup." }
      ]
    },
    faq: {
      title: "FAQ",
      items: [
        { title: "Arbeiten Sie remote?", text: "Ja. Tanisten unterstützt Remote- und hybride Zusammenarbeit für definierte technische Arbeitspakete." },
        { title: "Unterstützen Sie kurzfristige Projekte?", text: "Ja. Arbeit kann um kurze Einsätze, konkrete Deliverables oder temporäre Kapazität herum strukturiert werden." },
        { title: "Können Sie bestehende Engineering-Teams unterstützen?", text: "Ja. Tanisten kann interne Engineering-Teams, Beratungen, Zulieferer und Konstruktionsbüros unterstützen." },
        { title: "Bieten Sie Automatisierung für Engineering-Workflows an?", text: "Ja. Tanisten entwickelt praktische Tools für wiederholbare technische und dokumentationsbezogene Workflows." },
        { title: "Welche Branchen unterstützen Sie?", text: "Tanisten unterstützt Luft- und Raumfahrt, Halbleiterausrüstung, Industriemaschinen, Präzisionssysteme, Ausbildung und Dokumentation." }
      ]
    }
  }
};
