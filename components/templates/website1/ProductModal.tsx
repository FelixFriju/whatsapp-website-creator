"use client";

/**
 * website1 — ProductModal
 * Accessible product detail pop-up: focus trap, Escape to close, WhatsApp
 * enquiry with the product name pre-filled, plus contact fallback.
 */

import { useEffect, useRef } from "react";
import type { Product, WebsiteData } from "./data";
import { ArrowUpRight, CloseIcon, MailIcon, SmartImage, WhatsAppIcon } from "./shared";
import { mailtoLink, pageHref, whatsappLink } from "./links";
import s from "./styles.module.css";

export function ProductModal({
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
  const lastActive = useRef<HTMLElement | null>(null);

  useEffect(() => {
    lastActive.current = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current;
    dialog?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !dialog) return;
      // Basic focus trap
      const focusables = dialog.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      lastActive.current?.focus();
    };
  }, [onClose]);

  const productImage = product.image ?? data.images.products?.[index];

  const specs: Array<[string, string]> = [
    ["Business", data.companyName],
    ["Enquiries", data.phone],
    ["Email", data.email],
    ["Location", data.location],
  ];

  return (
    <div
      className={s.modalOverlay}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="tpl-product-modal-title"
        tabIndex={-1}
        className={s.modal}
      >
        <button type="button" className={s.modalClose} onClick={onClose} aria-label="Close product details">
          <CloseIcon />
        </button>

        <div className={s.modalBody}>
          <div className={s.modalMedia}>
            <SmartImage
              src={productImage}
              alt={product.name}
              monogram={product.name.slice(0, 1)}
              ratioClass={s.ratioModal}
              loading="eager"
            />
          </div>

          <div className={s.modalContent} style={{ paddingTop: 0 }}>
            <div>
              <p className={s.eyebrow}>{data.businessType}</p>
              <h3 id="tpl-product-modal-title" className={s.modalTitle}>
                {product.name}
              </h3>
            </div>

            <p className={s.modalDesc}>{product.description}</p>

            <ul className={s.modalSpecs}>
              {specs.map(([k, v]) => (
                <li key={k}>
                  <span className={s.modalSpecKey}>{k}</span>
                  <span className={s.modalSpecValue}>{v}</span>
                </li>
              ))}
            </ul>

            <div className={s.modalActions}>
              <a
                className={`${s.btn} ${s.btnWhatsapp}`}
                href={whatsappLink(data.phone, product.name)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon />
                Book Now on WhatsApp
              </a>
              <a
                className={`${s.btn} ${s.btnGhost}`}
                href={pageHref(basePath, "contact")}
              >
                <MailIcon />
                Contact Page
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
