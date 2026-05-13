import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

// استبدلي هذه البيانات بآراء عميلاتكِ الحقيقية
const testimonials = [
  {
    name: "أميرة حسن",
    role: "عميلة تعافٍ بعد الولادة",
    text: "ساعدتني إرشاداتها على التعافي بأمان بعد الحمل. انتقلت من صعوبة صعود الدرج إلى القدرة على الجري لمسافة 5 كيلومترات. إنها تفهم جسد المرأة بعمق.",
    stars: 5,
    avatar:
      "https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    name: "سارة المنصوري",
    role: "عميلة تدريب شخصي",
    text: "أفضل مزيج اختبرته بين اللياقة والعلاج الطبيعي والدعم النفسي. ساعدتني ليس فقط جسديًا، بل منحتني أيضًا ثقة أكبر بجسدي.",
    stars: 5,
    avatar:
      "https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    name: "ليلى كريمي",
    role: "استشارة رضاعة طبيعية",
    text: "مهنية، لطيفة، وملهمة بحق. استشارتها في الرضاعة الطبيعية أنقذت رحلتي مع الرضاعة. كانت صبورة، خبيرة، ومتاحة دائمًا عندما احتجت إلى المساعدة.",
    stars: 5,
    avatar:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    name: "نور خليل",
    role: "عميلة إعادة تأهيل",
    text: "بعد إصابة ظهري، كنت أخشى ألا أتمكن من التدريب مرة أخرى. صممت لي برنامجًا ساعدني على التعافي وجعلني أقوى من قبل. ممتنة لها دائمًا.",
    stars: 5,
    avatar:
      "https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    name: "مايا بن علي",
    role: "إرشاد صحة المرأة",
    text: "نهج شامل فعلًا لصحة المرأة. ساعدتني على فهم دورتي الهرمونية، وتحسين عاداتي الغذائية، وبناء روتين لياقة مستدام أحبه.",
    stars: 5,
    avatar:
      "https://images.pexels.com/photos/2773977/pexels-photo-2773977.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    name: "دينا فوزي",
    role: "ما بعد الولادة والرضاعة",
    text: "وجود شخص واحد يفهم التعافي بعد الولادة والرضاعة الطبيعية معًا أمر لا يقدّر بثمن. جعلت انتقالي إلى الأمومة أكثر سلاسة وصحة.",
    stars: 5,
    avatar:
      "https://images.pexels.com/photos/4100420/pexels-photo-4100420.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 justify-end">
      {Array.from({ length: count }).map((_, i) => (
        <Star
          key={i}
          className="w-4 h-4 fill-current"
          style={{ color: "#D4756A" }}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      dir="rtl"
      className="py-24 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #F4F6F3 0%, #FFF5F2 100%)",
      }}
    >
      {/* Decorative blobs */}
      <div
        className="absolute -top-10 right-1/3 w-80 h-80 rounded-full blur-3xl opacity-15"
        style={{ background: "radial-gradient(circle, #D4756A, transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium text-coral-600 mb-6"
            style={{
              background: "rgba(212,117,106,0.1)",
              border: "1px solid rgba(212,117,106,0.25)",
            }}
          >
            قصص العميلات
          </div>

          <h2
            className="text-4xl lg:text-5xl font-bold mb-5"
            style={{ fontFamily: "Georgia, serif", color: "#4A3530" }}
          >
            أصوات من
            <span style={{ color: "#D4756A" }}> رحلة التحوّل</span>
          </h2>

          <p className="text-sage-600 text-lg max-w-2xl mx-auto leading-relaxed">
            قصص حقيقية من نساء اختبرن أثر الرعاية الشخصية والمتعاطفة المصممة حسب
            احتياجاتهن.
          </p>
        </motion.div>

        {/* Testimonial cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map(({ name, role, text, stars, avatar }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -5 }}
              className="relative bg-white/70 backdrop-blur-sm rounded-3xl p-7 group text-right"
              style={{
                border: "1.5px solid rgba(212,117,106,0.12)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
              }}
            >
              {/* Quote icon */}
              <div className="absolute top-6 left-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="w-12 h-12" style={{ color: "#D4756A" }} />
              </div>

              {/* Stars */}
              <StarRating count={stars} />

              {/* Text */}
              <p className="text-sage-700/80 text-sm leading-relaxed mt-4 mb-6 italic">
                “{text}”
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 justify-start">
                <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-coral-200 flex-shrink-0">
                  <img
                    src={avatar}
                    alt={name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <div
                    className="font-bold text-sm"
                    style={{ color: "#4A3530" }}
                  >
                    {name}
                  </div>
                  <div className="text-xs text-sage-500">{role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
