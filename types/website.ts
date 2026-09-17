export type TemplateCategory = "modern-website" | "standard-website" | "premium-website";

// Variant IDs are strings so new website1/website2/... variants can be added
// without editing this type each time.
export type TemplateId = string;

export type WebsiteStatus = "draft" | "generating" | "ready" | "published" | "unpublished";

export type WebsiteContent = {
  heroTitle: string;
  heroDescription: string;
  aboutTitle: string;
  aboutDescription: string;
  servicesTitle: string;
  services: string[];
  contactTitle: string;
  ctaText: string;
};

export type WebsiteData = {
  id?: string;
  companyName: string;
  businessType: string;
  phone: string;
  email: string;
  location: string;
  templateCategory?: TemplateCategory;
  templateId: TemplateId;
  status?: WebsiteStatus;
  slug?: string;
  content: WebsiteContent;
  images: {
  hero: string;
  about?: string;
  services?: string[];
  products?: string[];
};
};

export type TemplatePage = "home" | "about" | "products" | "contact";
