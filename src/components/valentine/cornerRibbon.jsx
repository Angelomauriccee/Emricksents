import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function CornerRibbon({
  src = "/valentineprops/main-ribbon.png",
  alt = "",
  width: customWidth,
  corner = "top-right",
  sway = true,
  className = "",
  shadowOpacity = 0.35,
  shadowBlur = 30,
  shadowSpread = 160,
  shadowOffsetX = 8,
  shadowOffsetY = 18,
}) {
  const isTop = corner.startsWith("top");
  const isRight = corner.endsWith("right");
  const CornerEl = sway ? motion.div : "div";

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200,
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ FLUID RESPONSIVE WIDTH (Scales smoothly across ALL viewports)
  const calculateResponsiveWidth = () => {
    // Mobile: 15% of viewport width (min 100px, max 150px)
    if (windowWidth <= 768) {
      return Math.min(Math.max(windowWidth * 0.15, 100), 150);
    }
    // Tablet: 12% of viewport width (min 150px, max 180px)
    if (windowWidth <= 1024) {
      return Math.min(Math.max(windowWidth * 0.12, 150), 180);
    }
    // Desktop: 10% of viewport width (min 180px, max 220px)
    return Math.min(Math.max(windowWidth * 0.1, 180), 220);
  };

  const responsiveWidth = calculateResponsiveWidth();
  const finalWidth = customWidth !== undefined ? customWidth : responsiveWidth;

  // ✅ PROPORTIONAL SHADOW SCALING (Prevents oversized shadows on small ribbons)
  const baseWidth = 220; // Reference width for shadow props
  const scaleRatio = finalWidth / baseWidth;
  const effectiveShadowSpread = shadowSpread * scaleRatio;
  const effectiveShadowOffsetX = shadowOffsetX * scaleRatio;
  const effectiveShadowOffsetY = shadowOffsetY * scaleRatio;

  return (
    <CornerEl
      className={["fixed pointer-events-none select-none", className].join(" ")}
      style={{
        zIndex: 80,
        width: finalWidth,
        [isTop ? "top" : "bottom"]:
          `env(safe-area-inset-${isTop ? "top" : "bottom"}, 0px)`,
        [isRight ? "right" : "left"]:
          `env(safe-area-inset-${isRight ? "right" : "left"}, 0px)`,
      }}
      {...(sway
        ? {
            animate: { rotate: [-0.7, 0.7, -0.7] },
            transition: {
              duration: 6,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            },
          }
        : {})}
      aria-hidden={alt === ""}
    >
      {/* ✅ PROPORTIONALLY SCALED SHADOW BLOB */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: "auto",
          [isTop ? "top" : "bottom"]: effectiveShadowOffsetY,
          [isRight ? "right" : "left"]: effectiveShadowOffsetX,
          width: effectiveShadowSpread,
          height: effectiveShadowSpread * 0.65,
          filter: `blur(${shadowBlur * scaleRatio}px)`,
          opacity: shadowOpacity,
          background:
            "radial-gradient(60% 60% at 50% 50%, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 80%)",
        }}
      />

      {/* ✅ IMAGE WITH NATURAL SCALING */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="block w-full h-auto"
        style={{
          marginTop: isTop ? -8 : 0,
          marginBottom: !isTop ? -8 : 0,
          filter:
            "drop-shadow(0 10px 18px rgba(0,0,0,.35)) drop-shadow(0 2px 2px rgba(0,0,0,.5))",
        }}
      />
    </CornerEl>
  );
}
