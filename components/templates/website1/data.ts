import type { WebsiteData as PlatformWebsiteData } from "@/types/website";

export type Product = {
  name: string;
  description: string;
  image?: string;
};

export type WebsiteData = PlatformWebsiteData & {
  products?: Product[];
  images: PlatformWebsiteData["images"] & {
    products?: string[];
  };
};

export function withTemplateProducts(data: WebsiteData): WebsiteData {
  if (data.products?.length) return data;

  const products: Product[] = (data.content.services ?? []).map((service, index) => ({
    name: service,
    description: `${service}. Learn more about how ${data.companyName} provides this offering in ${data.location}.`,
    image: data.images.services?.[index] ?? data.images.products?.[index],
  }));

  return { ...data, products };
}
