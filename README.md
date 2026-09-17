# Business Website Platform

Managed website publishing platform for non-technical business owners.

## Current structure

All three choices are multi-page websites:

```text
components/templates/
├── ModernWebsite/
│   └── website1/
├── StandardWebsite/
│   └── website1/
└── PremiumWebsite/
    └── website1/
```

The customer chooses one of:

- Modern Website
- Standard Website
- Premium Website

The backend randomly selects a website variant inside the chosen category.

Each website variant can have its own components, CSS, colors, typography, animations and page structure.

## Multi-page URLs

Published websites use:

```text
/company-name
/company-name/about
/company-name/services
/company-name/products
/company-name/contact
```

## Customer flow

```text
/create
  ↓
Business details + design category
  ↓
Random website variant selected
  ↓
Save to Supabase
  ↓
Generate deterministic starter content
  ↓
Select platform image
  ↓
Publish automatically
  ↓
/company-name
```

## Adding more variants

Example:

```text
PremiumWebsite/
├── website1/
├── website2/
└── website3/
```

Register each new variant in `lib/templates/index.tsx` and add its ID to the category's `variants` array. The customer experience stays the same.

## Current image system

V1 uses local images in `public/business-images/` so there is no image API cost.

## Current AI system

V1 does not require an AI API. The content function returns deterministic starter content. An AI provider can be added later without changing the template architecture.

## Environment

Create `.env.local` beside `package.json` using `.env.example`.

## Run

```bash
npm install
npm run dev
```
