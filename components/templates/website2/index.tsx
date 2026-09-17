import type { WebsiteData, TemplatePage } from "@/types/website";
import Home from "./Home";
import About from "./About";
import Products from "./Products";
import Contact from "./Contact";

export default function Website3({
  data,
  page = "home",
}: {
  data: WebsiteData;
  page?: TemplatePage;
}) {
  if (page === "about") return <About data={data} />;
  if (page === "products") return <Products data={data} />;
  if (page === "contact") return <Contact data={data} />;
  return <Home data={data} />;
}
