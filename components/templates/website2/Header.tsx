"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { WebsiteData } from "./data";
import { navItems, pageHref, telLink } from "./links";
import { ArrowUpRight, CloseIcon, MenuIcon } from "./shared";
import s from "./styles.module.css";

export default function Header({ data, basePath }: { data: WebsiteData; basePath: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname() ?? "";
  const items = navItems(basePath);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === basePath ? pathname === basePath || pathname === `${basePath}/` : pathname.startsWith(href);

  return (
    <header className={`${s.header} ${scrolled ? s.headerScrolled : ""}`}>
      <div className={s.headerInner}>
        <a className={s.logo} href={pageHref(basePath)} aria-label={`${data.companyName} home`}>
          <span className={s.logoMark}>{data.companyName.slice(0, 1).toUpperCase()}</span>
          <span className={s.logoText}>{data.companyName}</span>
        </a>

        <nav className={s.nav} aria-label="Primary navigation">
          {items.map((item) => (
            <a key={item.href} href={item.href} className={isActive(item.href) ? s.activeNav : ""}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className={s.headerActions}>
          {data.phone && <a className={s.phoneLink} href={telLink(data.phone)}>{data.phone}</a>}
          <a className={s.headerButton} href={pageHref(basePath, "contact")}>Enquire <ArrowUpRight /></a>
          <button className={s.menuButton} onClick={() => setOpen(v => !v)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <div className={`${s.mobilePanel} ${open ? s.mobilePanelOpen : ""}`}>
        {items.map((item) => (
          <a key={item.href} href={item.href} className={s.mobileLink} onClick={() => setOpen(false)}>{item.label}</a>
        ))}
        <a className={s.mobileButton} href={pageHref(basePath, "contact")} onClick={() => setOpen(false)}>Enquire <ArrowUpRight /></a>
      </div>
    </header>
  );
}
