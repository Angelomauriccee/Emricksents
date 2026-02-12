import { memo } from "react";
import { Link } from "react-router-dom";

function ValentineHero() {
  return (
    <section
      className="relative isolate flex flex-col min-h-[86vh] items-center justify-center overflow-hidden bg-[#0b0b0b]"
      aria-label="Valentine promotion"
    >
      {/* Background image with art-direction */}
      <div className="relative w-full max-h-[86vh] flex items-center justify-center">
        <picture>
          <source
            media="(max-width: 640px)"
            srcSet="/valentine/valentine-hero-mobile.webp"
            type="image/webp"
          />
          <source
            media="(max-width: 1024px)"
            srcSet="/valentine/valentine-hero-tablet.webp"
            type="image/webp"
          />
          <img
            src="/valentine/valentine-hero@2x.webp"
            alt="Build Your Valentine Box — red and black gift boxes with gold ribbon"
            fetchpriority="high"
            className="
        pointer-events-none
        w-full
        h-auto
        max-h-[86vh]
        object-contain
        opacity-[0.92]
      "
          />
        </picture>
      </div>

      {/* Soft vignette only at the top */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,.65)] to-transparent h-[50%]"></div>

      {/* Corner ribbon (decor only) */}
      <img
        src="/valentine/ribbon-corner.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 w-[42vw] max-w-[520px] opacity-80 mix-blend-screen"
      />

      {/* Tiny love particles behind text */}
      <LoveParticles />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <h1 className="val-head text-balance text-4xl md:text-6xl lg:text-7xl font-serif text-[#F6E9D3]">
          <span className="val-sheen block">Build Your Valentine Box</span>
        </h1>

        <p className="mt-4 text-lg md:text-xl text-[#d7d7d7]">
          Curate 3–9 treats they’ll love — wrapped in gold.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/valentine/box"
            className="inline-flex items-center rounded-md bg-[#D4AF37] px-6 py-3 text-[#0b0b0b] font-medium shadow-[0_8px_24px_rgba(212,175,55,.25)] transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37]"
          >
            Build a Box
          </Link>
          <Link
            to="/valentine"
            className="inline-flex items-center rounded-md border border-[#D4AF37]/50 px-6 py-3 text-[#F6E9D3] transition hover:border-[#D4AF37] hover:shadow-[0_0_0_2px_inset_rgba(212,175,55,.35)]"
          >
            Browse Gifts
          </Link>
        </div>
      </div>

      {/* Subtle bottom fade into next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-[#0b0b0b]"></div>
    </section>
  );
}

export default memo(ValentineHero);
