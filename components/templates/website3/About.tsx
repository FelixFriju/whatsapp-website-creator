import type { WebsiteData } from "./data";
import Header from "./Header";
import Footer from "./Footer";
import { CtaBand, Reveal, SmartImage } from "./shared";
import styles from "./styles.module.css";

export default function About({ data, basePath }: { data: WebsiteData; basePath: string }) {
  return (
    <div className={styles.site}>
      <Header data={data} basePath={basePath} />
      <main>
        <section className={styles.pageHero}>
          <p className={styles.eyebrow}>About {data.companyName}</p>
          <h1>{data.content.aboutTitle}</h1>
          <p className={styles.heroText}>{data.content.aboutDescription}</p>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionLabel}>Who we are</div>
          <div className={styles.aboutGrid}>
            {data.images.about && (
              <Reveal>
                <SmartImage src={data.images.about} alt={`${data.companyName} — about`} />
              </Reveal>
            )}
            <Reveal delay={80}>
              <p className={styles.bodyLarge}>{data.companyName} is a {data.businessType.toLowerCase()} business serving customers in {data.location}.</p>
              <p className={styles.body}>The information shown on this page is generated from your business details and presented through this template. Contact the business directly for current availability, requirements and other details.</p>
            </Reveal>
          </div>
        </section>

        <CtaBand data={data} basePath={basePath} />
      </main>
      <Footer data={data} basePath={basePath} />
    </div>
  );
}
