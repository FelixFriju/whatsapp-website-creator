export { default, BusinessWebsiteTemplate } from "./Template";
export { default as Home } from "./Home";
export { default as About } from "./About";
export { default as Products } from "./Products";
export { default as Contact } from "./Contact";
export { default as Header } from "./Header";
export { default as Footer } from "./Footer";
export { default as ProductGrid } from "./ProductGrid";
export { default as ProductModal } from "./ProductModal";

export { withTemplateProducts } from "./data";
export type { Product, WebsiteData } from "./data";
export type { NavItem } from "./links";
export { navItems, pageHref, normalizePhone, whatsappLink, telLink, mailtoLink } from "./links";
