// src/components/promo/PromoCardSlideshow.jsx
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

/**
 * Minimal, smooth crossfade slideshow per card.
 * - images: string[] (3–5 recommended)
 * - intervalRange: [minMs, maxMs] — each frame picks a random duration in range
 * - pauseOnHover: boolean
 */
const PromoCardSlideshow = ({
  href = "/shop",
  images = [],
  intervalRange = [2000, 4000],
  pauseOnHover = true,
  className = "",
}) => {
  const [active, setActive] = useState(() =>
    images.length ? Math.floor(Math.random() * images.length) : 0
  );
  const timerRef = useRef(null);
  const pausedRef = useRef(false);

  // prefetch images once
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);

  useEffect(() => {
    if (!images.length) return;

    const tick = () => {
      const [min, max] = intervalRange;
      const nextDelay = Math.max(1000, Math.floor(Math.random() * (max - min + 1)) + min);
      timerRef.current = setTimeout(() => {
        if (!pausedRef.current) {
          setActive((i) => (i + 1) % images.length);
        }
        tick();
      }, nextDelay);
    };

    tick();
    return () => clearTimeout(timerRef.current);
  }, [images.length, intervalRange]);

  const onEnter = () => {
    if (!pauseOnHover) return;
    pausedRef.current = true;
    clearTimeout(timerRef.current);
  };
  const onLeave = () => {
    if (!pauseOnHover) return;
    pausedRef.current = false;
    clearTimeout(timerRef.current);
    // restart quickly after hover
    timerRef.current = setTimeout(() => {
      setActive((i) => (i + 1) % images.length);
    }, 500);
  };

  return (
    <Link
      to={href}
      aria-label="Open promo"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={`group relative block overflow-hidden rounded-2xl shadow-lg ring-1 ring-white/10 ${className}`}
    >
      {/* stack all frames, fade the active one in */}
      <div className="absolute inset-0">
        {images.map((src, i) => (
          <img
            key={src + i}
            src={src}
            alt=""
            loading="lazy"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* subtle hover zoom */}
      <div className="absolute inset-0 scale-100 transition-transform duration-[900ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.03]" />
    </Link>
  );
};

export default PromoCardSlideshow;
