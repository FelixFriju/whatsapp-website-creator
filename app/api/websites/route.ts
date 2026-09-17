import { NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";
import { slugify } from "@/lib/slug";
import { generateContent } from "@/lib/ai/content";
import { getRandomTemplateId } from "@/lib/templates";
import { searchUnsplash } from "@/lib/unsplash";


const schema = z.object({
  companyName: z.string().min(2).max(100),
  businessType: z.string().min(2).max(100),
  phone: z.string().min(5).max(30),
  email: z.string().email().max(200),
  location: z.string().min(2).max(120),
});

export async function POST(req: Request) {
  try {
    const input = schema.parse(await req.json());
    const supabase = createAdminClient();
    const templateId = getRandomTemplateId();

    let slug = slugify(input.companyName);
    const baseSlug = slug;
    let suffix = 1;

    while (true) {
      const { data: existing } = await supabase
        .from("websites")
        .select("id")
        .eq("slug", slug)
        .maybeSingle();

      if (!existing) break;
      suffix += 1;
      slug = `${baseSlug}-${suffix}`;
    }

    const { data: site, error } = await supabase
      .from("websites")
      .insert({
        company_name: input.companyName,
        slug,
        template_id: templateId,
        status: "generating",
      })
      .select()
      .single();

    if (error || !site) throw error ?? new Error("Could not create website");

    const { error: profileError } = await supabase
      .from("business_profiles")
      .insert({
        website_id: site.id,
        phone: input.phone,
        email: input.email,
        location: input.location,
        business_subject: input.businessType,
      });

    if (profileError) throw profileError;

    const content = await generateContent({
      companyName: input.companyName,
      businessType: input.businessType,
    });
    console.log("BEFORE UNSPLASH:", input.businessType);

    const photos = await searchUnsplash(input.businessType);

    console.log("UNSPLASH RESULTS:", photos.length);

    const heroPhoto = photos[0];
    const aboutPhoto = photos[1] ?? heroPhoto;

    const productImages = photos
       .slice(2, 8)
       .map((photo) => photo.urls.regular);

    const { error: contentError } = await supabase
      .from("generated_content")
      .insert({
        website_id: site.id,
        hero_title: content.heroTitle,
        hero_description: content.heroDescription,
        about_title: content.aboutTitle,
        about_description: content.aboutDescription,
        services_title: content.servicesTitle,
        services: content.services,
        contact_title: content.contactTitle,
        cta_text: content.ctaText,
        hero_image: heroPhoto?.urls.regular ?? "/business-images/default.svg",
        about_image: aboutPhoto?.urls.regular ?? "/business-images/default.svg",
        product_images: productImages,
      });

    if (contentError) throw contentError;

    const { error: statusError } = await supabase
      .from("websites")
      .update({ status: "published" })
      .eq("id", site.id);

    if (statusError) throw statusError;

    return NextResponse.json({ id: site.id, slug, templateId });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to create website" },
      { status: 400 },
    );
  }
}
