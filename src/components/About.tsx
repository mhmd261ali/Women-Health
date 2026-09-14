import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Heart, Footprints, Sparkles } from "lucide-react";

const GAP = 28;
const SCROLL_LENGTH_VH = 320;
const MAX_BLUR = 12;
const MIN_BRIGHTNESS = 0.42;
const SCALE_EFFECT = 0.1;

const storyCards = [
  {
    icon: Footprints,
    label: "خطوة",
    title: "لماذا خطوة؟",
    paragraphs: [
      "عندما بدأت أبحث عن اسم لهذا المشروع، لم أجد كلمة تعبّر عنه بصدق أكثر من «خطوة». لأنني أنا أيضًا بدأت بخطوة، ولأن كل خطوة صغيرة قد تكون بداية لمشوار أكبر.",
      "خطوة نحو فهم أجسامنا، استعادة قوتنا، وصحة أفضل، ونحو نمو أكثر دعمًا ووعيًا لأطفالنا.",
      "تذكّري دائمًا: التغيير لا يحتاج أن يحدث دفعة واحدة… أحيانًا، كل ما نحتاجه هو أن نبدأ بالخطوة الأولى.",
    ],
    gradient: "linear-gradient(160deg, #FDE8E2 0%, #FAD1C6 45%, #E4E9E2 100%)",
    accent: "#C4605A",
  },
  {
    icon: Heart,
    label: "البداية",
    title: "إيماني بالحركة",
    paragraphs: [
      "بدأت رحلتي في هذا المجال لأنني أؤمن بقوة الحركة والتمارين وتأثيرها العميق على صحتنا وجودة حياتنا. أؤمن أن الوقاية والعلاج لا يبدآن دائمًا من الخارج، بل من داخل أجسامنا، من خلال فهمها، ودعمها، واستخدام قدراتها الطبيعية بطريقة علمية ومدروسة.",
    ],
    gradient: "linear-gradient(160deg, #FAD9D5 0%, #F5E6E0 55%, #E4E9E2 100%)",
    accent: "#D4756A",
  },
  {
    icon: Sparkles,
    label: "الشّغف",
    title: "عالم الأنثى، الأطفال، الأمومة",
    paragraphs: [
      "خلال دراستي للعلاج الفيزيائي، اكتشفت شغفًا خاصًا بالعمل مع الأطفال والنساء. أحببت أن أكون جزءًا من رحلة نمو الطفل، وأن أرافق المرأة خلال مراحل وتغيّرات مختلفة من حياتها.",
      "ومن هنا بدأ اهتمامي بصحة المرأة والرضاعة الطبيعية، واخترت أن أضيف تخصص الرضاعة إلى مسيرتي لأجمع بين العلاج الفيزيائي، العلم، والدعم الإنساني للأم والطفل.",
      "ومن هذا الشغف وُلدت «خطوة»؛ مساحة أؤمن فيها أن الدعم الحقيقي يبدأ بالفهم، وأن كل تغيير كبير يمكن أن يبدأ بخطوة صغيرة نحو صحة أفضل، وحركة أكثر وعيًا، ورعاية أكثر دعمًا للأم والطفل.",
    ],
    gradient: "linear-gradient(160deg, #E4E9E2 0%, #F4F6F3 50%, #FAD9D5 100%)",
    accent: "#8A9E84",
  },
];

function useLayoutMetrics() {
  const [metrics, setMetrics] = useState(() => {
    if (typeof window === "undefined") {
      return { viewport: 1200, itemWidth: 640, itemHeight: 300 };
    }
    const viewport = window.innerWidth;
    const itemWidth = Math.min(720, Math.max(280, viewport < 640 ? viewport * 0.86 : viewport * 0.72));
    const itemHeight = Math.min(
      460,
      Math.max(viewport < 640 ? 360 : 300, itemWidth * (viewport < 640 ? 0.95 : 0.58)),
    );
    return { viewport, itemWidth, itemHeight };
  });

  useEffect(() => {
    const update = () => {
      const viewport = window.innerWidth;
      // Landscape cards: wide horizontal panels; taller for longer Arabic story text
      const itemWidth = Math.min(
        720,
        Math.max(280, viewport < 640 ? viewport * 0.86 : viewport * 0.72),
      );
      const itemHeight = Math.min(
        460,
        Math.max(
          viewport < 640 ? 360 : 300,
          itemWidth * (viewport < 640 ? 0.95 : 0.58),
        ),
      );
      setMetrics({ viewport, itemWidth, itemHeight });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return metrics;
}

function StoryCard({
  card,
  focus,
  width,
  height,
  reduceEffects,
}: {
  card: (typeof storyCards)[number];
  focus: number;
  width: number;
  height: number;
  reduceEffects: boolean;
}) {
  const Icon = card.icon;
  const blur = reduceEffects ? 0 : (1 - focus) * MAX_BLUR;
  const brightness = reduceEffects
    ? 1
    : MIN_BRIGHTNESS + focus * (1.15 - MIN_BRIGHTNESS);
  const scale = reduceEffects ? 1 : 1 - (1 - focus) * SCALE_EFFECT;
  const saturation = reduceEffects ? 1 : 0.3 + focus * 0.7;

  return (
    <article
      className="relative flex shrink-0 flex-col justify-center overflow-hidden rounded-[1.75rem] border border-white/60 p-4 text-right shadow-[0_24px_60px_-28px_rgba(74,53,48,0.45)] sm:rounded-[2rem] sm:p-8"
      style={{
        width,
        height,
        background: card.gradient,
        transform: `scale(${scale})`,
        filter: `blur(${blur}px) brightness(${brightness}) saturate(${saturation})`,
        opacity: 0.5 + focus * 0.5,
      }}
    >
      <div
        className="mb-2 inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold sm:mb-3"
        style={{
          background: `${card.accent}18`,
          color: card.accent,
          border: `1px solid ${card.accent}33`,
        }}
      >
        <Icon size={14} strokeWidth={1.8} />
        {card.label}
      </div>

      <h3
        className="mb-2 text-lg font-bold leading-snug sm:mb-3 sm:text-2xl"
        style={{ fontFamily: "Georgia, serif", color: "#4A3530" }}
      >
        {card.title}
      </h3>

      <div className="min-h-0 flex-1 space-y-2.5 overflow-y-auto overscroll-contain pr-1 text-sm leading-[1.85] text-sage-700/85 sm:space-y-3 sm:text-[15px] sm:leading-[1.9]">
        {card.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </div>

      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-28"
        style={{
          background: `linear-gradient(to right, ${card.accent}12, transparent)`,
        }}
      />
    </article>
  );
}

export default function About() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { viewport, itemWidth, itemHeight } = useLayoutMetrics();
  const [progress, setProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setProgress(v);
  });

  // Always travel enough to center each card in turn (independent of viewport width)
  const step = itemWidth + GAP;
  const travel = (storyCards.length - 1) * step;
  // Center first card: left offset = half of leftover viewport space
  const startPad = (viewport - itemWidth) / 2;

  const x = useTransform(scrollYProgress, (p) => startPad - p * travel);

  const focuses = useMemo(() => {
    return storyCards.map((_, index) => {
      const cardCenter =
        startPad + index * step + itemWidth / 2 - progress * travel;
      const offset = cardCenter - viewport / 2;
      // Already viewed (left of center): stay sharp — no blur
      if (offset <= 0) return 1;
      // Upcoming cards: fade/blur by distance from focus
      const range = itemWidth * 0.55;
      return Math.min(1, Math.max(0, 1 - offset / range));
    });
  }, [progress, startPad, step, itemWidth, travel, viewport]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative"
      style={{ height: `${SCROLL_LENGTH_VH}vh` }}
    >
      <div
        className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #FAF0EC 0%, #F4F6F3 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute left-0 top-0 h-96 w-96 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #E8776F, transparent)" }}
        />
        <div
          className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full opacity-15 blur-3xl"
          style={{ background: "radial-gradient(circle, #8A9E84, transparent)" }}
        />

        <motion.div
          className="relative z-10 mx-auto mb-4 w-full max-w-7xl px-4 text-center sm:mb-6 sm:px-6 lg:mb-8 lg:px-8"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="mb-3 inline-block rounded-full px-3 py-1 text-xs font-medium text-coral-600 sm:mb-5 sm:px-4 sm:py-1.5 sm:text-sm"
            style={{
              background: "rgba(212,117,106,0.1)",
              border: "1px solid rgba(212,117,106,0.25)",
            }}
          >
            من أنا
          </div>
          <h2
            className="text-2xl font-bold leading-tight sm:text-4xl lg:text-5xl"
            style={{ fontFamily: "Georgia, serif", color: "#4A3530" }}
          >
            شغفٌ حقيقي
            <br />
            <span style={{ color: "#D4756A" }}>
              بصحة ورفاهية المرأة والطفل
            </span>
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-sage-600 sm:mt-4 sm:text-base">
            مرّري للأسفل لاكتشاف رحلتي — بطاقة بعد بطاقة
          </p>
        </motion.div>

        <motion.div
          className="relative z-10 w-full overflow-hidden"
          dir="ltr"
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="flex w-max items-center will-change-transform"
            style={{
              x,
              gap: GAP,
              marginInlineStart: 0,
              marginInlineEnd: "auto",
            }}
          >
            {storyCards.map((card, index) => (
              <StoryCard
                key={card.title}
                card={card}
                focus={focuses[index]}
                width={itemWidth}
                height={itemHeight}
                reduceEffects={!!reduced}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll progress bar */}
        <div className="relative z-10 mx-auto mt-5 h-1 w-32 overflow-hidden rounded-full bg-[#4A3530]/10 sm:mt-8 sm:w-40">
          <motion.div
            className="h-full rounded-full bg-[#D4756A]"
            style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
          />
        </div>
      </div>
    </section>
  );
}
