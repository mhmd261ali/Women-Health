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
    label: "الاسم",
    title: 'لماذا "خطوة"؟',
    text: 'وعندما بدأت رحلة اختيار اسم لهذا المشروع، فكرت في العديد من الكلمات، لكنني لم أجد كلمة تعبّر عنه بصدق مثل "خطوة". لأنني أنا أيضًا بدأت بخطوة... ولأن كل خطوة صغيرة، مهما بدت بسيطة، هي بداية لمشوار أكبر. خطوة نحو فهم أجسامنا، نحو استعادة قوتنا، نحو صحة أفضل، ونحو نمو أكثر دعمًا ووعيًا لأطفالنا. أتمنى أن تتذكري دائمًا أن التغيير لا يحتاج إلى أن يحدث دفعة واحدة؛ ففي صحتك، وحركتك، ورحلة نمو طفلك، قد تكون الخطوة الأولى هي كل ما تحتاجينه للبدء.',
    gradient: "linear-gradient(160deg, #FDE8E2 0%, #FAD1C6 45%, #E4E9E2 100%)",
    accent: "#C4605A",
  },
  {
    icon: Heart,
    label: "البداية",
    title: "قوة الحركة من الداخل",
    text: "أنا مريم ترمس، أخصائية علاج فيزيائي، بدأت رحلتي في هذا المجال لأنني أؤمن بقوة الحركة والتمارين وتأثيرها العميق على صحتنا وجودة حياتنا. أؤمن أن الوقاية والعلاج لا يبدآن دائمًا من الخارج، بل من داخل أجسامنا، من خلال فهمها، ودعمها، واستخدام قدراتها الطبيعية بطريقة علمية ومدروسة.",
    gradient: "linear-gradient(160deg, #FAD9D5 0%, #F5E6E0 55%, #E4E9E2 100%)",
    accent: "#D4756A",
  },
  {
    icon: Sparkles,
    label: "الشغف",
    title: "الأطفال، النساء، والرضاعة",
    text: "خلال دراستي للعلاج الفيزيائي، اكتشفت شغفي الكبير بالعمل مع الأطفال والنساء. جذبني عالم الطفل بما يحمله من مراحل نمو وتطور مميزة، كما ألهمتني قوة المرأة وقدرتها على التكيف والتغير خلال مختلف مراحل حياتها. ومن هذا الشغف، بدأ اهتمامي بصحة المرأة والرضاعة الطبيعية. وجدت في هذا المجال امتدادًا لقيمي ورغبتي في فهم جسم الإنسان ودعم الأم والطفل خلال واحدة من أجمل المراحل وأكثرها تأثيرًا. لذلك اخترت أن أضيف تخصص الرضاعة الطبيعية إلى مسيرتي، لأجمع بين العلاج الفيزيائي، المعرفة العلمية، والدعم المتكامل.",
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
    const itemWidth = Math.min(720, Math.max(320, viewport * 0.72));
    const itemHeight = Math.min(340, Math.max(240, itemWidth * 0.48));
    return { viewport, itemWidth, itemHeight };
  });

  useEffect(() => {
    const update = () => {
      const viewport = window.innerWidth;
      // Landscape cards: wide horizontal panels
      const itemWidth = Math.min(720, Math.max(320, viewport * 0.72));
      const itemHeight = Math.min(340, Math.max(240, itemWidth * 0.48));
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
      className="relative flex shrink-0 flex-col justify-center overflow-hidden rounded-[1.75rem] border border-white/60 p-6 text-right shadow-[0_24px_60px_-28px_rgba(74,53,48,0.45)] sm:rounded-[2rem] sm:p-8"
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
        className="mb-3 inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold"
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
        className="mb-3 text-xl font-bold leading-snug sm:text-2xl"
        style={{ fontFamily: "Georgia, serif", color: "#4A3530" }}
      >
        {card.title}
      </h3>

      <p className="line-clamp-6 text-sm leading-[1.85] text-sage-700/85 sm:text-[15px] sm:leading-[1.9]">
        {card.text}
      </p>

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

        <div className="relative z-10 mx-auto mb-6 w-full max-w-7xl px-6 text-center lg:mb-8 lg:px-8">
          <div
            className="mb-5 inline-block rounded-full px-4 py-1.5 text-sm font-medium text-coral-600"
            style={{
              background: "rgba(212,117,106,0.1)",
              border: "1px solid rgba(212,117,106,0.25)",
            }}
          >
            من أنا
          </div>
          <h2
            className="text-4xl font-bold leading-tight lg:text-5xl"
            style={{ fontFamily: "Georgia, serif", color: "#4A3530" }}
          >
            شغفٌ حقيقي
            <br />
            <span style={{ color: "#D4756A" }}>
              بصحة ورفاهية المرأة والطفل
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sage-600">
            مرّري للأسفل لاكتشاف رحلتي — بطاقة بعد بطاقة
          </p>
        </div>

        <div className="relative z-10 w-full overflow-hidden" dir="ltr">
          <motion.div
            className="flex w-max items-center will-change-transform"
            style={{
              x,
              gap: GAP,
              // Anchor track to the left edge so startPad centers card 1
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
        </div>

        {/* Scroll progress bar */}
        <div className="relative z-10 mx-auto mt-8 h-1 w-40 overflow-hidden rounded-full bg-[#4A3530]/10">
          <motion.div
            className="h-full rounded-full bg-[#D4756A]"
            style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
          />
        </div>
      </div>
    </section>
  );
}
