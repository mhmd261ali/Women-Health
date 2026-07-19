import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ServiceDetail = {
  intro: string;
  items: string[];
};

type Service = {
  emoji: string;
  title: string;
  description: string;
  more?: ServiceDetail;
  color: string;
  accent: string;
  border: string;
};

const services: Service[] = [
  {
    emoji: "🧘‍♀️",
    title: "العلاج الفيزيائي وإعادة التأهيل للنساء",
    description:
      "أساعد النساء في مختلف مراحل حياتهن على تخفيف الألم، تحسين الحركة، واستعادة القوة والوظيفة الجسدية من خلال برامج علاجية وتمارين مخصصة.",
    more: {
      intro:
        "يهدف العلاج الفيزيائي إلى تحسين قدرة الجسم على الحركة، تخفيف الألم، واستعادة الوظيفة الجسدية من خلال تقييم شامل وبرامج علاجية مخصصة حسب احتياجات كل شخص.",
      items: [
        "تقييم وعلاج مختلف الآلام العضلية الهيكلية والمفصلية، مثل آلام الرقبة، الظهر، الكتف، والحوض وغيرها.",
        "إعادة التأهيل بعد العمليات الجراحية أو الإصابات التي تؤثر على الحركة والقدرة الوظيفية.",
        "تحسين القوة والمرونة، ودعم صحة العضلات والمفاصل.",
        "الوقاية من الإصابات والأوجاع وتحسين جودة الحياة من خلال الحركة والتمارين العلاجية المبنية على الأدلة العلمية.",
      ],
    },
    color: "from-sage-100 to-sage-50",
    accent: "#8A9E84",
    border: "rgba(138,158,132,0.2)",
  },
  {
    emoji: "👶",
    title: "العلاج الفيزيائي وإعادة التأهيل للأطفال",
    description:
      "أدعم نمو الطفل الحركي من خلال تقييم وتطوير المهارات الحركية، تحسين التوازن والتناسق، ومساندة الأطفال الذين يحتاجون إلى تأهيل متخصص.",
    more: {
      intro:
        "يهدف العلاج الفيزيائي للأطفال إلى دعم نمو الطفل الحركي ومساعدته على اكتساب المهارات المناسبة لعمره، وتحسين قدرته على الحركة والمشاركة في أنشطته اليومية من خلال تقييم شامل وبرامج علاجية مخصصة.",
      items: [
        "تقييم التطور الحركي للطفل ومتابعة اكتساب المهارات مثل التحكم بالرأس، التقلب، الجلوس، الحبو، الوقوف والمشي.",
        "دعم الأطفال الذين يواجهون تأخرًا في التطور الحركي أو صعوبات في التوازن والتناسق الحركي.",
        "تحسين القوة العضلية، التحكم بالجسم، والقدرات الحركية من خلال تمارين وأنشطة علاجية مناسبة لعمر الطفل.",
        "إعادة التأهيل للأطفال الذين يحتاجون إلى دعم حركي بسبب حالات مثل الشلل الدماغي، متلازمة داون، الصعر الخِلقي (Torticollis)، اضطرابات التوتر العضلي، التأخر في التطور الحركي، أو أي حالة تؤثر على الحركة والاستقلالية.",
        "مساعدة الأهل من خلال التوجيه حول وضعيات الحمل، اللعب، والأنشطة المناسبة لدعم تطور الطفل الحركي في المنزل.",
      ],
    },
    color: "from-cream-100 to-peach-50",
    accent: "#C4605A",
    border: "rgba(196,96,90,0.2)",
  },
  {
    emoji: "🧍‍♀️",
    title: "تصحيح القوام لمختلف الأعمار",
    description:
      "أساعد على تحسين وضعية الجسم وتقليل المشاكل الناتجة عن سوء القوام من خلال التقييم والتمارين التصحيحية المناسبة لكل عمر.",
    color: "from-peach-100 to-coral-50",
    accent: "#D4756A",
    border: "rgba(212,117,106,0.2)",
  },
  {
    emoji: "🤰",
    title: "تدريب الحوامل والتعافي بعد الولادة",
    description:
      "برامج حركية آمنة ومخصصة تساعد المرأة خلال الحمل على الحفاظ على قوتها، تخفيف الآلام، والاستعداد الجسدي للولادة، ثم أرافقها في رحلة استعادة قوتها بعد الولادة من خلال تمارين تدريجية لتحسين الحركة، دعم قاع الحوض، والعودة للنشاط بأمان.",
    color: "from-coral-100 to-peach-100",
    accent: "#D4756A",
    border: "rgba(212,117,106,0.2)",
  },
  {
    emoji: "💪",
    title: "التدريب الشخصي",
    description:
      "تدريب فردي يهدف إلى بناء القوة، تحسين اللياقة والحركة، والوصول إلى أهدافك الصحية بطريقة آمنة ومدروسة.",
    color: "from-sage-100 to-cream-100",
    accent: "#8A9E84",
    border: "rgba(138,158,132,0.2)",
  },
  {
    emoji: "🤱",
    title: "التحضير للرضاعة الطبيعية",
    description:
      "أساعد الأمهات على بدء رحلة الرضاعة بثقة من خلال التعرف على أساسيات الرضاعة، الوضعيات الصحيحة، وكيفية التعامل مع التحديات المبكرة.",
    color: "from-cream-100 to-sage-50",
    accent: "#748D6E",
    border: "rgba(116,141,110,0.2)",
  },
];

function MoreButton({
  accent,
  expanded,
  onToggle,
}: {
  accent: string;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-200 flex-row-reverse mt-auto"
      style={{ color: accent }}
    >
      {expanded ? "إخفاء التفاصيل" : "اعرفي المزيد"}
      <motion.span
        className="inline-block"
        animate={{ x: expanded ? [0, 0, 0] : [0, -4, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {expanded ? "↓" : "←"}
      </motion.span>
    </button>
  );
}

export default function Services() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggle = (key: string) =>
    setExpanded((prev) => (prev === key ? null : key));

  return (
    <section
      id="services"
      dir="rtl"
      className="py-24 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #F4F6F3 0%, #FFF5F2 100%)",
      }}
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-10"
        style={{ background: "radial-gradient(circle, #D4756A, #8A9E84)" }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
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
            خدماتي
          </div>

          <h2
            className="text-4xl lg:text-5xl font-bold mb-5"
            style={{ fontFamily: "Georgia, serif", color: "#4A3530" }}
          >
            خدمات مصمّمة
            <span style={{ color: "#D4756A" }}> خصيصًا لكِ</span>
          </h2>

          <p className="text-sage-600 text-lg max-w-2xl mx-auto leading-relaxed">
            تُقدَّم كل خدمة بخبرة مهنية، ورعاية صادقة، ونهج شخصي يراعي رحلتكِ
            واحتياجاتكِ الخاصة.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(
            ({ emoji, title, description, more, color, accent, border }, i) => {
              const isOpen = expanded === title;

              return (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className={`group relative bg-gradient-to-br ${color} rounded-3xl p-7 flex flex-col transition-shadow duration-300 text-right`}
                  style={{
                    border: `1.5px solid ${border}`,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      `0 16px 48px ${border}`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 4px 20px rgba(0,0,0,0.05)";
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 shadow-md transition-transform duration-300 group-hover:scale-110 text-2xl"
                    style={{
                      background: `linear-gradient(135deg, ${accent}22, ${accent}44)`,
                    }}
                  >
                    {emoji}
                  </div>

                  <h3
                    className="text-xl font-bold mb-3"
                    style={{ color: "#4A3530", fontFamily: "Georgia, serif" }}
                  >
                    {title}
                  </h3>

                  <p className="text-sage-700/75 text-sm leading-relaxed mb-5">
                    {description}
                  </p>

                  <AnimatePresence initial={false}>
                    {more && isOpen && (
                      <motion.div
                        key="more"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden mb-5"
                      >
                        <p className="text-sage-700/85 text-sm leading-relaxed mb-3">
                          {more.intro}
                        </p>
                        <p
                          className="text-sm font-semibold mb-2"
                          style={{ color: accent }}
                        >
                          تشمل الخدمة:
                        </p>
                        <ul className="space-y-2 text-sage-700/80 text-sm leading-relaxed list-none">
                          {more.items.map((item) => (
                            <li key={item} className="flex gap-2">
                              <span style={{ color: accent }} aria-hidden>
                                •
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {more && (
                    <MoreButton
                      accent={accent}
                      expanded={isOpen}
                      onToggle={() => toggle(title)}
                    />
                  )}

                  <div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 50% 0%, ${accent}15, transparent 70%)`,
                    }}
                  />
                </motion.div>
              );
            },
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-14"
        >
          <button
            onClick={() =>
              document
                .querySelector("#contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-10 py-4 rounded-full text-white font-semibold text-base shadow-lg hover:shadow-[0_8px_30px_rgba(212,117,106,0.4)] hover:scale-105 transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #E8776F 0%, #D4756A 100%)",
            }}
          >
            احجزي جلستكِ الأولى
          </button>
        </motion.div>
      </div>
    </section>
  );
}
