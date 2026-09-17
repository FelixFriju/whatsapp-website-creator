/**
 * website1 — Footer
 * Company identity, quick links, and full contact details. Appears on every page.
 */

import type { WebsiteData } from "./data";
import { MailIcon, MapPinIcon, PhoneIcon, WhatsAppIcon } from "./shared";
import { mailtoLink, navItems, telLink, whatsappLink } from "./links";
import s from "./styles.module.css";

export function Footer({ data, basePath }: { data: WebsiteData; basePath: string }) {
  return (
    <footer className={s.footer}>
      <div className={s.container}>
        <div className={s.footerGrid}>
          <div>
            <p className={s.footerBrandName}>{data.companyName}</p>
            <p className={s.footerBrandType}>{data.businessType}</p>
            <p className={s.footerBrandDesc}>
              {data.location} — serving customers who value quality over quantity.
            </p>
          </div>

          <div>
            <p className={s.footerHead}>Quick Links</p>
            <ul className={s.footerLinks}>
              {navItems(basePath).map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className={s.footerHead}>Contact</p>
            <ul className={s.footerContactList}>
              <li>
                <MapPinIcon />
                <span>{data.location}</span>
              </li>
              <li>
                <PhoneIcon />
                <a href={telLink(data.phone)}>{data.phone}</a>
              </li>
              <li>
                <MailIcon />
                <a href={mailtoLink(data.email)}>{data.email}</a>
              </li>
              <li>
                <WhatsAppIcon />
                <a
                  href={whatsappLink(data.phone)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp Enquiry
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Giant scrolling wordmark — pure decoration */}
        <div className={s.marquee} aria-hidden="true">
          <div className={s.marqueeTrack}>
            {[0, 1].map((half) =>
              [0, 1, 2].map((i) => (
                <span key={`${half}-${i}`} className={s.marqueeGroup}>
                  <span className={s.marqueeName}>{data.companyName}</span>
                  <span className={s.marqueeDot} />
                </span>
              )),
            )}
          </div>
        </div>

        <div className={s.footerBottom}>
          <span>
            © {new Date().getFullYear()} {data.companyName}. All rights reserved.
          </span>
          <span>{data.businessType}</span>
        </div>
      </div>
    </footer>
  );
}
