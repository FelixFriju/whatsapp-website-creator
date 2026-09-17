"use client";

import { FormEvent, useState } from "react";
import { Poppins } from "next/font/google";
import type { WebsiteData } from "./data";
import { mailtoLink, telLink, whatsappLink } from "./links";
import Header from "./Header";
import Footer from "./Footer";
import s from "./styles.module.css";

const poppins = Poppins({ subsets: ["latin"], display: "swap", weight: ["400", "500", "600", "700"] });

export default function Contact({ data }: { data: WebsiteData }) {
  const basePath = data.slug ? `/${data.slug}` : "/";
  const [sent, setSent] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <div className={`${s.site} ${poppins.className}`}>
      <Header data={data} basePath={basePath} />
      <main>
        <section className={s.pageHero}>
          <p className={s.eyebrow}>Get in touch</p>
          <h1>{data.content.contactTitle}</h1>
          <p>Reach {data.companyName} through the details below or send a quick enquiry.</p>
        </section>
        <section className={s.contactLayout}>
          <div className={s.contactInfo}>
            <a href={telLink(data.phone)}><span>Phone</span><strong>{data.phone}</strong></a>
            <a href={mailtoLink(data.email)}><span>Email</span><strong>{data.email}</strong></a>
            <div><span>Location</span><strong>{data.location}</strong></div>
            <a className={s.whatsappPanel} href={whatsappLink(data.phone)} target="_blank" rel="noreferrer"><span>WhatsApp</span><strong>Start a conversation ↗</strong></a>
          </div>
          <form className={s.contactForm} onSubmit={submit}>
            <p className={s.sectionStamp}>Customer enquiry</p>
            <label>Full name<input name="name" required placeholder="Your name" /></label>
            <label>Email<input name="email" type="email" required placeholder="you@example.com" /></label>
            <label>Phone number<input name="phone" required placeholder="+91 98765 43210" /></label>
            <label>Message<textarea name="message" rows={5} required placeholder="Tell us what you are looking for..." /></label>
            <button className={s.buttonDark} type="submit">{sent ? "Enquiry received ✓" : "Send enquiry ↗"}</button>
          </form>
        </section>
      </main>
      <Footer data={data} basePath={basePath} />
    </div>
  );
}
