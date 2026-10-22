import { useCallback, useEffect, useRef, useState } from "react";
import { animate, motion, useReducedMotion } from "framer-motion";
import { Heart, Footprints, Sparkles } from "lucide-react";

const DONUT_SIZE = 124;
const HOLE_MAX = 0.42;
const COLLAPSE_MS = 560;
const EXPAND_MS = 640;
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

type StoryCard = (typeof storyCards)[number];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

function useCardMetrics() {
  const [metrics, setMetrics] = useState({ width: 640, height: 320, pad: 32 });

  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth;
      const width = Math.min(680, Math.max(280, vw * 0.86));
      const height = Math.min(
        420,
        Math.max(vw < 640 ? 340 : 280, width * (vw < 640 ? 0.9 : 0.58)),
      );
      setMetrics({ width, height, pad: vw < 640 ? 16 : 32 });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return metrics;
}

function MorphingCard({
  card,
  morph,
  textVisible,
  reduced,
  cardW,
  cardH,
  basePad,
}: {
  card: StoryCard;
  morph: number;
  textVisible: boolean;
  reduced: boolean;
  cardW: number;
  cardH: number;
  basePad: number;
}) {
  const Icon = card.icon;
  const m = reduced ? 0 : clamp01(morph);

  // One continuous shape morph: card ↔ donut
  // Early: round toward circle while sizing; late: open/close the hole
  const sizeT = m; // 0 card → 1 donut size
  const roundT = clamp01(m / 0.35); // become circle quickly
  const hole =
    m < 0.35 ? 0 : m < 0.7 ? ((m - 0.35) / 0.35) * HOLE_MAX : HOLE_MAX;

  const width = lerp(cardW, DONUT_SIZE, sizeT);
  const height = lerp(cardH, DONUT_SIZE, sizeT);
  const radius = lerp(28, Math.min(width, height) / 2, roundT);
  const pad = lerp(basePad, 0, clamp01(m / 0.4));

  // Text only when fully expanded (never mid-morph)
  const contentOpacity = textVisible && m < 0.02 ? 1 : 0;

  const mask =
    hole > 0.008
      ? `radial-gradient(circle, transparent ${hole * 50}%, #000 ${hole * 50 + 1.5}%)`
      : undefined;

  // Soft ring look while donut is dominant
  const donutGlow = clamp01((m - 0.4) / 0.4);

  return (
    <div
      className="relative mx-auto overflow-hidden border border-white/60 will-change-[width,height,border-radius]"
      style={{
        width,
        height,
        borderRadius: radius,
        background: card.gradient,
        padding: pad,
        WebkitMaskImage: mask,
        maskImage: mask,
        boxShadow:
          donutGlow > 0.05
            ? `0 0 0 ${lerp(0, 6, donutGlow)}px ${card.accent}33, 0 18px 50px -20px rgba(74,53,48,0.4)`
            : "0 24px 60px -28px rgba(74,53,48,0.45)",
      }}
    >
      {/* Text — only after the card is fully open */}
      <div
        className="relative flex h-full flex-col justify-center text-right transition-opacity duration-300"
        style={{
          opacity: contentOpacity,
          pointerEvents: contentOpacity > 0.5 ? "auto" : "none",
        }}
        dir="rtl"
        aria-hidden={contentOpacity < 0.5}
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

        <div className="min-h-0 space-y-2.5 overflow-y-auto text-sm leading-[1.85] text-sage-700/85 sm:space-y-3 sm:text-[15px] sm:leading-[1.9]">
          {card.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 28)}>{paragraph}</p>
          ))}
        </div>
      </div>

      {/* Center icon while in donut form */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        style={{ opacity: clamp01((m - 0.45) / 0.25) * (1 - contentOpacity) }}
      >
        <Icon size={30} strokeWidth={1.6} style={{ color: card.accent }} />
      </div>
    </div>
  );
}

export default function About() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { width: cardW, height: cardH, pad: basePad } = useCardMetrics();

  const [cardIndex, setCardIndex] = useState(0);
  const [morph, setMorph] = useState(0);
  const [textVisible, setTextVisible] = useState(true);
  const cardIndexRef = useRef(0);
  const animatingRef = useRef(false);
  const trappedRef = useRef(false);
  const lockedScrollY = useRef(0);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    cardIndexRef.current = cardIndex;
  }, [cardIndex]);

  const getCenteredScrollY = useCallback(() => {
    const el = sectionRef.current;
    if (!el) return window.scrollY;
    const rect = el.getBoundingClientRect();
    const absoluteTop = rect.top + window.scrollY;
    // Align section center with viewport center
    return Math.max(0, absoluteTop - (window.innerHeight - rect.height) / 2);
  }, []);

  const pinToSection = useCallback(() => {
    const top = getCenteredScrollY();
    lockedScrollY.current = top;
    window.scrollTo({ top, left: 0, behavior: "instant" as ScrollBehavior });
  }, [getCenteredScrollY]);

  /** True when About's center is near the viewport center */
  const isSectionCentered = useCallback(() => {
    const el = sectionRef.current;
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    const wh = window.innerHeight;
    const sectionCenter = rect.top + rect.height / 2;
    const viewCenter = wh / 2;
    return Math.abs(sectionCenter - viewCenter) <= wh * 0.14;
  }, []);

  const shouldStayTrapped = useCallback((direction: "down" | "up") => {
    const i = cardIndexRef.current;
    const last = storyCards.length - 1;
    if (direction === "down") return i < last;
    return i > 0;
  }, []);

  const runMorph = useCallback(
    (from: number, to: number, duration: number) =>
      new Promise<void>((resolve) => {
        animate(from, to, {
          duration: duration / 1000,
          ease: [0.4, 0, 0.2, 1],
          onUpdate: (v) => setMorph(v),
          onComplete: () => {
            setMorph(to);
            resolve();
          },
        });
      }),
    [],
  );

  const switchCard = useCallback(
    async (nextIndex: number) => {
      if (animatingRef.current) return true;
      const i = cardIndexRef.current;
      if (nextIndex === i || nextIndex < 0 || nextIndex >= storyCards.length) {
        return false;
      }

      animatingRef.current = true;
      setTextVisible(false);
      pinToSection();

      if (reduced) {
        setCardIndex(nextIndex);
        setMorph(0);
        setTextVisible(true);
        animatingRef.current = false;
        return true;
      }

      await runMorph(0, 1, COLLAPSE_MS);
      setCardIndex(nextIndex);
      await runMorph(1, 0, EXPAND_MS);
      setTextVisible(true);
      animatingRef.current = false;
      pinToSection();
      return true;
    },
    [pinToSection, reduced, runMorph],
  );

  const goNext = useCallback(
    () => switchCard(cardIndexRef.current + 1),
    [switchCard],
  );

  const goPrev = useCallback(
    () => switchCard(cardIndexRef.current - 1),
    [switchCard],
  );

  useEffect(() => {
    let wheelLockUntil = 0;
    let exitCooldownUntil = 0;
    let wasActive = false;

    const engageTrap = () => {
      if (trappedRef.current) return;
      if (Date.now() < exitCooldownUntil) return;
      trappedRef.current = true;
      pinToSection();
    };

    const releaseTrap = () => {
      trappedRef.current = false;
      exitCooldownUntil = Date.now() + 700;
    };

    const onWheel = (e: WheelEvent) => {
      const centered = isSectionCentered();

      // Lock only once About is centered in the viewport
      if (centered && !wasActive) engageTrap();
      wasActive = centered;

      if (!trappedRef.current) return;

      const goingDown = e.deltaY > 0;
      const direction = goingDown ? "down" : "up";
      const mustStay = shouldStayTrapped(direction) || animatingRef.current;

      if (mustStay) {
        e.preventDefault();
        pinToSection();
      }

      if (animatingRef.current) return;
      if (Date.now() < wheelLockUntil) return;
      if (Math.abs(e.deltaY) < 10) return;

      if (goingDown) {
        if (cardIndexRef.current < storyCards.length - 1) {
          wheelLockUntil = Date.now() + COLLAPSE_MS + EXPAND_MS + 100;
          void goNext();
        } else {
          // Last card — unlock so page can continue down
          releaseTrap();
        }
      } else if (cardIndexRef.current > 0) {
        wheelLockUntil = Date.now() + COLLAPSE_MS + EXPAND_MS + 100;
        void goPrev();
      } else {
        // First card — unlock so page can continue up
        releaseTrap();
      }
    };

    const onScroll = () => {
      const centered = isSectionCentered();
      if (centered && !wasActive) engageTrap();
      wasActive = centered;

      if (!trappedRef.current) return;

      const i = cardIndexRef.current;
      const last = storyCards.length - 1;
      const target = getCenteredScrollY();
      const dy = window.scrollY - target;

      // Keep locked on the centered About position until cards are done
      if (i < last && dy > 1) pinToSection();
      if (i > 0 && dy < -1) pinToSection();
      if (i > 0 && i < last && Math.abs(dy) > 1) pinToSection();
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (e: TouchEvent) => {
      const centered = isSectionCentered();
      if (centered && !wasActive) engageTrap();
      wasActive = centered;

      if (!trappedRef.current || touchStartY.current == null) return;

      const y = e.touches[0]?.clientY;
      if (y == null) return;
      const dy = touchStartY.current - y;
      const goingDown = dy > 0;
      const direction = goingDown ? "down" : "up";

      if (shouldStayTrapped(direction) || animatingRef.current) {
        e.preventDefault();
        pinToSection();
      }

      if (animatingRef.current) return;
      if (Math.abs(dy) < 40) return;

      if (goingDown) {
        if (cardIndexRef.current < storyCards.length - 1) {
          touchStartY.current = null;
          void goNext();
        } else {
          releaseTrap();
        }
      } else if (cardIndexRef.current > 0) {
        touchStartY.current = null;
        void goPrev();
      } else {
        releaseTrap();
      }
    };

    const onTouchEnd = () => {
      touchStartY.current = null;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      trappedRef.current = false;
    };
  }, [
    getCenteredScrollY,
    goNext,
    goPrev,
    isSectionCentered,
    pinToSection,
    shouldStayTrapped,
  ]);

  const card = storyCards[cardIndex];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative h-svh"
    >
      <div
        className="flex h-svh flex-col justify-center overflow-hidden"
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
          className="relative z-10 mx-auto mb-4 w-full max-w-7xl shrink-0 px-4 text-center sm:mb-6 sm:px-6 lg:mb-8 lg:px-8"
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
            مرّري مرة واحدة للبطاقة التالية
          </p>
        </motion.div>

        <div className="relative z-10 flex w-full flex-1 items-center justify-center px-4 sm:px-6">
          <MorphingCard
            card={card}
            morph={morph}
            textVisible={textVisible}
            reduced={!!reduced}
            cardW={cardW}
            cardH={cardH}
            basePad={basePad}
          />
        </div>

        <div className="relative z-10 mx-auto mb-6 mt-4 flex items-center gap-2 sm:mb-8 sm:mt-6">
          {storyCards.map((c, i) => (
            <span
              key={c.title}
              className="block h-2 rounded-full transition-all duration-300"
              style={{
                width: i === cardIndex ? 28 : 8,
                background: i === cardIndex ? c.accent : "rgba(74,53,48,0.18)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
