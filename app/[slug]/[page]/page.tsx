import { notFound } from "next/navigation";
import { getWebsiteBySlug } from "@/lib/website";
import { templates } from "@/lib/templates";
import type { TemplatePage } from "@/types/website";

const allowedPages = new Set<TemplatePage>(["about", "products", "contact"]);

export default async function PublicSubPage({ params }: { params: Promise<{ slug:string; page:string }> }) {
  const { slug, page } = await params;
  const data = await getWebsiteBySlug(slug);
  if (!data || data.status !== "published") notFound();
  if (!allowedPages.has(page as TemplatePage)) notFound();
  const config = templates[data.templateId];
  if (!config) notFound();
  return <config.component data={data} page={page as TemplatePage} />;
}
