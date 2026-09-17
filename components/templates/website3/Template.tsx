import { Poppins } from "next/font/google";
import type { TemplatePage, WebsiteData } from "@/types/website";
import Home from "./Home";
import About from "./About";
import Products from "./Products";
import Contact from "./Contact";
import { withTemplateProducts } from "./data";

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
  const safeData = withTemplateProducts(data as import("./data").WebsiteData);
  const safeBasePath = normalizeBasePath(safeData, basePath);

  let content;
  switch (page) {
    case "about":
      content = <About data={safeData} basePath={safeBasePath} />;
      break;
    case "products":
      content = <Products data={safeData} basePath={safeBasePath} />;
      break;
    case "contact":
      content = <Contact data={safeData} basePath={safeBasePath} />;
      break;
    default:
      content = <Home data={safeData} basePath={safeBasePath} />;
  }

  return <div className={poppins.className}>{content}</div>;
}

export default BusinessWebsiteTemplate;
