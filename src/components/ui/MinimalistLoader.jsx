import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import logoImage from '../../assets/logo.png';

const MinimalistLoader = ({ isLoading, progress = 0 }) => {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    if (!isLoading || !containerRef.current) return;

    // Logo gentle pulse
    gsap.killTweensOf(logoRef.current);
    gsap.fromTo(
      logoRef.current,
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: 'power2.out' }
    );
    gsap.to(logoRef.current, {
      scale: 1.05,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    // Minimal particles around logo (purely visual)
    const count = 8;
    particlesRef.current.forEach(p => p.remove());
    particlesRef.current = [];
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'absolute rounded-full bg-secondary';
      p.style.width = '4px';
      p.style.height = '4px';
      p.style.opacity = '0';

      const ang = (Math.PI * 2 * i) / count;
      const r = 120;
      const x = Math.cos(ang) * r;
      const y = Math.sin(ang) * r;

      p.style.left = '50%';
      p.style.top = '50%';
      p.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;

      containerRef.current.appendChild(p);
      particlesRef.current.push(p);

      gsap.to(p, { opacity: 0.6, scale: 1.5, duration: 1, delay: i * 0.1, ease: 'power2.out' });
      gsap.to(p, {
        opacity: 0.3,
        scale: 1,
        duration: 1.5,
        delay: 1 + i * 0.1,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    return () => {
      particlesRef.current.forEach(p => p.remove());
      particlesRef.current = [];
      gsap.killTweensOf(logoRef.current);
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
          transition={{ duration: 0.6 }}
          style={{ background: 'linear-gradient(135deg, #000, #1a1a1a 50%, #000)' }}
        >
          {/* Logo */}
          <div ref={logoRef} className="relative z-10 mb-8">
            <img
              src={logoImage}
              alt="EmrickScents"
              className="h-20 md:h-24 drop-shadow-[0_0_20px_rgba(212,175,55,0.3)]"
            />
          </div>

          {/* Progress bar (driven by parent) */}
          <div className="w-48 h-0.5 bg-gray-800 rounded-full overflow-hidden relative">
            <motion.div
              className="h-full bg-gradient-to-r from-secondary via-[#F5F5DC] to-secondary"
              style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
              initial={false}
            />
          </div>

          <motion.p
            className="mt-6 text-secondary text-xs tracking-[0.3em] uppercase font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Loading Excellence
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MinimalistLoader;
