import type { WebsiteData } from "./data";
import { mailtoLink, pageHref, telLink, whatsappLink } from "./links";
import s from "./styles.module.css";

export default function Footer({ data, basePath }: { data: WebsiteData; basePath: string }) {
  return (
    <footer className={s.footer}>
      <div className={s.footerTop}>
        <div>
          <div className={s.footerBrand}>{data.companyName}</div>
          <p className={s.footerStatement}>{data.businessType} · {data.location}</p>
        </div>
        <div className={s.footerNav}>
          <a href={pageHref(basePath)}>Home</a>
          <a href={pageHref(basePath, "about")}>About</a>
          <a href={pageHref(basePath, "products")}>Products</a>
          <a href={pageHref(basePath, "contact")}>Contact</a>
        </div>
        <div className={s.footerContact}>
          <a href={telLink(data.phone)}>{data.phone}</a>
          <a href={mailtoLink(data.email)}>{data.email}</a>
          <a href={whatsappLink(data.phone)}>WhatsApp ↗</a>
        </div>
      </div>
      <div className={s.footerBottom}>
        <span>© {new Date().getFullYear()} {data.companyName}</span>
        <span>Designed as a premium business experience.</span>
      </div>
    </footer>
  );
}
