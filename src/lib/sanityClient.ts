import { createClient } from "@sanity/client";

/**
 * Browser-only client for public reads.
 * Do not put API tokens here — tokens belong on a server, never in frontend code.
 * Add your deploy origin under Sanity → API → CORS origins
 * (e.g. https://women-health-nu.vercel.app).
 */
export const client = createClient({
  projectId: "w8a3f9tu",
  dataset: "data",
  apiVersion: "2024-01-01",
  useCdn: true,
});
