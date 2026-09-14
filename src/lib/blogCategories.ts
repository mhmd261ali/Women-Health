/** Fixed blog categories used in Sanity + frontend filters */
export const BLOG_CATEGORIES = [
  "الحركة والتمارين",
  "الحمل",
  "ما بعد الولادة",
  "الأطفال",
  "الرضاعة الطبيعية",
  "العلاج الفيزيائي",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

const CATEGORY_COLORS: Record<string, string> = {
  "الحركة والتمارين": "#8A9E84",
  الحمل: "#E8776F",
  "ما بعد الولادة": "#C4605A",
  الأطفال: "#9DAE97",
  "الرضاعة الطبيعية": "#D4756A",
  "العلاج الفيزيائي": "#748D6E",
};

export function getBlogCategoryColor(category?: string): string {
  const key = category?.trim();
  return key ? CATEGORY_COLORS[key] || "#D4756A" : "#D4756A";
}
