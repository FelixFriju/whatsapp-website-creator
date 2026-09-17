"use client";

/**
 * website1 — About page
 * Company introduction, story, business type, location, values, contact CTA.
 */

import { useEffect } from "react";
import type { WebsiteData } from "./data";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ArrowUpRight, CtaBand, CheckIcon, Reveal, SmartImage } from "./shared";
import { pageHref, whatsappLink } from "./links";
import s from "./styles.module.css";

const VALUES = [
  {
    title: "Named sources",
    text: "Every product page names the workshop behind the piece. You always know who made what you are buying.",
  },
  {
    title: "Editions, not stock",
    text: "Pieces are made in small editions. When an edition ends, it ends — we do not chase volume.",
  },
  {
    title: "Supported for years",
    text: "Care guidance, spare parts where possible, and repair contacts for as long as you own the piece.",
  },
  {
    title: "Honest pricing",
    text: "One price, year-round. No seasonal markups, no fake discounts, no pressure.",
  },
];

export function About({ data, basePath }: { data: WebsiteData; basePath: string }) {
  // SEO: page title/description set from business data
  useEffect(() => {
    document.title = `About — ${data.companyName}`;
    return () => {
      document.title = data.companyName;
    };
  }, [data.companyName]);

  return (
    <div className={s.root}>
      <Header data={data} basePath={basePath} />

      <main>
        {/* Page head + intro */}
        <section className={`${s.sectionTight} ${s.aboutPage}`}>
          <div className={s.container}>
            <div className={s.aboutHeroGrid}>
              <Reveal className={s.introCopy}>
                <p className={s.eyebrow}>About</p>
                <h1 className={s.sectionTitle}>{data.content.aboutTitle}</h1>
                <p>{data.content.aboutDescription}</p>
                <p>
                  {data.companyName} is a {data.businessType.toLowerCase()} based in {data.location}.
                  We keep a small, deliberate catalog and stand behind every piece we sell.
                </p>
                <div className={s.heroActions}>
                  <a className={`${s.btn} ${s.btnPrimary}`} href={pageHref(basePath, "contact")}>
                    Contact Us
                    <ArrowUpRight />
                  </a>
                  <a
                    className={`${s.btn} ${s.btnWhatsapp}`}
                    href={whatsappLink(data.phone)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Enquire on WhatsApp
                  </a>
                </div>
              </Reveal>

              <Reveal className={s.introMedia} delay={90}>
                <SmartImage
                  src={data.images.about}
                  alt={`${data.companyName} workshop`}
                  monogram={data.companyName.slice(0, 1)}
                  ratioClass={s.ratioTall}
                />
              </Reveal>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className={`${s.section} ${s.sectionAlt}`} aria-labelledby="tpl-values-title">
          <div className={s.container}>
            <div className={s.sectionHead}>
              <div>
                <p className={s.eyebrow}>What we stand for</p>
                <h2 id="tpl-values-title" className={s.sectionTitle}>Company values</h2>
              </div>
            </div>

            <div className={s.valuesGrid}>
              {VALUES.map((value, i) => (
                <Reveal key={value.title} delay={i * 70}>
                  <article className={s.valueCard}>
                    <span className={s.valueIcon}><CheckIcon /></span>
                    <h3 className={s.valueTitle}>{value.title}</h3>
                    <p className={s.valueText}>{value.text}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <CtaBand data={data} basePath={basePath} />
      </main>

      <Footer data={data} basePath={basePath} />
    </div>
  );
}
