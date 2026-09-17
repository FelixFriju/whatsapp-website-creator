"use client";

import { useEffect, useRef } from "react";
import type { Product, WebsiteData } from "./data";
import { CloseIcon, MailIcon, SmartImage, WhatsAppIcon } from "./shared";
import { mailtoLink, pageHref, whatsappLink } from "./links";
import styles from "./styles.module.css";

export default function ProductModal({
  product,
  index,
  data,
  basePath,
  onClose,
}: {
  product: Product;
  index: number;
  data: WebsiteData;
  basePath: string;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dialogRef.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const image = product.image ?? data.images.products?.[index];

  return (
    <div className={styles.modalOverlay} onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div ref={dialogRef} tabIndex={-1} role="dialog" aria-modal="true" className={styles.modal}>
        <button className={styles.modalClose} type="button" onClick={onClose} aria-label="Close product details">
          <CloseIcon />
        </button>
        <div className={styles.modalGrid}>
          <SmartImage src={image} alt={product.name} monogram={product.name.slice(0, 1)} loading="eager" className={styles.modalImage} />
          <div className={styles.modalContent}>
            <p className={styles.eyebrow}>{data.businessType}</p>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <div className={styles.modalInfo}>
              <span>{data.location}</span>
              <span>{data.phone}</span>
              <span>{data.email}</span>
            </div>
            <div className={styles.modalActions}>
              <a className={styles.primaryButton} href={whatsappLink(data.phone, product.name)} target="_blank" rel="noopener noreferrer"><WhatsAppIcon /> WhatsApp enquiry</a>
              <a className={styles.secondaryButton} href={mailtoLink(data.email)}><MailIcon /> Email</a>
              <a className={styles.textLink} href={pageHref(basePath, "contact")}>Contact page</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
