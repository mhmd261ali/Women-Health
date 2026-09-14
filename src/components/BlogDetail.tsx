import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import { useGetTipById } from "../api-hooks/useGetAllTips";
import { getBlogCategoryColor } from "../lib/blogCategories";

function formatDate(date?: string) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("ar", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogDetail({ slug }: { slug: string }) {
  const { tip, loading, error } = useGetTipById(slug);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [slug]);

  return (
    <section
      className="relative min-h-screen overflow-hidden py-28 sm:py-36"
      style={{
        background: "linear-gradient(180deg, #FAF0EC 0%, #F4F6F3 100%)",
      }}
      dir="rtl"
    >
      <div
        className="absolute left-0 top-0 h-96 w-96 rounded-full opacity-15 blur-3xl"
        style={{ background: "radial-gradient(circle, #8A9E84, transparent)" }}
      />
      <div
        className="absolute bottom-0 right-0 h-72 w-72 rounded-full opacity-15 blur-3xl"
        style={{ background: "radial-gradient(circle, #D4756A, transparent)" }}
      />

      <div className="relative z-10 mx-auto max-w-3xl px-6 lg:px-8">
        <Link
          to="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-sage-600 transition-colors hover:text-coral-600"
        >
          <ArrowRight className="h-4 w-4" />
          العودة إلى المدونة
        </Link>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-coral-200 border-t-coral-500" />
          </div>
        ) : error || !tip ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl bg-white/70 p-10 text-center backdrop-blur-sm"
            style={{ border: "1.5px solid rgba(212,117,106,0.12)" }}
          >
            <p className="mb-6 text-lg text-sage-700">
              {error || "لم يتم العثور على هذه النصيحة."}
            </p>
            <Link
              to="/blog"
              className="inline-flex rounded-full px-5 py-2.5 text-sm font-semibold text-white"
              style={{
                background: "linear-gradient(135deg, #E8776F, #D4756A)",
              }}
            >
              العودة إلى المدونة
            </Link>
          </motion.div>
        ) : (
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="rounded-[2rem] bg-white/75 p-6 backdrop-blur-sm sm:p-10"
            style={{
              border: "1.5px solid rgba(212,117,106,0.12)",
              boxShadow: "0 8px 40px rgba(74,53,48,0.08)",
            }}
          >
            <div className="mb-6 flex flex-wrap items-center gap-3">
              {tip.tip_category && (
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-white"
                  style={{ background: getBlogCategoryColor(tip.tip_category) }}
                >
                  <Tag className="h-3.5 w-3.5" />
                  {tip.tip_category}
                </span>
              )}
              {tip.tip_date && (
                <span className="inline-flex items-center gap-1.5 text-xs text-sage-500">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatDate(tip.tip_date)}
                </span>
              )}
            </div>

            <h1
              className="mb-6 text-3xl font-bold leading-tight sm:text-4xl"
              style={{ fontFamily: "Georgia, serif", color: "#4A3530" }}
            >
              {tip.tip}
            </h1>

            {tip.hook && (
              <p
                className="mb-8 border-r-4 pr-4 text-base leading-relaxed text-sage-700 sm:text-lg"
                style={{ borderColor: "#D4756A" }}
              >
                {tip.hook}
              </p>
            )}

            {tip.tip_description ? (
              <div className="space-y-4 whitespace-pre-line text-base leading-[1.9] text-sage-800 sm:text-lg">
                {tip.tip_description}
              </div>
            ) : (
              <p className="text-sage-600">لا يوجد محتوى إضافي لهذه النصيحة.</p>
            )}
          </motion.article>
        )}
      </div>
    </section>
  );
}
