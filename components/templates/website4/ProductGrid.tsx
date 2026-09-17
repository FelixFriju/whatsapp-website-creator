"use client";

import { useState } from "react";
import type { Product, WebsiteData } from "./data";
import { ProductModal } from "./ProductModal";
import { ArrowUpRight, SmartImage } from "./shared";
import s from "./styles.module.css";

export function ProductGrid({ products, data }: { products: Product[]; data: WebsiteData }) {
  const [selected, setSelected] = useState<Product | null>(null);

  return (
    <>
      <div className={s.productGrid}>
        {products.slice(0, 6).map((product, index) => (
          <button key={`${product.name}-${index}`} type="button" className={s.productCard} onClick={() => setSelected(product)}>
            <SmartImage src={product.image ?? data.images.products?.[index]} alt={product.name} ratioClass={s.productRatio} />
            <span className={s.productMeta}>
              <span className={s.productName}>{product.name}</span>
              <span className={s.productDescription}>{product.description}</span>
              <span className={s.productAction}>View details <ArrowUpRight /></span>
            </span>
          </button>
        ))}
      </div>
      {selected && <ProductModal product={selected} data={data} onClose={() => setSelected(null)} />}
    </>
  );
}
