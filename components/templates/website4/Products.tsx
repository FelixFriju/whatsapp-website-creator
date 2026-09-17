import type { WebsiteData } from "./data";
import { withTemplateProducts } from "./data";
import { ProductGrid } from "./ProductGrid";
import { SectionLabel } from "./shared";
import s from "./styles.module.css";

export function Products({ data, basePath }: { data: WebsiteData; basePath: string }) {
  const safe = withTemplateProducts(data);
  return (
    <main>
      <section className={s.productsHero}><SectionLabel>{data.businessType}</SectionLabel><h1>Selected products.</h1><p>Explore six offerings shaped around what {data.companyName} does best.</p></section>
      <section className={s.sectionProducts}><ProductGrid products={safe.products} data={safe} /></section>
    </main>
  );
}
