import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ValentineHeartsAccent = ({
  src = "/valentineprops/hearttt.png",
  width = 300,
  alt = "Valentine's decorative heart",
  className = "",
  shadowOpacity = 0.35,
  shadowBlur = 36,
  shadowSpread = 220,
  shadowOffsetX = 14,
  shadowOffsetY = 20,
  insetX = 0,
  insetY = 0,
}) => {
  const [hearts, setHearts] = useState([]);
  const shadow = `drop-shadow(${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px rgba(0,0,0,${shadowOpacity}))`;

  // Generate shooting hearts
  useEffect(() => {
    const createHeart = () => {
      const id = Date.now();
      setHearts((prev) => [...prev, { id }]);

      // Auto-remove after animation completes
      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== id));
      }, 3000);
    };

    const interval = setInterval(createHeart, 1800); // New heart every 1.8 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 z-[60] pointer-events-none ${className}`}
      style={{
        paddingLeft: insetX,
        paddingBottom: insetY,
      }}
      aria-hidden="true"
    >
      {/* Base Heart (Static) */}
      <img
        src={src}
        alt={alt}
        draggable={false}
        className="select-none"
        style={{
          width,
          height: "auto",
          filter: `${shadow} drop-shadow(0 0 ${shadowSpread}px rgba(0,0,0,0.18))`,
        }}
      />

      {/* Shooting Hearts Container */}
      <div className="fixed bottom-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <AnimatePresence>
          {hearts.map((heart) => {
            // Random direction for variety
            const direction = Math.random() > 0.5 ? 1 : -1;
            const xOffset = direction * (Math.random() * 120 + 80);
            const yOffset = Math.random() * 60 + 40;
            const size = Math.random() * 12 + 8; // 8px to 20px

            return (
              <motion.div
                key={heart.id}
                className="absolute text-red-400/90"
                style={{
                  // Start position: near center of base heart
                  left: `${insetX + width / 2}px`,
                  bottom: `${insetY + width / 2.5}px`,
                  fontSize: `${size}px`,
                }}
                initial={{ opacity: 1, scale: 0.3 }}
                animate={{
                  opacity: 0,
                  scale: 1.2,
                  y: [-yOffset, -yOffset * 1.8], // Float upward
                  x: xOffset, // Drift left/right
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 3,
                  ease: "easeOut",
                }}
              >
                ❤️
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ValentineHeartsAccent;
