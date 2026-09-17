import { Poppins } from "next/font/google";
import type { WebsiteData } from "./data";
import { withTemplateProducts } from "./data";
import Header from "./Header";
import Footer from "./Footer";
import ProductGrid from "./ProductGrid";
import s from "./styles.module.css";

const poppins = Poppins({ subsets: ["latin"], display: "swap", weight: ["400", "500", "600", "700"] });

export default function Products({ data }: { data: WebsiteData }) {
  const safe = withTemplateProducts(data);
  const basePath = data.slug ? `/${data.slug}` : "/";
  return (
    <div className={`${s.site} ${poppins.className}`}>
      <Header data={safe} basePath={basePath} />
      <main>
        <section className={s.pageHero}>
          <p className={s.eyebrow}>Collection · {data.companyName}</p>
          <h1>{safe.content.servicesTitle}</h1>
          <p>Explore six featured products or offerings selected for this business. Open any card for details and a direct WhatsApp enquiry.</p>
        </section>
        <section className={s.productsPageSection}>
          <ProductGrid products={safe.products} data={safe} />
        </section>
      </main>
      <Footer data={safe} basePath={basePath} />
    </div>
  );
}
