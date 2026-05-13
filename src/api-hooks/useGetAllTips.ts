import { useEffect, useState } from "react";
import { client } from "../lib/sanityClient";

/** ✅ Match your Sanity schema fields */
export type Tip = {
  _id: string;
  _type: "Blog";
  tip?: string;
  tip_date?: string; // Sanity "date" is returned as ISO string (YYYY-MM-DD)
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

    // Build GROQ search safely:
    // - if search is empty => don't filter by search
    // - if selectedCategory is empty => don't filter by category
    const query = `*[
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

    const params = {
      // GROQ match uses wildcard patterns like "*term*"
      search: search ? `*${search}*` : "",
      selectedCategory: selectedCategory || "",
    };

    console.log(params);

    client
      .fetch(query, params)
      .then((data: any[]) => {
        console.log(data);
        if (cancelled) return;

        const mapped: Tip[] = (data || []).map((d) => ({
          _id: d._id,
          _type: "Blog",
          tip: d.tip,
          tip_date: d.tip_date,
          tip_category: d.tip_category,
          tip_description: d.tip_description,
        }));

        console.log(mapped);

        setTipList(mapped);
        setLoading(false);
      })
      .catch((err: any) => {
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
