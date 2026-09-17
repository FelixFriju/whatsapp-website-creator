import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import { templates } from "@/lib/templates";
import { notFound } from "next/navigation";
import { getWebsiteBySlug } from "@/lib/website";
import type { TemplatePage, WebsiteData } from "@/types/website";

const multiPages: TemplatePage[] = ["home", "about",  "products", "contact"];

export default async function Preview({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { id } = await params;
  const { page: requestedPage } = await searchParams;
  const db = createAdminClient();

  const { data: site } = await db
    .from("websites")
    .select("slug")
    .eq("id", id)
    .maybeSingle();

  if (!site) notFound();

  const data = await getWebsiteBySlug(site.slug);
  if (!data) notFound();

  const config = templates[data.templateId];
  const currentPage = multiPages.includes(requestedPage as TemplatePage)
    ? (requestedPage as TemplatePage)
    : "home";

  return (
    <>
      <div className="status shell preview-bar">
        <span>Preview mode</span>

        {config.type === "multi" && (
          <nav className="preview-links">
            {multiPages.map((page) => (
              <Link
                key={page}
                href={`/preview/${id}?page=${page}`}
                className={currentPage === page ? "active" : ""}
              >
                {page[0].toUpperCase() + page.slice(1)}
              </Link>
            ))}
          </nav>
        )}

        <Link href={`/api/websites/${id}/publish`}>Publish this website</Link>
        <Link href="/create">Create another</Link>
      </div>

      <PreviewRenderer data={data} page={currentPage} />
    </>
  );
}

function PreviewRenderer({
  data,
  page,
}: {
  data: WebsiteData;
  page: TemplatePage;
}) {
  const config = templates[data.templateId];

  if (config.type === "multi") {
    return <config.component data={data} page={page} />;
  }

  return <config.component data={data} />;
}
