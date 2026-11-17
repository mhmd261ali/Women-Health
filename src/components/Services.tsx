import { useEffect, useRef, useState } from "react";
import {
  Activity,
  Baby,
  PersonStanding,
  HeartPulse,
  Dumbbell,
  type LucideIcon,
} from "lucide-react";
import { cn } from "../lib/utils";
import motherBabyIcon from "../images/mother-baby-icon.png";

type Service = {
  id: string;
  icon?: LucideIcon;
  iconImage?: string;
  title: string;
  description: string;
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
    ...GREEN,
  },
  {
    id: "physio-kids",
    icon: Baby,
    title: "العلاج الفيزيائي وإعادة التأهيل للأطفال",
    description:
      "أدعم نمو الطفل الحركي من خلال تقييم وتطوير المهارات الحركية، تحسين التوازن والتناسق، ومساندة الأطفال الذين يحتاجون إلى تأهيل متخصص.",
    ...PINK,
  },
  {
    id: "posture",
    icon: PersonStanding,
    title: "تصحيح القوام لمختلف الأعمار",
    description:
      "أعمل على تقييم وضعية الجسم وتحديد المشكلات المرتبطة بسوء القوام، ووضع برامج من التمارين التصحيحية المناسبة لكل عمر واحتياج، بهدف تحسين القوام وتقليل الأعراض والمشكلات الحركية المرتبطة بها.",
    ...GREEN,
  },
  {
    id: "pregnancy",
    icon: HeartPulse,
    title: "التّدريب خلال الحمل والتعافي بعد الولادة",
    description:
      "أقدّم برامج تدريبية آمنة ومخصصة ترافق المرأة خلال الحمل، للحفاظ على قوتها ولياقتها، دعم الحركة، والتخفيف من الآلام المرتبطة بالتغيرات الجسدية، مع الاستعداد البدني للولادة. وبعد الولادة، أرافقها تدريجيًا في استعادة قوتها وحركتها، من خلال تمارين مخصصة لدعم قاع الحوض، استعادة اللياقة، والعودة الآمنة إلى النشاط والتمارين.",
    ...PINK,
  },
  {
    id: "personal",
    icon: Dumbbell,
    title: "التدريب الرّياضي",
    description:
      "أقدّم تدريبًا فرديًا مخصصًا يهدف إلى بناء القوة، تحسين اللياقة والحركة، وتحقيق أهدافك الصحية من خلال برامج آمنة ومدروسة تتناسب مع احتياجاتك وقدراتك.",
    ...GREEN,
  },
  {
    id: "breastfeeding",
    iconImage: motherBabyIcon,
    title: "التحضير للرّضاعة الطّبيعيّة",
    description:
      "أساعد الأمهات على بدء رحلة الرضاعة الطبيعية بثقة ووعي، من خلال فهم أساسيات الرضاعة، تعلّم الوضعيات والالتقام المناسبين، والتعرّف على أكثر التحديات شيوعًا في الأيام والأسابيع الأولى وكيفية التعامل معها بهدوء وواقعية.",
    ...PINK,
  },
];

const wrap = (n: number, max: number) => ((n % max) + max) % max;

function ServiceCardBody({
  service,
  featured,
}: {
  service: Service;
  featured: boolean;
}) {
  const { icon: Icon, iconImage, title, description, accent } = service;

  return (
    <div className="flex h-full flex-col justify-center text-right" dir="rtl">
      <div
        className={cn(
          "mb-3 flex shrink-0 items-center justify-center overflow-hidden rounded-2xl shadow-md",
          featured ? "h-12 w-12" : "h-10 w-10",
        )}
        style={{
          background: `linear-gradient(135deg, ${accent}22, ${accent}44)`,
        }}
      >
        {iconImage ? (
          <img
            src={iconImage}
            alt=""
            className={cn(
              "object-contain",
              featured ? "h-10 w-10" : "h-8 w-8",
            )}
          />
        ) : Icon ? (
          <Icon
            className={featured ? "h-6 w-6" : "h-5 w-5"}
            style={{ color: accent }}
          />
        ) : null}
      </div>

      <h3
        className={cn(
          "mb-1.5 shrink-0 font-bold leading-snug",
          featured ? "text-lg sm:text-xl" : "line-clamp-3 text-lg sm:text-base",
        )}
        style={{ color: "#4A3530", fontFamily: "Beiruti, sans-serif" }}
      >
        {title}
      </h3>

      <p
        className={cn(
          "leading-relaxed text-sage-700",
          featured
            ? "text-[13px] sm:text-lg sm:leading-[1.7]"
            : "line-clamp-4 text-xs sm:text-lg",
        )}
      >
        {description}
      </p>
    </div>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

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
        <header className="relative z-20 mx-auto w-full max-w-7xl shrink-0 px-4 text-center sm:px-6 lg:px-8">
          <div
            className="mb-2 inline-block rounded-full px-3 py-1 text-xs font-medium text-coral-600 sm:mb-3 sm:px-4 sm:py-1.5 sm:text-lg"
            style={{
              background: "rgba(212,117,106,0.1)",
              border: "1px solid rgba(212,117,106,0.25)",
            }}
          >
            خدماتي
          </div>
          <h2
            className="text-2xl font-bold leading-tight sm:text-4xl lg:text-5xl"
            style={{ fontFamily: "Beiruti, sans-serif", color: "#4A3530" }}
          >
            خدمات مصمّمة
            <span style={{ color: "#D4756A" }}> خصيصًا لكِ</span>
          </h2>
          <p className="mx-auto mt-1.5 max-w-xl text-lg text-sage-600 sm:mt-2 sm:text-base">
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
