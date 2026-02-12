import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const SLIDE_INTERVAL = 3000; // 3s

export default function HeroCarousel({ slides = [] }) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);
  const touchStartX = useRef(null);
  const isHovering = useRef(false);

  const safeSlides = useMemo(() => slides.filter(Boolean), [slides]);
  const count = safeSlides.length || 1;

  const go = (dir) => {
    setIndex((i) => (i + dir + count) % count);
  };

  const start = () => {
    stop();
    timerRef.current = setInterval(() => {
      if (!isHovering.current) go(+1);
    }, SLIDE_INTERVAL);
  };
  const stop = () => timerRef.current && clearInterval(timerRef.current);

  useEffect(() => {
    start();
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  const onTouchStart = (e) =>
    (touchStartX.current = e.changedTouches[0].clientX);
  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - (touchStartX.current ?? 0);
    if (Math.abs(dx) > 40) go(dx > 0 ? -1 : +1);
    touchStartX.current = null;
  };

  if (!safeSlides.length) return null;

  const active = safeSlides[index];

  return (
    <section
      className="
    relative 
    w-full 
    overflow-hidden
    min-h-[60vh] 
    md:min-h-[70vh] 
    lg:min-h-[75vh]
    max-h-[800px]
    lg:max-h-[900px]
  "
      aria-roledescription="carousel"
      aria-label="Homepage promotions"
      onMouseEnter={() => (isHovering.current = true)}
      onMouseLeave={() => (isHovering.current = false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* ABSOLUTELY POSITIONED CONTENT FILLING THE ASPECT RATIO BOX */}
      <div className="absolute inset-0">
        {/* Slide */}
        <AnimatePresence initial={false}>
          <motion.div
            key={active.id || index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <picture className="block w-full h-full">
              {active.mobile && (
                <source media="(max-width: 768px)" srcSet={active.mobile} />
              )}
              {active.tablet && (
                <source
                  media="(min-width: 769px) and (max-width: 1024px)"
                  srcSet={active.tablet}
                />
              )}
              <img
                src={active.image}
                alt={active.alt}
                fetchpriority="high"
                className="
              w-full 
              h-full 
              object-cover 
              object-center
              md:object-[center_35%]
              lg:object-center
            "
                loading="eager"
              />
            </picture>
          </motion.div>
        </AnimatePresence>

        {/* Scrim */}
        <div className="absolute inset-0 bg-black/25" aria-hidden="true" />

        {/* Content - Perfectly centered in aspect ratio box */}
        <div
          className="
      absolute 
      inset-0 
      flex 
      items-center 
      justify-center 
      z-10 
      px-4 
      sm:px-6 
      lg:px-8
    "
        >
          <div className="max-w-3xl text-center md:text-left">
            {active.kicker && (
              <div className="mb-3 inline-block rounded-full border border-[#D4AF37]/40 px-3 py-1.5 text-xs tracking-wide text-[#F6E9D3]/90">
                {active.kicker}
              </div>
            )}
            <h1
              className="
          text-3xl 
          sm:text-4xl 
          md:text-5xl 
          lg:text-6xl 
          font-serif 
          text-[#F6E9D3] 
          drop-shadow-[0_2px_12px_rgba(0,0,0,.35)]
          leading-tight
        "
            >
              {active.title}
            </h1>
            {active.subtitle && (
              <p className="mt-4 text-lg md:text-xl text-[#E7E3DC] max-w-2xl mx-auto md:mx-0">
                {active.subtitle}
              </p>
            )}
            <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-3">
              {active.primary && (
                <Link
                  to={active.primary.to}
                  className="rounded-md bg-[#D4AF37] px-6 py-3 font-medium text-[#0b0b0b] shadow-[0_10px_30px_rgba(212,175,55,.25)] hover:brightness-110 transition-all"
                >
                  {active.primary.label}
                </Link>
              )}
              {active.secondary && (
                <Link
                  to={active.secondary.to}
                  className="rounded-md border border-[#D4AF37]/60 px-6 py-3 text-[#F6E9D3] hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all"
                >
                  {active.secondary.label}
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Dots - Repositioned for aspect ratio container */}
        <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
          <div className="flex gap-2">
            {safeSlides.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2 w-2 rounded-full transition ${
                  i === index
                    ? "bg-[#D4AF37] scale-110"
                    : "bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Arrows - Repositioned */}
        <button
          aria-label="Previous slide"
          onClick={() => go(-1)}
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 p-2.5 text-xl text-white/90 hover:bg-black/60 transition-colors"
        >
          ‹
        </button>
        <button
          aria-label="Next slide"
          onClick={() => go(1)}
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 p-2.5 text-xl text-white/90 hover:bg-black/60 transition-colors"
        >
          ›
        </button>
      </div>
    </section>
  );
}
