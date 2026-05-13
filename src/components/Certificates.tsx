import { motion } from "framer-motion";
import { Award, ExternalLink, BadgeCheck } from "lucide-react";

// استبدلي هذه البيانات بشهاداتك الحقيقية
const certificates = [
  {
    title: "مدربة شخصية معتمدة",
    institution: "الأكاديمية الوطنية للطب الرياضي (NASM)",
    year: "2017",
    description:
      "شهادة شاملة في التدريب الشخصي، وعلوم التمرين، وتصميم البرامج الرياضية.",
    color: "from-coral-100 to-peach-100",
    badgeColor: "#D4756A",
    image:
      "https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "أخصائية علاج طبيعي مرخّصة",
    institution: "الكلية الجامعية للعلوم الصحية",
    year: "2016",
    description:
      "درجة سريرية في العلاج الطبيعي مع تخصص في التأهيل العضلي الهيكلي.",
    color: "from-sage-100 to-sage-50",
    badgeColor: "#8A9E84",
    image:
      "https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "متخصصة في الرضاعة الطبيعية",
    institution: "المجلس الدولي لمستشاري الرضاعة الطبيعية",
    year: "2019",
    description:
      "شهادة متقدمة في دعم الرضاعة الطبيعية، وإدارة الرضاعة، وتغذية الرضّع.",
    color: "from-cream-100 to-peach-50",
    badgeColor: "#C4605A",
    image:
      "https://images.pexels.com/photos/3985163/pexels-photo-3985163.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "متخصصة في لياقة ما بعد الولادة",
    institution: "معهد Every Mother",
    year: "2020",
    description:
      "تدريب متخصص في التعافي بعد الولادة، وتأهيل انفصال عضلات البطن، وصحة قاع الحوض.",
    color: "from-peach-100 to-coral-50",
    badgeColor: "#D4756A",
    image:
      "https://images.pexels.com/photos/6740521/pexels-photo-6740521.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "صحة ورفاهية المرأة",
    institution: "المجلس الأمريكي للتمرين (ACE)",
    year: "2021",
    description:
      "شهادة متقدمة في إرشاد صحة المرأة، والتوازن الهرموني، واللياقة عبر مراحل الحياة.",
    color: "from-sage-100 to-cream-50",
    badgeColor: "#748D6E",
    image:
      "https://images.pexels.com/photos/3823488/pexels-photo-3823488.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

export default function Certificates() {
  return (
    <section
      id="certificates"
      dir="rtl"
      className="py-24 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #F4F6F3 0%, #FAF0EC 100%)",
      }}
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] rounded-full blur-3xl opacity-15"
        style={{ background: "linear-gradient(135deg, #D4756A, #8A9E84)" }}
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
            المؤهلات
          </div>

          <h2
            className="text-4xl lg:text-5xl font-bold mb-5"
            style={{ fontFamily: "Georgia, serif", color: "#4A3530" }}
          >
            الشهادات
            <span style={{ color: "#D4756A" }}> والاعتمادات</span>
          </h2>

          <p className="text-sage-600 text-lg max-w-2xl mx-auto leading-relaxed">
            مدعومة بتدريب متخصص ومؤهلات معترف بها دوليًا، أقدّم معرفة وخبرة
            احترافية في كل جلسة.
          </p>
        </motion.div>

        {/* Certificate grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className={`group relative bg-gradient-to-br ${cert.color} rounded-3xl overflow-hidden text-right`}
              style={{
                border: "1.5px solid rgba(255,255,255,0.7)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
              }}
            >
              {/* Certificate image */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to bottom, transparent 40%, ${cert.badgeColor}33 100%)`,
                  }}
                />

                {/* Year badge */}
                <div
                  className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold text-white"
                  style={{ background: cert.badgeColor }}
                >
                  {cert.year}
                </div>
              </div>

              <div className="p-6">
                {/* Award icon + verified */}
                <div className="flex items-center gap-2 mb-3 justify-start">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: `${cert.badgeColor}20` }}
                  >
                    <Award
                      className="w-4.5 h-4.5"
                      style={{ color: cert.badgeColor }}
                    />
                  </div>

                  <BadgeCheck
                    className="w-4.5 h-4.5"
                    style={{ color: cert.badgeColor }}
                  />

                  <span
                    className="text-xs font-medium"
                    style={{ color: cert.badgeColor }}
                  >
                    موثّقة
                  </span>
                </div>

                <h3
                  className="text-lg font-bold mb-1 leading-tight"
                  style={{ color: "#4A3530", fontFamily: "Georgia, serif" }}
                >
                  {cert.title}
                </h3>

                <p className="text-xs font-semibold text-sage-600 mb-2">
                  {cert.institution}
                </p>

                <p className="text-xs text-sage-600/80 leading-relaxed mb-4">
                  {cert.description}
                </p>

                {/* View certificate button */}
                <button
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full transition-all duration-200 hover:scale-105 flex-row-reverse"
                  style={{
                    background: `${cert.badgeColor}15`,
                    color: cert.badgeColor,
                    border: `1px solid ${cert.badgeColor}30`,
                  }}
                >
                  <ExternalLink className="w-3 h-3" />
                  عرض الشهادة
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
