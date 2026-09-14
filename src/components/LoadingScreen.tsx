import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import logo from "../images/Logo.png";

const ease = [0.22, 1, 0.36, 1] as const;

/** Loading screen duration */
const SEQUENCE_MS = 3000;

type LoadingScreenProps = {
  minDuration?: number;
};

export default function LoadingScreen({
  minDuration = SEQUENCE_MS,
}: LoadingScreenProps) {
  const [visible, setVisible] = useState(true);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setShowText(true), 900);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const started = Date.now();
    let cancelled = false;
    let timeoutId: number | undefined;

    const finish = () => {
      const elapsed = Date.now() - started;
      const wait = Math.max(0, minDuration - elapsed);
      timeoutId = window.setTimeout(() => {
        if (!cancelled) setVisible(false);
      }, wait);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener("load", finish);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [minDuration]);

  useEffect(() => {
    if (!visible) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{
            background:
              "linear-gradient(145deg, #FDFAF8 0%, #FAD9D5 40%, #E4E9E2 100%)",
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease }}
        >
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(212,117,106,0.22), transparent 65%)",
            }}
            animate={{ scale: [1, 1.08, 1], opacity: [0.45, 0.75, 0.45] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="pointer-events-none absolute -left-16 top-20 h-64 w-64 rounded-full opacity-30 blur-3xl"
            style={{ background: "radial-gradient(circle, #D4756A, transparent)" }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="pointer-events-none absolute -right-12 bottom-16 h-56 w-56 rounded-full opacity-25 blur-3xl"
            style={{ background: "radial-gradient(circle, #8A9E84, transparent)" }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.18, 0.3, 0.18] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            className="relative z-10 flex items-center justify-center gap-5 px-6 sm:gap-8 md:gap-10"
            dir="ltr"
            layout
            transition={{ layout: { duration: 0.95, ease } }}
          >
            <motion.div
              layout
              className="relative flex shrink-0 items-center justify-center"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.05, ease }}
              style={{
                filter:
                  "drop-shadow(0 0 22px rgba(255,255,255,0.4)) drop-shadow(0 0 40px rgba(212,117,106,0.28))",
              }}
            >
              <motion.img
                src={logo}
                alt="خطوة"
                className="h-80 w-80 object-contain sm:h-96 sm:w-96 md:h-[28rem] md:w-[28rem]"
                animate={{
                  scale: [1, 1.03, 1],
                  filter: [
                    "brightness(1)",
                    "brightness(1.1)",
                    "brightness(1)",
                  ],
                }}
                transition={{
                  duration: 2.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            <AnimatePresence>
              {showText && (
                <motion.div
                  key="tagline"
                  className="max-w-[16rem] text-right sm:max-w-md md:max-w-lg"
                  dir="rtl"
                  initial={{ opacity: 0, x: 56, filter: "blur(10px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, ease }}
                >
                  <p
                    className="text-xl leading-relaxed sm:text-2xl md:text-[1.85rem] font-medium tracking-wide text-sage-600"
                    style={{ fontFamily: "system-ui, sans-serif" }}
                  >
                    كل <span className="font-semibold" style={{ color: "#D4756A" }}>خطوة</span> صغيرة، هي
                    بداية
                  </p>
                  <p
                    className="mt-1 text-xl leading-relaxed sm:text-2xl md:text-[1.85rem] font-medium tracking-wide text-sage-600"
                    style={{ fontFamily: "system-ui, sans-serif" }}
                  >
                    لمشوار أكبر
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
