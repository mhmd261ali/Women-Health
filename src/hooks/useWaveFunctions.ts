import { useEffect, useRef } from "react";
import { createNoise3D } from "simplex-noise";
import { useReducedMotion } from "framer-motion";

/** Site palette: coral / peach / sage */
const WAVE_COLORS = [
  "#D4756A",
  "#E8776F",
  "#F2A08E",
  "#8A9E84",
  "#9DAE97",
];

export function useWaveFunctions(
  speed: "slow" | "fast",
  blur: number,
  waveWidth?: number,
  waveOpacity?: number,
) {
  const reducedMotion = useReducedMotion();
  const noiseRef = useRef(createNoise3D());
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    ctx: null as CanvasRenderingContext2D | null,
    w: 0,
    h: 0,
    nt: 0,
    animationId: 0,
    opacityPhase: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const state = stateRef.current;
    state.ctx = canvas.getContext("2d");
    if (!state.ctx) return;

    const noise = noiseRef.current;
    const speedValue = speed === "fast" ? 0.0012 : 0.00055;

    const resizeCanvas = () => {
      if (!canvas || !state.ctx) return;
      const parent = canvas.parentElement;
      state.w = canvas.width = parent?.clientWidth || window.innerWidth;
      state.h = canvas.height = parent?.clientHeight || window.innerHeight;
      state.ctx.filter = `blur(${blur}px)`;
    };

    const drawWave = (count: number) => {
      if (!state.ctx) return;
      const ctx = state.ctx;
      state.nt += reducedMotion ? 0 : speedValue;
      state.opacityPhase += reducedMotion ? 0 : 0.002;

      const baseOpacity = waveOpacity ?? 0.28;
      const pulse = reducedMotion
        ? 0
        : Math.sin(state.opacityPhase) * 0.04;

      ctx.clearRect(0, 0, state.w, state.h);

      for (let i = 0; i < count; i++) {
        const color = WAVE_COLORS[i % WAVE_COLORS.length];
        const isSage = color === "#8A9E84" || color === "#9DAE97";
        const layerOpacity = isSage
          ? baseOpacity * 0.7 + pulse * 0.5
          : baseOpacity + pulse;

        ctx.beginPath();
        ctx.lineWidth = waveWidth || 42;
        ctx.strokeStyle = color;
        ctx.globalAlpha = layerOpacity;

        const verticalOffset = state.h * (0.38 + i * 0.05);
        // Gentle diagonal slope so waves feel oblique
        const slope = state.h * 0.14;

        for (let x = 0; x < state.w; x += 5) {
          const drift = reducedMotion ? 0 : Math.sin(state.nt * 0.35 + i) * 8;
          const tilt = (x / state.w) * slope;
          const y =
            noise(x / 900 + drift * 0.01, 0.28 * i, state.nt) * 90 +
            drift +
            tilt;
          ctx.lineTo(x, y + verticalOffset);
        }

        ctx.stroke();
        ctx.closePath();
      }

      ctx.globalAlpha = 1;
    };

    const render = () => {
      drawWave(5);
      if (!reducedMotion) {
        state.animationId = requestAnimationFrame(render);
      }
    };

    resizeCanvas();
    state.nt = 0;
    render();

    window.addEventListener("resize", resizeCanvas);
    return () => {
      cancelAnimationFrame(state.animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [blur, reducedMotion, speed, waveOpacity, waveWidth]);

  return { canvasRef };
}
