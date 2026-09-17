import type { WebsiteData } from "./data";
import { pageHref, whatsappLink } from "./links";
import { WhatsAppIcon } from "./shared";
import styles from "./styles.module.css";

export default function Footer({ data, basePath }: { data: WebsiteData; basePath: string }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div>
          <div className={styles.footerLogo}>{data.companyName}</div>
          <p>{data.businessType} · {data.location}</p>
        </div>
        <div className={styles.footerLinks}>
          <a href={pageHref(basePath)}>Home</a>
          <a href={pageHref(basePath, "about")}>About</a>
          <a href={pageHref(basePath, "products")}>Products</a>
          <a href={pageHref(basePath, "contact")}>Contact</a>
          <a href={whatsappLink(data.phone)} target="_blank" rel="noopener noreferrer"><WhatsAppIcon /> WhatsApp</a>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <span>{data.email}</span>
        <span>{data.phone}</span>
      </div>
    </footer>
  );
}
