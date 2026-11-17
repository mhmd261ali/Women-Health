# PostgreSQL setup

Blog tips are stored in Postgres (replaces Sanity).

## 1. Create a database

Use any Postgres host (local, Supabase, Neon, Railway, Vercel Postgres, etc.).

## 2. Apply schema

```bash
psql "$DATABASE_URL" -f db/schema.sql
```

Optional sample rows:

```bash
psql "$DATABASE_URL" -f db/seed.sql
```

## 3. Env vars

Copy `.env.example` to `.env`:

```
DATABASE_URL=postgres://user:password@host:5432/dbname
DATABASE_SSL=false
```

For managed hosts (Supabase/Neon), usually leave SSL on (omit `DATABASE_SSL` or set `true`).

On Vercel, add `DATABASE_URL` in Project → Settings → Environment Variables.

## Table: `tips`

| Column | Type | Notes |
| --- | --- | --- |
| `id` | UUID | Primary key (returned as `_id` in the API) |
| `tip` | TEXT | Title |
| `tip_date` | DATE | Sort/filter date |
| `tip_category` | TEXT | One of the fixed blog categories |
| `hook` | TEXT | Card teaser when no Instagram URL |
| `tip_description` | TEXT | Full article body |
| `instagram_url` | TEXT | Optional Instagram link |
| `created_at` | TIMESTAMPTZ | Auto |
