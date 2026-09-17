import type { WebsiteData as PlatformWebsiteData } from "@/types/website";

export type Product = {
  name: string;
  description: string;
  image?: string;
};

export type WebsiteData = PlatformWebsiteData & {
  images: PlatformWebsiteData["images"] & {
    products?: string[];
  };
};

export function withTemplateProducts(data: WebsiteData): WebsiteData & { products: Product[] } {
  const names = Array.isArray(data.content.services) ? data.content.services : [];
  const products: Product[] = names.slice(0, 6).map((name, index) => ({
    name,
    description: `${name} by ${data.companyName}. Crafted around the needs of customers looking for quality ${data.businessType.toLowerCase()} solutions.`,
    image: data.images.products?.[index],
  }));

  return { ...data, products };
}
