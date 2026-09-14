import { useEffect, useState } from "react";

/** Match your Sanity schema fields */
export type Tip = {
  _id: string;
  _type: "Blog";
  tip?: string;
  tip_date?: string;
  tip_category?: string;
  hook?: string;
  tip_description?: string;
  instagram_url?: string;
};

function mapTip(d: Tip): Tip {
  return {
    _id: d._id,
    _type: "Blog",
    tip: d.tip,
    tip_date: d.tip_date,
    tip_category: d.tip_category,
    hook: d.hook || undefined,
    tip_description: d.tip_description,
    instagram_url: d.instagram_url || undefined,
  };
}

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

    fetch(`/api/tips?${params.toString()}`)
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: Tip[]) => {
        if (cancelled) return;
        setTipList((data || []).map(mapTip));
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

export function useGetTipById(id: string | undefined) {
  const [tip, setTip] = useState<Tip | null>(null);
  const [loading, setLoading] = useState(Boolean(id));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setTip(null);
      setLoading(false);
      setError(null);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(`/api/tips?id=${encodeURIComponent(id)}`)
      .then(async (res) => {
        if (res.status === 404) return null;
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: Tip | null) => {
        if (cancelled) return;
        setTip(data ? mapTip(data) : null);
        setError(data ? null : "لم يتم العثور على هذه النصيحة.");
        setLoading(false);
      })
      .catch((err: unknown) => {
        console.error("Failed to fetch tip:", err);
        if (cancelled) return;
        setError("تعذر تحميل النصيحة.");
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  return { tip, loading, error };
}
