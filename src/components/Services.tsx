import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  Baby,
  PersonStanding,
  HeartPulse,
  Dumbbell,
  HeartHandshake,
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
    ...GREEN,
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
    ...PINK,
  },
  {
    id: "posture",
    icon: PersonStanding,
    title: "تصحيح القوام لمختلف الأعمار",
    description:
      "أساعد على تحسين وضعية الجسم وتقليل المشاكل الناتجة عن سوء القوام من خلال التقييم والتمارين التصحيحية المناسبة لكل عمر.",
    ...GREEN,
  },
  {
    id: "pregnancy",
    icon: HeartPulse,
    title: "تدريب الحوامل والتعافي بعد الولادة",
    description:
      "برامج حركية آمنة ومخصصة تساعد المرأة خلال الحمل على الحفاظ على قوتها، تخفيف الآلام، والاستعداد الجسدي للولادة، ثم أرافقها في رحلة استعادة قوتها بعد الولادة من خلال تمارين تدريجية لتحسين الحركة، دعم قاع الحوض، والعودة للنشاط بأمان.",
    ...PINK,
  },
  {
    id: "personal",
    icon: Dumbbell,
    title: "التدريب الشخصي",
    description:
      "تدريب فردي يهدف إلى بناء القوة، تحسين اللياقة والحركة، والوصول إلى أهدافك الصحية بطريقة آمنة ومدروسة.",
    ...GREEN,
  },
  {
    id: "breastfeeding",
    icon: HeartHandshake,
    title: "التحضير للرضاعة الطبيعية",
    description:
      "أساعد الأمهات على بدء رحلة الرضاعة بثقة من خلال التعرف على أساسيات الرضاعة، الوضعيات الصحيحة، وكيفية التعامل مع التحديات المبكرة.",
    ...PINK,
  },
];

const wrap = (n: number, max: number) => ((n % max) + max) % max;

function ServiceCardBody({
  service,
  expanded,
  onToggleMore,
  featured,
}: {
  service: Service;
  expanded: boolean;
  onToggleMore?: () => void;
  featured: boolean;
}) {
  const { icon: Icon, title, description, more, accent } = service;

  return (
    <div className="flex h-full flex-col text-right" dir="rtl">
      <div
        className={cn(
          "mb-4 flex items-center justify-center rounded-2xl shadow-md",
          featured ? "h-14 w-14" : "h-11 w-11",
        )}
        style={{
          background: `linear-gradient(135deg, ${accent}22, ${accent}44)`,
        }}
      >
        <Icon
          className={featured ? "h-7 w-7" : "h-5 w-5"}
          style={{ color: accent }}
        />
      </div>

      <h3
        className={cn(
          "mb-2 font-bold leading-snug",
          featured ? "text-xl sm:text-2xl" : "line-clamp-3 text-base sm:text-lg",
        )}
        style={{ color: "#4A3530", fontFamily: "Georgia, serif" }}
      >
        {title}
      </h3>

      <p
        className={cn(
          "leading-relaxed text-sage-700/75",
          featured ? "mb-4 text-sm sm:text-base" : "line-clamp-4 text-xs sm:text-sm",
        )}
      >
        {description}
      </p>

      {featured && more && (
        <>
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                key="more"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-4 overflow-hidden"
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

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleMore?.();
            }}
            className="mt-auto inline-flex flex-row-reverse items-center gap-1.5 self-start text-sm font-semibold"
            style={{ color: accent }}
          >
            {expanded ? "إخفاء التفاصيل" : "اعرفي المزيد"}
            <span aria-hidden>{expanded ? "↓" : "←"}</span>
          </button>
        </>
      )}
    </div>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const section = sectionRef.current;
      if (section) {
        const rect = section.getBoundingClientRect();
        const travel = Math.max(section.offsetHeight - window.innerHeight, 1);
        const progress = Math.max(0, Math.min(1, -rect.top / travel));
        const nextIndex = Math.min(
          services.length - 1,
          Math.floor(progress * services.length + 0.001),
        );
        if (nextIndex !== activeRef.current) {
          activeRef.current = nextIndex;
          setActive(nextIndex);
          setExpanded(false);
        }
        section.style.setProperty("--svc-p", String(progress));
      }
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  const previous = wrap(active - 1, services.length);
  const next = wrap(active + 1, services.length);

  const roleFor = (index: number) => {
    if (index === active) return "current";
    if (index === previous) return "previous";
    if (index === next) return "next";
    return "idle";
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      dir="rtl"
      className="svc-carousel relative"
      style={{
        height: `${services.length * 100}vh`,
        background: "linear-gradient(180deg, #F4F6F3 0%, #FFF5F2 100%)",
      }}
      aria-label="الخدمات"
    >
      <div className="svc-carousel-sticky">
        <header className="relative z-20 mx-auto w-full max-w-7xl shrink-0 px-4 pt-6 text-center sm:px-6 sm:pt-10 lg:px-8">
          <div
            className="mb-3 inline-block rounded-full px-3 py-1 text-xs font-medium text-coral-600 sm:mb-4 sm:px-4 sm:py-1.5 sm:text-sm"
            style={{
              background: "rgba(212,117,106,0.1)",
              border: "1px solid rgba(212,117,106,0.25)",
            }}
          >
            خدماتي
          </div>
          <h2
            className="text-2xl font-bold sm:text-4xl lg:text-5xl"
            style={{ fontFamily: "Georgia, serif", color: "#4A3530" }}
          >
            خدمات مصمّمة
            <span style={{ color: "#D4756A" }}> خصيصًا لكِ</span>
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-sage-600 sm:mt-3 sm:text-base">
            مرّري للأسفل لاستكشاف الخدمات
          </p>
        </header>

        <div className="svc-slider">
          <div className="svc-slides">
            {services.map((service, index) => {
              const role = roleFor(index);
              const featured = role === "current";

              return (
                <div
                  key={service.id}
                  className="svc-slide"
                  data-role={role}
                  style={{
                    zIndex:
                      role === "current"
                        ? 30
                        : role === "previous"
                          ? 20
                          : role === "next"
                            ? 10
                            : 0,
                  }}
                >
                  <div
                    className={cn(
                      "svc-slide__card bg-gradient-to-br",
                      service.color,
                    )}
                    style={{
                      border: `1.5px solid ${service.border}`,
                      boxShadow:
                        role === "current"
                          ? "0 24px 60px -20px rgba(74,53,48,0.35)"
                          : "0 12px 32px -18px rgba(74,53,48,0.25)",
                    }}
                  >
                    <ServiceCardBody
                      service={service}
                      featured={featured}
                      expanded={featured ? expanded : false}
                      onToggleMore={
                        featured && service.more
                          ? () => setExpanded((v) => !v)
                          : undefined
                      }
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="svc-carousel-progress" aria-hidden>
            {services.map((service, index) => (
              <span
                key={service.id}
                data-active={index === active ? "true" : "false"}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
