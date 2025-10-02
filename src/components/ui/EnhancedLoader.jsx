import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import logoImage from '../../assets/logo.png';

const EnhancedLoader = ({ isLoading, setIsLoading }) => {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const progressBarRef = useRef(null);
  const particlesContainerRef = useRef(null);
  const timeline = useRef(null);
  const [progress, setProgress] = useState(0);
  const [hasVisited, setHasVisited] = useState(false);

  useEffect(() => {
    // Check if user has visited before
    const visited = localStorage.getItem('emrickscents_visited');
    setHasVisited(!!visited);
  }, []);

  // Create and animate the loader
  useEffect(() => {
    if (isLoading && containerRef.current) {
      // Adjust duration based on visit status
      const duration = hasVisited ? 3 : 7;
      
      // Create GSAP timeline
      timeline.current = gsap.timeline({
        onComplete: () => {
          // Fade out the loader when complete
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.8,
            onComplete: () => setIsLoading(false)
          });
        }
      });

      // Create golden particles
      const particlesContainer = particlesContainerRef.current;
      const particleCount = window.innerWidth < 768 ? 25 : window.innerWidth < 1200 ? 35 : 50;
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute rounded-full';
        
        // Random size between 2px and 8px
        const size = 2 + Math.random() * 6;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random opacity between 20% and 60%
        const opacity = 0.2 + Math.random() * 0.4;
        particle.style.opacity = 0;
        
        // Gold color with glow
        particle.style.background = '#D4AF37';
        particle.style.boxShadow = `0 0 ${size * 2}px rgba(212, 175, 55, 0.6)`;
        
        // Start from center
        particle.style.left = '50%';
        particle.style.top = '50%';
        particle.style.transform = 'translate(-50%, -50%)';
        
        particlesContainer.appendChild(particle);
        
        // Phase 1: Particle Genesis - particles materialize and float outward
        const angle = (Math.PI * 2 * i) / particleCount;
        const distance = 100 + Math.random() * 200;
        const targetX = Math.cos(angle) * distance;
        const targetY = Math.sin(angle) * distance;
        
        timeline.current.to(particle, {
          opacity: opacity,
          duration: 0.5,
          delay: i * 0.02,
          ease: 'power2.out'
        }, 0);
        
        timeline.current.to(particle, {
          x: targetX,
          y: targetY,
          duration: 2,
          delay: i * 0.02,
          ease: 'power2.out'
        }, 0);
        
        // Phase 2: Fragrance Diffusion - particles form concentric circles
        timeline.current.to(particle, {
          scale: 1.5,
          opacity: opacity * 0.6,
          duration: 1,
          ease: 'sine.inOut'
        }, 2);
        
        // Phase 3: Converge around logo
        timeline.current.to(particle, {
          x: targetX * 0.3,
          y: targetY * 0.3,
          scale: 0.8,
          opacity: opacity * 0.4,
          duration: 1,
          ease: 'power2.inOut'
        }, 4);
        
        // Phase 4: Final burst
        timeline.current.to(particle, {
          x: targetX * 2,
          y: targetY * 2,
          opacity: 0,
          scale: 0.5,
          duration: 0.8,
          ease: 'power2.in'
        }, duration - 1);
      }

      // Create wave effects
      for (let i = 0; i < 3; i++) {
        const wave = document.createElement('div');
        wave.className = 'absolute rounded-full border-2 border-secondary';
        wave.style.width = '100px';
        wave.style.height = '100px';
        wave.style.left = '50%';
        wave.style.top = '50%';
        wave.style.transform = 'translate(-50%, -50%)';
        wave.style.opacity = 0;
        
        particlesContainer.appendChild(wave);
        
        timeline.current.fromTo(wave,
          { scale: 0.5, opacity: 0.4 },
          {
            scale: 4,
            opacity: 0,
            duration: 2,
            delay: 2 + i * 0.3,
            ease: 'power1.out'
          }
        );
      }

      // Logo animation - Phase 3: Brand Revelation
      timeline.current.fromTo(
        logoRef.current,
        { 
          opacity: 0,
          scale: 0.95,
          filter: 'blur(10px)'
        },
        { 
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: 'power2.out'
        },
        4
      );

      // Progress bar animation with liquid effect
      timeline.current.to(
        progressBarRef.current,
        {
          scaleX: 1,
          duration: duration - 1,
          ease: 'power1.inOut',
          onUpdate: function() {
            const progressValue = Math.round(this.progress() * 100);
            setProgress(progressValue);
          }
        },
        0.5
      );

      return () => {
        // Clean up timeline if component unmounts
        if (timeline.current) {
          timeline.current.kill();
        }
      };
    }
  }, [isLoading, setIsLoading, hasVisited]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div 
          ref={containerRef}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            background: 'linear-gradient(to bottom, #000000, #0a0a0a, #1a1a1a, #0a0a0a, #000000)'
          }}
        >
          {/* Particles container */}
          <div ref={particlesContainerRef} className="absolute inset-0 overflow-hidden"></div>
          
          {/* Logo */}
          <div ref={logoRef} className="relative z-10 mb-12">
            <img 
              src={logoImage} 
              alt="EmrickScents Logo" 
              className="h-24 md:h-32 filter drop-shadow-[0_0_20px_rgba(212,175,55,0.6)]"
            />
            <p className="text-center text-secondary text-sm mt-4 font-light tracking-wider">
              Crafting Luxury Since 2024
            </p>
          </div>
          
          {/* Progress bar with shimmer effect */}
          <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden relative">
            <div 
              ref={progressBarRef} 
              className="h-full bg-gradient-to-r from-secondary via-[#F5F5DC] to-secondary origin-left relative"
              style={{ transform: 'scaleX(0)' }}
            >
              {/* Shimmer effect */}
              <div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                style={{
                  animation: 'shimmer 2s infinite',
                  backgroundSize: '200% 100%'
                }}
              ></div>
            </div>
          </div>
          
          {/* Progress percentage */}
          <div className="mt-4 text-secondary text-sm font-light tracking-wider">
            {progress}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnhancedLoader;