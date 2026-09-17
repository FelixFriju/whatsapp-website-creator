import { notFound } from "next/navigation";
import { getWebsiteBySlug } from "@/lib/website";
import { templates } from "@/lib/templates";

export default async function PublicWebsite({ params }: { params: Promise<{ slug:string }> }) {
  const { slug } = await params;
  const data = await getWebsiteBySlug(slug);
  if (!data || data.status !== "published") notFound();
  const config = templates[data.templateId];
  if (!config) notFound();
  return <config.component data={data} page="home" />;
}
