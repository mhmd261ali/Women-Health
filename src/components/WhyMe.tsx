import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Microscope, HandHeart, Handshake, type LucideIcon } from "lucide-react";
import { cn } from "../lib/utils";
import { useWaveFunctions } from "../hooks/useWaveFunctions";

type Reason = {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  iconColor: string;
};

const reasons: Reason[] = [
  {
    icon: Microscope,
    title: "نهج مبني على الأدلة العلمية وخبرة طبية ورياضية مزدوجة",
    description:
      "تستند جميع التوصيات إلى أحدث الأبحاث السريرية في علوم الرياضة، والعلاج الفيزيائي، وصحة المرأة، مع الجمع بين شهادات العلاج الفيزيائي واللياقة البدنية ليمنحكِ أفضل ما في التأهيل الطبي والتدريب الرياضي.",
    gradient: "linear-gradient(135deg, #E4E9E2 0%, #C8D3C5 100%)",
    iconColor: "#8A9E84",
  },
  {
    icon: HandHeart,
    title: "إرشاد داعم ومتعاطف ورعاية شخصية",
    description:
      "بيئة دافئة وخالية من الأحكام، تشعرين فيها بأنكِ مسموعة ومحترمة ومدعومة بصدق في كل خطوة، حيث تصمّم كل خطّة خصيصًا حسب جسمكِ وأهدافكِ ومرحلتكِ الحياتية، بعيدًا عن الحلول العامة الجاهزة.",
    gradient: "linear-gradient(135deg, #FAD9D5 0%, #F2D4C8 100%)",
    iconColor: "#C4605A",
  },
  {
    icon: Handshake,
    title: "شراكة مبنية على الثقة والاحترام",
    description:
      "دوري ليس اتخاذ القرارات بدلًا عنك، بل تزويدك بالمعلومات العلمية والدعم اللازم، لتتمكني من اختيار ما يناسبك ويناسب طفلك بثقة ووعي",
    gradient: "linear-gradient(135deg, #FDE8E2 0%, #FAD1C6 100%)",
    iconColor: "#D4756A",
  },
];

const CARD_TILTS = [-5, 4, -3] as const;
const STACK_Y = [72, 0, -72] as const;

function CardCopy({ reason }: { reason: Reason }) {
  const Icon = reason.icon;

  return (
    <>
      <div
        className="relative mb-5 flex h-14 w-14 items-center justify-center rounded-2xl shadow-sm"
        style={{ background: "rgba(255,255,255,0.7)" }}
      >
        <Icon className="h-7 w-7" style={{ color: reason.iconColor }} />
      </div>

      <h3
        className="relative mb-3 text-xl font-bold leading-snug"
        style={{ color: "#4A3530", fontFamily: "Georgia, serif" }}
      >
        {reason.title}
      </h3>

      <p className="relative text-sm leading-relaxed text-sage-700/75 sm:text-[15px] sm:leading-[1.9]">
        {reason.description}
      </p>
    </>
  );
}

function FloatingCard({
  reason,
  index,
  progress,
}: {
  reason: Reason;
  index: number;
  progress: MotionValue<number>;
}) {
  const shift = 0.08 * index;
  const scrollY = useTransform(progress, (value) => {
    const t = Math.min(1, Math.max(0, (value - shift) / (1 - 0.16)));
    if (t < 0.22) return STACK_Y[index] + (1 - t / 0.22) * 72;
    if (t > 0.78) return STACK_Y[index] - ((t - 0.78) / 0.22) * 72;
    return STACK_Y[index];
  });
  const rotate = useTransform(progress, (value) => {
    const t = Math.min(1, Math.max(0, (value - shift) / (1 - 0.16)));
    if (t < 0.22) return CARD_TILTS[index] * (t / 0.22);
    if (t > 0.78) return CARD_TILTS[index] * (1 - (t - 0.78) / 0.22);
    return CARD_TILTS[index];
  });

  const floatAmplitudes = [14, 18, 12] as const;
  const floatDurations = [3.8, 4.6, 4.1] as const;

  return (
    <motion.div
      style={{ y: scrollY, rotate, zIndex: index + 1 }}
      className="will-change-transform"
    >
      <motion.article
        animate={{ y: [0, -floatAmplitudes[index], 0] }}
        transition={{
          duration: floatDurations[index],
          delay: index * 0.35,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: reason.gradient,
          border: "1.5px solid rgba(255,255,255,0.7)",
          boxShadow: "0 18px 40px -22px rgba(74,53,48,0.35)",
        }}
        className="group relative overflow-hidden rounded-[28px] p-5 text-right sm:rounded-[32px] sm:p-7"
      >
        <div className="absolute inset-0 rounded-[28px] bg-white/0 transition-all duration-300 group-hover:bg-white/20 sm:rounded-[32px]" />
        <CardCopy reason={reason} />
      </motion.article>
    </motion.div>
  );
}

export default function WhyMe() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "end 0.15"],
  });
  const { canvasRef } = useWaveFunctions("slow", 10, 40, 0.32);

  return (
    <section
      ref={sectionRef}
      id="why-me"
      dir="rtl"
      className="relative flex min-h-svh flex-col overflow-hidden py-24"
      style={{
        background: "linear-gradient(180deg, #FFF5F2 0%, #F4F6F3 100%)",
      }}
    >
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-[-8%] h-[116%] w-[116%] origin-center"
          style={{ transform: "rotate(-6deg)" }}
          aria-hidden
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 text-center md:mb-14"
        >
          <div
            className="mb-6 inline-block rounded-full px-4 py-1.5 text-sm font-medium text-sage-600"
            style={{
              background: "rgba(138,158,132,0.1)",
              border: "1px solid rgba(138,158,132,0.25)",
            }}
          >
            لماذا تختارينني؟
          </div>

          <h2
            className="mb-5 text-4xl font-bold lg:text-5xl"
            style={{ fontFamily: "Georgia, serif", color: "#4A3530" }}
          >
            صحتكِ ورفاهيتكِ تستحقان
            <span style={{ color: "#8A9E84" }}> الأفضل</span>
          </h2>

          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-sage-600">
            إليكِ ما يجعل العمل معي تجربة داعمة ومؤثرة لكل امرأة في مختلف مراحل
            حياتها.
          </p>
        </motion.div>

        <div
          className={cn(
            "grid grid-cols-1 items-start gap-4 py-2 sm:grid-cols-3 sm:gap-5 sm:py-16",
          )}
        >
          {reasons.map((reason, index) =>
            reduced ? (
              <article
                key={reason.title}
                className="relative overflow-hidden rounded-[28px] p-5 text-right sm:rounded-[32px] sm:p-7"
                style={{
                  background: reason.gradient,
                  border: "1.5px solid rgba(255,255,255,0.7)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                  transform: `translateY(${STACK_Y[index]}px)`,
                }}
              >
                <CardCopy reason={reason} />
              </article>
            ) : (
              <FloatingCard
                key={reason.title}
                reason={reason}
                index={index}
                progress={scrollYProgress}
              />
            ),
          )}
        </div>
      </div>
    </section>
  );
}
