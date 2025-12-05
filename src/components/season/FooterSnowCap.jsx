import React from "react";

/**
 * FooterSnowCap
 * A layered “snow pile” that sits at the very bottom of the footer.
 * - Scalloped edge (SVG) + soft snow bed + subtle sparkle texture
 * - No interactivity; purely decorative
 */
export default function FooterSnowCap() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 overflow-visible">
      {/* Scalloped edge */}
      <svg
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        className="block w-full h-16 md:h-20"
        aria-hidden="true"
      >
        <path
          d="
            M0,80 
            C80,120 160,120 240,80
            C320,40 400,40 480,80
            C560,120 640,120 720,80
            C800,40 880,40 960,80
            C1040,120 1120,120 1200,80
            C1280,40 1360,40 1440,80
            L1440,0 L0,0 Z"
          fill="url(#snow-grad)"
        />
        <defs>
          <linearGradient id="snow-grad" x1="0" x2="0" y1="1" y2="0">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f7f8fb" />
          </linearGradient>
        </defs>
      </svg>

      {/* Main snow bed */}
      <div
        className="w-full"
        style={{
          height: "68px",
          background:
            "linear-gradient(to bottom, #ffffff 0%, #f7f8fb 55%, rgba(255,255,255,0.95) 100%)",
          boxShadow:
            "0 -10px 30px rgba(255,255,255,0.25), 0 -2px 10px rgba(255,255,255,0.35)",
        }}
      />

      {/* Subtle sparkle/texture overlay */}
      <div
        className="w-full -mt-10 opacity-60"
        style={{
          height: "40px",
          background:
            "radial-gradient(6px 6px at 20% 60%, rgba(255,255,255,0.45) 0, rgba(255,255,255,0) 65%), \
             radial-gradient(5px 5px at 40% 40%, rgba(255,255,255,0.35) 0, rgba(255,255,255,0) 65%), \
             radial-gradient(4px 4px at 65% 55%, rgba(255,255,255,0.35) 0, rgba(255,255,255,0) 65%), \
             radial-gradient(6px 6px at 82% 45%, rgba(255,255,255,0.35) 0, rgba(255,255,255,0) 65%)",
          backdropFilter: "blur(0.2px)",
        }}
      />

      {/* Small snow mounds (depth) */}
      <div className="absolute inset-x-0 -top-2 flex justify-center gap-6 md:gap-10">
        <div
          className="rounded-full"
          style={{
            width: 22,
            height: 10,
            background:
              "radial-gradient(circle at 50% 60%, #ffffff 0%, #f7f8fb 70%, rgba(255,255,255,0.9) 100%)",
            filter: "blur(0.2px)",
          }}
        />
        <div
          className="rounded-full"
          style={{
            width: 32,
            height: 12,
            background:
              "radial-gradient(circle at 50% 60%, #ffffff 0%, #f7f8fb 70%, rgba(255,255,255,0.9) 100%)",
            filter: "blur(0.2px)",
          }}
        />
        <div
          className="rounded-full"
          style={{
            width: 18,
            height: 8,
            background:
              "radial-gradient(circle at 50% 60%, #ffffff 0%, #f7f8fb 70%, rgba(255,255,255,0.9) 100%)",
            filter: "blur(0.2px)",
          }}
        />
      </div>
    </div>
  );
}
