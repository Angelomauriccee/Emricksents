import { useEffect, useRef } from "react";

/**
 * Subtle site-wide snowfall (performance-friendly)
 * - respects prefers-reduced-motion
 * - pauses when tab is hidden
 * - pointer-events: none (never blocks clicks)
 */
export default function Snowfall({
  enabled = true,
  density = 0.45, // 0.2 (very light) → 1 (busy). Keep ≤ 0.6 so it stays subtle
  maxSize = 2.2, // max flake radius (px)
  maxSpeed = 0.55, // max vertical speed (px/frame)
  wind = 0.15, // slight horizontal drift
  zIndex = 1, // render under headers if you want (increase if needed)
}) {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const flakesRef = useRef([]);
  const pausedRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return; // respect user setting

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: true });
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // flake count scales with viewport area
    const base = Math.sqrt((w * h) / 9000); // tuned for subtlety on big screens
    const count = Math.max(18, Math.floor(base * 40 * density));

    // init flakes
    flakesRef.current = Array.from({ length: count }).map(() =>
      makeFlake(w, h, maxSize, maxSpeed)
    );

    const onVisibility = () => {
      pausedRef.current = document.hidden;
      if (!pausedRef.current) tick(); // resume immediately
    };
    document.addEventListener("visibilitychange", onVisibility);

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      const baseR = Math.sqrt((w * h) / 9000);
      const nextCount = Math.max(18, Math.floor(baseR * 40 * density));
      // adjust population without popping
      if (nextCount > flakesRef.current.length) {
        const add = nextCount - flakesRef.current.length;
        for (let i = 0; i < add; i++)
          flakesRef.current.push(makeFlake(w, h, maxSize, maxSpeed));
      } else if (nextCount < flakesRef.current.length) {
        flakesRef.current.length = nextCount;
      }
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(document.body);

    // animation loop
    function tick() {
      if (pausedRef.current) return;
      rafRef.current = requestAnimationFrame(tick);
      ctx.clearRect(0, 0, w, h);

      ctx.save();
      // faint glow so flakes read on very dark bg
      ctx.shadowColor = "rgba(255,255,255,.25)";
      ctx.shadowBlur = 1;

      for (const f of flakesRef.current) {
        f.y += f.spdY;
        f.x += f.spdX + wind * 0.2;
        f.phase += f.wobble;
        f.x += Math.sin(f.phase) * 0.08; // tiny sway

        if (f.y > h + 6) {
          // recycle to top
          f.y = -6;
          f.x = Math.random() * w;
        }
        if (f.x > w + 6) f.x = -6;
        if (f.x < -6) f.x = w + 6;

        ctx.globalAlpha = f.alpha;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.9)";
        ctx.fill();
      }
      ctx.restore();
    }

    tick();
    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener("visibilitychange", onVisibility);
      ro.disconnect();
    };
  }, [enabled, density, maxSize, maxSpeed, wind]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0"
      style={{ zIndex }}
    />
  );
}

function makeFlake(w, h, maxSize, maxSpeed) {
  const r = 0.8 + Math.random() * (maxSize - 0.8);
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    r,
    spdY: 0.15 + Math.random() * maxSpeed, // gentle fall
    spdX: (Math.random() - 0.5) * 0.15, // tiny horizontal drift
    wobble: 0.02 + Math.random() * 0.03, // sway speed
    phase: Math.random() * Math.PI * 2,
    alpha: 0.25 + Math.random() * 0.35, // keep it subtle
  };
}
