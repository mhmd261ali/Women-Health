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
