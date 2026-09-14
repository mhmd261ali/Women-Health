import { motion, type HTMLMotionProps } from "framer-motion";

export const fadeEase = [0.22, 1, 0.36, 1] as const;

export const fadeTransition = {
  duration: 0.75,
  ease: fadeEase,
};

/** Re-triggers when leaving/entering viewport → fade in & out */
export const fadeViewport = {
  once: false,
  amount: 0.18,
  margin: "0px 0px -40px 0px",
} as const;

type FadeInProps = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
};

export function FadeIn({
  children,
  className,
  delay = 0,
  y = 32,
  ...rest
}: FadeInProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={fadeViewport}
      transition={{ ...fadeTransition, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
