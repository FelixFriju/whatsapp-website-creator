"use client";

import type { Product, WebsiteData } from "./data";
import { ArrowUpRight, SmartImage } from "./shared";
import { whatsappLink } from "./links";
import s from "./styles.module.css";

export function ProductModal({
  product,
  data,
  onClose,
}: {
  product: Product;
  data: WebsiteData;
  onClose: () => void;
}) {
  return (
    <div className={s.modalBackdrop} role="presentation" onMouseDown={onClose}>
      <div className={s.modal} role="dialog" aria-modal="true" aria-label={product.name} onMouseDown={(e) => e.stopPropagation()}>
        <button className={s.modalClose} onClick={onClose} aria-label="Close">×</button>
        <div className={s.modalMedia}><SmartImage src={product.image} alt={product.name} /></div>
        <div className={s.modalBody}>
          <span className={s.sectionLabel}>Product</span>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <a className={s.darkButton} href={whatsappLink(data.phone, product.name)} target="_blank" rel="noreferrer">
            Enquire on WhatsApp <ArrowUpRight />
          </a>
        </div>
      </div>
    </div>
  );
}
