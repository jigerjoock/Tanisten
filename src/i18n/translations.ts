import type { CardItem, DetailItem } from "../types/content";
import type { ServiceCatalogContent } from "../types/serviceCatalog";

export type Language = "en" | "de";
export type ServiceDirectionAccent = "engineering" | "automation" | "digital";

export interface ServiceDirection {
  title: string;
  accent: ServiceDirectionAccent;
  description: string;
  services: string[];
  projects: string[];
}

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
    typicalProjectsLabel: string;
    serviceDirections: ServiceDirection[];
    engineeringGroupTitle: string;
    automationGroupTitle: string;
    engineeringItems: string[];
    automationItems: string[];
    industriesEyebrow: string;
    industriesTitle: string;
    whyEyebrow: string;
    whyTitle: string;
    whyDescription: string;
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
    catalog: ServiceCatalogContent;
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
      servicesTitle: "What We Do",
      servicesDescription:
        "Practical engineering, automation and digital solutions for technical businesses.",
      typicalProjectsLabel: "Typical projects",
      serviceDirections: [
        {
          title: "Engineering",
          accent: "engineering",
          description: "",
          services: [
            "Product Development Support",
            "Mechanical Design & CAD",
            "Technical Documentation",
            "Supplier Coordination",
            "Engineering Contracting"
          ],
          projects: [
            "New product development support",
            "Production-ready CAD models and drawings",
            "Design changes for existing products",
            "Manufacturing documentation packages",
            "Supplier and production coordination"
          ]
        },
        {
          title: "Automation",
          accent: "automation",
          description: "",
          services: [
            "Workflow Automation",
            "AI Assistants",
            "Reporting Automation",
            "Process Automation",
            "Custom Business Tools"
          ],
          projects: [
            "AI customer support assistants",
            "Automated reporting systems",
            "Internal knowledge assistants",
            "Engineering workflow automation",
            "Business process optimization"
          ]
        },
        {
          title: "Digital Solutions",
          accent: "digital",
          description: "",
          services: [
            "Business Portals",
            "Company Websites",
            "Customer Platforms",
            "Booking Systems",
            "Internal Company Tools"
          ],
          projects: [
            "Company websites and landing pages",
            "Medical practice booking systems",
            "Customer self-service portals",
            "Employee portals",
            "Dashboards and reporting platforms"
          ]
        }
      ],
      engineeringGroupTitle: "Engineering",
      automationGroupTitle: "Automation",
      engineeringItems: ["Mechanical Design", "CAD Development", "Technical Documentation", "Engineering Contracting"],
      automationItems: ["Engineering Automation", "AI Workflow Tools", "Python Solutions", "Internal Web Applications"],
      industriesEyebrow: "Industries",
      industriesTitle: "Industry focus for technical work",
      whyEyebrow: "Why Tanisten",
      whyTitle: "A practical technical partner for engineering and automation work",
      whyDescription: "Engineering expertise combined with automation and digital solutions.",
      contactTitle: "Discuss a technical project with Tanisten",
      contactText:
        "Send a short project description, current technical need and expected deliverables. We will respond with a practical next step."
    },
    services: {
      heroEyebrow: "Services",
      heroTitle: "Engineering, automation and digital solutions catalog",
      heroSubtitle:
        "Browse Tanisten service categories, select a product and review structured technical detail for engineering, automation and digital work.",
      engineeringTitle: "Engineering",
      automationTitle: "Automation",
      contactTitle: "Need this type of support?",
      contactText:
        "Contact Tanisten with a short description of the current task, project phase and expected output.",
      catalog: {
        heroEyebrow: "Services",
        heroTitle: "Engineering, automation and digital solutions catalog",
        heroSubtitle:
          "Browse Tanisten service categories, select a product and review structured technical detail for engineering, automation and digital work.",
        catalogEyebrow: "Service catalog",
        catalogTitle: "Browse by category and product",
        catalogDescription:
          "The catalog keeps navigation and details visible at the same time. Select a product on the left to review the technical scope on the right.",
        directionLabel: "Service direction",
        navigationTitle: "Service navigation",
        detailsTitle: "Selected service details",
        selectTitle: "Select a service to view details.",
        selectText: "Choose a product from the service navigation to open its technical detail panel.",
        productSelectTitle: "Select a product to view technical details.",
        contactLabel: "Contact Tanisten",
        defaultProductId: "mechanical-design-cad",
        categories: [
          {
            id: "engineering",
            title: "Engineering",
            description:
              "Practical engineering support for product development, technical documentation and manufacturing projects.",
            products: [
              {
                id: "product-development-support",
                title: "Product Development Support",
                description:
                  "Support for technical teams during product development, design updates and production preparation.",
                sections: {
                  description: {
                    title: "Description",
                    items: ["Project-based support from early technical concepts to production-ready engineering information."]
                  },
                  typicalTasks: {
                    title: "Typical Tasks",
                    items: ["Early design support", "Product updates", "Design reviews", "Production readiness"]
                  },
                  deliverables: {
                    title: "Deliverables",
                    items: ["CAD packages", "Drawing updates", "Documentation packages", "Review notes"]
                  },
                  methods: {
                    title: "Methods & Standards",
                    badge: true,
                    items: ["Structured engineering workflow", "Design review process", "DFM approach"]
                  },
                  tools: {
                    title: "Software & Tools",
                    badge: true,
                    items: ["CATIA V5", "SolidWorks", "Siemens NX", "Technical documentation tools"]
                  },
                  industries: {
                    title: "Relevant Industries",
                    items: ["Aerospace", "Semiconductor Equipment", "Industrial Machinery"]
                  }
                },
                cta: "Need product development support? Contact Tanisten."
              },
              {
                id: "mechanical-design-cad",
                title: "Mechanical Design & CAD",
                description:
                  "Mechanical design support for components, assemblies, layouts and production-ready engineering data.",
                sections: {
                  description: {
                    title: "Description",
                    items: [
                      "Mechanical design and CAD execution for technical teams that need usable models, drawings and structured engineering data."
                    ]
                  },
                  typicalTasks: {
                    title: "Typical Tasks",
                    items: [
                      "Component design",
                      "Assembly development",
                      "Layout updates",
                      "Interface definition",
                      "Design modifications"
                    ]
                  },
                  deliverables: {
                    title: "Deliverables",
                    items: [
                      "3D CAD models",
                      "Assembly structures",
                      "Manufacturing drawings",
                      "Technical documentation",
                      "Supplier-ready technical data"
                    ]
                  },
                  methods: {
                    title: "Methods & Standards",
                    badge: true,
                    items: ["DIN", "ISO", "GD&T", "DFM", "Basic hand calculations"]
                  },
                  tools: {
                    title: "Software & Tools",
                    badge: true,
                    items: ["CATIA V5", "SolidWorks", "Creo", "Siemens NX", "AutoCAD"]
                  },
                  industries: {
                    title: "Relevant Industries",
                    items: ["Aerospace", "Semiconductor Equipment", "Industrial Machinery", "Precision Mechanical Systems"]
                  }
                },
                cta: "Need this type of support? Contact Tanisten."
              },
              {
                id: "aerospace-structural-design-support",
                title: "Aerospace & Structural Design Support",
                description:
                  "Engineering support for aircraft structures, interiors, brackets, panels and structural documentation tasks.",
                sections: {
                  description: {
                    title: "Description",
                    items: ["Project-based support for aerospace and aircraft interior work where structured CAD data, design updates and technical documentation are required."]
                  },
                  typicalTasks: {
                    title: "Typical Tasks",
                    items: ["Bracket and panel design support", "Aircraft interior layouts", "Structural detail updates", "Interface checks", "Drawing package preparation"]
                  },
                  deliverables: {
                    title: "Deliverables",
                    items: ["3D CAD models", "2D drawings", "Assembly and installation data", "Design update notes", "Technical review packages"]
                  },
                  methods: {
                    title: "Methods & Standards",
                    badge: true,
                    items: ["Aerospace documentation discipline", "Interface control", "Design review", "Basic structural reasoning"]
                  },
                  tools: {
                    title: "Software & Tools",
                    badge: true,
                    items: ["CATIA V5", "Siemens NX", "CAD viewers", "Office tools"]
                  },
                  industries: {
                    title: "Relevant Industries",
                    items: ["Aircraft structures", "Aircraft interiors", "Aerospace suppliers", "Engineering consultancies"]
                  }
                },
                cta: "Need aerospace engineering support? Contact Tanisten."
              },
              {
                id: "semiconductor-equipment-engineering",
                title: "Special Machinery & Semiconductor Equipment",
                description:
                  "Mechanical design support for special-purpose machinery, precision equipment modules, documentation and production updates.",
                sections: {
                  description: {
                    title: "Description",
                    items: ["Project-based support as a mechanical designer within existing engineering teams working on special-purpose machinery, precision modules and semiconductor equipment-related systems."]
                  },
                  typicalTasks: {
                    title: "Typical Tasks",
                    items: ["CAD design support", "Machine module updates", "Fixture and bracket details", "Interface clarification", "Production feedback handling"]
                  },
                  deliverables: {
                    title: "Deliverables",
                    items: ["CAD models and assemblies", "Manufacturing drawings", "BOM and documentation updates", "Supplier clarification notes", "Production support notes"]
                  },
                  methods: {
                    title: "Methods & Standards",
                    badge: true,
                    items: ["Sondermaschinenbau mindset", "DFM", "Clean documentation", "Interface management", "Revision control"]
                  },
                  tools: {
                    title: "Software & Tools",
                    badge: true,
                    items: ["SolidWorks", "Siemens NX", "CATIA V5", "Excel", "Documentation tools"]
                  },
                  industries: {
                    title: "Relevant Industries",
                    items: ["Semiconductor equipment", "Precision mechanical systems", "Industrial machinery", "Technical suppliers"]
                  }
                },
                cta: "Need support for precision machinery or semiconductor equipment work? Contact Tanisten."
              },
              {
                id: "technical-documentation",
                title: "Technical Documentation",
                description:
                  "Structured technical documents, drawing packages and engineering information for internal or supplier use.",
                sections: {
                  description: { title: "Description", items: ["Documentation support for engineering, manufacturing and technical review workflows."] },
                  typicalTasks: { title: "Typical Tasks", items: ["Document structuring", "Drawing package updates", "Work instruction support", "Technical report preparation"] },
                  deliverables: { title: "Deliverables", items: ["Technical documents", "Drawing lists", "Work instructions", "Review packages"] },
                  methods: { title: "Methods & Standards", badge: true, items: ["Controlled structure", "Engineering review", "Revision discipline"] },
                  tools: { title: "Software & Tools", badge: true, items: ["Office tools", "CAD viewers", "Documentation systems"] },
                  industries: { title: "Relevant Industries", items: ["Aerospace", "Semiconductor Equipment", "Industrial Machinery"] }
                },
                cta: "Need technical documentation support? Contact Tanisten."
              },
              {
                id: "design-changes-product-updates",
                title: "Design Changes & Product Updates",
                description:
                  "Support for existing products that require design updates, documentation changes or production feedback handling.",
                sections: {
                  description: { title: "Description", items: ["Engineering support for controlled updates to existing product data and documentation."] },
                  typicalTasks: { title: "Typical Tasks", items: ["Change assessment", "CAD updates", "Drawing revisions", "Production issue follow-up"] },
                  deliverables: { title: "Deliverables", items: ["Updated models", "Revised drawings", "Change notes", "Release-ready documentation"] },
                  methods: { title: "Methods & Standards", badge: true, items: ["Change control", "Design review", "Revision management"] },
                  tools: { title: "Software & Tools", badge: true, items: ["CATIA V5", "SolidWorks", "Siemens NX", "Excel"] },
                  industries: { title: "Relevant Industries", items: ["Aerospace", "Industrial Machinery", "Precision Mechanical Systems"] }
                },
                cta: "Need design change support? Contact Tanisten."
              },
              {
                id: "supplier-manufacturing-coordination",
                title: "Supplier & Manufacturing Coordination",
                description:
                  "Technical coordination support between engineering, suppliers and manufacturing teams.",
                sections: {
                  description: { title: "Description", items: ["Practical support for clarifying technical questions and preparing supplier-ready information."] },
                  typicalTasks: { title: "Typical Tasks", items: ["Supplier question handling", "Manufacturing feedback review", "Technical clarification", "Documentation follow-up"] },
                  deliverables: { title: "Deliverables", items: ["Supplier data packages", "Clarification notes", "Updated drawings", "Action lists"] },
                  methods: { title: "Methods & Standards", badge: true, items: ["DFM", "Technical review", "Interface control"] },
                  tools: { title: "Software & Tools", badge: true, items: ["CAD tools", "PDF markup", "Office tools"] },
                  industries: { title: "Relevant Industries", items: ["Semiconductor Equipment", "Industrial Machinery", "Aerospace"] }
                },
                cta: "Need supplier coordination support? Contact Tanisten."
              },
              {
                id: "engineering-contracting",
                title: "Engineering Contracting",
                description:
                  "Temporary and project-based engineering capacity for overloaded technical teams.",
                sections: {
                  description: { title: "Description", items: ["Flexible engineering execution for defined work packages, project phases or temporary capacity needs."] },
                  typicalTasks: { title: "Typical Tasks", items: ["CAD support", "Documentation support", "Engineering change support", "Production support"] },
                  deliverables: { title: "Deliverables", items: ["Defined work packages", "CAD and documentation output", "Review updates", "Technical handover"] },
                  methods: { title: "Methods & Standards", badge: true, items: ["Remote cooperation", "Project-based execution", "Clear deliverables"] },
                  tools: { title: "Software & Tools", badge: true, items: ["Customer toolchain", "CAD systems", "Documentation tools"] },
                  industries: { title: "Relevant Industries", items: ["Engineering consultancies", "Aerospace suppliers", "Industrial companies"] }
                },
                cta: "Need temporary engineering capacity? Contact Tanisten."
              }
            ]
          },
          {
            id: "automation",
            title: "Automation",
            description:
              "Practical automation for repetitive engineering, documentation, reporting and business workflows using software, Python tools and controlled AI support.",
            products: [
              {
                id: "automation-audit-workflow-cleanup",
                title: "Automation Audit & Workflow Cleanup",
                description: "Review existing manual and digital workflows, remove friction and define practical automation steps.",
                sections: {
                  description: { title: "Description", items: ["Structured review of existing workflows, tools, spreadsheets, documents and handovers to identify where automation can create practical value without unnecessary complexity."] },
                  typicalTasks: { title: "Typical Tasks", items: ["Workflow audit", "Tool and process review", "Manual step mapping", "Automation opportunity list", "Implementation roadmap"] },
                  deliverables: { title: "Deliverables", items: ["Workflow audit summary", "Automation opportunity map", "Prioritized action list", "Recommended tool stack", "Implementation roadmap"] },
                  methods: { title: "Methods & Standards", badge: true, items: ["Process mapping", "ROI prioritization", "Risk review", "Human-in-the-loop design", "Documentation"] },
                  tools: { title: "Software & Tools", badge: true, items: ["Python", "n8n / Make", "APIs", "Excel", "Google Sheets", "Web tools"] },
                  industries: { title: "Relevant Industries", items: ["Small and mid-size companies", "Engineering teams", "Operations", "Technical service businesses"] }
                },
                cta: "Need an automation audit? Contact Tanisten."
              },
              {
                id: "workflow-automation",
                title: "Workflow Automation",
                description: "Controlled digital workflows for repeated manual steps, file handling, handovers and approvals.",
                sections: {
                  description: { title: "Description", items: ["Analysis and automation of recurring work steps where data, documents, forms or approvals move through the same process repeatedly."] },
                  typicalTasks: { title: "Typical Tasks", items: ["Workflow mapping", "Manual step reduction", "File and data transfer automation", "Template generation", "Approval and handover flows"] },
                  deliverables: { title: "Deliverables", items: ["Automation scripts or tools", "Workflow documentation", "Tested process steps", "User instructions", "Exception handling notes"] },
                  methods: { title: "Methods & Standards", badge: true, items: ["Process mapping", "Rule-based logic", "Error handling", "User review", "Iterative validation"] },
                  tools: { title: "Software & Tools", badge: true, items: ["Python", "APIs", "Excel", "CSV", "Web tools"] },
                  industries: { title: "Relevant Industries", items: ["Engineering teams", "Operations", "Technical administration", "Small and mid-size companies"] }
                },
                cta: "Need workflow automation? Contact Tanisten."
              },
              {
                id: "ai-assistants",
                title: "AI Assistants",
                description: "Internal assistants for knowledge lookup, documentation support and recurring support questions.",
                sections: {
                  description: { title: "Description", items: ["Practical AI support for recurring questions, internal knowledge, structured document work and training workflows."] },
                  typicalTasks: { title: "Typical Tasks", items: ["Knowledge assistant setup", "Document search support", "Prompt workflow design", "Answer review process", "Internal usage guidance"] },
                  deliverables: { title: "Deliverables", items: ["AI assistant prototype", "Knowledge structure", "Prompt and workflow setup", "Usage instructions", "Review checklist"] },
                  methods: { title: "Methods & Standards", badge: true, items: ["Human review", "Source-based answers", "Controlled scope", "Practical AI use", "Privacy-aware setup"] },
                  tools: { title: "Software & Tools", badge: true, items: ["OpenAI API", "Vector search", "Python", "Web UI", "APIs"] },
                  industries: { title: "Relevant Industries", items: ["Customer support", "Engineering education", "Technical documentation", "Internal operations"] }
                },
                cta: "Need an internal AI assistant? Contact Tanisten."
              },
              {
                id: "reporting-automation",
                title: "Reporting Automation",
                description: "Automated recurring reports from spreadsheets, CSV files, databases or operational tools.",
                sections: {
                  description: { title: "Description", items: ["Automation of repeated reporting tasks using structured data, templates, validation checks and controlled exports."] },
                  typicalTasks: { title: "Typical Tasks", items: ["Data collection", "Report generation", "Dashboard preparation", "Recurring exports", "Email or file output"] },
                  deliverables: { title: "Deliverables", items: ["Report templates", "Automation scripts", "Dashboards", "Export workflows", "Documentation"] },
                  methods: { title: "Methods & Standards", badge: true, items: ["Data validation", "Template control", "Scheduled workflow", "Review checkpoints"] },
                  tools: { title: "Software & Tools", badge: true, items: ["Python", "Excel", "CSV", "Power BI", "APIs"] },
                  industries: { title: "Relevant Industries", items: ["Engineering teams", "Operations", "Business administration", "Training centers"] }
                },
                cta: "Need automated reporting? Contact Tanisten."
              },
              {
                id: "business-process-automation",
                title: "Business Process Automation",
                description: "Automation for request handling, notifications, approvals and data routing across teams.",
                sections: {
                  description: { title: "Description", items: ["Practical automation for repeatable business processes with clear inputs, rules, responsibilities and outputs."] },
                  typicalTasks: { title: "Typical Tasks", items: ["Process mapping", "Form automation", "Notification workflows", "Data routing", "Approval logic"] },
                  deliverables: { title: "Deliverables", items: ["Automated workflow", "Process documentation", "Admin interface", "Testing notes", "Handover instructions"] },
                  methods: { title: "Methods & Standards", badge: true, items: ["Lean workflow", "Rule-based logic", "User testing", "Role definition"] },
                  tools: { title: "Software & Tools", badge: true, items: ["Web apps", "APIs", "Databases", "Python", "Email workflows"] },
                  industries: { title: "Relevant Industries", items: ["Small businesses", "Service companies", "Training centers", "Technical operations"] }
                },
                cta: "Need business process automation? Contact Tanisten."
              },
              {
                id: "custom-business-tools",
                title: "Custom Business Tools",
                description: "Lightweight internal tools that connect forms, rules, data and user actions in one workflow.",
                sections: {
                  description: { title: "Description", items: ["Focused tools for internal teams, operational workflows, customer requests or technical administration without a large software project."] },
                  typicalTasks: { title: "Typical Tasks", items: ["Tool specification", "Form and dashboard design", "User workflow setup", "Access structure", "Deployment support"] },
                  deliverables: { title: "Deliverables", items: ["Internal web tool", "Admin workflow", "User notes", "Deployment package", "Basic documentation"] },
                  methods: { title: "Methods & Standards", badge: true, items: ["MVP scope", "User workflow", "Iterative review", "Practical deployment"] },
                  tools: { title: "Software & Tools", badge: true, items: ["React", "TypeScript", "Python", "Databases", "Cloud hosting"] },
                  industries: { title: "Relevant Industries", items: ["Technical companies", "Service providers", "Education and training", "Operations teams"] }
                },
                cta: "Need a custom business tool? Contact Tanisten."
              },
              {
                id: "data-processing-solutions",
                title: "Data Processing Solutions",
                description: "Clean, convert, validate and prepare repeated datasets, exports and technical files.",
                sections: {
                  description: { title: "Description", items: ["Tools for cleaning, transforming, checking and preparing technical or business data that appears in repeated formats."] },
                  typicalTasks: { title: "Typical Tasks", items: ["File processing", "Data cleanup", "Format conversion", "Validation checks", "Batch processing"] },
                  deliverables: { title: "Deliverables", items: ["Processing scripts", "Cleaned datasets", "Validation reports", "User instructions", "Repeatable workflow"] },
                  methods: { title: "Methods & Standards", badge: true, items: ["Data validation", "Repeatable scripts", "Error logging", "Traceable outputs"] },
                  tools: { title: "Software & Tools", badge: true, items: ["Python", "Pandas", "Excel", "CSV", "JSON"] },
                  industries: { title: "Relevant Industries", items: ["Engineering", "Operations", "Business reporting", "Technical administration"] }
                },
                cta: "Need data processing support? Contact Tanisten."
              }
            ]
          },
          {
            id: "digital",
            title: "Digital Solutions",
            description:
              "Digital products and platforms that help companies improve operations, communication and customer interaction.",
            products: [
              {
                id: "business-portals",
                title: "Business Portals",
                description: "Internal or customer-facing portals for requests, documents, status tracking and workflows.",
                detailSections: [
                  {
                    title: "Description",
                    items: [
                      "Centralized web portals for companies that need structured access to information, workflows, documents, users or operational data."
                    ]
                  },
                  {
                    title: "Typical Use Cases",
                    items: [
                      "Client portals",
                      "Partner portals",
                      "Service portals",
                      "Document access portals",
                      "Project communication portals",
                      "Technical service request portals"
                    ]
                  },
                  {
                    title: "Deliverables",
                    items: [
                      "Web-based portal",
                      "User login / access structure",
                      "Admin interface",
                      "Content or document management",
                      "Forms and request workflows",
                      "Role-based access concept"
                    ]
                  },
                  {
                    title: "Features",
                    items: [
                      "User authentication",
                      "Role-based access",
                      "Forms and submissions",
                      "Document upload/download",
                      "Status tracking",
                      "Notifications",
                      "Admin dashboard"
                    ]
                  },
                  {
                    title: "Methods & Technologies",
                    badge: true,
                    items: [
                      "React",
                      "TypeScript",
                      "REST APIs",
                      "Database integration",
                      "Cloud deployment",
                      "Authentication workflows",
                      "Responsive UI"
                    ]
                  },
                  {
                    title: "Business Value",
                    items: [
                      "Centralizes communication",
                      "Reduces email chaos",
                      "Gives clients structured access to information",
                      "Improves transparency",
                      "Saves administrative time"
                    ]
                  },
                  {
                    title: "Suitable For",
                    items: [
                      "Engineering companies",
                      "Service businesses",
                      "Training centers",
                      "Small and mid-size companies",
                      "Technical suppliers"
                    ]
                  }
                ],
                sections: {
                  description: { title: "Description", items: ["Practical portals for business workflows that need structure, visibility and controlled access."] },
                  typicalTasks: { title: "Typical Tasks", items: ["Portal structure", "User flows", "Document areas", "Request tracking"] },
                  deliverables: { title: "Deliverables", items: ["Web portal", "Admin area", "User roles", "Deployment notes"] },
                  methods: { title: "Methods & Standards", badge: true, items: ["Responsive design", "Access control", "Workflow mapping"] },
                  tools: { title: "Software & Tools", badge: true, items: ["React", "TypeScript", "Databases", "Cloud hosting"] },
                  industries: { title: "Relevant Industries", items: ["Technical services", "Training centers", "Industrial suppliers"] }
                },
                cta: "Need a structured business portal? Contact Tanisten."
              },
              {
                id: "customer-platforms",
                title: "Customer Platforms",
                description: "Customer-facing platforms for self-service, requests, documents and recurring interactions.",
                detailSections: [
                  {
                    title: "Description",
                    items: [
                      "Digital platforms that allow customers to interact with a company, submit requests, track information or access services online."
                    ]
                  },
                  {
                    title: "Typical Use Cases",
                    items: [
                      "Customer account area",
                      "Service request platform",
                      "Customer onboarding system",
                      "Support request platform",
                      "Document submission platform"
                    ]
                  },
                  {
                    title: "Deliverables",
                    items: [
                      "Customer-facing web application",
                      "Request forms",
                      "Customer dashboard",
                      "Admin dashboard",
                      "Status tracking",
                      "Notification concept"
                    ]
                  },
                  {
                    title: "Features",
                    items: [
                      "Customer login",
                      "Request submission",
                      "File upload",
                      "Status overview",
                      "Admin management",
                      "Email notifications",
                      "Responsive design"
                    ]
                  },
                  {
                    title: "Methods & Technologies",
                    badge: true,
                    items: ["React", "TypeScript", "API integration", "Database workflows", "Authentication", "Form handling", "Cloud hosting"]
                  },
                  {
                    title: "Business Value",
                    items: [
                      "Makes services easier to access",
                      "Reduces manual communication",
                      "Improves customer experience",
                      "Creates a professional digital interface",
                      "Helps companies manage requests in one place"
                    ]
                  },
                  {
                    title: "Suitable For",
                    items: ["Medical practices", "Service companies", "Training providers", "Technical companies", "Local businesses"]
                  }
                ],
                sections: {
                  description: { title: "Description", items: ["Digital customer areas that reduce manual communication and make repeated services easier to manage."] },
                  typicalTasks: { title: "Typical Tasks", items: ["Customer login flow", "Request forms", "Document sharing", "Status visibility"] },
                  deliverables: { title: "Deliverables", items: ["Customer platform", "Admin view", "Notification workflow", "Deployment setup"] },
                  methods: { title: "Methods & Standards", badge: true, items: ["User-centered workflow", "Data privacy awareness", "Responsive UI"] },
                  tools: { title: "Software & Tools", badge: true, items: ["React", "APIs", "Databases", "Cloudflare Pages"] },
                  industries: { title: "Relevant Industries", items: ["Service companies", "Medical practices", "Training providers"] }
                },
                cta: "Want customers to interact with your business online? Contact Tanisten."
              },
              {
                id: "internal-company-tools",
                title: "Internal Company Tools",
                description: "Internal tools for forms, dashboards, reports, operational tracking and admin workflows.",
                detailSections: [
                  {
                    title: "Description",
                    items: [
                      "Custom internal tools for teams that need to replace spreadsheets, repetitive manual work or fragmented workflows."
                    ]
                  },
                  {
                    title: "Typical Use Cases",
                    items: [
                      "Internal task management",
                      "Small ERP-like tools",
                      "Employee tools",
                      "Document tracking",
                      "Request management",
                      "Internal knowledge tools",
                      "Operational workflow tools"
                    ]
                  },
                  {
                    title: "Deliverables",
                    items: ["Internal web application", "Admin interface", "Data forms", "Tables and filtering", "User roles", "Export functions", "Basic reporting"]
                  },
                  {
                    title: "Features",
                    items: ["CRUD operations", "User management", "Data tables", "Search and filters", "File attachments", "Workflow status", "Export to Excel / CSV"]
                  },
                  {
                    title: "Methods & Technologies",
                    badge: true,
                    items: ["React", "TypeScript", "Python / Node.js backend", "REST APIs", "PostgreSQL", "Authentication", "Cloud/VPS deployment"]
                  },
                  {
                    title: "Business Value",
                    items: [
                      "Replaces messy spreadsheets",
                      "Structures internal workflows",
                      "Reduces repetitive manual work",
                      "Makes information easier to find",
                      "Improves operational visibility"
                    ]
                  },
                  {
                    title: "Suitable For",
                    items: ["Small companies", "Engineering teams", "Training centers", "Service businesses", "Operations teams"]
                  }
                ],
                sections: {
                  description: { title: "Description", items: ["Lightweight internal applications for teams that need a practical tool instead of manual spreadsheets."] },
                  typicalTasks: { title: "Typical Tasks", items: ["Form workflows", "Dashboards", "Admin screens", "Data tracking"] },
                  deliverables: { title: "Deliverables", items: ["Internal web app", "Data model", "User instructions", "Deployment package"] },
                  methods: { title: "Methods & Standards", badge: true, items: ["MVP scope", "Role-based workflow", "Iterative review"] },
                  tools: { title: "Software & Tools", badge: true, items: ["React", "TypeScript", "Python", "Databases"] },
                  industries: { title: "Relevant Industries", items: ["Small businesses", "Engineering teams", "Operations"] }
                },
                cta: "Need a custom internal tool for your team? Contact Tanisten."
              },
              {
                id: "booking-scheduling-systems",
                title: "Booking & Scheduling Systems",
                description: "Booking and scheduling workflows for appointments, training, services or operational resources.",
                detailSections: [
                  {
                    title: "Description",
                    items: [
                      "Booking and appointment systems for companies that need clients to book services, consultations, lessons or appointments online."
                    ]
                  },
                  {
                    title: "Typical Use Cases",
                    items: [
                      "Medical practice appointment booking",
                      "Consultation booking",
                      "Training course scheduling",
                      "Service appointment booking",
                      "Client request scheduling"
                    ]
                  },
                  {
                    title: "Deliverables",
                    items: ["Booking interface", "Admin calendar", "Availability logic", "Confirmation workflow", "Email notifications", "Customer form", "Optional AI assistant integration"]
                  },
                  {
                    title: "Features",
                    items: ["Date and time selection", "Booking form", "Admin overview", "Email confirmations", "Appointment status", "Basic customer data collection", "Optional chatbot guidance"]
                  },
                  {
                    title: "Methods & Technologies",
                    badge: true,
                    items: ["React", "TypeScript", "Calendar integration", "Backend/API integration", "Email notifications", "Database storage", "Responsive UI"]
                  },
                  {
                    title: "Business Value",
                    items: [
                      "Reduces phone calls and manual scheduling",
                      "Makes booking easier for customers",
                      "Saves administrative time",
                      "Gives companies better appointment visibility",
                      "Improves customer experience"
                    ]
                  },
                  {
                    title: "Suitable For",
                    items: ["Medical practices", "Training centers", "Consultants", "Service providers", "Local businesses"]
                  }
                ],
                sections: {
                  description: { title: "Description", items: ["Scheduling systems for teams that need structured booking, availability and customer communication."] },
                  typicalTasks: { title: "Typical Tasks", items: ["Booking flow", "Availability rules", "Customer notifications", "Admin overview"] },
                  deliverables: { title: "Deliverables", items: ["Booking interface", "Admin calendar", "Notification setup", "Deployment notes"] },
                  methods: { title: "Methods & Standards", badge: true, items: ["Responsive UI", "Workflow validation", "Clear booking rules"] },
                  tools: { title: "Software & Tools", badge: true, items: ["React", "Calendar APIs", "Databases", "Email services"] },
                  industries: { title: "Relevant Industries", items: ["Medical practices", "Training centers", "Service providers"] }
                },
                cta: "Need an online booking system? Contact Tanisten."
              },
              {
                id: "company-websites",
                title: "Company Websites",
                description: "Professional websites and landing pages for technical companies and service providers.",
                detailSections: [
                  {
                    title: "Description",
                    items: [
                      "Professional company websites and landing pages for technical companies, service providers and small businesses that need a clear online presence."
                    ]
                  },
                  {
                    title: "Typical Use Cases",
                    items: ["Company website", "Service landing page", "Technical business website", "Portfolio website", "Bilingual website", "Website redesign"]
                  },
                  {
                    title: "Deliverables",
                    items: ["Responsive website", "Clear service pages", "Contact form", "SEO-friendly structure", "Bilingual EN/DE setup if needed", "Deployment support", "Domain and hosting setup guidance"]
                  },
                  {
                    title: "Features",
                    items: ["Modern responsive design", "Service sections", "Contact forms", "Multi-language structure", "SEO metadata", "Fast loading", "Cloud deployment"]
                  },
                  {
                    title: "Methods & Technologies",
                    badge: true,
                    items: ["React", "TypeScript", "Tailwind CSS", "Vite", "Cloudflare Pages", "GitHub deployment", "Basic SEO"]
                  },
                  {
                    title: "Business Value",
                    items: [
                      "Creates professional online credibility",
                      "Explains services clearly",
                      "Supports client acquisition",
                      "Gives partners a place to verify the company",
                      "Works as a digital business card and sales tool"
                    ]
                  },
                  {
                    title: "Suitable For",
                    items: ["Engineering consultants", "Service providers", "Small businesses", "Training centers", "Technical startups"]
                  }
                ],
                sections: {
                  description: { title: "Description", items: ["Credible websites for companies that need clear service positioning and direct client outreach."] },
                  typicalTasks: { title: "Typical Tasks", items: ["Website structure", "Copy organization", "Responsive layout", "Deployment setup"] },
                  deliverables: { title: "Deliverables", items: ["Company website", "SEO metadata", "Contact flow", "Deployment instructions"] },
                  methods: { title: "Methods & Standards", badge: true, items: ["Responsive design", "SEO basics", "Performance awareness"] },
                  tools: { title: "Software & Tools", badge: true, items: ["React", "Vite", "Tailwind CSS", "Cloudflare Pages"] },
                  industries: { title: "Relevant Industries", items: ["Engineering companies", "Consultancies", "Small businesses"] }
                },
                cta: "Need a professional company website? Contact Tanisten."
              },
              {
                id: "dashboards-reporting-systems",
                title: "Dashboards & Reporting Systems",
                description: "Dashboards and reporting interfaces for operational, customer or technical data.",
                detailSections: [
                  {
                    title: "Description",
                    items: [
                      "Dashboards and reporting systems that help companies view, track and understand business or technical data."
                    ]
                  },
                  {
                    title: "Typical Use Cases",
                    items: [
                      "Management dashboards",
                      "Project status dashboards",
                      "Training progress dashboards",
                      "Sales or operations reporting",
                      "Engineering data overview",
                      "Automated report generation"
                    ]
                  },
                  {
                    title: "Deliverables",
                    items: ["Dashboard interface", "Data tables", "Charts and KPIs", "Filters", "Export functions", "Reporting logic", "Automated report templates"]
                  },
                  {
                    title: "Features",
                    items: ["KPI cards", "Charts", "Tables", "Filters", "Date ranges", "Export to Excel / CSV", "Automated report generation"]
                  },
                  {
                    title: "Methods & Technologies",
                    badge: true,
                    items: ["React", "TypeScript", "Python data processing", "APIs", "Database integration", "Excel / CSV workflows", "Automation scripts"]
                  },
                  {
                    title: "Business Value",
                    items: [
                      "Makes data easier to understand",
                      "Reduces manual reporting work",
                      "Improves decision-making",
                      "Saves time for managers and teams",
                      "Creates transparency across operations"
                    ]
                  },
                  {
                    title: "Suitable For",
                    items: ["Small and mid-size companies", "Training centers", "Engineering teams", "Service businesses", "Operations teams"]
                  }
                ],
                sections: {
                  description: { title: "Description", items: ["Visual reporting systems that turn recurring data into clear operational views."] },
                  typicalTasks: { title: "Typical Tasks", items: ["KPI structure", "Data visualization", "Filtering", "Report export"] },
                  deliverables: { title: "Deliverables", items: ["Dashboard UI", "Data connection", "Report views", "User notes"] },
                  methods: { title: "Methods & Standards", badge: true, items: ["Data validation", "Dashboard UX", "Iterative review"] },
                  tools: { title: "Software & Tools", badge: true, items: ["React", "Chart libraries", "APIs", "Databases"] },
                  industries: { title: "Relevant Industries", items: ["Operations", "Technical services", "Business reporting"] }
                },
                cta: "Need dashboards or automated reporting? Contact Tanisten."
              }
            ]
          }
        ]
      }
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
        "Tanisten combines mechanical and aviation engineering background with practical experience in aircraft structures and interiors, special-purpose machinery, semiconductor equipment environments, high-precision mechanical systems, CAD, technical documentation and engineering automation.",
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
        { title: "Special Machinery & Semiconductor Equipment", description: "Mechanical design support for precision modules, equipment updates and production documentation." },
        { title: "Industrial Machinery", description: "CAD, documentation and automation support for machine builders and suppliers." },
        { title: "Engineering Education & Training", description: "Digital learning tools, technical assistants and structured training workflows." }
      ],
      whyTanisten: [
        {
          title: "10+ Years Experience",
          description: "Experience across aerospace, semiconductor and industrial engineering projects.",
          accent: "engineering"
        },
        {
          title: "Aerospace & Semiconductor",
          description:
            "Experience supporting complex technical products, engineering documentation and project execution.",
          accent: "neutral"
        },
        {
          title: "Engineering + Automation",
          description:
            "Combining mechanical engineering expertise with workflow automation, AI assistants and business tools.",
          accent: "automation"
        },
        {
          title: "Digital Solutions",
          description:
            "Practical business portals, websites, internal tools and customer-facing digital platforms.",
          accent: "digital"
        },
        {
          title: "Flexible Project Support",
          description:
            "Additional engineering and technical capacity for project-based work and growing teams.",
          accent: "neutral"
        }
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
        { title: "Special Machinery & Semiconductor Equipment", description: "Support for precision modules, equipment updates, tooling and production documentation." },
        { title: "Precision Mechanical Systems", description: "Work for systems where interfaces, tolerances and documentation quality matter." },
        { title: "Industrial Machinery", description: "Technical support for machine builders, suppliers and production-related updates." },
        { title: "Engineering Education", description: "Digital tools and training workflows for technical education and internal learning." }
      ],
      experience: [
        { title: "Mechanical and aviation engineering background", description: "Experience base across engineering education and technical project environments." },
        { title: "Aircraft structures and interiors", description: "Practical work connected to structural and interior engineering contexts." },
        { title: "Special machinery and semiconductor equipment", description: "Experience as a mechanical designer in precision equipment environments with CAD and technical documentation requirements." },
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
      servicesTitle: "Was wir leisten",
      servicesDescription:
        "Praktische Engineering-, Automatisierungs- und digitale Lösungen für technische Unternehmen.",
      typicalProjectsLabel: "Typische Projekte",
      serviceDirections: [
        {
          title: "Engineering",
          accent: "engineering",
          description: "",
          services: [
            "Unterstützung in der Produktentwicklung",
            "Mechanische Konstruktion & CAD",
            "Technische Dokumentation",
            "Lieferantenkoordination",
            "Engineering Contracting"
          ],
          projects: [
            "Unterstützung bei der Entwicklung neuer Produkte",
            "Produktionsreife CAD-Modelle und Zeichnungen",
            "Konstruktionsänderungen bestehender Produkte",
            "Fertigungsdokumentation",
            "Koordination mit Lieferanten und Produktion"
          ]
        },
        {
          title: "Automatisierung",
          accent: "automation",
          description: "",
          services: [
            "Workflow-Automatisierung",
            "KI-Assistenten",
            "Reporting-Automatisierung",
            "Prozessautomatisierung",
            "Individuelle Business-Tools"
          ],
          projects: [
            "KI-Assistenten für Kundenservice",
            "Automatisierte Reporting-Systeme",
            "Interne Wissensassistenten",
            "Automatisierung technischer Workflows",
            "Optimierung von Geschäftsprozessen"
          ]
        },
        {
          title: "Digitale Lösungen",
          accent: "digital",
          description: "",
          services: [
            "Business-Portale",
            "Unternehmenswebsites",
            "Kundenplattformen",
            "Buchungssysteme",
            "Interne Unternehmens-Tools",
          ],
          projects: [
            "Unternehmenswebsites und Landingpages",
            "Termin- und Buchungssysteme für Arztpraxen",
            "Kundenportale",
            "Mitarbeiterportale",
            "Dashboards und Reporting-Plattformen"
          ]
        }
      ],
      engineeringGroupTitle: "Engineering",
      automationGroupTitle: "Automatisierung",
      engineeringItems: ["Mechanische Konstruktion", "CAD-Entwicklung", "Technische Dokumentation", "Engineering Contracting"],
      automationItems: ["Engineering-Automatisierung", "AI-Workflow-Tools", "Python-Lösungen", "Interne Webanwendungen"],
      industriesEyebrow: "Branchen",
      industriesTitle: "Branchenfokus für technische Arbeit",
      whyEyebrow: "Warum Tanisten",
      whyTitle: "Ein praktischer technischer Partner für Engineering und Automatisierung",
      whyDescription: "Engineering-Kompetenz kombiniert mit Automatisierung und digitalen Lösungen.",
      contactTitle: "Besprechen Sie ein technisches Projekt mit Tanisten",
      contactText:
        "Senden Sie eine kurze Projektbeschreibung, den aktuellen technischen Bedarf und die erwarteten Ergebnisse. Wir antworten mit einem praktikablen nächsten Schritt."
    },
    services: {
      heroEyebrow: "Leistungen",
      heroTitle: "Katalog für Engineering, Automatisierung und digitale Lösungen",
      heroSubtitle:
        "Durchsuchen Sie Leistungsbereiche, wählen Sie ein Produkt und prüfen Sie strukturierte technische Details für Engineering-, Automatisierungs- und Digitalprojekte.",
      engineeringTitle: "Engineering",
      automationTitle: "Automatisierung",
      contactTitle: "Benötigen Sie diese Art von Unterstützung?",
      contactText:
        "Kontaktieren Sie Tanisten mit einer kurzen Beschreibung der aktuellen Aufgabe, Projektphase und erwarteten Ergebnisse.",
      catalog: {
        heroEyebrow: "Leistungen",
        heroTitle: "Katalog für Engineering, Automatisierung und digitale Lösungen",
        heroSubtitle:
          "Durchsuchen Sie Leistungsbereiche, wählen Sie ein Produkt und prüfen Sie strukturierte technische Details für Engineering-, Automatisierungs- und Digitalprojekte.",
        catalogEyebrow: "Leistungskatalog",
        catalogTitle: "Nach Kategorie und Produkt navigieren",
        catalogDescription:
          "Der Katalog zeigt Navigation und Details gleichzeitig. Wählen Sie links ein Produkt aus, um rechts den technischen Umfang zu prüfen.",
        directionLabel: "Leistungsbereich",
        navigationTitle: "Service-Navigation",
        detailsTitle: "Ausgewählte Leistungsdetails",
        selectTitle: "Wählen Sie eine Leistung aus, um Details anzuzeigen.",
        selectText: "Wählen Sie ein Produkt aus der Service-Navigation, um das technische Detailpanel zu öffnen.",
        productSelectTitle: "Wählen Sie ein Produkt aus, um technische Details anzuzeigen.",
        contactLabel: "Tanisten kontaktieren",
        defaultProductId: "mechanical-design-cad",
        categories: [
          {
            id: "engineering",
            title: "Engineering",
            description:
              "Praktische Engineering-Unterstützung für Produktentwicklung, technische Dokumentation und Fertigungsprojekte.",
            products: [
              {
                id: "product-development-support",
                title: "Unterstützung in der Produktentwicklung",
                description:
                  "Unterstützung technischer Teams während Produktentwicklung, Produktanpassungen und Produktionsvorbereitung.",
                sections: {
                  description: { title: "Beschreibung", items: ["Projektbezogene Unterstützung von frühen Konzepten bis zu produktionsreifen Engineering-Informationen."] },
                  typicalTasks: { title: "Typische Aufgaben", items: ["Frühe Konstruktionsunterstützung", "Produktanpassungen", "Design Reviews", "Produktionsvorbereitung"] },
                  deliverables: { title: "Deliverables", items: ["CAD-Pakete", "Zeichnungsupdates", "Dokumentationspakete", "Review-Notizen"] },
                  methods: { title: "Methoden & Standards", badge: true, items: ["Engineering-Workflow", "Design Review", "DFM"] },
                  tools: { title: "Software & Tools", badge: true, items: ["CATIA V5", "SolidWorks", "Siemens NX", "Dokumentationstools"] },
                  industries: { title: "Relevante Branchen", items: ["Luftfahrt", "Halbleiterausrüstung", "Industriemaschinen"] }
                },
                cta: "Benötigen Sie Unterstützung in der Produktentwicklung? Kontaktieren Sie Tanisten."
              },
              {
                id: "mechanical-design-cad",
                title: "Mechanische Konstruktion & CAD",
                description:
                  "Mechanische Konstruktionsunterstützung für Komponenten, Baugruppen, Layouts und produktionsreife Engineering-Daten.",
                sections: {
                  description: { title: "Beschreibung", items: ["Mechanische Konstruktion und CAD-Umsetzung für nutzbare Modelle, Zeichnungen und strukturierte Engineering-Daten."] },
                  typicalTasks: { title: "Typische Aufgaben", items: ["Komponentenkonstruktion", "Baugruppenentwicklung", "Layout-Updates", "Schnittstellendefinition", "Konstruktionsanpassungen"] },
                  deliverables: { title: "Deliverables", items: ["3D-CAD-Modelle", "Baugruppenstrukturen", "Fertigungszeichnungen", "Technische Dokumentation", "Lieferantenfähige technische Daten"] },
                  methods: { title: "Methoden & Standards", badge: true, items: ["DIN", "ISO", "GD&T", "DFM", "Grundlegende Handrechnungen"] },
                  tools: { title: "Software & Tools", badge: true, items: ["CATIA V5", "SolidWorks", "Creo", "Siemens NX", "AutoCAD"] },
                  industries: { title: "Relevante Branchen", items: ["Luftfahrt", "Halbleiterausrüstung", "Industriemaschinen", "Präzise mechanische Systeme"] }
                },
                cta: "Benötigen Sie diese Art von Unterstützung? Kontaktieren Sie Tanisten."
              },
              {
                id: "aerospace-structural-design-support",
                title: "Aerospace & Struktur-Support",
                description:
                  "Engineering-Unterstützung für Flugzeugstrukturen, Kabineninterieur, Halterungen, Paneele und technische Dokumentation.",
                sections: {
                  description: { title: "Beschreibung", items: ["Projektbezogene Unterstützung für Luftfahrt- und Kabineninterieur-Aufgaben, bei denen strukturierte CAD-Daten, Konstruktionsanpassungen und technische Dokumentation benötigt werden."] },
                  typicalTasks: { title: "Typische Aufgaben", items: ["Support für Halterungen und Paneele", "Kabineninterieur-Layouts", "Strukturelle Detailanpassungen", "Schnittstellenprüfung", "Zeichnungspaket-Vorbereitung"] },
                  deliverables: { title: "Deliverables", items: ["3D-CAD-Modelle", "2D-Zeichnungen", "Baugruppen- und Einbaudaten", "Änderungsnotizen", "Technische Review-Pakete"] },
                  methods: { title: "Methoden & Standards", badge: true, items: ["Luftfahrt-Dokumentationsdisziplin", "Schnittstellenkontrolle", "Design Review", "Grundlegendes Strukturverständnis"] },
                  tools: { title: "Software & Tools", badge: true, items: ["CATIA V5", "Siemens NX", "CAD-Viewer", "Office-Tools"] },
                  industries: { title: "Relevante Branchen", items: ["Flugzeugstrukturen", "Aircraft Interiors", "Luftfahrtzulieferer", "Engineering-Beratungen"] }
                },
                cta: "Benötigen Sie Aerospace Engineering Support? Kontaktieren Sie Tanisten."
              },
              {
                id: "semiconductor-equipment-engineering",
                title: "Sondermaschinenbau & Halbleiteranlagen",
                description:
                  "Mechanische Konstruktionsunterstützung für Sondermaschinenbau, Präzisionsmodule, Dokumentation und Produktionsupdates.",
                sections: {
                  description: { title: "Beschreibung", items: ["Projektbezogene Unterstützung als Konstrukteur in bestehenden Engineering-Teams für Sondermaschinenbau, Präzisionsmodule und Systeme im Umfeld von Halbleiterausrüstung."] },
                  typicalTasks: { title: "Typische Aufgaben", items: ["CAD-Konstruktionssupport", "Updates an Maschinenmodulen", "Vorrichtungs- und Halterungsdetails", "Schnittstellenklärung", "Bearbeitung von Produktionsfeedback"] },
                  deliverables: { title: "Deliverables", items: ["CAD-Modelle und Baugruppen", "Fertigungszeichnungen", "BOM- und Dokumentationsupdates", "Lieferantenklärungsnotizen", "Produktionssupport-Notizen"] },
                  methods: { title: "Methoden & Standards", badge: true, items: ["Sondermaschinenbau-Denkweise", "DFM", "Saubere Dokumentation", "Schnittstellenmanagement", "Revisionskontrolle"] },
                  tools: { title: "Software & Tools", badge: true, items: ["SolidWorks", "Siemens NX", "CATIA V5", "Excel", "Dokumentationstools"] },
                  industries: { title: "Relevante Branchen", items: ["Sondermaschinenbau", "Halbleiterausrüstung", "Präzise mechanische Systeme", "Industriemaschinen"] }
                },
                cta: "Benötigen Sie Konstruktionssupport für Sondermaschinenbau oder Halbleiterausrüstung? Kontaktieren Sie Tanisten."
              },
              {
                id: "technical-documentation",
                title: "Technische Dokumentation",
                description:
                  "Strukturierte technische Dokumente, Zeichnungspakete und Engineering-Informationen.",
                sections: {
                  description: { title: "Beschreibung", items: ["Dokumentationsunterstützung für Engineering-, Fertigungs- und Review-Workflows."] },
                  typicalTasks: { title: "Typische Aufgaben", items: ["Dokumentstrukturierung", "Zeichnungspaket-Updates", "Arbeitsanweisungen", "Technische Berichte"] },
                  deliverables: { title: "Deliverables", items: ["Technische Dokumente", "Zeichnungslisten", "Arbeitsanweisungen", "Review-Pakete"] },
                  methods: { title: "Methoden & Standards", badge: true, items: ["Kontrollierte Struktur", "Engineering Review", "Revisionsdisziplin"] },
                  tools: { title: "Software & Tools", badge: true, items: ["Office-Tools", "CAD-Viewer", "Dokumentationssysteme"] },
                  industries: { title: "Relevante Branchen", items: ["Luftfahrt", "Halbleiterausrüstung", "Industriemaschinen"] }
                },
                cta: "Benötigen Sie technische Dokumentation? Kontaktieren Sie Tanisten."
              },
              {
                id: "design-changes-product-updates",
                title: "Konstruktionsänderungen & Produktanpassungen",
                description: "Unterstützung für bestehende Produkte mit Designänderungen und Dokumentationsupdates.",
                sections: {
                  description: { title: "Beschreibung", items: ["Kontrollierte Änderungen an bestehenden Produktdaten und Dokumentationen."] },
                  typicalTasks: { title: "Typische Aufgaben", items: ["Änderungsbewertung", "CAD-Updates", "Zeichnungsrevisionen", "Produktionsrückfragen"] },
                  deliverables: { title: "Deliverables", items: ["Aktualisierte Modelle", "Revidierte Zeichnungen", "Änderungsnotizen", "Freigabefähige Dokumentation"] },
                  methods: { title: "Methoden & Standards", badge: true, items: ["Change Control", "Design Review", "Revisionsmanagement"] },
                  tools: { title: "Software & Tools", badge: true, items: ["CATIA V5", "SolidWorks", "Siemens NX", "Excel"] },
                  industries: { title: "Relevante Branchen", items: ["Luftfahrt", "Industriemaschinen", "Präzise mechanische Systeme"] }
                },
                cta: "Benötigen Sie Unterstützung bei Produktänderungen? Kontaktieren Sie Tanisten."
              },
              {
                id: "supplier-manufacturing-coordination",
                title: "Lieferanten- & Fertigungskoordination",
                description: "Technische Koordination zwischen Engineering, Lieferanten und Fertigungsteams.",
                sections: {
                  description: { title: "Beschreibung", items: ["Unterstützung bei technischen Klärungen und lieferantenfähigen Informationen."] },
                  typicalTasks: { title: "Typische Aufgaben", items: ["Lieferantenfragen", "Fertigungsfeedback", "Technische Klärungen", "Dokumentationsnachverfolgung"] },
                  deliverables: { title: "Deliverables", items: ["Lieferantendatenpakete", "Klärungsnotizen", "Aktualisierte Zeichnungen", "Aktionslisten"] },
                  methods: { title: "Methoden & Standards", badge: true, items: ["DFM", "Technisches Review", "Schnittstellenkontrolle"] },
                  tools: { title: "Software & Tools", badge: true, items: ["CAD-Tools", "PDF-Markup", "Office-Tools"] },
                  industries: { title: "Relevante Branchen", items: ["Halbleiterausrüstung", "Industriemaschinen", "Luftfahrt"] }
                },
                cta: "Benötigen Sie Lieferantenkoordination? Kontaktieren Sie Tanisten."
              },
              {
                id: "engineering-contracting",
                title: "Engineering Contracting",
                description: "Temporäre und projektbasierte Engineering-Kapazität für ausgelastete technische Teams.",
                sections: {
                  description: { title: "Beschreibung", items: ["Flexible Engineering-Umsetzung für definierte Arbeitspakete, Projektphasen oder temporären Kapazitätsbedarf."] },
                  typicalTasks: { title: "Typische Aufgaben", items: ["CAD-Unterstützung", "Dokumentationsunterstützung", "Änderungsunterstützung", "Produktionssupport"] },
                  deliverables: { title: "Deliverables", items: ["Definierte Arbeitspakete", "CAD- und Dokumentationsergebnisse", "Review-Updates", "Technische Übergabe"] },
                  methods: { title: "Methoden & Standards", badge: true, items: ["Remote-Zusammenarbeit", "Projektbasierte Umsetzung", "Klare Deliverables"] },
                  tools: { title: "Software & Tools", badge: true, items: ["Kundentoolchain", "CAD-Systeme", "Dokumentationstools"] },
                  industries: { title: "Relevante Branchen", items: ["Engineering-Beratungen", "Luftfahrtzulieferer", "Industrieunternehmen"] }
                },
                cta: "Benötigen Sie temporäre Engineering-Kapazität? Kontaktieren Sie Tanisten."
              }
            ]
          },
          {
            id: "automation",
            title: "Automatisierung",
            description:
              "Praktische Automatisierung wiederkehrender Engineering-, Dokumentations-, Reporting- und Geschäftsworkflows mit Software, Python-Tools und kontrollierter KI-Unterstützung.",
            products: [
              {
                id: "automation-audit-workflow-cleanup",
                title: "Workflow-Audit & Cleanup",
                description: "Analyse bestehender manueller und digitaler Workflows, Reduzierung von Reibung und Definition praktischer Automatisierungsschritte.",
                sections: {
                  description: { title: "Beschreibung", items: ["Strukturierte Analyse bestehender Workflows, Tools, Tabellen, Dokumente und Uebergaben, um sinnvolle Automatisierungspotenziale ohne unnoetige Komplexitaet zu identifizieren."] },
                  typicalTasks: { title: "Typische Aufgaben", items: ["Workflow-Audit", "Tool- und Prozessanalyse", "Mapping manueller Schritte", "Liste von Automatisierungspotenzialen", "Umsetzungs-Roadmap"] },
                  deliverables: { title: "Deliverables", items: ["Workflow-Audit-Zusammenfassung", "Automation Opportunity Map", "Priorisierte Massnahmenliste", "Empfohlener Tool-Stack", "Umsetzungs-Roadmap"] },
                  methods: { title: "Methoden & Standards", badge: true, items: ["Prozessmapping", "ROI-Priorisierung", "Risikopruefung", "Human-in-the-loop Design", "Dokumentation"] },
                  tools: { title: "Software & Tools", badge: true, items: ["Python", "n8n / Make", "APIs", "Excel", "Google Sheets", "Web-Tools"] },
                  industries: { title: "Relevante Branchen", items: ["Kleine und mittelstaendische Unternehmen", "Engineering-Teams", "Operations", "Technische Dienstleister"] }
                },
                cta: "Benötigen Sie ein Automatisierungs-Audit? Kontaktieren Sie Tanisten."
              },
              {
                id: "workflow-automation",
                title: "Workflow-Automatisierung",
                description: "Kontrollierte digitale Workflows für wiederkehrende manuelle Schritte, Dateien, Übergaben und Freigaben.",
                sections: {
                  description: { title: "Beschreibung", items: ["Analyse und Automatisierung wiederkehrender Arbeitsschritte, bei denen Daten, Dokumente, Formulare oder Freigaben regelmäßig denselben Prozess durchlaufen."] },
                  typicalTasks: { title: "Typische Aufgaben", items: ["Workflow-Mapping", "Reduzierung manueller Schritte", "Datei- und Datentransfer", "Template-Erstellung", "Freigabe- und Übergabeprozesse"] },
                  deliverables: { title: "Deliverables", items: ["Automatisierungsskripte oder Tools", "Workflow-Dokumentation", "Getestete Prozessschritte", "Nutzerhinweise", "Hinweise zur Fehlerbehandlung"] },
                  methods: { title: "Methoden & Standards", badge: true, items: ["Prozessmapping", "Regelbasierte Logik", "Fehlerbehandlung", "User Review", "Iterative Validierung"] },
                  tools: { title: "Software & Tools", badge: true, items: ["Python", "APIs", "Excel", "CSV", "Web-Tools"] },
                  industries: { title: "Relevante Branchen", items: ["Engineering-Teams", "Operations", "Technische Administration", "Kleine und mittelständische Unternehmen"] }
                },
                cta: "Benötigen Sie Workflow-Automatisierung? Kontaktieren Sie Tanisten."
              },
              {
                id: "ai-assistants",
                title: "KI-Assistenten",
                description: "Interne Assistenten für Wissenssuche, Dokumentationsunterstützung und wiederkehrende Supportfragen.",
                sections: {
                  description: { title: "Beschreibung", items: ["Praktische KI-Unterstützung für wiederkehrende Fragen, internes Wissen, strukturierte Dokumentenarbeit und Trainingsworkflows."] },
                  typicalTasks: { title: "Typische Aufgaben", items: ["Wissensassistent-Setup", "Dokumentensuche", "Prompt-Workflow-Design", "Antwort-Review-Prozess", "Interne Nutzungshinweise"] },
                  deliverables: { title: "Deliverables", items: ["KI-Assistent-Prototyp", "Wissensstruktur", "Prompt- und Workflow-Setup", "Nutzungsanleitung", "Review-Checkliste"] },
                  methods: { title: "Methoden & Standards", badge: true, items: ["Human Review", "Quellenbasierte Antworten", "Kontrollierter Umfang", "Praktischer KI-Einsatz", "Datenschutzbewusstes Setup"] },
                  tools: { title: "Software & Tools", badge: true, items: ["OpenAI API", "Vector Search", "Python", "Web UI", "APIs"] },
                  industries: { title: "Relevante Branchen", items: ["Kundenservice", "Engineering-Ausbildung", "Technische Dokumentation", "Interne Operations"] }
                },
                cta: "Benötigen Sie einen internen KI-Assistenten? Kontaktieren Sie Tanisten."
              },
              {
                id: "reporting-automation",
                title: "Reporting-Automatisierung",
                description: "Automatisierte wiederkehrende Reports aus Tabellen, CSV-Dateien, Datenbanken oder operativen Tools.",
                sections: {
                  description: { title: "Beschreibung", items: ["Automatisierung wiederholter Reporting-Aufgaben mit strukturierten Daten, Templates, Validierungschecks und kontrollierten Exporten."] },
                  typicalTasks: { title: "Typische Aufgaben", items: ["Datensammlung", "Report-Erstellung", "Dashboard-Vorbereitung", "Regelmäßige Exporte", "E-Mail- oder Dateiausgabe"] },
                  deliverables: { title: "Deliverables", items: ["Report-Templates", "Automatisierungsskripte", "Dashboards", "Export-Workflows", "Dokumentation"] },
                  methods: { title: "Methoden & Standards", badge: true, items: ["Datenvalidierung", "Template-Kontrolle", "Geplanter Workflow", "Review-Punkte"] },
                  tools: { title: "Software & Tools", badge: true, items: ["Python", "Excel", "CSV", "Power BI", "APIs"] },
                  industries: { title: "Relevante Branchen", items: ["Engineering-Teams", "Operations", "Business Administration", "Trainingszentren"] }
                },
                cta: "Benötigen Sie automatisiertes Reporting? Kontaktieren Sie Tanisten."
              },
              {
                id: "business-process-automation",
                title: "Prozessautomatisierung",
                description: "Automatisierung für Anfragebearbeitung, Benachrichtigungen, Freigaben und Datenrouting zwischen Teams.",
                sections: {
                  description: { title: "Beschreibung", items: ["Praktische Automatisierung wiederholbarer Geschäftsprozesse mit klaren Eingaben, Regeln, Verantwortlichkeiten und Ergebnissen."] },
                  typicalTasks: { title: "Typische Aufgaben", items: ["Prozessmapping", "Formularautomatisierung", "Benachrichtigungsworkflows", "Datenrouting", "Freigabelogik"] },
                  deliverables: { title: "Deliverables", items: ["Automatisierter Workflow", "Prozessdokumentation", "Admin-Interface", "Testnotizen", "Übergabehinweise"] },
                  methods: { title: "Methoden & Standards", badge: true, items: ["Lean Workflow", "Regelbasierte Logik", "User Testing", "Rollendefinition"] },
                  tools: { title: "Software & Tools", badge: true, items: ["Web Apps", "APIs", "Datenbanken", "Python", "E-Mail-Workflows"] },
                  industries: { title: "Relevante Branchen", items: ["Kleine Unternehmen", "Dienstleister", "Trainingszentren", "Technische Operations"] }
                },
                cta: "Benötigen Sie Prozessautomatisierung? Kontaktieren Sie Tanisten."
              },
              {
                id: "custom-business-tools",
                title: "Individuelle Business-Tools",
                description: "Leichte interne Tools, die Formulare, Regeln, Daten und Nutzeraktionen in einem Workflow verbinden.",
                sections: {
                  description: { title: "Beschreibung", items: ["Fokussierte Tools für interne Teams, operative Workflows, Kundenanfragen oder technische Administration ohne großes Softwareprojekt."] },
                  typicalTasks: { title: "Typische Aufgaben", items: ["Tool-Spezifikation", "Formular- und Dashboard-Design", "User Workflow Setup", "Zugriffsstruktur", "Deployment-Support"] },
                  deliverables: { title: "Deliverables", items: ["Internes Web-Tool", "Admin-Workflow", "Nutzerhinweise", "Deployment-Paket", "Grundlegende Dokumentation"] },
                  methods: { title: "Methoden & Standards", badge: true, items: ["MVP-Scope", "User Workflow", "Iteratives Review", "Praktisches Deployment"] },
                  tools: { title: "Software & Tools", badge: true, items: ["React", "TypeScript", "Python", "Datenbanken", "Cloud Hosting"] },
                  industries: { title: "Relevante Branchen", items: ["Technische Unternehmen", "Dienstleister", "Ausbildung und Training", "Operations-Teams"] }
                },
                cta: "Benötigen Sie ein individuelles Business-Tool? Kontaktieren Sie Tanisten."
              },
              {
                id: "data-processing-solutions",
                title: "Datenverarbeitungslösungen",
                description: "Bereinigung, Konvertierung, Validierung und Vorbereitung wiederkehrender Datensätze, Exporte und technischer Dateien.",
                sections: {
                  description: { title: "Beschreibung", items: ["Tools zum Bereinigen, Transformieren, Prüfen und Vorbereiten technischer oder geschäftlicher Daten, die wiederholt in ähnlichen Formaten auftreten."] },
                  typicalTasks: { title: "Typische Aufgaben", items: ["Dateiverarbeitung", "Datenbereinigung", "Formatkonvertierung", "Validierungschecks", "Batch-Verarbeitung"] },
                  deliverables: { title: "Deliverables", items: ["Processing-Skripte", "Bereinigte Datensätze", "Validierungsberichte", "Nutzeranleitung", "Wiederholbarer Workflow"] },
                  methods: { title: "Methoden & Standards", badge: true, items: ["Datenvalidierung", "Wiederholbare Skripte", "Error Logging", "Nachvollziehbare Outputs"] },
                  tools: { title: "Software & Tools", badge: true, items: ["Python", "Pandas", "Excel", "CSV", "JSON"] },
                  industries: { title: "Relevante Branchen", items: ["Engineering", "Operations", "Business Reporting", "Technische Administration"] }
                },
                cta: "Benötigen Sie Datenverarbeitung? Kontaktieren Sie Tanisten."
              }
            ]
          },
          {
            id: "digital",
            title: "Digitale Lösungen",
            description:
              "Digitale Produkte und Plattformen zur Verbesserung von Geschäftsprozessen, Kommunikation und Kundeninteraktion.",
            products: [
              {
                id: "business-portals",
                title: "Business-Portale",
                description: "Interne oder kundenorientierte Portale für Anfragen, Dokumente, Statusverfolgung und Workflows.",
                detailSections: [
                  {
                    title: "Beschreibung",
                    items: [
                      "Zentrale Web-Portale für Unternehmen, die strukturierten Zugriff auf Informationen, Workflows, Dokumente, Nutzer oder operative Daten benötigen."
                    ]
                  },
                  {
                    title: "Typische Anwendungsfälle",
                    items: ["Kundenportale", "Partnerportale", "Service-Portale", "Dokumentenportale", "Projektkommunikationsportale", "Portale für technische Serviceanfragen"]
                  },
                  {
                    title: "Deliverables",
                    items: ["Webbasiertes Portal", "Benutzerlogin / Zugriffsstruktur", "Admin-Oberfläche", "Dokumenten- oder Content-Verwaltung", "Formulare und Anfrageprozesse", "Rollenbasiertes Zugriffskonzept"]
                  },
                  {
                    title: "Features",
                    items: ["Benutzer-Authentifizierung", "Rollenbasierter Zugriff", "Formulare und Einsendungen", "Dokumenten-Upload/Download", "Statusverfolgung", "Benachrichtigungen", "Admin-Dashboard"]
                  },
                  {
                    title: "Methoden & Technologien",
                    badge: true,
                    items: ["React", "TypeScript", "REST APIs", "Datenbankintegration", "Cloud-Deployment", "Authentifizierungs-Workflows", "Responsive UI"]
                  },
                  {
                    title: "Business Value",
                    items: ["Zentralisiert Kommunikation", "Reduziert E-Mail-Chaos", "Gibt Kunden strukturierten Zugriff auf Informationen", "Verbessert Transparenz", "Spart administrative Zeit"]
                  },
                  {
                    title: "Geeignet für",
                    items: ["Engineering-Unternehmen", "Dienstleistungsunternehmen", "Bildungsträger", "Kleine und mittelständische Unternehmen", "Technische Zulieferer"]
                  }
                ],
                sections: {
                  description: { title: "Beschreibung", items: ["Praktische Portale für Geschäftsworkflows, die Struktur, Sichtbarkeit und kontrollierten Zugriff benötigen."] },
                  typicalTasks: { title: "Typische Aufgaben", items: ["Portalstruktur", "User Flows", "Dokumentenbereiche", "Anfrageverfolgung"] },
                  deliverables: { title: "Deliverables", items: ["Webportal", "Admin-Bereich", "User-Rollen", "Deployment-Hinweise"] },
                  methods: { title: "Methoden & Standards", badge: true, items: ["Responsive Design", "Access Control", "Workflow Mapping"] },
                  tools: { title: "Software & Tools", badge: true, items: ["React", "TypeScript", "Datenbanken", "Cloud Hosting"] },
                  industries: { title: "Relevante Branchen", items: ["Technische Dienstleistungen", "Trainingszentren", "Industriezulieferer"] }
                },
                cta: "Benötigen Sie ein strukturiertes Business-Portal? Kontaktieren Sie Tanisten."
              },
              {
                id: "customer-platforms",
                title: "Kundenplattformen",
                description: "Kundenorientierte Plattformen für Self-Service, Anfragen, Dokumente und wiederkehrende Interaktionen.",
                detailSections: [
                  {
                    title: "Beschreibung",
                    items: [
                      "Digitale Plattformen, über die Kunden mit einem Unternehmen interagieren, Anfragen stellen, Informationen verfolgen oder Services online nutzen können."
                    ]
                  },
                  {
                    title: "Typische Anwendungsfälle",
                    items: ["Kundenbereich", "Serviceanfrage-Plattform", "Kunden-Onboarding-System", "Supportanfrage-Plattform", "Plattform für Dokumenteneinreichung"]
                  },
                  {
                    title: "Deliverables",
                    items: ["Kundenorientierte Webanwendung", "Anfrageformulare", "Kunden-Dashboard", "Admin-Dashboard", "Statusverfolgung", "Benachrichtigungskonzept"]
                  },
                  {
                    title: "Features",
                    items: ["Kundenlogin", "Anfrageübermittlung", "Datei-Upload", "Statusübersicht", "Admin-Verwaltung", "E-Mail-Benachrichtigungen", "Responsive Design"]
                  },
                  {
                    title: "Methoden & Technologien",
                    badge: true,
                    items: ["React", "TypeScript", "API-Integration", "Datenbank-Workflows", "Authentifizierung", "Formularverarbeitung", "Cloud-Hosting"]
                  },
                  {
                    title: "Business Value",
                    items: ["Macht Services leichter zugänglich", "Reduziert manuelle Kommunikation", "Verbessert die Kundenerfahrung", "Schafft eine professionelle digitale Schnittstelle", "Hilft Unternehmen, Anfragen zentral zu verwalten"]
                  },
                  {
                    title: "Geeignet für",
                    items: ["Arztpraxen", "Dienstleistungsunternehmen", "Bildungsträger", "Technische Unternehmen", "Lokale Unternehmen"]
                  }
                ],
                sections: {
                  description: { title: "Beschreibung", items: ["Digitale Kundenbereiche, die manuelle Kommunikation reduzieren und wiederkehrende Services leichter steuerbar machen."] },
                  typicalTasks: { title: "Typische Aufgaben", items: ["Kundenlogin", "Anfrageformulare", "Dokumentenfreigabe", "Statusanzeige"] },
                  deliverables: { title: "Deliverables", items: ["Kundenplattform", "Admin-Ansicht", "Benachrichtigungsworkflow", "Deployment-Setup"] },
                  methods: { title: "Methoden & Standards", badge: true, items: ["User-centered Workflow", "Datenschutzbewusstsein", "Responsive UI"] },
                  tools: { title: "Software & Tools", badge: true, items: ["React", "APIs", "Datenbanken", "Cloudflare Pages"] },
                  industries: { title: "Relevante Branchen", items: ["Dienstleister", "Arztpraxen", "Trainingsanbieter"] }
                },
                cta: "Möchten Sie Kunden online besser einbinden? Kontaktieren Sie Tanisten."
              },
              {
                id: "internal-company-tools",
                title: "Interne Unternehmens-Tools",
                description: "Interne Tools für Formulare, Dashboards, Reports, operative Verfolgung und Admin-Workflows.",
                detailSections: [
                  {
                    title: "Beschreibung",
                    items: [
                      "Individuelle interne Tools für Teams, die Tabellen, manuelle Routinearbeit oder unstrukturierte Abläufe ersetzen möchten."
                    ]
                  },
                  {
                    title: "Typische Anwendungsfälle",
                    items: ["Internes Aufgabenmanagement", "Kleine ERP-ähnliche Tools", "Mitarbeiter-Tools", "Dokumentenverfolgung", "Anfragemanagement", "Interne Wissens-Tools", "Operative Workflow-Tools"]
                  },
                  {
                    title: "Deliverables",
                    items: ["Interne Webanwendung", "Admin-Oberfläche", "Datenformulare", "Tabellen und Filter", "Benutzerrollen", "Exportfunktionen", "Einfaches Reporting"]
                  },
                  {
                    title: "Features",
                    items: ["CRUD-Funktionen", "Benutzerverwaltung", "Datentabellen", "Suche und Filter", "Datei-Anhänge", "Workflow-Status", "Export nach Excel / CSV"]
                  },
                  {
                    title: "Methoden & Technologien",
                    badge: true,
                    items: ["React", "TypeScript", "Python / Node.js Backend", "REST APIs", "PostgreSQL", "Authentifizierung", "Cloud/VPS-Deployment"]
                  },
                  {
                    title: "Business Value",
                    items: ["Ersetzt unübersichtliche Tabellen", "Strukturiert interne Abläufe", "Reduziert manuelle Routinearbeit", "Macht Informationen leichter auffindbar", "Verbessert operative Transparenz"]
                  },
                  {
                    title: "Geeignet für",
                    items: ["Kleine Unternehmen", "Engineering-Teams", "Bildungsträger", "Dienstleistungsunternehmen", "Operations-Teams"]
                  }
                ],
                sections: {
                  description: { title: "Beschreibung", items: ["Schlanke interne Anwendungen für Teams, die ein praktisches Tool statt manueller Tabellen benötigen."] },
                  typicalTasks: { title: "Typische Aufgaben", items: ["Formularworkflows", "Dashboards", "Admin-Screens", "Datentracking"] },
                  deliverables: { title: "Deliverables", items: ["Interne Web-App", "Datenmodell", "Nutzerhinweise", "Deployment-Paket"] },
                  methods: { title: "Methoden & Standards", badge: true, items: ["MVP-Scope", "Rollenbasierter Workflow", "Iteratives Review"] },
                  tools: { title: "Software & Tools", badge: true, items: ["React", "TypeScript", "Python", "Datenbanken"] },
                  industries: { title: "Relevante Branchen", items: ["Kleine Unternehmen", "Engineering-Teams", "Operations"] }
                },
                cta: "Benötigen Sie ein internes Tool für Ihr Team? Kontaktieren Sie Tanisten."
              },
              {
                id: "booking-scheduling-systems",
                title: "Buchungs- und Terminlösungen",
                description: "Buchungs- und Terminworkflows für Termine, Trainings, Services oder operative Ressourcen.",
                detailSections: [
                  {
                    title: "Beschreibung",
                    items: [
                      "Buchungs- und Terminsysteme für Unternehmen, bei denen Kunden Leistungen, Beratungen, Kurse oder Termine online buchen sollen."
                    ]
                  },
                  {
                    title: "Typische Anwendungsfälle",
                    items: ["Terminbuchung für Arztpraxen", "Beratungsbuchungen", "Kurs- und Trainingsplanung", "Servicetermine", "Terminplanung für Kundenanfragen"]
                  },
                  {
                    title: "Deliverables",
                    items: ["Buchungsoberfläche", "Admin-Kalender", "Verfügbarkeitslogik", "Bestätigungsprozess", "E-Mail-Benachrichtigungen", "Kundenformular", "Optionale KI-Assistenten-Integration"]
                  },
                  {
                    title: "Features",
                    items: ["Datum- und Zeitauswahl", "Buchungsformular", "Admin-Übersicht", "E-Mail-Bestätigungen", "Terminstatus", "Einfache Kundendatenerfassung", "Optionale Chatbot-Unterstützung"]
                  },
                  {
                    title: "Methoden & Technologien",
                    badge: true,
                    items: ["React", "TypeScript", "Kalenderintegration", "Backend/API-Integration", "E-Mail-Benachrichtigungen", "Datenbankspeicherung", "Responsive UI"]
                  },
                  {
                    title: "Business Value",
                    items: ["Reduziert Telefonate und manuelle Terminplanung", "Macht Buchungen für Kunden einfacher", "Spart administrative Zeit", "Gibt Unternehmen bessere Terminübersicht", "Verbessert die Kundenerfahrung"]
                  },
                  {
                    title: "Geeignet für",
                    items: ["Arztpraxen", "Bildungsträger", "Berater", "Dienstleister", "Lokale Unternehmen"]
                  }
                ],
                sections: {
                  description: { title: "Beschreibung", items: ["Terminlösungen für Teams, die strukturierte Buchung, Verfügbarkeit und Kundenkommunikation benötigen."] },
                  typicalTasks: { title: "Typische Aufgaben", items: ["Buchungsflow", "Verfügbarkeitsregeln", "Kundenbenachrichtigungen", "Admin-Übersicht"] },
                  deliverables: { title: "Deliverables", items: ["Buchungsinterface", "Admin-Kalender", "Benachrichtigungssetup", "Deployment-Hinweise"] },
                  methods: { title: "Methoden & Standards", badge: true, items: ["Responsive UI", "Workflow-Validierung", "Klare Buchungsregeln"] },
                  tools: { title: "Software & Tools", badge: true, items: ["React", "Calendar APIs", "Datenbanken", "E-Mail-Services"] },
                  industries: { title: "Relevante Branchen", items: ["Arztpraxen", "Trainingszentren", "Dienstleister"] }
                },
                cta: "Benötigen Sie ein Online-Buchungssystem? Kontaktieren Sie Tanisten."
              },
              {
                id: "company-websites",
                title: "Unternehmenswebsites",
                description: "Professionelle Websites und Landingpages für technische Unternehmen und Dienstleister.",
                detailSections: [
                  {
                    title: "Beschreibung",
                    items: [
                      "Professionelle Unternehmenswebsites und Landingpages für technische Unternehmen, Dienstleister und kleine Firmen, die einen klaren Online-Auftritt benötigen."
                    ]
                  },
                  {
                    title: "Typische Anwendungsfälle",
                    items: ["Unternehmenswebsite", "Service-Landingpage", "Website für technische Unternehmen", "Portfolio-Website", "Zweisprachige Website", "Website-Redesign"]
                  },
                  {
                    title: "Deliverables",
                    items: ["Responsive Website", "Klare Leistungsseiten", "Kontaktformular", "SEO-freundliche Struktur", "Zweisprachige EN/DE-Struktur falls erforderlich", "Unterstützung beim Deployment", "Unterstützung bei Domain und Hosting"]
                  },
                  {
                    title: "Features",
                    items: ["Modernes responsives Design", "Leistungsbereiche", "Kontaktformulare", "Mehrsprachige Struktur", "SEO-Metadaten", "Schnelle Ladezeiten", "Cloud-Deployment"]
                  },
                  {
                    title: "Methoden & Technologien",
                    badge: true,
                    items: ["React", "TypeScript", "Tailwind CSS", "Vite", "Cloudflare Pages", "GitHub Deployment", "Basic SEO"]
                  },
                  {
                    title: "Business Value",
                    items: ["Schafft professionelle Online-Glaubwürdigkeit", "Erklärt Leistungen klar", "Unterstützt Kundengewinnung", "Gibt Partnern eine Stelle zur Verifizierung", "Funktioniert als digitale Visitenkarte und Verkaufstool"]
                  },
                  {
                    title: "Geeignet für",
                    items: ["Engineering-Berater", "Dienstleister", "Kleine Unternehmen", "Bildungsträger", "Technische Startups"]
                  }
                ],
                sections: {
                  description: { title: "Beschreibung", items: ["Glaubwürdige Websites für Unternehmen, die klare Leistungspositionierung und direkte Kundenansprache benötigen."] },
                  typicalTasks: { title: "Typische Aufgaben", items: ["Website-Struktur", "Copy-Struktur", "Responsive Layout", "Deployment-Setup"] },
                  deliverables: { title: "Deliverables", items: ["Unternehmenswebsite", "SEO-Metadaten", "Kontaktflow", "Deployment-Anleitung"] },
                  methods: { title: "Methoden & Standards", badge: true, items: ["Responsive Design", "SEO Basics", "Performance Awareness"] },
                  tools: { title: "Software & Tools", badge: true, items: ["React", "Vite", "Tailwind CSS", "Cloudflare Pages"] },
                  industries: { title: "Relevante Branchen", items: ["Engineering-Unternehmen", "Beratungen", "Kleine Unternehmen"] }
                },
                cta: "Benötigen Sie eine professionelle Unternehmenswebsite? Kontaktieren Sie Tanisten."
              },
              {
                id: "dashboards-reporting-systems",
                title: "Dashboards & Reporting-Systeme",
                description: "Dashboards und Reporting-Interfaces für operative, kundenbezogene oder technische Daten.",
                detailSections: [
                  {
                    title: "Beschreibung",
                    items: [
                      "Dashboards und Reporting-Systeme, mit denen Unternehmen geschäftliche oder technische Daten anzeigen, verfolgen und besser verstehen können."
                    ]
                  },
                  {
                    title: "Typische Anwendungsfälle",
                    items: ["Management-Dashboards", "Projektstatus-Dashboards", "Trainingsfortschritt-Dashboards", "Vertriebs- oder Operations-Reporting", "Engineering-Datenübersichten", "Automatisierte Berichtserstellung"]
                  },
                  {
                    title: "Deliverables",
                    items: ["Dashboard-Oberfläche", "Datentabellen", "Diagramme und KPIs", "Filter", "Exportfunktionen", "Reporting-Logik", "Automatisierte Berichtsvorlagen"]
                  },
                  {
                    title: "Features",
                    items: ["KPI-Karten", "Diagramme", "Tabellen", "Filter", "Datumsbereiche", "Export nach Excel / CSV", "Automatisierte Berichtserstellung"]
                  },
                  {
                    title: "Methoden & Technologien",
                    badge: true,
                    items: ["React", "TypeScript", "Python-Datenverarbeitung", "APIs", "Datenbankintegration", "Excel / CSV Workflows", "Automatisierungsskripte"]
                  },
                  {
                    title: "Business Value",
                    items: ["Macht Daten leichter verständlich", "Reduziert manuelle Reporting-Arbeit", "Verbessert Entscheidungen", "Spart Zeit für Management und Teams", "Schafft Transparenz in Abläufen"]
                  },
                  {
                    title: "Geeignet für",
                    items: ["Kleine und mittelständische Unternehmen", "Bildungsträger", "Engineering-Teams", "Dienstleistungsunternehmen", "Operations-Teams"]
                  }
                ],
                sections: {
                  description: { title: "Beschreibung", items: ["Visuelle Reportingsysteme, die wiederkehrende Daten in klare operative Ansichten übersetzen."] },
                  typicalTasks: { title: "Typische Aufgaben", items: ["KPI-Struktur", "Datenvisualisierung", "Filterung", "Report-Export"] },
                  deliverables: { title: "Deliverables", items: ["Dashboard UI", "Datenanbindung", "Report-Ansichten", "Nutzerhinweise"] },
                  methods: { title: "Methoden & Standards", badge: true, items: ["Datenvalidierung", "Dashboard UX", "Iteratives Review"] },
                  tools: { title: "Software & Tools", badge: true, items: ["React", "Chart Libraries", "APIs", "Datenbanken"] },
                  industries: { title: "Relevante Branchen", items: ["Operations", "Technische Dienstleistungen", "Business Reporting"] }
                },
                cta: "Benötigen Sie Dashboards oder automatisiertes Reporting? Kontaktieren Sie Tanisten."
              }
            ]
          }
        ]
      }
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
        { title: "Sondermaschinenbau & Halbleiterausrüstung", description: "Konstruktionsunterstützung für Präzisionsmodule, Ausrüstungsupdates und Produktionsdokumentation." },
        { title: "Industriemaschinen", description: "CAD-, Dokumentations- und Automatisierungsunterstützung für Maschinenbauer und Zulieferer." },
        { title: "Engineering-Ausbildung & Training", description: "Digitale Lernwerkzeuge, technische Assistenten und strukturierte Trainings-Workflows." }
      ],
      whyTanisten: [
        {
          title: "10+ Jahre Erfahrung",
          description: "Erfahrung in Luftfahrt-, Halbleiter- und Industrieprojekten.",
          accent: "engineering"
        },
        {
          title: "Luftfahrt & Halbleiter",
          description:
            "Erfahrung mit komplexen technischen Produkten, technischer Dokumentation und Projektunterstützung.",
          accent: "neutral"
        },
        {
          title: "Engineering + Automatisierung",
          description:
            "Kombination aus mechanischer Konstruktion, Workflow-Automatisierung, KI-Assistenten und Business-Tools.",
          accent: "automation"
        },
        {
          title: "Digitale Lösungen",
          description:
            "Praktische Business-Portale, Websites, interne Tools und digitale Kundenplattformen.",
          accent: "digital"
        },
        {
          title: "Flexible Projektunterstützung",
          description:
            "Zusätzliche technische Kapazität für projektbezogene Aufgaben und wachsende Teams.",
          accent: "neutral"
        }
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
        { title: "Sondermaschinenbau & Halbleiterausrüstung", description: "Unterstützung für Präzisionsmodule, Ausrüstungsupdates, Tooling und Produktionsdokumentation." },
        { title: "Präzise mechanische Systeme", description: "Arbeit für Systeme, bei denen Schnittstellen, Toleranzen und Dokumentationsqualität wichtig sind." },
        { title: "Industriemaschinen", description: "Technische Unterstützung für Maschinenbauer, Zulieferer und produktionsnahe Updates." },
        { title: "Engineering-Ausbildung", description: "Digitale Tools und Trainings-Workflows für technische Ausbildung und internes Lernen." }
      ],
      experience: [
        { title: "Maschinenbau- und Luftfahrttechnik-Hintergrund", description: "Erfahrungsbasis aus Engineering-Ausbildung und technischen Projektumgebungen." },
        { title: "Flugzeugstrukturen und Innenausstattung", description: "Praktische Arbeit im Kontext struktureller und innenraumbezogener Engineering-Aufgaben." },
        { title: "Sondermaschinenbau und Halbleiterausrüstung", description: "Erfahrung als Konstrukteur in Präzisionsanlagen-Umgebungen mit CAD- und Dokumentationsanforderungen." },
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
