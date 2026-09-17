"use client";

/**
 * website1 — ProductGrid
 * Data-driven product cards; clicking any card opens the detail modal.
 */

import { useState } from "react";
import type { Product, WebsiteData } from "./data";
import { ProductModal } from "./ProductModal";
import { ArrowUpRight, SmartImage } from "./shared";
import s from "./styles.module.css";

export function ProductGrid({
  products,
  data,
  basePath,
}: {
  products: Product[];
  data: WebsiteData;
  basePath: string;
}) {
  const [selected, setSelected] = useState<{ product: Product; index: number } | null>(null);

  return (
    <>
      <div className={s.productsGrid}>
        {products.map((product, i) => (
          <button
            key={`${product.name}-${i}`}
            type="button"
            className={s.productCard}
            onClick={() => setSelected({ product, index: i })}
          >
            <SmartImage
              src={product.image ?? data.images.products?.[i]}
              alt={product.name}
              monogram={product.name.slice(0, 1)}
              ratioClass={s.ratioBox}
            />
            <span className={s.productBody}>
              <span className={s.productName}>{product.name}</span>
              <span className={s.productDesc}>{product.description}</span>
              <span className={s.productLinkHint}>
                View details
                <ArrowUpRight />
              </span>
            </span>
          </button>
        ))}
      </div>

      {selected && (
        <ProductModal
          product={selected.product}
          index={selected.index}
          data={data}
          basePath={basePath}
          onClose={() => setSelected(null)}
        />
      )}
    </>
    );
}
