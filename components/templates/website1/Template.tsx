import { Poppins } from "next/font/google";
import { Home } from "./Home";
import { About } from "./About";
import { Products } from "./Products";
import { Contact } from "./Contact";
import { withTemplateProducts, type WebsiteData } from "./data";
import type { TemplatePage } from "@/types/website";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

function normalizeBasePath(data: WebsiteData, basePath?: string): string {
  if (basePath && basePath.trim()) return basePath;
  if (data.slug && data.slug.trim()) return `/${data.slug.replace(/^\/+|\/+$/g, "")}`;
  return "/";
}

export function BusinessWebsiteTemplate({
  data,
  basePath,
  page = "home",
}: {
  data: WebsiteData;
  basePath?: string;
  page?: TemplatePage;
}) {
  const safeData = withTemplateProducts(data);
  const safeBasePath = normalizeBasePath(safeData, basePath);

  let pageContent;
  switch (page) {
    case "about":
      pageContent = <About data={safeData} basePath={safeBasePath} />;
      break;
    case "products":
      pageContent = <Products data={safeData} basePath={safeBasePath} />;
      break;
    case "contact":
      pageContent = <Contact data={safeData} basePath={safeBasePath} />;
      break;
    default:
      pageContent = <Home data={safeData} basePath={safeBasePath} />;
  }

  return <div className={poppins.className}>{pageContent}</div>;
}

export default BusinessWebsiteTemplate;
