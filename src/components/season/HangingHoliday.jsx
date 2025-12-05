import { motion } from "framer-motion";

/**
 * Elegant gold/duotone line icons that match a dark, luxury theme.
 * Tweak colors via props. Ropes touch icons directly. Gentle sway.
 */
const accentDefault = "#d4af37"; // gold
const mutedDefault = "rgba(212,175,55,0.45)"; // soft gold

/* ---- Minimal line icons (stroke only) ---- */
const SockLine = ({
  size = 28,
  accent = accentDefault,
  muted = mutedDefault,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    aria-hidden="true"
    role="img"
  >
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path
        d="M22 10h20a4 4 0 0 1 4 4v6H18v-6a4 4 0 0 1 4-4Z"
        stroke={accent}
        strokeWidth="2"
      />
      <path
        d="M22 20v18c0 4-3 7-7 8-5 1-9 5-9 10 0 5 4 8 10 8h12c8 0 14-6 14-14V20"
        stroke={accent}
        strokeWidth="2"
      />
      <path d="M24 26h16M24 31h16" stroke={muted} strokeWidth="1.6" />
      <path d="M18 48c1.2-2 4.6-3 9.8-3H34" stroke={muted} strokeWidth="1.6" />
    </g>
  </svg>
);

const CaneLine = ({
  size = 28,
  accent = accentDefault,
  muted = mutedDefault,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    aria-hidden="true"
    role="img"
  >
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* hook */}
      <path
        d="M36 10c0-4-3-7-8-7s-8 3-8 7 3 7 8 7"
        stroke={accent}
        strokeWidth="2"
      />
      {/* shaft */}
      <path d="M28 20v34" stroke={accent} strokeWidth="2" />
      {/* stripes */}
      <path
        d="M24 24h8M24 32h8M24 40h8M24 48h8"
        stroke={muted}
        strokeWidth="1.6"
      />
    </g>
  </svg>
);

const BellLine = ({
  size = 26,
  accent = accentDefault,
  muted = mutedDefault,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    aria-hidden="true"
    role="img"
  >
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path
        d="M32 10c-10 0-18 8-18 18v10l-4 6h44l-4-6V28c0-10-8-18-18-18Z"
        stroke={accent}
        strokeWidth="2"
      />
      <path d="M14 38h36" stroke={muted} strokeWidth="1.6" />
      <circle cx="32" cy="48" r="4.5" stroke={accent} strokeWidth="2" />
      <circle cx="32" cy="10" r="3.5" stroke={muted} strokeWidth="1.6" />
    </g>
  </svg>
);

const TreeLine = ({
  size = 28,
  accent = accentDefault,
  muted = mutedDefault,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    aria-hidden="true"
    role="img"
  >
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M32 8 18 24h28L32 8Z" stroke={accent} strokeWidth="2" />
      <path d="M32 18 16 34h32L32 18Z" stroke={accent} strokeWidth="2" />
      <path d="M32 26 14 42h36L32 26Z" stroke={accent} strokeWidth="2" />
      <rect
        x="28.5"
        y="42.5"
        width="7"
        height="8.5"
        rx="1.5"
        stroke={muted}
        strokeWidth="1.6"
      />
      {/* subtle baubles */}
      <circle cx="24" cy="30" r="2" stroke={muted} strokeWidth="1.6" />
      <circle cx="40" cy="32" r="2" stroke={muted} strokeWidth="1.6" />
    </g>
  </svg>
);

const ITEMS = () => [
  // Sock (gold)
  {
    left: "2%",
    rope: 54,
    swing: 2.2,
    dur: 2.7,
    Icon: SockLine,
    size: 28,
    accent: "#d4af37",
    muted: "rgba(212,175,55,0.45)",
  },

  // Bell (gold)
  {
    left: "15%",
    rope: 62,
    swing: 1.8,
    dur: 2.9,
    Icon: BellLine,
    size: 26,
    accent: "#d4af37",
    muted: "rgba(212,175,55,0.45)",
  },

  // Candy cane — white body + red stripes
  {
    left: "81%",
    rope: 56,
    swing: 2.5,
    dur: 2.4,
    Icon: CaneLine,
    size: 28,
    accent: "#ffffff",
    muted: "#e53935",
  },

  // Tree — elegant green + light green ornaments
  {
    left: "94%",
    rope: 66,
    swing: 1.7,
    dur: 3.1,
    Icon: TreeLine,
    size: 28,
    accent: "#12d18e",
    muted: "#7ae5c2",
  },
];

export default function HangingHolidayIconsElegant({
  isScrolled = false,
  accent = accentDefault,
  muted = mutedDefault,
}) {
  const items = ITEMS(accent, muted);
  return (
    <div
      className={`pointer-events-none absolute left-0 right-0 ${
        isScrolled ? "bottom-0" : "top-0"
      }`}
      style={{ zIndex: 45 }}
      aria-hidden="true"
    >
      <div className="relative mx-auto px-4" style={{ maxWidth: "1200px" }}>
        {items.map(({ left, rope, swing, dur, Icon, size }, i) => (
          <div key={i} className="absolute" style={{ left }}>
            {/* Rope */}
            <div
              className="mx-auto w-[2px]"
              style={{
                height: rope,
                background:
                  "linear-gradient(to bottom, rgba(255,255,255,.55), rgba(255,255,255,.18))",
                boxShadow: "0 0 6px rgba(255,255,255,0.10)",
              }}
            />
            {/* Icon (touching rope) */}
            <motion.div
              className="origin-top mx-auto select-none"
              animate={{ rotate: [-swing, swing, -swing] }}
              transition={{
                duration: dur,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
              style={{
                marginTop: -2,
                filter:
                  "drop-shadow(0 1px 1px rgba(0,0,0,.6)) drop-shadow(0 4px 8px rgba(0,0,0,.35))",
              }}
              draggable={false}
            >
              <Icon size={size} accent={accent} muted={muted} />
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
