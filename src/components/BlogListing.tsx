import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Instagram, Search, Tag } from "lucide-react";
import useGetAllTips from "../api-hooks/useGetAllTips";

export default function BlogListing() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { tipList, loading, error } = useGetAllTips(
    searchTerm.trim(),
    selectedCategory,
  );

  const { tipList: allTips } = useGetAllTips("", "");

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

  const recentTips = useMemo(() => tipList.slice(0, 30), [tipList]);

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
      className="relative overflow-hidden py-40"
      style={{
        background: "linear-gradient(180deg, #FAF0EC 0%, #F4F6F3 100%)",
      }}
      dir="rtl"
    >
      <div
        className="absolute right-0 top-0 h-96 w-96 rounded-full opacity-15 blur-3xl"
        style={{ background: "radial-gradient(circle, #D4756A, transparent)" }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center"
        >
          <div
            className="mb-6 inline-block rounded-full px-4 py-1.5 text-sm font-medium"
            style={{
              color: "#D4756A",
              background: "rgba(212,117,106,0.1)",
              border: "1px solid rgba(212,117,106,0.25)",
            }}
          >
            مدونة الصحة والعافية
          </div>

          <h1
            className="mb-5 text-4xl font-bold sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "Georgia, serif", color: "#4A3530" }}
          >
            نصائح وأفكار لصحة
            <span style={{ color: "#D4756A" }}> المرأة</span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-sage-600">
            نصائح متخصصة حول اللياقة البدنية، العلاج الطبيعي، التعافي بعد
            الولادة، الرضاعة والصحة الشاملة لمساعدتك على اتخاذ قرارات أفضل لصحتك
            وعافيتك.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12 space-y-6"
        >
          <div className="relative">
            <Search className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-sage-400" />

            <input
              type="text"
              placeholder="ابحث عن النصائح..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-2xl border border-cream-300 bg-white/70 py-4 pl-5 pr-12 text-sage-800 placeholder-sage-400 backdrop-blur-sm transition-all focus:border-coral-400 focus:outline-none focus:ring-2 focus:ring-coral-200"
            />
          </div>

          <div className="flex flex-wrap justify-start gap-3">
            <button
              onClick={() => setSelectedCategory("")}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
                !selectedCategory
                  ? "text-white shadow-md"
                  : "border border-cream-300 bg-white/70 text-sage-700 hover:bg-white"
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
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? "text-white shadow-md"
                    : "border border-cream-300 bg-white/70 text-sage-700 hover:bg-white"
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

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-coral-200 border-t-coral-500" />
          </div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-16 text-center"
          >
            <p className="text-lg text-red-500">{error}</p>
          </motion.div>
        ) : recentTips.length > 0 ? (
          <div className="grid gap-8 lg:grid-cols-2">
            {recentTips.map((tip, i) => {
              const hasInstagram = Boolean(tip.instagram_url);
              const cardText = hasInstagram
                ? tip.tip_description
                : tip.hook || tip.tip_description;

              return (
                <motion.article
                  key={tip._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="group relative overflow-hidden rounded-3xl bg-white/70 backdrop-blur-sm"
                  style={{
                    border: "1.5px solid rgba(212,117,106,0.12)",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                  }}
                >
                  <div className="p-6 lg:p-7">
                    {tip.tip_category && (
                      <div className="mb-4 flex flex-wrap gap-2">
                        <span
                          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-white"
                          style={{
                            background: getCategoryColor(tip.tip_category),
                          }}
                        >
                          <Tag className="h-3.5 w-3.5" />
                          {tip.tip_category}
                        </span>
                      </div>
                    )}

                    <h3
                      className="mb-3 line-clamp-2 text-2xl font-bold leading-tight"
                      style={{
                        fontFamily: "Georgia, serif",
                        color: "#4A3530",
                      }}
                    >
                      {tip.tip}
                    </h3>

                    {cardText && (
                      <p className="mb-5 line-clamp-4 text-sm leading-relaxed text-sage-800">
                        {cardText}
                      </p>
                    )}

                    {tip.tip_date && (
                      <div className="mb-6 flex items-center gap-2 text-xs text-sage-500">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{formatDate(tip.tip_date)}</span>
                      </div>
                    )}

                    {hasInstagram ? (
                      <a
                        href={tip.instagram_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                        style={{
                          background:
                            "linear-gradient(135deg, #E8776F 0%, #D4756A 55%, #C4605A 100%)",
                        }}
                      >
                        <Instagram className="h-4 w-4" />
                        شاهدي على إنستغرام
                      </a>
                    ) : (
                      <Link
                        to={`/blog/${tip._id}`}
                        className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                        style={{
                          background:
                            "linear-gradient(135deg, #9DAE97 0%, #8A9E84 55%, #748D6E 100%)",
                        }}
                      >
                        اقرئي المزيد
                        <ArrowLeft className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-16 text-center"
          >
            <p className="text-lg text-sage-600">
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
