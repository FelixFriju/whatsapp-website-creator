export type NavItem = { label: string; href: string };

export function pageHref(basePath = "/", sub?: string): string {
  const base = (basePath || "/").replace(/\/+$/, "");
  if (!sub) return base || "/";
  return `${base}/${sub.replace(/^\/+/, "")}`;
}

export function normalizePhone(phone = ""): string {
  return phone.replace(/\D/g, "");
}

export function whatsappLink(phone = "", productName?: string): string {
  const digits = normalizePhone(phone);
  const text = productName
    ? `Hello, I am interested in ${productName}.`
    : "Hello, I would like to make an enquiry.";
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

export function telLink(phone = ""): string {
  const digits = normalizePhone(phone);
  return digits ? `tel:+${digits}` : "tel:";
}

export function mailtoLink(email = ""): string {
  return `mailto:${email}`;
}

export function navItems(basePath = "/"): NavItem[] {
  return [
    { label: "Home", href: pageHref(basePath) },
    { label: "About", href: pageHref(basePath, "about") },
    { label: "Products", href: pageHref(basePath, "products") },
    { label: "Contact", href: pageHref(basePath, "contact") },
  ];
}
