import { createAdminClient } from "@/lib/supabase/admin";
import { WebsiteData } from "@/types/website";

export async function getWebsiteBySlug(slug: string): Promise<WebsiteData | null> {
  const supabase = createAdminClient();

  const { data: site } = await supabase
    .from("websites")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (!site) return null;

  const [{ data: profile }, { data: content }] = await Promise.all([
    supabase.from("business_profiles").select("*").eq("website_id", site.id).maybeSingle(),
    supabase.from("generated_content").select("*").eq("website_id", site.id).maybeSingle(),
  ]);

  if (!profile || !content) return null;

  return {
    id: site.id,
    companyName: site.company_name,
    businessType: profile.business_subject,
    phone: profile.phone,
    email: profile.email,
    location: profile.location,
    templateCategory: site.template_category ?? undefined,
    templateId: site.template_id,
    status: site.status,
    slug: site.slug,
    content: {
      heroTitle: content.hero_title,
      heroDescription: content.hero_description,
      aboutTitle: content.about_title,
      aboutDescription: content.about_description,
      servicesTitle: content.services_title,
      services: Array.isArray(content.services) ? content.services : [],
      contactTitle: content.contact_title,
      ctaText: content.cta_text,
    },
    images: {
       hero: content.hero_image ?? "/business-images/default.svg",
       about: content.about_image,
       products: Array.isArray(content.product_images)
          ? content.product_images
          : [],
},
  };
}
