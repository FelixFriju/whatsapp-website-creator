"use client";

import { useEffect } from "react";
import type { WebsiteData } from "./data";
import Header from "./Header";
import Footer from "./Footer";
import ProductGrid from "./ProductGrid";
import { WhatsAppIcon } from "./shared";
import { whatsappLink } from "./links";
import styles from "./styles.module.css";

export default function Products({ data, basePath }: { data: WebsiteData; basePath: string }) {
  useEffect(() => {
    document.title = `Products — ${data.companyName}`;
    return () => { document.title = data.companyName; };
  }, [data.companyName]);

  return (
    <div className={styles.site}>
      <Header data={data} basePath={basePath} />
      <main>
        <section className={styles.pageHero}>
          <p className={styles.eyebrow}>Products & offerings</p>
          <h1>{data.content.servicesTitle}</h1>
          <p className={styles.heroText}>Explore the current products and offerings from {data.companyName}.</p>
        </section>
        <section className={styles.sectionAlt}>
          <div className={styles.productsHeader}>
            <div>
              <p className={styles.eyebrow}>Catalog</p>
              <p className={styles.body}>Open any product to see its details and send a WhatsApp enquiry with the product name included.</p>
            </div>
            <a className={styles.primaryButton} href={whatsappLink(data.phone)} target="_blank" rel="noopener noreferrer"><WhatsAppIcon /> General enquiry</a>
          </div>
          <ProductGrid products={data.products ?? []} data={data} basePath={basePath} />
        </section>
      </main>
      <Footer data={data} basePath={basePath} />
    </div>
  );
}
