import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@sanity/client";

const ALLOWED_ORIGINS = [
  "https://women-health-nu.vercel.app",
  "http://localhost:5173",
  "http://localhost:4173",
  "http://localhost:3000",
];

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || "w8a3f9tu",
  dataset: process.env.SANITY_DATASET || "data",
  apiVersion: "2024-01-01",
  useCdn: true,
  // Optional: set SANITY_API_TOKEN in Vercel if the dataset is private
  token: process.env.SANITY_API_TOKEN || undefined,
});

const TIPS_QUERY = `*[
  _type == "Blog" &&
  (
    $search == "" ||
    tip match $search ||
    tip_description match $search ||
    tip_category match $search
  ) &&
  (
    $selectedCategory == "" ||
    tip_category == $selectedCategory
  )
]{
  _id,
  _type,
  tip,
  tip_date,
  tip_category,
  tip_description,
} | order(tip_date desc)`;

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

  // Preflight — see https://vercel.com/kb/guide/how-to-enable-cors
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const searchParam =
      typeof req.query.search === "string" ? req.query.search : "";
    const selectedCategory =
      typeof req.query.selectedCategory === "string"
        ? req.query.selectedCategory
        : "";

    const data = await client.fetch(TIPS_QUERY, {
      search: searchParam ? `*${searchParam}*` : "",
      selectedCategory: selectedCategory || "",
    });

    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");
    return res.status(200).json(data ?? []);
  } catch (err) {
    console.error("Sanity tips fetch failed:", err);
    return res.status(500).json({ error: "Failed to fetch tips" });
  }
}
