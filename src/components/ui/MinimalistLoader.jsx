import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import logoImage from "../../assets/logo.png";

const MinimalistLoader = ({ isLoading, progress = 0 }) => {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const particlesRef = useRef([]);

  // pulse + decorative particles (purely visual)
  useEffect(() => {
    if (!isLoading || !containerRef.current) return;

    // Pulse the logo
    const pulse = gsap.to(logoRef.current, {
      scale: 1.05,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Minimal, circular particles
    const particleCount = 8;
    for (let i = 0; i < particleCount; i++) {
      const p = document.createElement("div");
      p.className = "absolute rounded-full bg-secondary";
      p.style.width = "4px";
      p.style.height = "4px";
      p.style.opacity = "0";

      const angle = (Math.PI * 2 * i) / particleCount;
      const radius = 120;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      p.style.left = "50%";
      p.style.top = "50%";
      p.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;

      containerRef.current.appendChild(p);
      particlesRef.current.push(p);

      gsap.to(p, {
        opacity: 0.6,
        scale: 1.5,
        duration: 1,
        delay: i * 0.1,
        ease: "easeOut",
      });

      gsap.to(p, {
        opacity: 0.3,
        scale: 1,
        duration: 1.5,
        delay: 1 + i * 0.1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    return () => {
      pulse.kill();
      particlesRef.current.forEach((p) => p.remove());
      particlesRef.current = [];
    };
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          ref={containerRef}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
          style={{
            background:
              "linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)",
          }}
        >
          {/* Logo */}
          <motion.div
            ref={logoRef}
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative z-10 mb-8"
          >
            <img
              src={logoImage}
              alt="EmrickScents"
              className="h-20 md:h-24 filter drop-shadow-[0_0_20px_rgba(212,175,55,0.3)]"
            />
          </motion.div>

          {/* Progress bar — gold, no candy stripes */}
          <div className="w-48 h-0.5 bg-gray-800 rounded-full overflow-hidden relative">
            <motion.div
              className="h-full"
              style={{
                width: `${Math.max(0, Math.min(100, progress))}%`,
                // soft luxury gold sweep
                background:
                  "linear-gradient(90deg, rgba(212,175,55,0.35), rgba(212,175,55,0.95))",
              }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            />
          </div>

          {/* Subtle text */}
          <motion.p
            className="mt-6 text-secondary text-xs tracking-[0.3em] uppercase font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Loading Excellence {Math.max(0, Math.min(100, progress))}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MinimalistLoader;
