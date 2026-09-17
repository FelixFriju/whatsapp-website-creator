import type { WebsiteData } from "./data";
import { mailtoLink, navItems, pageHref, telLink, whatsappLink } from "./links";
import s from "./styles.module.css";

export function Footer({ data, basePath }: { data: WebsiteData; basePath: string }) {
  return (
    <footer className={s.footer}>
      <div className={s.footerTop}>
        <div>
          <span className={s.sectionLabel}>Stay in touch</span>
          <h2 className={s.footerTitle}>Thoughtful products.<br />A more considered experience.</h2>
        </div>
        <div className={s.footerContact}>
          <a href={mailtoLink(data.email)}>{data.email}</a>
          <a href={telLink(data.phone)}>{data.phone}</a>
          <a href={whatsappLink(data.phone)} target="_blank" rel="noreferrer">WhatsApp</a>
          <span>{data.location}</span>
        </div>
      </div>
      <div className={s.footerBottom}>
        <a href={basePath} className={s.footerBrand}>{data.companyName}</a>
        <div className={s.footerNav}>{navItems(basePath).map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</div>
        <span>© {new Date().getFullYear()} {data.companyName}</span>
      </div>
    </footer>
  );
}
