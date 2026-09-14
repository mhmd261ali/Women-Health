import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ParticlesSwarm } from "../lib/ParticlesSwarm";

type ParticlesSwarmBackgroundProps = {
  className?: string;
  count?: number;
};

export default function ParticlesSwarmBackground({
  className = "",
  count = 2800,
}: ParticlesSwarmBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = containerRef.current;
    if (!el) return;

    const swarm = new ParticlesSwarm(el, count, {
      radiusOuter: 34,
      radiusInner: 12,
      neuroActivity: 0.2,
      chaosFactor: 0.45,
      pulseSpeed: 0.7,
    });

    return () => swarm.dispose();
  }, [count, reduced]);

  return (
    <motion.div
      className={`pointer-events-none absolute z-[5] overflow-hidden rounded-full ${className}`}
      style={{
        width: 280,
        height: 280,
        x: "-50%",
        background: "transparent",
      }}
      animate={reduced ? undefined : { y: [0, -14, 0] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden
    >
      <div ref={containerRef} className="absolute inset-0" />
    </motion.div>
  );
}
