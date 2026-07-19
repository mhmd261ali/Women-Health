import { motion } from "framer-motion";
import { Microscope, HeartHandshake, Baby } from "lucide-react";

const reasons = [
  {
    icon: Microscope,
    title: "نهج مبني على الأدلة العلمية وخبرة طبية ورياضية مزدوجة",
    description:
      "تستند جميع التوصيات إلى أحدث الأبحاث السريرية في علوم الرياضة، والعلاج الطبيعي، وصحة المرأة، مع الجمع بين شهادات العلاج الطبيعي واللياقة البدنية ليمنحكِ أفضل ما في التأهيل الطبي والتدريب الرياضي.",
    gradient: "linear-gradient(135deg, #E4E9E2 0%, #C8D3C5 100%)",
    iconColor: "#8A9E84",
  },
  {
    icon: HeartHandshake,
    title: "إرشاد داعم ومتعاطف ورعاية شخصية",
    description:
      "بيئة دافئة وخالية من الأحكام، تشعرين فيها بأنكِ مسموعة ومحترمة ومدعومة بصدق في كل خطوة، حيث يُصمَّم كل برنامج خصيصًا حسب جسمكِ وأهدافكِ ومرحلتكِ الحياتية، بعيدًا عن الحلول العامة الجاهزة.",
    gradient: "linear-gradient(135deg, #FAD9D5 0%, #F2D4C8 100%)",
    iconColor: "#C4605A",
  },
  {
    icon: Baby,
    title: "تدريب آمن للأمهات",
    description:
      "معرفة متخصصة بفسيولوجيا الحمل وما بعد الولادة لضمان جلسات آمنة، تدريجية، وفعّالة.",
    gradient: "linear-gradient(135deg, #FDE8E2 0%, #FAD1C6 100%)",
    iconColor: "#D4756A",
  },
];

export default function WhyMe() {
  return (
    <section
      id="why-me"
      dir="rtl"
      className="py-24 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #FFF5F2 0%, #F4F6F3 100%)",
      }}
    >
      {/* Background decoration */}
      <motion.div
        className="absolute top-20 left-[-80px] w-64 h-64 rounded-full blur-3xl opacity-25"
        style={{ background: "radial-gradient(circle, #D4756A, transparent)" }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-20 right-[-60px] w-56 h-56 rounded-full blur-3xl opacity-20"
        style={{ background: "radial-gradient(circle, #8A9E84, transparent)" }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
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
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium text-sage-600 mb-6"
            style={{
              background: "rgba(138,158,132,0.1)",
              border: "1px solid rgba(138,158,132,0.25)",
            }}
          >
            لماذا تختارينني؟
          </div>

          <h2
            className="text-4xl lg:text-5xl font-bold mb-5"
            style={{ fontFamily: "Georgia, serif", color: "#4A3530" }}
          >
            صحتكِ ورفاهيتكِ تستحقان
            <span style={{ color: "#8A9E84" }}> الأفضل</span>
          </h2>

          <p className="text-sage-600 text-lg max-w-2xl mx-auto leading-relaxed">
            إليكِ ما يجعل العمل معي تجربة داعمة ومؤثرة لكل امرأة في مختلف مراحل
            حياتها.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map(
            ({ icon: Icon, title, description, gradient, iconColor }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -5 }}
                className="group relative rounded-3xl p-7 overflow-hidden text-right"
                style={{
                  background: gradient,
                  border: `1.5px solid rgba(255,255,255,0.7)`,
                  boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                }}
              >
                {/* Glass overlay on hover */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/20 transition-all duration-300 rounded-3xl" />

                <div
                  className="relative w-14 h-14 rounded-2xl flex items-center justify-center mb-5 shadow-sm"
                  style={{ background: "rgba(255,255,255,0.7)" }}
                >
                  <Icon className="w-7 h-7" style={{ color: iconColor }} />
                </div>

                <h3
                  className="relative text-xl font-bold mb-3"
                  style={{ color: "#4A3530", fontFamily: "Georgia, serif" }}
                >
                  {title}
                </h3>

                <p className="relative text-sage-700/75 text-sm leading-relaxed">
                  {description}
                </p>
              </motion.div>
            ),
          )}
        </div>

        {/* Centered call-to-action strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 rounded-3xl p-10 text-center relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #D4756A 0%, #8A9E84 100%)",
          }}
        >
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          <h3
            className="relative text-3xl font-bold text-white mb-4"
            style={{ fontFamily: "Georgia, serif" }}
          >
            هل أنتِ مستعدة لبدء رحلة التحوّل؟
          </h3>

          <p className="relative text-white/80 text-lg mb-8 max-w-xl mx-auto">
            لنعمل معًا على بناء نسخة أكثر صحة وقوة وثقة منكِ.
          </p>

          <button
            onClick={() =>
              document
                .querySelector("#contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-10 py-4 rounded-full bg-white font-semibold text-base hover:shadow-lg hover:scale-105 transition-all duration-300"
            style={{ color: "#D4756A" }}
          >
            ابدئي رحلتكِ اليوم
          </button>
        </motion.div>
      </div>
    </section>
  );
}
