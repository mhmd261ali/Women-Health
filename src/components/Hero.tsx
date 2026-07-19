import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FloatingBlob = ({
  className,
  delay = 0,
  duration = 6,
}: {
  className: string;
  delay?: number;
  duration?: number;
}) => (
  <motion.div
    className={`absolute rounded-full blur-3xl opacity-40 ${className}`}
    animate={{ y: [0, -24, 0], scale: [1, 1.08, 1] }}
    transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
  />
);

const FloatingOrb = ({
  className,
  delay = 0,
}: {
  className: string;
  delay?: number;
}) => (
  <motion.div
    className={`absolute rounded-full ${className}`}
    animate={{ y: [0, -16, 0], rotate: [0, 8, 0] }}
    transition={{ duration: 5, delay, repeat: Infinity, ease: "easeInOut" }}
  />
);

export default function Hero() {
  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      dir="rtl"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #FDFAF8 0%, #FAD9D5 35%, #E4E9E2 75%, #FAF0EC 100%)",
      }}
    >
      {/* Background blobs */}
      <FloatingBlob
        className="w-96 h-96 bg-coral-200 top-[-8rem] right-[-6rem]"
        delay={0}
        duration={8}
      />
      <FloatingBlob
        className="w-80 h-80 bg-sage-200 bottom-[-4rem] left-[-4rem]"
        delay={2}
        duration={9}
      />
      <FloatingBlob
        className="w-64 h-64 bg-peach-200 bottom-16 right-1/4"
        delay={1}
        duration={7}
      />

      {/* Decorative orbs */}
      <FloatingOrb
        className="w-12 h-12 bg-coral-300/60 top-32 right-[15%] shadow-lg"
        delay={0}
      />
      <FloatingOrb
        className="w-8 h-8 bg-sage-300/70 top-48 left-[18%] shadow-md"
        delay={1.5}
      />
      <FloatingOrb
        className="w-16 h-16 bg-peach-300/50 bottom-40 left-[25%] shadow-xl"
        delay={0.8}
      />
      <FloatingOrb
        className="w-6 h-6 bg-coral-400/60 bottom-56 right-[30%]"
        delay={2.2}
      />

      {/* Ring shapes */}
      <motion.div
        className="absolute top-24 left-[12%] w-32 h-32 rounded-full border-4 border-sage-300/40"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-32 right-[10%] w-24 h-24 rounded-full border-2 border-coral-300/40"
        animate={{ rotate: -360 }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-20 grid lg:grid-cols-2 gap-12 items-center">
        {/* Text content */}
        <div className="text-right lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-coral-200 text-coral-600 text-sm font-medium mb-6 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-coral-400 animate-pulse" />
            {/* Replace with your tagline badge */}
            أخصائية معتمدة في الصحة والرفاهية
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl lg:text-6xl font-bold leading-tight mb-4"
            style={{ fontFamily: "Georgia, serif", color: "#4A3530" }}
          >
            {/* Replace with your name */}
           مريم ترمس
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #D4756A 0%, #8A9E84 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              className="text-5xl lg:text-7xl mt-8"
            >
              صحة المرأة والطفل
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-sage-600 font-medium text-lg mb-3 tracking-wide"
          >
            &nbsp; أخصائية علاج فيزيائي &nbsp;|&nbsp; أخصائية رضاعة طبيعية
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="text-sage-700/80 text-lg leading-relaxed mb-10 max-w-lg mr-0"
          >
            أؤمن بأن كل رحلة نحو صحة أفضل تبدأ بخطوة، وأن المعرفة الصحيحة، والحركة الهادفة، والدعم المبني على الأدلة العلمية هي أساس بناء حياة أكثر صحة وقوة للمرأة والطفل
            </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="flex flex-wrap gap-4 justify-start lg:justify-end"
          >
            <button
              onClick={() => scrollTo("#contact")}
              className="px-8 py-4 rounded-full text-white font-semibold text-base shadow-lg hover:shadow-[0_8px_30px_rgba(212,117,106,0.45)] hover:scale-105 transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #E8776F 0%, #D4756A 100%)",
              }}
            >
              احجزي استشارة
            </button>

            <button
              onClick={() => scrollTo("#services")}
              className="px-8 py-4 rounded-full font-semibold text-base border-2 border-sage-400 text-sage-700 bg-white/60 backdrop-blur-sm hover:bg-sage-50 hover:border-sage-500 hover:scale-105 transition-all duration-300"
            >
              عرض الخدمات
            </button>
          </motion.div>

          {/* Quick stats */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex gap-8 mt-12 justify-start lg:justify-end"
          >
            {[
              { value: "8+", label: "سنوات خبرة" },
              { value: "500+", label: "عميلة سعيدة" },
              { value: "5", label: "شهادات" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div
                  className="text-2xl font-bold"
                  style={{ color: "#D4756A", fontFamily: "Georgia, serif" }}
                >
                  {stat.value}
                </div>

                <div className="text-xs text-sage-600 font-medium mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div> */}
        </div>

        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: -40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
          className="relative flex justify-center lg:order-2"
        >
          {/* Glow ring */}
          <div
            className="absolute inset-0 rounded-[2.5rem] blur-2xl opacity-30"
            style={{ background: "linear-gradient(135deg, #F2A08E, #9DAE97)" }}
          />

          {/* Image card */}
          <div
            className="relative w-full max-w-sm lg:max-w-md aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl"
            style={{ border: "3px solid rgba(255,255,255,0.6)" }}
          >
            {/* Replace src with your professional photo */}
            <img
              src="https://images.pexels.com/photos/6740057/pexels-photo-6740057.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="د. مريم — مدربة شخصية وأخصائية علاج طبيعي"
              className="w-full h-full object-cover"
            />

            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(212,117,106,0.25) 0%, transparent 50%)",
              }}
            />
          </div>

          {/* Floating badge */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-8 -right-6 bg-white/80 backdrop-blur-md rounded-2xl px-4 py-3 shadow-lg border border-coral-100 text-right"
          >
            <div className="text-xs text-sage-600 font-medium">متخصصة في</div>
            <div className="text-sm font-bold text-coral-600">صحة المرأة</div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 5,
              delay: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-16 -left-6 bg-white/80 backdrop-blur-md rounded-2xl px-4 py-3 shadow-lg border border-sage-100 text-right"
          >
            <div className="text-xs text-sage-600 font-medium">
              ما بعد الولادة
            </div>
            <div className="text-sm font-bold text-sage-700">
              خبيرة في التعافي
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollTo("#about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-sage-500 hover:text-coral-500 transition-colors"
      >
        <span className="text-xs font-medium tracking-widest uppercase">
          المزيد
        </span>

        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.button>
    </section>
  );
}
