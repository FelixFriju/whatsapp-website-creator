import type { ReactNode } from "react";
import type { WebsiteData } from "./data";
import Header from "./Header";
import Footer from "./Footer";
import s from "./styles.module.css";

export default function Shell({ data, basePath, children }: { data: WebsiteData; basePath: string; children: ReactNode }) {
  return <div className={s.site}><Header data={data} basePath={basePath} />{children}<Footer data={data} basePath={basePath} /></div>;
}
