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
  if (data.products?.length === 6) return data;

  const names = data.content.services ?? [];
  const fallbacks = [
    "Featured Offering",
    "Signature Offering",
    "Specialist Offering",
    "Custom Offering",
    "Premium Offering",
    "Complete Solution",
  ];

  const products: Product[] = Array.from({ length: 6 }, (_, index) => {
    const name = names[index] ?? fallbacks[index];
    return {
      name,
      description: `${name} from ${data.companyName}. Contact us for details, availability and requirements.`,
      image: data.images.products?.[index],
    };
  });

  return { ...data, products };
}
