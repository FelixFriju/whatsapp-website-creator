-- Run this once if your Supabase database already exists from an earlier version.

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'websites_template_id_check'
  ) THEN
    ALTER TABLE public.websites DROP CONSTRAINT websites_template_id_check;
  END IF;
END $$;

ALTER TABLE public.websites
  ADD COLUMN IF NOT EXISTS template_category text;

-- Migrate old template IDs to the new category/variant structure.
UPDATE public.websites
SET template_category = 'modern-website', template_id = 'modern-website-1'
WHERE template_id = 'modern-business';

UPDATE public.websites
SET template_category = 'standard-website', template_id = 'standard-website-1'
WHERE template_id = 'local-business';

UPDATE public.websites
SET template_category = 'premium-website', template_id = 'premium-website-1'
WHERE template_id IN ('premium-business', 'multi-page-business');

ALTER TABLE public.websites
  ALTER COLUMN template_category SET DEFAULT 'modern-website';

ALTER TABLE public.websites
  ALTER COLUMN template_category SET NOT NULL;

CREATE INDEX IF NOT EXISTS websites_template_category_idx
  ON public.websites(template_category);

CREATE INDEX IF NOT EXISTS websites_template_id_idx
  ON public.websites(template_id);
