import { useEffect, useState } from "react";

/** Match your Sanity schema fields */
export type Tip = {
  _id: string;
  _type: "Blog";
  tip?: string;
  tip_date?: string;
  tip_category?: string;
  tip_description?: string;
};

export default function useGetAllTips(
  search: string,
  selectedCategory: string,
) {
  const [tipList, setTipList] = useState<Tip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    const params = new URLSearchParams({
      search: search.trim(),
      selectedCategory: selectedCategory || "",
    });

    // Same-origin proxy — avoids Sanity CORS from the browser
    fetch(`/api/tips?${params.toString()}`)
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: Tip[]) => {
        if (cancelled) return;

        const mapped: Tip[] = (data || []).map((d) => ({
          _id: d._id,
          _type: "Blog",
          tip: d.tip,
          tip_date: d.tip_date,
          tip_category: d.tip_category,
          tip_description: d.tip_description,
        }));

        setTipList(mapped);
        setLoading(false);
      })
      .catch((err: unknown) => {
        console.error("Failed to fetch tips:", err);
        if (cancelled) return;
        setError("Failed to fetch suggestion documents");
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [search, selectedCategory]);

  return { tipList, loading, error };
}
