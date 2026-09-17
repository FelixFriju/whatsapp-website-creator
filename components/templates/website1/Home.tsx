/**
 * website1 — Home page
 * Header → Hero → Intro → About preview → Services → Featured products → CTA → Footer
 */

import type { Product, WebsiteData } from "./data";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ProductGrid } from "./ProductGrid";
import { ArrowUpRight, CtaBand, Reveal, SmartImage, WhatsAppIcon } from "./shared";
import { pageHref, whatsappLink } from "./links";
import s from "./styles.module.css";

export function Home({ data, basePath }: { data: WebsiteData; basePath: string }) {
  const products: Product[] = data.products ?? [];

  return (
    <div className={s.root}>
      <Header data={data} basePath={basePath} />

      <main>
        {/* Hero */}
        <section className={s.hero} aria-labelledby="tpl-home-title">
          <div className={s.container}>
            <div className={s.heroSplit}>
              <div className={s.heroCopy}>
                <span className={s.heroEyebrow}>{data.businessType}</span>
                <h1 id="tpl-home-title" className={s.heroTitle}>{data.content.heroTitle}</h1>
                <p className={s.heroDesc}>{data.content.heroDescription}</p>
                <div className={s.heroActions}>
                  <a className={`${s.btn} ${s.btnPrimary}`} href={pageHref(basePath, "products")}>
                    View Products
                  </a>
                  <a className={`${s.btn} ${s.btnGhost}`} href={pageHref(basePath, "about")}>
                    Learn More
                  </a>
                  <a
                    className={`${s.btn} ${s.btnWhatsapp}`}
                    href={whatsappLink(data.phone)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <WhatsAppIcon />
                    WhatsApp
                  </a>
                </div>

                <div className={s.heroMeta}>
                  <div className={s.heroMetaItem}>
                    <span className={s.heroMetaLabel}>Location</span>
                    <span className={s.heroMetaValue}>{data.location}</span>
                  </div>
                  <div className={s.heroMetaItem}>
                    <span className={s.heroMetaLabel}>Phone</span>
                    <span className={s.heroMetaValue}>{data.phone}</span>
                  </div>
                  <div className={s.heroMetaItem}>
                    <span className={s.heroMetaLabel}>Email</span>
                    <span className={s.heroMetaValue}>{data.email}</span>
                  </div>
                </div>
              </div>

              <div className={s.heroMedia}>
                <SmartImage
                  src={data.images.hero}
                  alt={`${data.companyName} — hero`}
                  monogram={data.companyName.slice(0, 1)}
                  ratioClass={s.ratioTall}
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Intro / About preview */}
        <section className={s.section} aria-labelledby="tpl-intro-title">
          <div className={s.container}>
            <div className={s.introGrid}>
              <Reveal className={s.introCopy}>
                <p className={s.eyebrow}>01 · About</p>
                <h2 id="tpl-intro-title" className={s.sectionTitle}>{data.content.aboutTitle}</h2>
                <p>{data.content.aboutDescription}</p>
                <div className={s.heroActions}>
                  <a className={`${s.btn} ${s.btnPrimary}`} href={pageHref(basePath, "about")}>
                    Learn More
                    <ArrowUpRight />
                  </a>
                </div>
              </Reveal>

              <Reveal className={s.introMedia} delay={90}>
                <SmartImage
                  src={data.images.about}
                  alt={`${data.companyName} — about`}
                  monogram={data.companyName.slice(0, 1)}
                  ratioClass={s.ratioTall}
                />
                <div className={s.introBadge}>
                  <span className={s.introBadgeValue}>{data.businessType}</span>
                  <span className={s.introBadgeLabel}>Every piece chosen by hand</span>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className={`${s.section} ${s.sectionAlt}`} aria-labelledby="tpl-services-title">
          <div className={s.container}>
            <div className={s.sectionHead}>
              <div>
                <p className={s.eyebrow}>02 · Services</p>
                <h2 id="tpl-services-title" className={s.sectionTitle}>{data.content.servicesTitle}</h2>
              </div>
            </div>
            <div className={s.servicesGrid}>
              {data.content.services.map((service, i) => (
                <Reveal key={service} delay={i * 70} as="div">
                  <div className={s.serviceCard}>
                    <span className={s.serviceIndex}>{String(i + 1).padStart(2, "0")}</span>
                    <p className={s.serviceText}>{service}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Featured products */}
        <section className={s.section} aria-labelledby="tpl-featured-title">
          <div className={s.container}>
            <div className={s.sectionHead}>
              <div>
                <p className={s.eyebrow}>03 · Collection</p>
                <h2 id="tpl-featured-title" className={s.sectionTitle}>
                  Featured products
                </h2>
                <p className={s.sectionSub}>
                  A selection from the current collection. Open any piece for its provenance and a pre-filled WhatsApp enquiry.
                </p>
              </div>
              <a className={`${s.btn} ${s.btnGhost}`} href={pageHref(basePath, "products")}>
                View Products
                <ArrowUpRight />
              </a>
            </div>

            <Reveal>
              <ProductGrid products={products.slice(0, 3)} data={data} basePath={basePath} />
            </Reveal>
          </div>
        </section>

        <CtaBand data={data} basePath={basePath} />
      </main>

      <Footer data={data} basePath={basePath} />
    </div>
  );
}
