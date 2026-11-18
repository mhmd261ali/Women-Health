import type { Pool } from "pg";

export type TipRow = {
  id: string;
  tip: string | null;
  tip_date: Date | string | null;
  tip_category: string | null;
  hook: string | null;
  tip_description: string | null;
  instagram_url: string | null;
};

/** API shape kept compatible with the existing frontend Tip type */
export type TipDto = {
  _id: string;
  tip?: string;
  tip_date?: string;
  tip_category?: string;
  hook?: string;
  tip_description?: string;
  instagram_url?: string;
};

function formatDate(value: unknown): string | undefined {
  if (!value) return undefined;
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  const s = String(value);
  return s.slice(0, 10);
}

export function rowToTip(row: TipRow): TipDto {
  return {
    _id: row.id,
    tip: row.tip || undefined,
    tip_date: formatDate(row.tip_date),
    tip_category: row.tip_category || undefined,
    hook: row.hook || undefined,
    tip_description: row.tip_description || undefined,
    instagram_url: row.instagram_url || undefined,
  };
}

export async function getTipById(
  pool: Pool,
  id: string,
): Promise<TipDto | null> {
  const { rows } = await pool.query<TipRow>(
    `SELECT id, tip, tip_date, tip_category, hook, tip_description, instagram_url
     FROM tips
     WHERE id = $1
     LIMIT 1`,
    [id],
  );
  return rows[0] ? rowToTip(rows[0]) : null;
}

export async function listTips(
  pool: Pool,
  search: string,
  selectedCategory: string,
): Promise<TipDto[]> {
  const params: string[] = [];
  const where: string[] = [];

  if (selectedCategory) {
    params.push(selectedCategory);
    where.push(`tip_category = $${params.length}`);
  }

  if (search) {
    params.push(`%${search}%`);
    const i = params.length;
    where.push(
      `(tip ILIKE $${i} OR tip_description ILIKE $${i} OR tip_category ILIKE $${i} OR hook ILIKE $${i})`,
    );
  }

  const sql = `
    SELECT id, tip, tip_date, tip_category, hook, tip_description, instagram_url
    FROM tips
    ${where.length ? `WHERE ${where.join(" AND ")}` : ""}
    ORDER BY tip_date DESC NULLS LAST, created_at DESC
  `;

  const { rows } = await pool.query<TipRow>(sql, params);
  return rows.map(rowToTip);
}

export type TipInput = {
  tip: string;
  tip_date?: string | null;
  tip_category?: string | null;
  hook?: string | null;
  tip_description?: string | null;
  instagram_url?: string | null;
};

export async function createTip(
  pool: Pool,
  input: TipInput,
): Promise<TipDto> {
  const { rows } = await pool.query<TipRow>(
    `INSERT INTO tips (tip, tip_date, tip_category, hook, tip_description, instagram_url)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING id, tip, tip_date, tip_category, hook, tip_description, instagram_url`,
    [
      input.tip,
      input.tip_date || null,
      input.tip_category || null,
      input.hook || null,
      input.tip_description || null,
      input.instagram_url || null,
    ],
  );
  return rowToTip(rows[0]);
}

export async function updateTip(
  pool: Pool,
  id: string,
  input: TipInput,
): Promise<TipDto | null> {
  const { rows } = await pool.query<TipRow>(
    `UPDATE tips
     SET tip = $2,
         tip_date = $3,
         tip_category = $4,
         hook = $5,
         tip_description = $6,
         instagram_url = $7
     WHERE id = $1
     RETURNING id, tip, tip_date, tip_category, hook, tip_description, instagram_url`,
    [
      id,
      input.tip,
      input.tip_date || null,
      input.tip_category || null,
      input.hook || null,
      input.tip_description || null,
      input.instagram_url || null,
    ],
  );
  return rows[0] ? rowToTip(rows[0]) : null;
}

export async function deleteTip(pool: Pool, id: string): Promise<boolean> {
  const result = await pool.query(`DELETE FROM tips WHERE id = $1`, [id]);
  return (result.rowCount ?? 0) > 0;
}
