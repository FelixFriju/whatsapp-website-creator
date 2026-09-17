"use client";

import { useEffect } from "react";
import type { Product, WebsiteData } from "./data";
import { telLink, whatsappLink } from "./links";
import { SmartImage } from "./shared";
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
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className={s.modalBackdrop} role="dialog" aria-modal="true" aria-label={product.name} onMouseDown={onClose}>
      <div className={s.modal} onMouseDown={(e) => e.stopPropagation()}>
        <button className={s.closeModal} onClick={onClose} aria-label="Close">×</button>
        <div className={s.modalImage}>
          <SmartImage src={product.image} alt={product.name} ratioClass={s.modalRatio} />
        </div>
        <div className={s.modalContent}>
          <p className={s.kicker}>Featured offering</p>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <div className={s.modalActions}>
            <a className={s.buttonDark} href={whatsappLink(data.phone, product.name)} target="_blank" rel="noreferrer">Enquire on WhatsApp ↗</a>
            <a className={s.buttonGhost} href={telLink(data.phone)}>Call {data.phone}</a>
          </div>
        </div>
      </div>
    </div>
  );
}
