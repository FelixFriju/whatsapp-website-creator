import type { CSSProperties, ReactNode } from "react";
import s from "./styles.module.css";

export function SmartImage({
  src,
  alt,
  className,
  ratioClass,
  style,
}: {
  src?: string | null;
  alt: string;
  className?: string;
  ratioClass?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={`${s.smartImage} ${ratioClass ?? ""}`} style={style}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className={`${s.imgFill} ${className ?? ""}`} />
      ) : (
        <div className={s.imagePlaceholder} aria-hidden="true">
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
  return <span aria-hidden="true" className={s.menuIcon}><i /><i /><i /></span>;
}

export function CloseIcon() {
  return <span aria-hidden="true" className={s.closeIcon}>×</span>;
}

export function PhoneIcon() {
  return <span aria-hidden="true" className={s.phoneIcon}>⌕</span>;
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return <span className={s.sectionLabel}>{children}</span>;
}
