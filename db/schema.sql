-- Blog tips table (replaces Sanity Blog documents)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS tips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tip TEXT NOT NULL,
  tip_date DATE,
  tip_category TEXT,
  hook TEXT,
  tip_description TEXT,
  instagram_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS tips_tip_date_idx ON tips (tip_date DESC NULLS LAST);
CREATE INDEX IF NOT EXISTS tips_tip_category_idx ON tips (tip_category);

-- Allowed categories (optional check)
-- الحركة والتمارين | الحمل | ما بعد الولادة | الأطفال | الرضاعة الطبيعية | العلاج الفيزيائي
