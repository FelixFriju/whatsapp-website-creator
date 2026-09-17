ModernWebsite / website1 — converted for the Business Website Platform

This folder is ONLY the reusable template. Copy it to:

components/templates/ModernWebsite/website1/

Pages:
  /company-name
  /company-name/about
  /company-name/services
  /company-name/products
  /company-name/contact

Important integration details:
- All company data comes from the platform WebsiteData.
- No separate Next.js app is included.
- No package.json/app/next.config is included.
- Template styling is isolated in styles.module.css.
- Interactive files use "use client".
- Pure URL/WhatsApp/mail/phone helpers are in links.ts, so server components do not call client functions.
- Template has a default export through index.ts for the platform template registry.
- If the platform does not provide a product catalog yet, data.ts creates product cards from the saved service list so the template still works in V1.
