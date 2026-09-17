"use client";

import { FormEvent, useState } from "react";
import type { WebsiteData } from "./data";
import Header from "./Header";
import Footer from "./Footer";
import { MailIcon, PhoneIcon, WhatsAppIcon } from "./shared";
import { mailtoLink, telLink, whatsappLink } from "./links";
import styles from "./styles.module.css";

export default function Contact({ data, basePath }: { data: WebsiteData; basePath: string }) {
  const [sent, setSent] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <div className={styles.site}>
      <Header data={data} basePath={basePath} />
      <main>
        <section className={styles.pageHero}>
          <p className={styles.eyebrow}>Get in touch</p>
          <h1>{data.content.contactTitle}</h1>
          <p className={styles.heroText}>Reach {data.companyName} using the contact details below.</p>
        </section>

        <section className={styles.contactLayout}>
          <div className={styles.contactCards}>
            <a href={telLink(data.phone)} className={styles.contactCard}>
              <PhoneIcon />
              <span>Phone</span>
              <strong>{data.phone}</strong>
            </a>
            <a href={mailtoLink(data.email)} className={styles.contactCard}>
              <MailIcon />
              <span>Email</span>
              <strong>{data.email}</strong>
            </a>
            <a href={whatsappLink(data.phone)} target="_blank" rel="noopener noreferrer" className={styles.contactCard}>
              <WhatsAppIcon />
              <span>WhatsApp</span>
              <strong>Start a conversation</strong>
            </a>
            <div className={styles.contactCard}>
              <span>Location</span>
              <strong>{data.location}</strong>
            </div>
          </div>

          <form className={styles.contactForm} onSubmit={submit}>
            <div className={styles.formHeader}>
              <p className={styles.eyebrow}>Customer enquiry</p>
              <h2>Tell us what you need.</h2>
            </div>
            <label>Customer name<input name="name" required /></label>
            <label>Email<input name="email" type="email" required /></label>
            <label>Phone number<input name="phone" required /></label>
            <label>Message<textarea name="message" rows={6} required /></label>
            <button className={styles.primaryButton} type="submit">Send enquiry</button>
            {sent && <p className={styles.formNotice}>Your enquiry is ready to be sent. Please use the phone, email or WhatsApp options above for direct contact.</p>}
          </form>
        </section>
      </main>
      <Footer data={data} basePath={basePath} />
    </div>
  );
}
