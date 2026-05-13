import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Award, Heart, Users, BookOpen } from "lucide-react";

function AnimatedCounter({
  target,
  suffix = "",
  duration = 2000,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const step = target / (duration / 16);

    const timer = setInterval(() => {
      start += step;

      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const stats = [
  { icon: BookOpen, value: 8, suffix: "+", label: "سنوات من الخبرة" },
  { icon: Users, value: 500, suffix: "+", label: "عميلة سعيدة" },
  { icon: Award, value: 5, suffix: "", label: "شهادات معتمدة" },
  { icon: Heart, value: 12, suffix: "+", label: "برامج صحية" },
];

export default function About() {
  return (
    <section
      id="about"
      dir="rtl"
      className="py-24 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #FAF0EC 0%, #F4F6F3 100%)",
      }}
    >
      {/* Decorative shape */}
      <div
        className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{ background: "radial-gradient(circle, #E8776F, transparent)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-72 h-72 rounded-full blur-3xl opacity-15"
        style={{ background: "radial-gradient(circle, #8A9E84, transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative lg:order-2"
          >
            <div
              className="absolute -top-6 -right-6 w-full h-full rounded-[2rem] opacity-20"
              style={{
                background: "linear-gradient(135deg, #D4756A, #8A9E84)",
              }}
            />

            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/5]">
              {/* Replace src with your about photo */}
              <img
                src="https://images.pexels.com/photos/3757376/pexels-photo-3757376.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="نبذة عن الدكتورة سارة"
                className="w-full h-full object-cover"
              />

              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(138,158,132,0.3) 0%, transparent 60%)",
                }}
              />
            </div>

            {/* Floating card on image */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-xl border border-coral-100 max-w-[220px]"
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #F2A08E, #D4756A)",
                  }}
                >
                  <Heart className="w-5 h-5 text-white fill-white" />
                </div>

                <div>
                  <div className="text-xs text-sage-500 font-medium">
                    فلسفتي
                  </div>
                  <div className="text-sm font-bold text-coral-700">
                    رعاية شاملة
                  </div>
                </div>
              </div>

              <p className="text-xs text-sage-600 leading-relaxed">
                العقل والجسد والروح — دعم وتعافٍ في كل مرحلة من مراحل حياة
                المرأة.
              </p>
            </motion.div>
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-right lg:order-1"
          >
            <div
              className="inline-block px-4 py-1.5 rounded-full text-sm font-medium text-coral-600 mb-6"
              style={{
                background: "rgba(212,117,106,0.1)",
                border: "1px solid rgba(212,117,106,0.25)",
              }}
            >
              من أنا
            </div>

            <h2
              className="text-4xl lg:text-5xl font-bold mb-6 leading-tight"
              style={{ fontFamily: "Georgia, serif", color: "#4A3530" }}
            >
              شغف حقيقي
              <br />
              <span style={{ color: "#D4756A" }}>بصحة ورفاهية المرأة</span>
            </h2>

            <div className="space-y-4 text-sage-700/80 text-base leading-relaxed mb-8">
              <p>
                {/* Replace with your personal story */}
                أنا مدربة شخصية معتمدة، وأخصائية علاج طبيعي مرخّصة، ومتخصصة في
                دعم الرضاعة الطبيعية، أمتلك شغفًا عميقًا بمرافقة النساء في كل
                مرحلة من رحلتهن الصحية، من تحسين الأداء البدني وبناء القوة إلى
                دعم الأمومة الجديدة بكل ما تحمله من حساسية وتحديات.
              </p>

              <p>
                يرتكز أسلوبي على الجمع بين التأهيل العلاجي المبني على الأدلة
                العلمية والتدريب الشخصي المتعاطف والمصمم حسب احتياجات كل امرأة.
                سواء كنتِ تتعافين من إصابة، أو تمرين بتحديات ما بعد الولادة، أو
                تسعين إلى بناء القوة والثقة، أضع لكِ برنامجًا مناسبًا لطبيعة
                جسمك وهدفك.
              </p>

              <p>
                تشمل خبرتي التدريب الرياضي، التأهيل الحركي، علاج عضلات قاع
                الحوض، التعافي بعد الولادة، ودعم الرضاعة الطبيعية، لتقديم رعاية
                متكاملة لصحة المرأة في مكان واحد.
              </p>
            </div>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-3 mb-10 justify-start lg:justify-end">
              {[
                "التعافي بعد الولادة",
                "علاج قاع الحوض",
                "التأهيل الرياضي",
                "دعم الرضاعة الطبيعية",
                "لياقة المرأة",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 rounded-full text-sm font-medium text-sage-700"
                  style={{
                    background: "rgba(138,158,132,0.12)",
                    border: "1px solid rgba(138,158,132,0.3)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map(({ icon: Icon, value, suffix, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 text-center shadow-sm border border-cream-200"
                >
                  <div
                    className="w-9 h-9 rounded-full mx-auto mb-2 flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, #FAD9D5, #E4E9E2)",
                    }}
                  >
                    <Icon className="w-4 h-4 text-coral-500" />
                  </div>

                  <div
                    className="text-2xl font-bold"
                    style={{ fontFamily: "Georgia, serif", color: "#D4756A" }}
                  >
                    <AnimatedCounter target={value} suffix={suffix} />
                  </div>

                  <div className="text-xs text-sage-600 font-medium mt-0.5 leading-tight">
                    {label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
