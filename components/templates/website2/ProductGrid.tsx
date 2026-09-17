"use client";

import { useState } from "react";
import type { Product, WebsiteData } from "./data";
import { ProductModal } from "./ProductModal";
import { ArrowUpRight, SmartImage } from "./shared";
import s from "./styles.module.css";

export default function ProductGrid({ products, data }: { products: Product[]; data: WebsiteData }) {
  const [selected, setSelected] = useState<Product | null>(null);
  return (
    <>
      <div className={s.productGrid}>
        {products.map((product, index) => (
          <button type="button" className={`${s.productCard} ${index % 3 === 0 ? s.productCardTall : ""}`} key={`${product.name}-${index}`} onClick={() => setSelected(product)}>
            <SmartImage src={product.image ?? data.images.products?.[index]} alt={product.name} ratioClass={s.productRatio} />
            <span className={s.productMeta}>0{index + 1}</span>
            <span className={s.productCardBottom}>
              <strong>{product.name}</strong>
              <span>View details <ArrowUpRight /></span>
            </span>
          </button>
        ))}
      </div>
      {selected && <ProductModal product={selected} data={data} onClose={() => setSelected(null)} />}
    </>
  );
}
