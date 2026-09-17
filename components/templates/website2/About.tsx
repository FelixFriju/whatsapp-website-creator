import { Poppins } from "next/font/google";
import type { WebsiteData } from "./data";
import { pageHref } from "./links";
import Header from "./Header";
import Footer from "./Footer";
import { ArrowUpRight, SmartImage } from "./shared";
import s from "./styles.module.css";

const poppins = Poppins({ subsets: ["latin"], display: "swap", weight: ["400", "500", "600", "700"] });

export default function About({ data }: { data: WebsiteData }) {
  const basePath = data.slug ? `/${data.slug}` : "/";
  return (
    <div className={`${s.site} ${poppins.className}`}>
      <Header data={data} basePath={basePath} />
      <main>
        <section className={s.pageHero}>
          <p className={s.eyebrow}>About {data.companyName}</p>
          <h1>{data.content.aboutTitle}</h1>
          <p>{data.content.aboutDescription}</p>
        </section>
        <section className={s.aboutLayout}>
          <div className={s.aboutImage}><SmartImage src={data.images.about} alt={`${data.companyName} about`} ratioClass={s.featureRatio} /></div>
          <div className={s.aboutCopy}>
            <p className={s.sectionStamp}>The business</p>
            <h2>{data.companyName}</h2>
            <p className={s.bodyText}>{data.companyName} is a {data.businessType.toLowerCase()} business serving customers in {data.location}.</p>
            <p className={s.bodyText}>We focus on clear communication, considered service and a professional experience from first contact to completion.</p>
            <a className={s.textLink} href={pageHref(basePath, "contact")}>Start a conversation <ArrowUpRight /></a>
          </div>
        </section>
      </main>
      <Footer data={data} basePath={basePath} />
    </div>
  );
}
