import { Poppins } from "next/font/google";
import type { TemplatePage, WebsiteData } from "@/types/website";
import { Home } from "./Home";
import { About } from "./About";
import { Products } from "./Products";
import { Contact } from "./Contact";
import { Header } from "./Header";
import { Footer } from "./Footer";

const poppins = Poppins({ subsets: ["latin"], display: "swap", weight: ["400", "500", "600", "700"] });

function normalizeBasePath(data: WebsiteData, basePath?: string): string {
  if (basePath && basePath.trim()) return basePath;
  if (data.slug && data.slug.trim()) return `/${data.slug.replace(/^\/+|\/+$/g, "")}`;
  return "/";
}

export function Website4({ data, page = "home", basePath }: { data: WebsiteData; page?: TemplatePage; basePath?: string }) {
  const safeBasePath = normalizeBasePath(data, basePath);
  let content;

  switch (page) {
    case "about": content = <About data={data} basePath={safeBasePath} />; break;
    case "products": content = <Products data={data} basePath={safeBasePath} />; break;
    case "contact": content = <Contact data={data} basePath={safeBasePath} />; break;
    default: content = <Home data={data} basePath={safeBasePath} />;
  }

  return (
    <div className={poppins.className}>
      <Header data={data} basePath={safeBasePath} />
      {content}
      <Footer data={data} basePath={safeBasePath} />
    </div>
  );
}

export default Website4;
