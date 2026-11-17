import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getPool } from "./lib/db";
import { getTipById, listTips } from "./lib/tips";

const ALLOWED_ORIGINS = [
  "https://women-health-nu.vercel.app",
  "http://localhost:5173",
  "http://localhost:4173",
  "http://localhost:3000",
];

function corsOrigin(req: VercelRequest): string {
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.includes(origin)) return origin;
  return ALLOWED_ORIGINS[0];
}

function setCors(res: VercelResponse, origin: string) {
  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Max-Age", "86400");
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const origin = corsOrigin(req);
  setCors(res, origin);

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const pool = getPool();
    const id = typeof req.query.id === "string" ? req.query.id : "";

    if (id) {
      const tip = await getTipById(pool, id);
      if (!tip) {
        return res.status(404).json({ error: "Tip not found" });
      }
      res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");
      return res.status(200).json(tip);
    }

    const searchParam =
      typeof req.query.search === "string" ? req.query.search.trim() : "";
    const selectedCategory =
      typeof req.query.selectedCategory === "string"
        ? req.query.selectedCategory
        : "";

    const data = await listTips(pool, searchParam, selectedCategory);

    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");
    return res.status(200).json(data);
  } catch (err) {
    console.error("Postgres tips fetch failed:", err);
    return res.status(500).json({ error: "Failed to fetch tips" });
  }
}
