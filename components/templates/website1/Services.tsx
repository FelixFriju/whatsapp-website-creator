import type { WebsiteData } from "./data";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CtaBand, Reveal } from "./shared";
import { pageHref } from "./links";
import s from "./styles.module.css";

export function Services({ data, basePath }: { data: WebsiteData; basePath: string }) {
  return (
    <div className={s.root}>
      <Header data={data} basePath={basePath} />
      <main>
        <section className={s.sectionTight}>
          <div className={s.container}>
            <Reveal>
              <p className={s.eyebrow}>Services</p>
              <h1 className={s.sectionTitle}>{data.content.servicesTitle}</h1>
              <p className={s.sectionSub}>
                Practical services from {data.companyName}, serving customers in {data.location}.
              </p>
            </Reveal>
          </div>
        </section>
        <section className={`${s.section} ${s.sectionAlt}`}>
          <div className={s.container}>
            <div className={s.servicesGrid}>
              {data.content.services.map((service, index) => (
                <Reveal key={`${service}-${index}`} delay={index * 70}>
                  <article className={s.serviceCard}>
                    <span className={s.eyebrow}>0{index + 1}</span>
                    <div>
                      <h2 className={s.sectionTitle}>{service}</h2>
                      <p className={s.serviceText}>
                        Professional service delivered with care, clarity and attention to detail.
                      </p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
            <div className={s.heroActions}>
              <a className={`${s.btn} ${s.btnPrimary}`} href={pageHref(basePath, "contact")}>
                Contact Us
              </a>
            </div>
          </div>
        </section>
        <CtaBand data={data} basePath={basePath} />
      </main>
      <Footer data={data} basePath={basePath} />
    </div>
  );
}
