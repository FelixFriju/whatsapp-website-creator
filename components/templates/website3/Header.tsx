"use client";

import { useState } from "react";
import type { WebsiteData } from "./data";
import { navItems } from "./links";
import { MenuIcon, CloseIcon } from "./shared";
import styles from "./styles.module.css";

export default function Header({ data, basePath }: { data: WebsiteData; basePath: string }) {
  const [open, setOpen] = useState(false);
  const items = navItems(basePath);

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <a href={basePath} className={styles.logo} aria-label={`${data.companyName} home`}>
          {data.companyName}
        </a>

        <nav className={styles.nav} aria-label="Primary navigation">
          {items.map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
        </nav>

        <button
          type="button"
          className={styles.menuButton}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {open && (
        <nav className={styles.mobileNav} aria-label="Mobile navigation">
          {items.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
