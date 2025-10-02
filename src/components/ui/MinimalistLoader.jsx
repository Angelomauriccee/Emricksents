import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import logoImage from '../../assets/logo.png';

const MinimalistLoader = ({ isLoading, setIsLoading }) => {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const particlesRef = useRef([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoading && containerRef.current) {
      // Create timeline for smooth loading
      const timeline = gsap.timeline({
        onComplete: () => {
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.6,
            ease: 'power2.inOut',
            onComplete: () => setIsLoading(false)
          });
        }
      });

      // Logo pulse animation
      timeline.fromTo(
        logoRef.current,
        { 
          scale: 0.9,
          opacity: 0
        },
        { 
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out'
        }
      );

      // Continuous pulse effect
      gsap.to(logoRef.current, {
        scale: 1.05,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      // Create minimal particles (only 8 for minimalist look)
      const particleCount = 8;
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute rounded-full bg-secondary';
        
        const size = 4;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.opacity = '0';
        
        // Position in a circle around logo
        const angle = (Math.PI * 2 * i) / particleCount;
        const radius = 120;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        particle.style.left = '50%';
        particle.style.top = '50%';
        particle.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
        
        containerRef.current.appendChild(particle);
        particlesRef.current.push(particle);
        
        // Animate particles with stagger
        gsap.to(particle, {
          opacity: 0.6,
          scale: 1.5,
          duration: 1,
          delay: i * 0.1,
          ease: 'power2.out'
        });

        // Continuous pulse
        gsap.to(particle, {
          opacity: 0.3,
          scale: 1,
          duration: 1.5,
          delay: 1 + i * 0.1,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      }

      // Progress animation
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + 2;
        });
      }, 50);

      return () => {
        clearInterval(progressInterval);
        if (timeline) timeline.kill();
        particlesRef.current.forEach(p => p.remove());
        particlesRef.current = [];
      };
    }
  }, [isLoading, setIsLoading]);

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
          style={{
            background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)'
          }}
        >
          {/* Logo with pulse */}
          <div ref={logoRef} className="relative z-10 mb-8">
            <img 
              src={logoImage} 
              alt="EmrickScents" 
              className="h-20 md:h-24 filter drop-shadow-[0_0_20px_rgba(212,175,55,0.3)]"
            />
          </div>
          
          {/* Minimalist progress bar */}
          <div className="w-48 h-0.5 bg-gray-800 rounded-full overflow-hidden relative">
            <motion.div 
              className="h-full bg-gradient-to-r from-secondary via-[#F5F5DC] to-secondary"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          </div>
          
          {/* Subtle text */}
          <motion.p 
            className="mt-6 text-secondary text-xs tracking-[0.3em] uppercase font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Loading Excellence
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MinimalistLoader;