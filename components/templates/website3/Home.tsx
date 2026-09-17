import type { WebsiteData } from "./data";
import Header from "./Header";
import Footer from "./Footer";
import { ArrowUpRight, CtaBand, Reveal, SmartImage } from "./shared";
import { pageHref } from "./links";
import styles from "./styles.module.css";

export default function Home({ data, basePath }: { data: WebsiteData; basePath: string }) {
  const products = data.products ?? [];

  return (
    <div className={styles.site}>
      <Header data={data} basePath={basePath} />

      <main>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>{data.businessType} · {data.location}</p>
            <h1>{data.content.heroTitle}</h1>
            <p className={styles.heroText}>{data.content.heroDescription}</p>
            <div className={styles.actions}>
              <a className={styles.primaryButton} href={pageHref(basePath, "contact")}>{data.content.ctaText}</a>
              <a className={styles.secondaryButton} href={pageHref(basePath, "products")}>View products <ArrowUpRight /></a>
            </div>
          </div>

          <div className={styles.heroMedia}>
            <SmartImage
              src={data.images.hero}
              alt={`${data.companyName} — hero`}
              monogram={data.companyName.slice(0, 1).toUpperCase()}
              loading="eager"
            />
            <div className={styles.heroStamp}>{data.companyName}</div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionLabel}>About</div>
          <div className={styles.sectionContent}>
            <Reveal>
              <h2>{data.content.aboutTitle}</h2>
              <p className={styles.bodyLarge}>{data.content.aboutDescription}</p>
              <a className={styles.textLink} href={pageHref(basePath, "about")}>Discover more <ArrowUpRight /></a>
            </Reveal>
            {data.images.about && (
              <Reveal delay={80}>
                <SmartImage src={data.images.about} alt={`${data.companyName} — about`} />
              </Reveal>
            )}
          </div>
        </section>

        <section className={styles.sectionAlt}>
          <div className={styles.sectionHeadingRow}>
            <div className={styles.sectionLabel}>Products</div>
            <a className={styles.textLink} href={pageHref(basePath, "products")}>View all <ArrowUpRight /></a>
          </div>

          <div className={styles.cards}>
            {products.slice(0, 3).map((product, index) => (
              <article key={`${product.name}-${index}`} className={styles.card}>
                <SmartImage src={product.image} alt={product.name} monogram={product.name.slice(0, 1)} />
                <span className={styles.cardNumber}>0{index + 1}</span>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
              </article>
            ))}
          </div>
        </section>

        <CtaBand data={data} basePath={basePath} />
      </main>

      <Footer data={data} basePath={basePath} />
    </div>
  );
}
