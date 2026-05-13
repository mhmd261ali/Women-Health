import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getPosts, getCategories, BlogPost, BlogCategory } from "../lib/sanity";
import { Calendar, Tag, User, ArrowRight, Search } from "lucide-react";

export default function BlogListing() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [postsData, categoriesData] = await Promise.all([
          getPosts(selectedCategory || undefined),
          getCategories(),
        ]);
        setPosts(postsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory]);

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getCategoryColor = (categoryId: string): string => {
    const category = categories.find((c) => c._id === categoryId);
    const colorMap: Record<string, string> = {
      breastfeeding: "#D4756A",
      sports: "#8A9E84",
      health: "#E8776F",
      physiotherapy: "#748D6E",
      nutrition: "#D4756A",
      fitness: "#8A9E84",
      recovery: "#C4605A",
      wellness: "#9DAE97",
    };
    const slug = category?.slug?.current;

    return category?.color || (slug ? colorMap[slug] : undefined) || "#D4756A";
  };

  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #FAF0EC 0%, #F4F6F3 100%)",
      }}
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
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium text-coral-600 mb-6"
            style={{
              background: "rgba(212,117,106,0.1)",
              border: "1px solid rgba(212,117,106,0.25)",
            }}
          >
            Wellness Blog
          </div>
          <h1
            className="text-5xl lg:text-6xl font-bold mb-5"
            style={{ fontFamily: "Georgia, serif", color: "#4A3530" }}
          >
            Insights & Tips for
            <span style={{ color: "#D4756A" }}> Women's Wellness</span>
          </h1>
          <p className="text-sage-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Expert articles on fitness, physiotherapy, postpartum recovery,
            breastfeeding, and holistic health — helping you make informed
            decisions about your wellbeing.
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
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sage-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-5 py-4 rounded-2xl bg-white/70 backdrop-blur-sm border border-cream-300 text-sage-800 placeholder-sage-400 focus:outline-none focus:border-coral-400 focus:ring-2 focus:ring-coral-200 transition-all"
            />
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-200 ${
                !selectedCategory
                  ? "bg-coral-gradient text-white shadow-md"
                  : "bg-white/70 text-sage-700 hover:bg-white border border-cream-300"
              }`}
              style={
                !selectedCategory
                  ? { background: "linear-gradient(135deg, #E8776F, #D4756A)" }
                  : {}
              }
            >
              All Articles
            </button>
            {categories.map((cat) => (
              <button
                key={cat._id}
                onClick={() => setSelectedCategory(cat.slug.current)}
                className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-200 ${
                  selectedCategory === cat.slug.current
                    ? "text-white shadow-md"
                    : "bg-white/70 text-sage-700 hover:bg-white border border-cream-300"
                }`}
                style={
                  selectedCategory === cat.slug.current
                    ? {
                        background: `linear-gradient(135deg, ${getCategoryColor(cat._id)}, ${getCategoryColor(cat._id)}dd)`,
                      }
                    : {}
                }
              >
                {cat.title}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Posts grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-coral-200 border-t-coral-500 rounded-full animate-spin" />
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="grid lg:grid-cols-2 gap-8">
            {filteredPosts.map((post, i) => (
              <motion.a
                key={post._id}
                href={`/blog/${post.slug.current}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="group relative rounded-3xl overflow-hidden"
                style={{
                  border: "1.5px solid rgba(212,117,106,0.12)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                }}
              >
                <div className="bg-white/70 backdrop-blur-sm">
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden bg-gradient-to-br from-coral-100 to-sage-100">
                    {post.mainImage?.asset?.url ? (
                      <img
                        src={post.mainImage.asset.url}
                        alt={post.mainImage.alt || post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-sage-300">
                        No image
                      </div>
                    )}
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(138,158,132,0.3) 0%, transparent 60%)",
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 lg:p-7">
                    {/* Categories */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.categories?.slice(0, 2).map((cat) => (
                        <span
                          key={cat._id}
                          className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                          style={{ background: getCategoryColor(cat._id) }}
                        >
                          {cat.title}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h3
                      className="text-xl font-bold mb-3 leading-tight line-clamp-2"
                      style={{ fontFamily: "Georgia, serif", color: "#4A3530" }}
                    >
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sage-600 text-sm leading-relaxed mb-5 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-sage-500 mb-6">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(
                          post.publishedAt || post._createdAt,
                        ).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                      {post.author && (
                        <div className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5" />
                          {post.author.name}
                        </div>
                      )}
                    </div>

                    {/* Read more link */}
                    <div
                      className="inline-flex items-center gap-2 text-sm font-semibold transition-gap duration-200"
                      style={{ color: "#D4756A" }}
                    >
                      Read Article
                      <motion.span
                        className="inline-block"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </motion.span>
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <p className="text-sage-600 text-lg">
              {searchTerm
                ? "No articles found matching your search."
                : "No articles available yet."}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
