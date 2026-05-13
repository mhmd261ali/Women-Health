import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Tag, ArrowRight, Search } from "lucide-react";
import useGetAllTips from "../api-hooks/useGetAllTips";

export default function BlogListing() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  /**
   * This fetches the filtered tips according to:
   * - searchTerm
   * - selectedCategory
   */
  const { tipList, loading, error } = useGetAllTips(
    searchTerm.trim(),
    selectedCategory,
  );

  /**
   * This fetches all tips only to build the category buttons.
   * We keep it separate so categories do not disappear when filtering.
   */
  const { tipList: allTips } = useGetAllTips("", "");

  console.log(tipList);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(
        allTips
          .map((tip) => tip.tip_category)
          .filter((category): category is string => Boolean(category)),
      ),
    );

    return uniqueCategories;
  }, [allTips]);

  /**
   * Recent tips based on the filtered list.
   * Because your hook already orders by tip_date desc,
   * this will show the latest 5 matching tips.
   */
  const recentTips = useMemo(() => tipList.slice(0, 30), [tipList]);

  console.log(recentTips);

  const getCategoryColor = (category?: string): string => {
    const normalizedCategory = category?.toLowerCase().trim();

    const colorMap: Record<string, string> = {
      breastfeeding: "#D4756A",
      sports: "#8A9E84",
      health: "#E8776F",
      physiotherapy: "#748D6E",
      nutrition: "#D4756A",
      fitness: "#8A9E84",
      recovery: "#C4605A",
      wellness: "#9DAE97",

      الرضاعة: "#D4756A",
      الرياضة: "#8A9E84",
      الصحة: "#E8776F",
      "العلاج الفيزيائي": "#748D6E",
      التغذية: "#D4756A",
      اللياقة: "#8A9E84",
      التعافي: "#C4605A",
      العافية: "#9DAE97",
    };

    return normalizedCategory
      ? colorMap[normalizedCategory] || "#D4756A"
      : "#D4756A";
  };

  const formatDate = (date?: string) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("ar", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section
      className="py-40 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #FAF0EC 0%, #F4F6F3 100%)",
      }}
      dir="rtl"
    >
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-15"
        style={{ background: "radial-gradient(circle, #D4756A, transparent)" }}
      />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-6"
            style={{
              color: "#D4756A",
              background: "rgba(212,117,106,0.1)",
              border: "1px solid rgba(212,117,106,0.25)",
            }}
          >
            مدونة الصحة والعافية
          </div>

          <h1
            className="text-5xl lg:text-6xl font-bold mb-5"
            style={{ fontFamily: "Georgia, serif", color: "#4A3530" }}
          >
            نصائح وأفكار لصحة
            <span style={{ color: "#D4756A" }}> المرأة</span>
          </h1>

          <p className="text-sage-600 text-lg max-w-2xl mx-auto leading-relaxed">
            نصائح متخصصة حول اللياقة البدنية، العلاج الطبيعي، التعافي بعد
            الولادة، الرضاعة والصحة الشاملة لمساعدتك على اتخاذ قرارات أفضل لصحتك
            وعافيتك.
          </p>
        </motion.div>

        {/* Search and filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12 space-y-6"
        >
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sage-400" />

            <input
              type="text"
              placeholder="ابحث عن النصائح..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-12 pl-5 py-4 rounded-2xl bg-white/70 backdrop-blur-sm border border-cream-300 text-sage-800 placeholder-sage-400 focus:outline-none focus:border-coral-400 focus:ring-2 focus:ring-coral-200 transition-all"
            />
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-3 justify-start">
            <button
              onClick={() => setSelectedCategory("")}
              className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-200 ${
                !selectedCategory
                  ? "text-white shadow-md"
                  : "bg-white/70 text-sage-700 hover:bg-white border border-cream-300"
              }`}
              style={
                !selectedCategory
                  ? { background: "linear-gradient(135deg, #E8776F, #D4756A)" }
                  : {}
              }
            >
              جميع النصائح
            </button>

            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-200 ${
                  selectedCategory === category
                    ? "text-white shadow-md"
                    : "bg-white/70 text-sage-700 hover:bg-white border border-cream-300"
                }`}
                style={
                  selectedCategory === category
                    ? {
                        background: `linear-gradient(135deg, ${getCategoryColor(
                          category,
                        )}, ${getCategoryColor(category)}dd)`,
                      }
                    : {}
                }
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Loading */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-coral-200 border-t-coral-500 rounded-full animate-spin" />
          </div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <p className="text-red-500 text-lg">{error}</p>
          </motion.div>
        ) : recentTips.length > 0 ? (
          <div className="grid lg:grid-cols-2 gap-8">
            {recentTips.map((tip, i) => (
              <motion.article
                key={tip._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="group relative rounded-3xl overflow-hidden bg-white/70 backdrop-blur-sm"
                style={{
                  border: "1.5px solid rgba(212,117,106,0.12)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                }}
              >
                <div className="p-6 lg:p-7">
                  {/* Category */}
                  {tip.tip_category && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white"
                        style={{
                          background: getCategoryColor(tip.tip_category),
                        }}
                      >
                        <Tag className="w-3.5 h-3.5" />
                        {tip.tip_category}
                      </span>
                    </div>
                  )}

                  {/* Title */}
                  <h3
                    className="text-2xl font-bold mb-3 leading-tight line-clamp-2"
                    style={{ fontFamily: "Georgia, serif", color: "#4A3530" }}
                  >
                    {tip.tip}
                  </h3>

                  {/* Description */}
                  <p className="text-sage-800 text-sm leading-relaxed mb-5 line-clamp-4">
                    {tip.tip_description}
                  </p>

                  {/* Meta */}
                  {tip.tip_date && (
                    <div className="flex items-center gap-2 text-xs text-sage-500 mb-6">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{formatDate(tip.tip_date)}</span>
                    </div>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <p className="text-sage-600 text-lg">
              {searchTerm || selectedCategory
                ? "لم يتم العثور على نصائح تطابق البحث أو التصنيف."
                : "لا توجد نصائح متاحة حتى الآن."}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
