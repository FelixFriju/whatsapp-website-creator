import type { WebsiteData } from "./data";
import { ArrowUpRight, SectionLabel, SmartImage } from "./shared";
import { pageHref } from "./links";
import s from "./styles.module.css";

export function About({ data, basePath }: { data: WebsiteData; basePath: string }) {
  return (
    <main>
      <section className={s.innerHero}><div><SectionLabel>{data.businessType}</SectionLabel><h1>{data.content.aboutTitle}</h1><p>{data.content.aboutDescription}</p></div><SmartImage src={data.images.about} alt={`${data.companyName} about`} ratioClass={s.innerHeroImage} /></section>
      <section className={s.section}><div className={s.aboutSplit}><div><SectionLabel>The story</SectionLabel><h2>Designed around what matters.</h2></div><div className={s.aboutText}><p>{data.content.aboutDescription}</p><p>{data.companyName} is built to serve customers in {data.location} with a focused, thoughtful approach to {data.businessType.toLowerCase()}.</p><a href={pageHref(basePath, "products")} className={s.underlineLink}>Explore products <ArrowUpRight /></a></div></div></section>
      <section className={s.marquee}>Independent · Considered · Distinctive · Useful · Human</section>
      <section className={s.section}><div className={s.contactStrip}><SectionLabel>Come by / Get in touch</SectionLabel><div><strong>{data.location}</strong><a href={pageHref(basePath, "contact")}>Contact {data.companyName} <ArrowUpRight /></a></div></div></section>
    </main>
  );
}
