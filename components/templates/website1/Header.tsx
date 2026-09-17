"use client";

/**
 * website1 — Header
 * Responsive navigation: logo/wordmark, desktop links, phone, mobile drawer.
 * All text comes from WebsiteData; routes are prefixed with basePath.
 */

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { WebsiteData } from "./data";
import { ArrowUpRight, MenuIcon, PhoneIcon, CloseIcon } from "./shared";
import { navItems, pageHref } from "./links";
import s from "./styles.module.css";

export function Header({ data, basePath }: { data: WebsiteData; basePath: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname() ?? "";
  const items = navItems(basePath);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === basePath
      ? pathname === basePath
      : pathname.startsWith(href);

  return (
    <header className={`${s.header} ${scrolled ? s.headerScrolled : ""}`}>
      <div className={s.container}>
        <div className={s.headerInner}>
          <a className={s.logo} href={basePath} aria-label={`${data.companyName} — home`}>
            <span className={s.logoMark} aria-hidden="true">
              {data.companyName.slice(0, 1).toUpperCase()}
            </span>
            <span className={s.logoText}>{data.companyName}</span>
          </a>

          <nav className={s.nav} aria-label="Primary">
            {items.map((item) => (
              <a
                key={item.href}
                className={`${s.navLink} ${isActive(item.href) ? s.navLinkActive : ""}`}
                href={item.href}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className={s.headerCta}>
            <a className={s.headerPhone} href={`tel:+${data.phone.replace(/[^0-9]/g, "")}`}>
              <PhoneIcon />
            </a>
            <a className={`${s.btn} ${s.btnPrimary} ${s.headerCtaBtn}`} href={pageHref(basePath, "contact")}>
              Contact
            </a>
            <button
              type="button"
              className={s.menuBtn}
              aria-expanded={open}
              aria-controls="tpl-mobile-nav"
              aria-label={open ? "Close navigation" : "Open navigation"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        <div
          id="tpl-mobile-nav"
          className={`${s.mobilePanel} ${open ? s.mobilePanelOpen : ""}`}
        >
          <nav className={s.mobileNav} aria-label="Mobile">
            {items.map((item) => (
              <a
                key={item.href}
                className={`${s.mobileLink} ${isActive(item.href) ? s.mobileLinkActive : ""}`}
                href={item.href}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a className={`${s.btn} ${s.btnPrimary} ${s.mobileCta}`} href={pageHref(basePath, "contact")}>
              Contact Us
              <ArrowUpRight />
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
