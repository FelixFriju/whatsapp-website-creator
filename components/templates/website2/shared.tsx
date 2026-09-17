"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import s from "./styles.module.css";

export function SmartImage({
  src,
  alt,
  className = "",
  ratioClass = "",
}: {
  src?: string;
  alt: string;
  className?: string;
  ratioClass?: string;
}) {
  const [failed, setFailed] = useState(false);
  const usable = Boolean(src) && !failed;

  return (
    <div className={`${s.imageWrap} ${ratioClass}`}>
      {usable ? (
        <img
          src={src}
          alt={alt}
          className={`${s.image} ${className}`}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className={s.imageFallback} aria-label={alt}>
          <span>{alt.slice(0, 1).toUpperCase()}</span>
        </div>
      )}
    </div>
  );
}

export function ArrowUpRight() {
  return <span aria-hidden="true" className={s.iconArrow}>↗</span>;
}

export function MenuIcon() {
  return <span className={s.menuGlyph} aria-hidden="true">☰</span>;
}

export function CloseIcon() {
  return <span className={s.menuGlyph} aria-hidden="true">×</span>;
}

export function LeafMark({ small = false }: { small?: boolean }) {
  return <span className={small ? s.leafMarkSmall : s.leafMark} aria-hidden="true">◌</span>;
}
