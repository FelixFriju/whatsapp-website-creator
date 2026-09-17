create extension if not exists pgcrypto;

create table if not exists public.websites (
  id uuid primary key default gen_random_uuid(),
  company_name text not null,
  slug text not null unique,
  template_category text not null default 'modern-website',
  template_id text not null,
  status text not null default 'draft' check (status in ('draft','generating','ready','published','unpublished')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.business_profiles (
  id uuid primary key default gen_random_uuid(),
  website_id uuid not null references public.websites(id) on delete cascade unique,
  phone text not null,
  email text not null,
  location text not null,
  business_subject text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.generated_content (
  id uuid primary key default gen_random_uuid(),
  website_id uuid not null references public.websites(id) on delete cascade unique,
  hero_title text not null,
  hero_description text not null,
  about_title text not null,
  about_description text not null,
  services_title text not null,
  services text[] not null default '{}',
  contact_title text not null,
  cta_text text not null,
  hero_image text,
  about_image text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists websites_slug_idx on public.websites(slug);
create index if not exists websites_template_category_idx on public.websites(template_category);
create index if not exists websites_template_id_idx on public.websites(template_id);

alter table public.websites enable row level security;
alter table public.business_profiles enable row level security;
alter table public.generated_content enable row level security;
