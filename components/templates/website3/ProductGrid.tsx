"use client";

import { useState } from "react";
import type { Product, WebsiteData } from "./data";
import ProductModal from "./ProductModal";
import { ArrowUpRight, SmartImage } from "./shared";
import styles from "./styles.module.css";

export default function ProductGrid({
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
      <div className={styles.productsGrid}>
        {products.map((product, index) => (
          <button
            key={`${product.name}-${index}`}
            type="button"
            className={styles.productCard}
            onClick={() => setSelected({ product, index })}
          >
            <SmartImage
              src={product.image ?? data.images.products?.[index]}
              alt={product.name}
              monogram={product.name.slice(0, 1)}
            />
            <span className={styles.productNumber}>0{index + 1}</span>
            <strong>{product.name}</strong>
            <span>{product.description}</span>
            <em>View details <ArrowUpRight /></em>
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
