// src/components/decor/FloatingShapes.jsx
import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";

// Stroke-only SVGs (CSP-safe)
const SvgTree = (p) => (
  <svg viewBox="0 0 64 64" {...p}>
    <path
      d="M32 6 22 22h8L18 36h10L12 52h40L36 36h10L34 22h8L32 6Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path d="M32 52V40" fill="none" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const SvgSnowflake = (p) => (
  <svg viewBox="0 0 64 64" {...p}>
    <path
      d="M32 8v48M8 32h48M16 16l32 32M48 16 16 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
const SvgBell = (p) => (
  <svg viewBox="0 0 64 64" {...p}>
    <path
      d="M48 44H16c4-6 4-10 4-16a12 12 0 1 1 24 0c0 6 0 10 4 16Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <circle
      cx="32"
      cy="48"
      r="3"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);
const SvgGift = (p) => (
  <svg viewBox="0 0 64 64" {...p}>
    <rect
      x="8"
      y="24"
      width="48"
      height="28"
      rx="2"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M8 32h48M32 24v28M20 24c-4 0-6-2-6-4s2-4 4-4c5 0 9 8 9 8h-7Zm24 0c4 0 6-2 6-4s-2-4-4-4c-5 0-9 8-9 8h7Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);
const SvgStar = (p) => (
  <svg viewBox="0 0 64 64" {...p}>
    <path
      d="m32 6 6.9 14 15.4 2.3-11.1 10.8 2.6 15.2L32 41.6 18.2 48.3l2.6-15.2L9.7 22.3 25.1 20 32 6Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);
const SvgCandyCane = (p) => (
  <svg viewBox="0 0 64 64" {...p}>
    <path
      d="M36 58V22a10 10 0 0 1 20 0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M46 14c-6 0-10 4-10 8m14-6c-4 0-8 3-8 6m12-4c-3 0-6 2-6 4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
const SvgOrnament = (p) => (
  <svg viewBox="0 0 64 64" {...p}>
    <circle
      cx="32"
      cy="36"
      r="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M28 12h8v6h-8zM24 18h16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

// Silence "defined but never used" when referenced dynamically
const _lintUse = [
  SvgTree,
  SvgSnowflake,
  SvgBell,
  SvgGift,
  SvgStar,
  SvgCandyCane,
  SvgOrnament,
];
void _lintUse;
const SHAPES = [
  SvgTree,
  SvgSnowflake,
  SvgBell,
  SvgGift,
  SvgStar,
  SvgCandyCane,
  SvgOrnament,
];

const FloatingShapes = ({
  count = 22,
  minSize = 20,
  maxSize = 38,
  minDur = 18,
  maxDur = 32,
  minSway = 10,
  maxSway = 26,
  baseOpacity = 0.35, // a bit stronger so it’s visible
  color = "rgba(255,255,255,.9)", // bright stroke on dark bg
  glow = "rgba(255,255,255,.10)",
  zIndexClass = "z-30", // above normal content, below modals/loader
  className = "",
}) => {
  const wrapRef = useRef(null);
  const itemRefs = useRef([]);

  const items = useMemo(() => {
    return Array.from({ length: count }).map(() => {
      const size = Math.round(Math.random() * (maxSize - minSize)) + minSize;
      const left = Math.random() * 100;
      // seed some inside the viewport so you see them immediately
      const startTop = Math.random() * 120 - 10; // -10% .. 110%
      const dur = Math.random() * (maxDur - minDur) + minDur;
      const sway =
        (Math.random() * (maxSway - minSway) + minSway) *
        (Math.random() < 0.5 ? -1 : 1);
      const delay = Math.random() * 4;
      const Shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
      return {
        size,
        left,
        startTop,
        dur,
        sway,
        delay,
        Shape,
        key: Math.random().toString(36).slice(2),
      };
    });
  }, [count, minSize, maxSize, minDur, maxDur, minSway, maxSway]);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const els = itemRefs.current.filter(Boolean);
    els.forEach((el, idx) => {
      const { dur, delay, sway } = items[idx];

      gsap.fromTo(
        el,
        { yPercent: 0, x: 0, rotate: 0, opacity: 0 },
        {
          yPercent: -160,
          opacity: baseOpacity,
          duration: dur,
          ease: "none",
          delay,
          repeat: -1,
          repeatDelay: Math.random() * 0.8,
        }
      );

      gsap.to(el, {
        x: sway,
        rotate: Math.random() * 10 - 5,
        duration: Math.random() * 3 + 2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: delay * 0.5,
      });
    });

    return () => {
      // only kill tweens for our elements to avoid touching other animations
      itemRefs.current.forEach((el) => el && gsap.killTweensOf(el));
    };
  }, [items, baseOpacity]);

  return (
    <div
      ref={wrapRef}
      className={`fixed inset-0 pointer-events-none ${zIndexClass} ${className}`}
      aria-hidden="true"
    >
      {items.map(({ size, left, startTop, Shape, key }, i) => (
        <div
          key={key}
          ref={(el) => (itemRefs.current[i] = el)}
          style={{
            position: "absolute",
            left: `${left}%`,
            top: `${startTop}%`,
            filter: `drop-shadow(0 0 3px ${glow})`,
            willChange: "transform, opacity",
          }}
        >
          <Shape width={size} height={size} style={{ color }} />
        </div>
      ))}
    </div>
  );
};

export default FloatingShapes;
