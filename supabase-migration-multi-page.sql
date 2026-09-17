-- Existing database migration.
-- Run this once if your websites table was created before Multi Page Business existed.

alter table public.websites
  drop constraint if exists websites_template_id_check;

alter table public.websites
  add constraint websites_template_id_check
  check (template_id in (
    'modern-business',
    'local-business',
    'premium-business',
    'multi-page-business'
  ));

-- The generated_content.services column must be text[] because the templates use .map().
-- Check your column type before running the optional conversion below.
-- It should be PostgreSQL: text[]
