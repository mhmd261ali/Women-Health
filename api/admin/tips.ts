import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getPool } from "../lib/db";
import {
  createTip,
  deleteTip,
  listTips,
  updateTip,
  type TipInput,
} from "../lib/tips";

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
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Max-Age", "86400");
}

function isAuthorized(req: VercelRequest): boolean {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) return false;
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  return token === secret;
}

function parseBody(req: VercelRequest): TipInput {
  const body = (req.body || {}) as Record<string, unknown>;
  return {
    tip: String(body.tip || "").trim(),
    tip_date: body.tip_date ? String(body.tip_date).slice(0, 10) : null,
    tip_category: body.tip_category ? String(body.tip_category) : null,
    hook: body.hook ? String(body.hook) : null,
    tip_description: body.tip_description ? String(body.tip_description) : null,
    instagram_url: body.instagram_url ? String(body.instagram_url) : null,
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const origin = corsOrigin(req);
  setCors(res, origin);

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (!isAuthorized(req)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const pool = getPool();

    if (req.method === "GET") {
      const data = await listTips(pool, "", "");
      return res.status(200).json(data);
    }

    if (req.method === "POST") {
      const input = parseBody(req);
      if (!input.tip) {
        return res.status(400).json({ error: "Title (tip) is required" });
      }
      const created = await createTip(pool, input);
      return res.status(201).json(created);
    }

    if (req.method === "PUT") {
      const id = typeof req.query.id === "string" ? req.query.id : "";
      if (!id) return res.status(400).json({ error: "id is required" });
      const input = parseBody(req);
      if (!input.tip) {
        return res.status(400).json({ error: "Title (tip) is required" });
      }
      const updated = await updateTip(pool, id, input);
      if (!updated) return res.status(404).json({ error: "Tip not found" });
      return res.status(200).json(updated);
    }

    if (req.method === "DELETE") {
      const id = typeof req.query.id === "string" ? req.query.id : "";
      if (!id) return res.status(400).json({ error: "id is required" });
      const ok = await deleteTip(pool, id);
      if (!ok) return res.status(404).json({ error: "Tip not found" });
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error("Admin tips API failed:", err);
    return res.status(500).json({ error: "Admin tips request failed" });
  }
}
