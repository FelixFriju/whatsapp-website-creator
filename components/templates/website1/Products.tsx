"use client";

/**
 * website1 — Products page
 * Full catalog. Every card opens the detail modal with WhatsApp enquiry.
 */

import { useEffect } from "react";
import type { WebsiteData } from "./data";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ProductGrid } from "./ProductGrid";
import { Reveal, WhatsAppIcon } from "./shared";
import { whatsappLink } from "./links";
import s from "./styles.module.css";

export function Products({ data, basePath }: { data: WebsiteData; basePath: string }) {
  useEffect(() => {
    document.title = `Products — ${data.companyName}`;
    return () => {
      document.title = data.companyName;
    };
  }, [data.companyName]);

  const products = data.products ?? [];

  return (
    <div className={s.root}>
      <Header data={data} basePath={basePath} />

      <main>
        <section className={s.sectionTight}>
          <div className={s.container}>
            <div className={s.sectionHead}>
              <div>
                <p className={s.eyebrow}>Catalog</p>
                <h1 className={s.sectionTitle}>{data.content.heroTitle}</h1>
                <p className={s.sectionSub}>
                  The current collection from {data.companyName}. Open any piece for its details, provenance, and a pre-filled WhatsApp enquiry.
                </p>
              </div>
              <a
                className={`${s.btn} ${s.btnWhatsapp}`}
                href={whatsappLink(data.phone)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon />
                General enquiry
              </a>
            </div>
          </div>
        </section>

        <section className={`${s.section} ${s.sectionAlt}`}>
          <div className={s.container}>
            <Reveal>
              <ProductGrid products={products} data={data} basePath={basePath} />
            </Reveal>
          </div>
        </section>
      </main>

      <Footer data={data} basePath={basePath} />
    </div>
  );
}
