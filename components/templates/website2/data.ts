import type { WebsiteData as PlatformWebsiteData } from "@/types/website";

export type Product = {
  name: string;
  description: string;
  image?: string;
};

export type WebsiteData = PlatformWebsiteData;

export function withTemplateProducts(data: WebsiteData): WebsiteData & { products: Product[] } {
  const services = Array.isArray(data.content.services) ? data.content.services : [];
  const fallbackNames = [
    "Featured offering",
    "Signature selection",
    "Specialist solution",
    "Essential choice",
    "Premium option",
    "Custom experience",
  ];

  const products = Array.from({ length: 6 }, (_, index) => {
    const name = (services[index] ?? fallbackNames[index]).trim();
    return {
      name,
      description: `Discover ${name.toLowerCase()} from ${data.companyName}. Contact us for availability, details and requirements.`,
      image: data.images.products?.[index],
    };
  });

  return { ...data, products };
}
