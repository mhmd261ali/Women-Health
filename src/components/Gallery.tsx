import { motion } from "framer-motion";
import { useState } from "react";
import { X, ZoomIn } from "lucide-react";

// استبدلي هذه الصور بصور المعرض الخاصة بكِ
const galleryItems = [
  {
    src: "https://images.pexels.com/photos/4498606/pexels-photo-4498606.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "جلسة تدريب شخصي",
    label: "التدريب الشخصي",
    span: "row-span-2",
  },
  {
    src: "https://images.pexels.com/photos/6740057/pexels-photo-6740057.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "جلسة علاج طبيعي",
    label: "العلاج الطبيعي",
    span: "",
  },
  {
    src: "https://images.pexels.com/photos/3985163/pexels-photo-3985163.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "دعم الأم والطفل",
    label: "الأم والطفل",
    span: "",
  },
  {
    src: "https://images.pexels.com/photos/6740521/pexels-photo-6740521.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "ورشة عن الصحة والرفاهية",
    label: "ورشة صحية",
    span: "row-span-2",
  },
  {
    src: "https://images.pexels.com/photos/3757376/pexels-photo-3757376.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "نمط حياة صحي ولياقة بدنية",
    label: "رحلة اللياقة",
    span: "",
  },
  {
    src: "https://images.pexels.com/photos/3823488/pexels-photo-3823488.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "جلسة إعادة تأهيل",
    label: "إعادة التأهيل",
    span: "",
  },
  {
    src: "https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "استشارة صحية",
    label: "الاستشارات",
    span: "",
  },
  {
    src: "https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "جلسة تعافٍ بعد الولادة",
    label: "رعاية ما بعد الولادة",
    span: "",
  },
];

export default function Gallery() {
  const [selected, setSelected] = useState<(typeof galleryItems)[0] | null>(
    null,
  );

  return (
    <section
      id="gallery"
      dir="rtl"
      className="py-24 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #FAF0EC 0%, #F4F6F3 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium text-sage-600 mb-6"
            style={{
              background: "rgba(138,158,132,0.1)",
              border: "1px solid rgba(138,158,132,0.25)",
            }}
          >
            رحلة بصرية
          </div>

          <h2
            className="text-4xl lg:text-5xl font-bold mb-5"
            style={{ fontFamily: "Georgia, serif", color: "#4A3530" }}
          >
            لحظات من
            <span style={{ color: "#8A9E84" }}> التحوّل</span>
          </h2>

          <p className="text-sage-600 text-lg max-w-2xl mx-auto leading-relaxed">
            لمحة من الجلسات والرحلات والإنجازات التي تشاركتها مع نساء رائعات.
          </p>
        </motion.div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[180px] gap-4">
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.src}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className={`group relative overflow-hidden rounded-3xl cursor-pointer ${item.span}`}
              onClick={() => setSelected(item)}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-right">
                <span className="text-white font-semibold text-sm">
                  {item.label}
                </span>
              </div>

              {/* Zoom icon */}
              <div className="absolute top-3 left-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ZoomIn className="w-4 h-4 text-coral-600" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          dir="rtl"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setSelected(null)}
        >
          <button
            type="button"
            aria-label="إغلاق الصورة"
            className="absolute top-6 left-6 w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-colors"
            onClick={() => setSelected(null)}
          >
            <X className="w-5 h-5" />
          </button>

          <motion.div
            initial={{ scale: 0.85 }}
            animate={{ scale: 1 }}
            className="max-w-3xl w-full rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selected.src}
              alt={selected.alt}
              className="w-full max-h-[80vh] object-cover"
            />

            <div
              className="px-6 py-4 text-right"
              style={{ background: "rgba(255,255,255,0.95)" }}
            >
              <span
                className="text-base font-bold"
                style={{ color: "#D4756A", fontFamily: "Georgia, serif" }}
              >
                {selected.label}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
