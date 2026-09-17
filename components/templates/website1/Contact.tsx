"use client";

/**
 * website1 — Contact page
 * Company details panel + validated enquiry form (UI/validation only;
 * the host platform connects submission to its backend/email system).
 */

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import type { WebsiteData } from "./data";
import { Header } from "./Header";
import { Footer } from "./Footer";
import {
  CheckIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  Reveal,
  WhatsAppIcon,
} from "./shared";
import { mailtoLink, telLink, whatsappLink } from "./links";
import s from "./styles.module.css";

type FormErrors = Partial<Record<"name" | "email" | "phone" | "message", string>>;

export function Contact({ data, basePath }: { data: WebsiteData; basePath: string }) {
  const [values, setValues] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = `Contact — ${data.companyName}`;
    return () => {
      document.title = data.companyName;
    };
  }, [data.companyName]);

  const setField = (field: keyof typeof values) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): FormErrors => {
    const errs: FormErrors = {};
    if (!values.name.trim()) errs.name = "Please enter your name.";
    if (!values.email.trim()) errs.email = "Please enter your email.";
    else if (!/^\S+@\S+\.\S+$/.test(values.email)) errs.email = "Please enter a valid email address.";
    if (!values.phone.trim()) errs.phone = "Please enter your phone number.";
    if (!values.message.trim()) errs.message = "Please enter a short message.";
    return errs;
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
    }
  };

  return (
    <div className={s.root}>
      <Header data={data} basePath={basePath} />

      <main>
        <section className={s.sectionTight}>
          <div className={s.container}>
            <Reveal>
              <p className={s.eyebrow}>Contact</p>
              <h1 className={s.sectionTitle}>{data.content.contactTitle}</h1>
              <p className={s.sectionSub} style={{ marginBottom: 48 }}>
                For questions about a piece, an order, or private sourcing — we reply within one business day.
              </p>
            </Reveal>

            <div className={s.contactGrid}>
              {/* Company details panel */}
              <Reveal className={s.contactInfoCard}>
                <h2 className={s.contactInfoTitle}>{data.companyName}</h2>

                <a className={s.contactRow} href={telLink(data.phone)}>
                  <PhoneIcon />
                  <span>
                    <span className={s.contactRowLabel}>Phone</span>
                    <span className={s.contactRowValue}>{data.phone}</span>
                  </span>
                </a>

                <a className={s.contactRow} href={mailtoLink(data.email)}>
                  <MailIcon />
                  <span>
                    <span className={s.contactRowLabel}>Email</span>
                    <span className={s.contactRowValue}>{data.email}</span>
                  </span>
                </a>

                <a className={s.contactRow} href={whatsappLink(data.phone)} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon />
                  <span>
                    <span className={s.contactRowLabel}>WhatsApp</span>
                    <span className={s.contactRowValue}>Chat with us</span>
                  </span>
                </a>

                <div className={s.contactRow} style={{ borderBottom: "none" }}>
                  <MapPinIcon />
                  <span>
                    <span className={s.contactRowLabel}>Location</span>
                    <span className={s.contactRowValue}>{data.location}</span>
                  </span>
                </div>

                <a
                  className={`${s.btn} ${s.btnWhatsapp} ${s.contactWhatsappBtn}`}
                  href={whatsappLink(data.phone)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon />
                  Enquire on WhatsApp
                </a>
              </Reveal>

              {/* Enquiry form */}
              <Reveal className={s.formCard} delay={80}>
                {submitted ? (
                  <div className={s.formSuccess} role="status">
                    <CheckIcon />
                    <span>
                      Thank you, {values.name.trim()}. Your enquiry has been recorded — {data.companyName} will reply to {values.email.trim()} shortly.
                    </span>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} noValidate>
                    <div className={s.formGrid}>
                      <div className={s.field}>
                        <label className={s.label} htmlFor="tpl-name">Name</label>
                        <input
                          id="tpl-name"
                          className={`${s.input} ${errors.name ? s.inputInvalid : ""}`}
                          type="text"
                          autoComplete="name"
                          placeholder="Your full name"
                          value={values.name}
                          onChange={setField("name")}
                          aria-invalid={Boolean(errors.name)}
                          aria-describedby={errors.name ? "tpl-name-err" : undefined}
                        />
                        {errors.name && <span id="tpl-name-err" className={s.fieldError}>{errors.name}</span>}
                      </div>

                      <div className={s.field}>
                        <label className={s.label} htmlFor="tpl-email">Email</label>
                        <input
                          id="tpl-email"
                          className={`${s.input} ${errors.email ? s.inputInvalid : ""}`}
                          type="email"
                          autoComplete="email"
                          placeholder="you@example.com"
                          value={values.email}
                          onChange={setField("email")}
                          aria-invalid={Boolean(errors.email)}
                          aria-describedby={errors.email ? "tpl-email-err" : undefined}
                        />
                        {errors.email && <span id="tpl-email-err" className={s.fieldError}>{errors.email}</span>}
                      </div>

                      <div className={`${s.field} ${s.fieldFull}`}>
                        <label className={s.label} htmlFor="tpl-phone">Phone</label>
                        <input
                          id="tpl-phone"
                          className={`${s.input} ${errors.phone ? s.inputInvalid : ""}`}
                          type="tel"
                          autoComplete="tel"
                          placeholder="Include country code, e.g. +1 555 010 42"
                          value={values.phone}
                          onChange={setField("phone")}
                          aria-invalid={Boolean(errors.phone)}
                          aria-describedby={errors.phone ? "tpl-phone-err" : undefined}
                        />
                        {errors.phone && <span id="tpl-phone-err" className={s.fieldError}>{errors.phone}</span>}
                      </div>

                      <div className={`${s.field} ${s.fieldFull}`}>
                        <label className={s.label} htmlFor="tpl-message">Message</label>
                        <textarea
                          id="tpl-message"
                          className={`${s.textarea} ${errors.message ? s.inputInvalid : ""}`}
                          placeholder="Tell us what you are looking for…"
                          value={values.message}
                          onChange={setField("message")}
                          aria-invalid={Boolean(errors.message)}
                          aria-describedby={errors.message ? "tpl-message-err" : undefined}
                        />
                        {errors.message && <span id="tpl-message-err" className={s.fieldError}>{errors.message}</span>}
                      </div>
                    </div>

                    <div className={s.formActions}>
                      <button type="submit" className={`${s.btn} ${s.btnPrimary}`}>
                        Send Enquiry
                      </button>
                      <span className={s.formNote}>
                        For an immediate reply, you may prefer WhatsApp.
                      </span>
                    </div>
                  </form>
                )}
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <Footer data={data} basePath={basePath} />
    </div>
  );
}
