import type { WebsiteData } from "./data";
import { ArrowUpRight, SectionLabel, SmartImage } from "./shared";
import { pageHref } from "./links";
import s from "./styles.module.css";

export function Home({ data, basePath }: { data: WebsiteData; basePath: string }) {
  const productNames = data.content.services?.slice(0, 3) ?? [];
  return (
    <main>
      <section className={s.hero}>
        <SmartImage src={data.images.hero} alt={`${data.companyName} hero`} ratioClass={s.heroImage} />
        <div className={s.heroOverlay} />
        <div className={s.heroContent}>
          <SectionLabel>{data.businessType}</SectionLabel>
          <h1>{data.content.heroTitle}</h1>
          <p>{data.content.heroDescription}</p>
          <div className={s.heroActions}>
            <a className={s.lightButton} href={pageHref(basePath, "products")}>Explore products <ArrowUpRight /></a>
            <a className={s.textButton} href={pageHref(basePath, "about")}>Discover {data.companyName}</a>
          </div>
        </div>
        <div className={s.heroBottom}><span>{data.location}</span><span>Independent · Curated · Considered</span></div>
      </section>

      <section className={s.miniFeatureRow}>
        {productNames.map((name, i) => (
          <a key={`${name}-${i}`} href={pageHref(basePath, "products")} className={s.miniFeature}>
            <span>0{i + 1}</span><strong>{name}</strong><ArrowUpRight />
          </a>
        ))}
      </section>

      <section className={s.section}>
        <div className={s.sectionHeadingRow}>
          <div><SectionLabel>Latest collection</SectionLabel><h2>Made to be noticed.</h2></div>
          <a href={pageHref(basePath, "products")} className={s.underlineLink}>View all products <ArrowUpRight /></a>
        </div>
        <div className={s.featureGrid}>
          {(data.images.products ?? []).slice(0, 3).map((image, i) => (
            <a href={pageHref(basePath, "products")} key={`${image}-${i}`} className={s.featureCard}>
              <SmartImage src={image} alt={productNames[i] ?? `${data.companyName} product ${i + 1}`} ratioClass={s.featureRatio} />
              <div className={s.featureCardBody}><span>0{i + 1}</span><strong>{productNames[i] ?? "Featured product"}</strong><ArrowUpRight /></div>
            </a>
          ))}
        </div>
      </section>

      <section className={s.darkBand}>
        <div className={s.darkBandImage}><SmartImage src={data.images.about} alt={`${data.companyName} story`} /></div>
        <div className={s.darkBandCopy}><SectionLabel>Our point of view</SectionLabel><h2>{data.content.aboutTitle}</h2><p>{data.content.aboutDescription}</p><a className={s.lightButton} href={pageHref(basePath, "about")}>Read the story <ArrowUpRight /></a></div>
      </section>

      <section className={s.section}>
        <div className={s.editorialHeader}><SectionLabel>Why choose us</SectionLabel><h2>{data.content.servicesTitle}</h2><p>Everything is shaped around the character of your business and the people you serve.</p></div>
        <div className={s.editorialGrid}>
          {(data.content.services ?? []).slice(0, 6).map((item, i) => <div className={s.editorialItem} key={item}><span>0{i + 1}</span><h3>{item}</h3><p>{data.content.aboutDescription}</p></div>)}
        </div>
      </section>

      <section className={s.ctaBand}><SectionLabel>Start a conversation</SectionLabel><h2>{data.content.contactTitle}</h2><a className={s.darkButton} href={pageHref(basePath, "contact")}>{data.content.ctaText} <ArrowUpRight /></a></section>
    </main>
  );
}
