import { Poppins } from "next/font/google";
import type { WebsiteData } from "./data";
import { withTemplateProducts } from "./data";
import { pageHref } from "./links";
import Header from "./Header";
import Footer from "./Footer";
import ProductGrid from "./ProductGrid";
import { ArrowUpRight, SmartImage } from "./shared";
import s from "./styles.module.css";

const poppins = Poppins({ subsets: ["latin"], display: "swap", weight: ["400", "500", "600", "700"] });

export default function Home({ data }: { data: WebsiteData }) {
  const safe = withTemplateProducts(data);
  const basePath = data.slug ? `/${data.slug}` : "/";
  return (
    <div className={`${s.site} ${poppins.className}`}>
      <Header data={safe} basePath={basePath} />
      <main>
        <section className={s.hero}>
          <div className={s.heroMedia}><SmartImage src={safe.images.hero} alt={`${safe.companyName} hero`} ratioClass={s.heroRatio} /></div>
          <div className={s.heroOverlay}>
            <p className={s.eyebrow}>{safe.businessType} · {safe.location}</p>
            <h1>{safe.content.heroTitle}</h1>
            <div className={s.heroBottom}>
              <p>{safe.content.heroDescription}</p>
              <a className={s.roundButton} href={pageHref(basePath, "products")} aria-label="Explore products"><ArrowUpRight /></a>
            </div>
          </div>
        </section>

        <section className={s.statementSection}>
          <div className={s.sectionStamp}>About</div>
          <div>
            <p className={s.displayStatement}>{safe.content.aboutTitle}</p>
            <p className={s.bodyText}>{safe.content.aboutDescription}</p>
            <a className={s.textLink} href={pageHref(basePath, "about")}>Discover the story <ArrowUpRight /></a>
          </div>
        </section>

        <section className={s.productsSection}>
          <div className={s.sectionHeadingRow}>
            <div><p className={s.sectionStamp}>Collection</p><h2>Products & offerings</h2></div>
            <a className={s.textLink} href={pageHref(basePath, "products")}>View all <ArrowUpRight /></a>
          </div>
          <ProductGrid products={safe.products.slice(0, 6)} data={safe} />
        </section>

        <section className={s.splitFeature}>
          <div className={s.splitImage}><SmartImage src={safe.images.about} alt={`${safe.companyName} about`} ratioClass={s.featureRatio} /></div>
          <div className={s.splitCopy}>
            <p className={s.sectionStamp}>A considered experience</p>
            <h2>{safe.content.contactTitle}</h2>
            <p>{safe.content.aboutDescription}</p>
            <a className={s.buttonDark} href={pageHref(basePath, "contact")}>{safe.content.ctaText} <ArrowUpRight /></a>
          </div>
        </section>
      </main>
      <Footer data={safe} basePath={basePath} />
    </div>
  );
}
