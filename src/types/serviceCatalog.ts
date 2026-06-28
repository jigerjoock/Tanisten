export type ServiceAccent = "engineering" | "automation" | "digital";

export interface ServiceDetailSection {
  title: string;
  items: string[];
  badge?: boolean;
}

export interface ServiceProduct {
  id: string;
  title: string;
  description: string;
  cardTitle?: string;
  cardDescription?: string;
  catalogOrder?: number;
  catalogHidden?: boolean;
  detailSections?: ServiceDetailSection[];
  sections: {
    description: ServiceDetailSection;
    typicalTasks: ServiceDetailSection;
    deliverables: ServiceDetailSection;
    methods: ServiceDetailSection;
    tools: ServiceDetailSection;
    industries: ServiceDetailSection;
  };
  cta: string;
}

export interface ServiceCategory {
  id: ServiceAccent;
  title: string;
  description: string;
  products: ServiceProduct[];
}

export interface ServiceCatalogContent {
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  catalogEyebrow: string;
  catalogTitle: string;
  catalogDescription: string;
  directionLabel: string;
  navigationTitle: string;
  detailsTitle: string;
  selectTitle: string;
  selectText: string;
  productSelectTitle: string;
  contactLabel: string;
  learnMoreLabel: string;
  defaultProductId: string;
  categories: ServiceCategory[];
}
