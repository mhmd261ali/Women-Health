import { useCallback, useId, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Activity,
  Baby,
  PersonStanding,
  HeartPulse,
  Dumbbell,
  HeartHandshake,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { cn } from "../lib/utils";

type ServiceDetail = {
  intro: string;
  items: string[];
};

type Service = {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  more?: ServiceDetail;
  color: string;
  accent: string;
  border: string;
};

const PINK = {
  color: "from-coral-100 to-peach-100",
  accent: "#D4756A",
  border: "rgba(212,117,106,0.2)",
} as const;

const GREEN = {
  color: "from-sage-100 to-sage-50",
  accent: "#8A9E84",
  border: "rgba(138,158,132,0.2)",
} as const;

const services: Service[] = [
  {
    id: "physio-women",
    icon: Activity,
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
    ...GREEN, // index 0 — even
  },
  {
    id: "physio-kids",
    icon: Baby,
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
    ...PINK, // index 1 — odd
  },
  {
    id: "posture",
    icon: PersonStanding,
    title: "تصحيح القوام لمختلف الأعمار",
    description:
      "أساعد على تحسين وضعية الجسم وتقليل المشاكل الناتجة عن سوء القوام من خلال التقييم والتمارين التصحيحية المناسبة لكل عمر.",
    ...GREEN, // index 2 — even
  },
  {
    id: "pregnancy",
    icon: HeartPulse,
    title: "تدريب الحوامل والتعافي بعد الولادة",
    description:
      "برامج حركية آمنة ومخصصة تساعد المرأة خلال الحمل على الحفاظ على قوتها، تخفيف الآلام، والاستعداد الجسدي للولادة، ثم أرافقها في رحلة استعادة قوتها بعد الولادة من خلال تمارين تدريجية لتحسين الحركة، دعم قاع الحوض، والعودة للنشاط بأمان.",
    ...PINK, // index 3 — odd
  },
  {
    id: "personal",
    icon: Dumbbell,
    title: "التدريب الشخصي",
    description:
      "تدريب فردي يهدف إلى بناء القوة، تحسين اللياقة والحركة، والوصول إلى أهدافك الصحية بطريقة آمنة ومدروسة.",
    ...GREEN, // index 4 — even
  },
  {
    id: "breastfeeding",
    icon: HeartHandshake,
    title: "التحضير للرضاعة الطبيعية",
    description:
      "أساعد الأمهات على بدء رحلة الرضاعة بثقة من خلال التعرف على أساسيات الرضاعة، الوضعيات الصحيحة، وكيفية التعامل مع التحديات المبكرة.",
    ...PINK, // index 5 — odd
  },
];

const VISIBLE = 3;
const ease = [0.22, 1, 0.36, 1] as const;

function ServiceCard({
  service,
  large,
  compact,
  expanded,
  onToggleMore,
  onSelect,
}: {
  service: Service;
  large?: boolean;
  compact?: boolean;
  expanded?: boolean;
  onToggleMore?: () => void;
  onSelect?: () => void;
}) {
  const { icon: Icon, title, description, more, color, accent, border } =
    service;

  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={!onSelect}
      className={cn(
        "group relative h-full w-full overflow-hidden rounded-3xl bg-gradient-to-br p-5 text-right transition-shadow duration-300 sm:p-7",
        color,
        onSelect ? "cursor-pointer" : "cursor-default",
        compact && "flex flex-col justify-between",
        large && "flex flex-col",
      )}
      style={{
        border: `1.5px solid ${border}`,
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
      }}
      aria-label={onSelect ? title : undefined}
    >
      <div
        className={cn(
          "mb-4 flex items-center justify-center rounded-2xl shadow-md transition-transform duration-300 group-hover:scale-110",
          large ? "h-14 w-14" : "h-11 w-11",
        )}
        style={{
          background: `linear-gradient(135deg, ${accent}22, ${accent}44)`,
        }}
      >
        <Icon
          className={large ? "h-7 w-7" : "h-5 w-5"}
          style={{ color: accent }}
        />
      </div>

      <h3
        className={cn(
          "mb-2 font-bold leading-snug",
          large ? "text-xl sm:text-2xl" : "text-base sm:text-lg line-clamp-3",
        )}
        style={{ color: "#4A3530", fontFamily: "Georgia, serif" }}
      >
        {title}
      </h3>

      {large && (
        <>
          <p className="mb-4 text-sm leading-relaxed text-sage-700/75 sm:text-base">
            {description}
          </p>

          <AnimatePresence initial={false}>
            {more && expanded && (
              <motion.div
                key="more"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-4 overflow-hidden text-right"
              >
                <p className="mb-3 text-sm leading-relaxed text-sage-700/85">
                  {more.intro}
                </p>
                <p
                  className="mb-2 text-sm font-semibold"
                  style={{ color: accent }}
                >
                  تشمل الخدمة:
                </p>
                <ul className="list-none space-y-2 text-sm leading-relaxed text-sage-700/80">
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

          {more && onToggleMore && (
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation();
                onToggleMore();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  e.stopPropagation();
                  onToggleMore();
                }
              }}
              className="mt-auto inline-flex flex-row-reverse items-center gap-1.5 self-start text-sm font-semibold"
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
            </span>
          )}
        </>
      )}

      {compact && (
        <p className="line-clamp-3 text-xs leading-relaxed text-sage-700/70 sm:text-sm">
          {description}
        </p>
      )}

      <div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${accent}15, transparent 70%)`,
        }}
      />
    </button>
  );
}

function CarouselButton({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="inline-flex size-11 items-center justify-center rounded-full border transition-colors"
      style={{
        borderColor: "rgba(74,53,48,0.15)",
        color: "#4A3530",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(212,117,106,0.45)";
        e.currentTarget.style.background = "rgba(255,255,255,0.7)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(74,53,48,0.15)";
        e.currentTarget.style.background = "transparent";
      }}
    >
      {children}
    </button>
  );
}

export default function Services() {
  const count = services.length;
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [expanded, setExpanded] = useState(false);
  const labelId = useId();
  const pointerX = useRef<number | null>(null);
  const reduced = useReducedMotion();

  const goTo = useCallback(
    (nextIndex: number) => {
      const target = ((nextIndex % count) + count) % count;
      if (target === active) return;
      const forward = (target - active + count) % count;
      const backward = (active - target + count) % count;
      setDirection(forward <= backward ? 1 : -1);
      setActive(target);
      setExpanded(false);
    },
    [active, count],
  );

  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  const visible = Array.from({ length: VISIBLE }, (_, slot) => {
    const index = (active + slot) % count;
    return { ...services[index], index, slot };
  });

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    pointerX.current = event.clientX;
  };

  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (pointerX.current == null) return;
    const delta = event.clientX - pointerX.current;
    pointerX.current = null;
    if (Math.abs(delta) < 48) return;
    if (delta < 0) next();
    else prev();
  };

  return (
    <section
      id="services"
      dir="rtl"
      className="relative overflow-hidden py-24"
      style={{
        background: "linear-gradient(180deg, #F4F6F3 0%, #FFF5F2 100%)",
      }}
    >
      <div
        className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, #D4756A, #8A9E84)" }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="mb-4 inline-block rounded-full px-4 py-1.5 text-sm font-medium text-coral-600"
              style={{
                background: "rgba(212,117,106,0.1)",
                border: "1px solid rgba(212,117,106,0.25)",
              }}
            >
              خدماتي
            </div>
            <h2
              className="text-4xl font-bold lg:text-5xl"
              style={{ fontFamily: "Georgia, serif", color: "#4A3530" }}
            >
              خدمات مصمّمة
              <span style={{ color: "#D4756A" }}> خصيصًا لكِ</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-end justify-between gap-6 md:flex-col md:items-end"
          >
            <p className="max-w-md text-lg leading-relaxed text-sage-600">
              تُقدَّم كل خدمة بخبرة مهنية، ورعاية صادقة، ونهج شخصي يراعي رحلتكِ
              واحتياجاتكِ الخاصة.
            </p>
            <div className="flex items-center gap-2" dir="ltr">
              <CarouselButton label="الخدمة السابقة" onClick={prev}>
                <ChevronLeft size={18} strokeWidth={1.6} />
              </CarouselButton>
              <CarouselButton label="الخدمة التالية" onClick={next}>
                <ChevronRight size={18} strokeWidth={1.6} />
              </CarouselButton>
            </div>
          </motion.div>
        </div>

        <div
          role="region"
          aria-roledescription="carousel"
          aria-labelledby={labelId}
          className="outline-none"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") {
              event.preventDefault();
              next();
            }
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              prev();
            }
          }}
        >
          <p id={labelId} className="sr-only">
            خدمات مصمّمة خصيصًا لكِ
          </p>

          <div
            dir="ltr"
            className="grid h-auto min-h-[22rem] touch-pan-y select-none grid-cols-1 gap-3 sm:h-[26rem] sm:grid-cols-[minmax(0,3fr)_minmax(0,1fr)_minmax(0,1fr)] sm:gap-4"
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={() => {
              pointerX.current = null;
            }}
          >
            {visible.map((item) => {
              const featured = item.slot === 0;

              return (
                <div
                  key={item.slot}
                  className={cn(
                    "relative min-w-0 overflow-hidden",
                    featured ? "h-auto sm:h-full" : "hidden h-full sm:block",
                  )}
                >
                  <motion.div
                    key={item.id}
                    initial={reduced ? false : { x: direction * 36, opacity: 0.6 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: reduced ? 0 : 0.45, ease }}
                    className="h-full"
                  >
                    <ServiceCard
                      service={item}
                      large={featured}
                      compact={!featured}
                      expanded={featured ? expanded : false}
                      onToggleMore={
                        featured && item.more
                          ? () => setExpanded((v) => !v)
                          : undefined
                      }
                      onSelect={featured ? undefined : () => goTo(item.index)}
                    />
                  </motion.div>
                </div>
              );
            })}
          </div>

          <div
            className="mt-6 flex items-center justify-center gap-2"
            dir="ltr"
          >
            {services.map((item, index) => (
              <button
                key={item.id}
                type="button"
                aria-label={item.title}
                aria-current={index === active ? "true" : undefined}
                onClick={() => goTo(index)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  index === active
                    ? "w-8 bg-[#4A3530]"
                    : "w-2 bg-[#4A3530]/25 hover:bg-[#4A3530]/45",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
