import { motion } from "framer-motion";
import { BookOpenCheck, ChevronDown, HeartHandshake } from "lucide-react";
import heroImage from "../images/hero.jpg";

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
        className="hidden w-96 h-96 bg-coral-200 top-[-8rem] right-[-6rem] sm:block"
        delay={0}
        duration={8}
      />
      <FloatingBlob
        className="hidden w-80 h-80 bg-sage-200 bottom-[-4rem] left-[-4rem] sm:block"
        delay={2}
        duration={9}
      />
      <FloatingBlob
        className="hidden w-64 h-64 bg-peach-200 bottom-16 right-1/4 sm:block"
        delay={1}
        duration={7}
      />

      {/* Decorative orbs */}
      <FloatingOrb
        className="hidden w-12 h-12 bg-coral-300/60 top-32 right-[15%] shadow-lg sm:block"
        delay={0}
      />
      <FloatingOrb
        className="hidden w-8 h-8 bg-sage-300/70 top-48 left-[18%] shadow-md sm:block"
        delay={1.5}
      />
      <FloatingOrb
        className="hidden w-16 h-16 bg-peach-300/50 bottom-40 left-[25%] shadow-xl sm:block"
        delay={0.8}
      />
      <FloatingOrb
        className="hidden w-6 h-6 bg-coral-400/60 bottom-56 right-[30%] sm:block"
        delay={2.2}
      />

      {/* Ring shapes */}
      <motion.div
        className="absolute top-24 left-[12%] hidden h-32 w-32 rounded-full border-4 border-sage-300/40 sm:block"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-32 right-[10%] hidden h-24 w-24 rounded-full border-2 border-coral-300/40 sm:block"
        animate={{ rotate: -360 }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-8 px-4 pt-20 sm:gap-12 sm:px-6 lg:grid-cols-2 lg:px-8">
        {/* Text content */}
        <div className="text-right lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-coral-200 text-coral-600 text-sm font-medium mb-6 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-coral-400 animate-pulse" />
            {/* Replace with your tagline badge */}
          أخصائية معتمدة
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight mb-4"
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
              className="mt-4 block text-4xl sm:text-5xl lg:text-7xl"
            >
              صحة المرأة والطفل
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mb-3 text-sm font-medium tracking-wide text-sage-600 sm:text-lg"
          >
            &nbsp; أخصائية علاج فيزيائي &nbsp;|&nbsp; أخصائية رضاعة طبيعية
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 mr-0 max-w-lg text-base leading-relaxed text-sage-700/80 sm:mb-10 sm:text-lg"
          >
            أؤمن بأن كل رحلة نحو صحة أفضل تبدأ بخطوة، وأن المعرفة الصحيحة، والحركة الهادفة، والدعم المبني على الأدلة العلمية هي أساس بناء حياة أكثر صحة وقوة للمرأة والطفل
            </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap gap-3 justify-start sm:gap-4 lg:justify-end"
          >
            <button
              onClick={() => scrollTo("#contact")}
              className="rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_30px_rgba(212,117,106,0.45)] sm:px-8 sm:py-4 sm:text-base"
              style={{
                background: "linear-gradient(135deg, #E8776F 0%, #D4756A 100%)",
              }}
            >
              احجزي استشارة
            </button>

            <button
              onClick={() => scrollTo("#services")}
              className="rounded-full border-2 border-sage-400 bg-white/60 px-6 py-3 text-sm font-semibold text-sage-700 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-sage-500 hover:bg-sage-50 sm:px-8 sm:py-4 sm:text-base"
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
          initial={{ opacity: 0, scale: 0.92, x: -40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex justify-center lg:order-2"
        >
          {/* Glow ring */}
          <div
            className="absolute inset-0 rounded-[2.5rem] blur-2xl opacity-30"
            style={{ background: "linear-gradient(135deg, #F2A08E, #9DAE97)" }}
          />

          {/* Image card */}
          <div
            className="relative aspect-[3/4] w-full max-w-[min(100%,20rem)] overflow-hidden rounded-[2rem] shadow-2xl sm:max-w-sm sm:rounded-[2.5rem] lg:max-w-md"
            style={{ border: "3px solid rgba(255,255,255,0.6)" }}
          >
            <img
              src={heroImage}
              alt="مريم ترمس — أخصائية علاج فيزيائي"
              className="w-full h-full object-cover object-top"
            />

            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(212,117,106,0.25) 0%, transparent 50%)",
              }}
            />
          </div>

          {/* Floating badges */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-6 right-2 flex items-center gap-2 rounded-2xl border border-coral-100 bg-white/80 px-3 py-2 text-right shadow-lg backdrop-blur-md sm:top-8 sm:-right-6 sm:gap-2.5 sm:px-4 sm:py-3"
          >
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl sm:h-10 sm:w-10"
              style={{
                background: "linear-gradient(135deg, #FAD9D5, #F2A08E)",
              }}
            >
              <BookOpenCheck className="h-4 w-4 text-white sm:h-5 sm:w-5" />
            </div>
            <div className="text-sm font-bold text-coral-600 sm:text-base">
              معلومات علميّة
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 5,
              delay: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-12 left-2 flex items-center gap-2 rounded-2xl border border-sage-100 bg-white/80 px-3 py-2 text-right shadow-lg backdrop-blur-md sm:bottom-16 sm:-left-6 sm:gap-2.5 sm:px-4 sm:py-3"
          >
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl sm:h-10 sm:w-10"
              style={{
                background: "linear-gradient(135deg, #E4E9E2, #8A9E84)",
              }}
            >
              <HeartHandshake className="h-4 w-4 text-white sm:h-5 sm:w-5" />
            </div>
            <div className="text-sm font-bold text-sage-700 sm:text-base">
              دعم، ثقة، وعي
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
