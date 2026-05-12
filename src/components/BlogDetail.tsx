import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PortableText } from '@portabletext/react';
import { getPostBySlug, getRelatedPosts, BlogPost } from '../lib/sanity';
import { Calendar, User, Tag, ArrowLeft, Share2 } from 'lucide-react';

const portableTextComponents = {
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-3xl font-bold my-6" style={{ fontFamily: 'Georgia, serif', color: '#4A3530' }}>
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-bold my-5" style={{ fontFamily: 'Georgia, serif', color: '#4A3530' }}>
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-bold my-4" style={{ fontFamily: 'Georgia, serif', color: '#4A3530' }}>
        {children}
      </h3>
    ),
    normal: ({ children }: any) => <p className="text-sage-700 leading-7 my-4">{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote
        className="border-l-4 pl-6 py-4 my-6 italic text-sage-600"
        style={{ borderLeftColor: '#D4756A' }}
      >
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc list-inside space-y-2 my-4">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal list-inside space-y-2 my-4">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => <li className="text-sage-700">{children}</li>,
    number: ({ children }: any) => <li className="text-sage-700">{children}</li>,
  },
};

interface BlogDetailProps {
  slug: string;
}

export default function BlogDetail({ slug }: BlogDetailProps) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const postData = await getPostBySlug(slug);
        setPost(postData);

        if (postData?.categories?.[0]?._id) {
          const related = await getRelatedPosts(postData._id, postData.categories[0]._id);
          setRelatedPosts(related);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(180deg, #FAF0EC 0%, #F4F6F3 100%)' }}>
        <div className="w-8 h-8 border-4 border-coral-200 border-t-coral-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(180deg, #FAF0EC 0%, #F4F6F3 100%)' }}>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-sage-700 mb-4">Article Not Found</h1>
          <a href="/blog" className="text-coral-500 hover:text-coral-600 font-semibold">
            Back to Blog
          </a>
        </div>
      </div>
    );
  }

  return (
    <article style={{ background: 'linear-gradient(180deg, #FAF0EC 0%, #F4F6F3 100%)' }}>
      {/* Header with back button */}
      <div className="pt-32 pb-8 max-w-3xl mx-auto px-6 lg:px-8">
        <motion.a
          href="/blog"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="inline-flex items-center gap-2 text-coral-600 hover:text-coral-700 font-semibold text-sm mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </motion.a>

        {/* Categories */}
        {post.categories && post.categories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-2 mb-6"
          >
            {post.categories.map((cat) => (
              <span
                key={cat._id}
                className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                style={{ background: '#D4756A' }}
              >
                {cat.title}
              </span>
            ))}
          </motion.div>
        )}

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-4xl lg:text-5xl font-bold leading-tight mb-6"
          style={{ fontFamily: 'Georgia, serif', color: '#4A3530' }}
        >
          {post.title}
        </motion.h1>

        {/* Meta info */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center gap-6 text-sage-600 text-sm"
        >
          {post.author && (
            <div className="flex items-center gap-2">
              {post.author.image?.asset?.url && (
                <img
                  src={post.author.image.asset.url}
                  alt={post.author.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
              )}
              <span>{post.author.name}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {new Date(post.publishedAt || post._createdAt).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </div>
          <button className="flex items-center gap-2 hover:text-coral-600 transition-colors">
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </motion.div>
      </div>

      {/* Featured image */}
      {post.mainImage?.asset?.url && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="max-w-4xl mx-auto px-6 lg:px-8 mb-12"
        >
          <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[16/9]">
            <img
              src={post.mainImage.asset.url}
              alt={post.mainImage.alt || post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      )}

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="max-w-3xl mx-auto px-6 lg:px-8 py-12"
      >
        {post.excerpt && (
          <div
            className="text-xl leading-relaxed mb-8 p-6 rounded-2xl italic"
            style={{ background: 'rgba(212,117,106,0.08)', color: '#8A6660' }}
          >
            {post.excerpt}
          </div>
        )}

        {post.body && (
          <div className="prose prose-sm max-w-none">
            <PortableText value={post.body} components={portableTextComponents} />
          </div>
        )}
      </motion.div>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto px-6 lg:px-8 py-16 border-t border-cream-300"
        >
          <h2
            className="text-3xl font-bold mb-8"
            style={{ fontFamily: 'Georgia, serif', color: '#4A3530' }}
          >
            Related Articles
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosts.map((relPost) => (
              <a
                key={relPost._id}
                href={`/blog/${relPost.slug.current}`}
                className="group rounded-2xl overflow-hidden bg-white/70 backdrop-blur-sm border border-cream-200 hover:border-coral-300 transition-all duration-300 hover:shadow-lg"
              >
                {relPost.mainImage?.asset?.url && (
                  <div className="h-40 overflow-hidden bg-sage-100">
                    <img
                      src={relPost.mainImage.asset.url}
                      alt={relPost.mainImage.alt || relPost.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-5">
                  <h3
                    className="font-bold text-base mb-2 line-clamp-2"
                    style={{ fontFamily: 'Georgia, serif', color: '#4A3530' }}
                  >
                    {relPost.title}
                  </h3>
                  <p className="text-xs text-sage-500">
                    {new Date(relPost.publishedAt || relPost._createdAt).toLocaleDateString(
                      'en-US',
                      { month: 'short', day: 'numeric', year: 'numeric' }
                    )}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </motion.section>
      )}

      {/* CTA section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto px-6 lg:px-8 py-16"
      >
        <div
          className="rounded-3xl p-10 text-center"
          style={{ background: 'linear-gradient(135deg, #D4756A 0%, #8A9E84 100%)' }}
        >
          <h3
            className="text-2xl font-bold text-white mb-4"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Ready to Transform Your Wellness?
          </h3>
          <p className="text-white/80 mb-6">
            Connect with me to discuss how these insights apply to your unique journey.
          </p>
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 rounded-full bg-white font-semibold text-base hover:shadow-lg hover:scale-105 transition-all duration-300"
            style={{ color: '#D4756A' }}
          >
            Book a Consultation
          </button>
        </div>
      </motion.section>
    </article>
  );
}
