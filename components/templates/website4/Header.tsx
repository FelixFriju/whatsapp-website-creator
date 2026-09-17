"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { WebsiteData } from "./data";
import { ArrowUpRight, CloseIcon, MenuIcon, PhoneIcon } from "./shared";
import { navItems, pageHref, telLink } from "./links";
import s from "./styles.module.css";

export function Header({ data, basePath }: { data: WebsiteData; basePath: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname() ?? "";
  const items = navItems(basePath);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => (href === basePath ? pathname === basePath : pathname.startsWith(href));

  return (
    <header className={`${s.header} ${scrolled ? s.headerScrolled : ""}`}>
      <div className={s.topBar}>Independent design · Curated quality · Personal service</div>
      <div className={s.headerMain}>
        <a href={basePath} className={s.brand} aria-label={`${data.companyName} home`}>
          <span className={s.brandMark}>{data.companyName.slice(0, 1).toUpperCase()}</span>
          <span className={s.brandWord}>{data.companyName}</span>
        </a>

        <nav className={s.nav} aria-label="Primary">
          {items.map((item) => (
            <a key={item.href} href={item.href} className={`${s.navLink} ${isActive(item.href) ? s.navLinkActive : ""}`}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className={s.headerActions}>
          <a className={s.iconButton} href={telLink(data.phone)} aria-label="Call business">
            <PhoneIcon />
          </a>
          <a className={s.headerCta} href={pageHref(basePath, "contact")}>Contact <ArrowUpRight /></a>
          <button className={s.menuButton} type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"}>
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <div className={`${s.mobilePanel} ${open ? s.mobilePanelOpen : ""}`}>
        {items.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setOpen(false)} className={s.mobileLink}>
            {item.label}
          </a>
        ))}
        <a className={s.mobileContact} href={pageHref(basePath, "contact")} onClick={() => setOpen(false)}>
          Contact <ArrowUpRight />
        </a>
      </div>
    </header>
  );
}
