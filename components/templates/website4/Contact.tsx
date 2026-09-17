"use client";

import { FormEvent } from "react";
import type { WebsiteData } from "./data";
import { mailtoLink, pageHref, telLink, whatsappLink } from "./links";
import { ArrowUpRight, SectionLabel } from "./shared";
import s from "./styles.module.css";

export function Contact({ data, basePath }: { data: WebsiteData; basePath: string }) {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const subject = `Website enquiry for ${data.companyName}`;
    const body = `Name: ${form.get("name")}\nEmail: ${form.get("email")}\nPhone: ${form.get("phone")}\n\nMessage:\n${form.get("message")}`;
    window.location.href = `${mailtoLink(data.email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <main>
      <section className={s.contactHero}><SectionLabel>Get in touch</SectionLabel><h1>{data.content.contactTitle}</h1><p>{data.companyName} is here for questions, product enquiries and customer conversations.</p></section>
      <section className={s.contactGrid}>
        <div className={s.contactDetails}>
          <div><span className={s.sectionLabel}>Visit</span><strong>{data.location}</strong></div>
          <div><span className={s.sectionLabel}>Email</span><a href={mailtoLink(data.email)}>{data.email}</a></div>
          <div><span className={s.sectionLabel}>Phone</span><a href={telLink(data.phone)}>{data.phone}</a></div>
          <a className={s.darkButton} href={whatsappLink(data.phone)} target="_blank" rel="noreferrer">WhatsApp <ArrowUpRight /></a>
          <a className={s.underlineLink} href={pageHref(basePath, "products")}>Browse products <ArrowUpRight /></a>
        </div>
        <form className={s.contactForm} onSubmit={handleSubmit}>
          <label>Name<input name="name" required placeholder="Your name" /></label>
          <label>Email<input name="email" type="email" required placeholder="you@example.com" /></label>
          <label>Phone<input name="phone" required placeholder="Your phone number" /></label>
          <label>Message<textarea name="message" required rows={6} placeholder="Tell us what you need" /></label>
          <button className={s.darkButton} type="submit">Send enquiry <ArrowUpRight /></button>
        </form>
      </section>
    </main>
  );
}
