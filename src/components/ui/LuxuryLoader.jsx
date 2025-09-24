import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

const LuxuryLoader = ({ isLoading, setIsLoading }) => {
  const [currentPhase, setCurrentPhase] = useState(0);
  const containerRef = useRef(null);
  const timeline = useRef(null);
  
  // Animation timeline
  useEffect(() => {
    if (isLoading && containerRef.current) {
      // Initialize GSAP timeline
      timeline.current = gsap.timeline({
        onComplete: () => {
          // Complete the loading process
          setIsLoading(false);
        }
      });
      
      // Start with Phase 0 (initial state)
      setCurrentPhase(0);
      
      // Phase transitions with timeline
      // Each phase will automatically transition to the next
      
      // Phase 1: Droplet animation (0-2s)
      timeline.current.call(() => setCurrentPhase(1), [], 0);
      
      // Phase 2: Smoke and text (2-7s)
      timeline.current.call(() => setCurrentPhase(2), [], 2);
      
      // Phase 3: Golden particles and brand name (7-12s)
      timeline.current.call(() => setCurrentPhase(3), [], 7);
      
      // Phase 4: Finale (12-15s)
      timeline.current.call(() => setCurrentPhase(4), [], 12);
      
      // Total animation duration: 15s
      return () => {
        // Clean up timeline if component unmounts
        if (timeline.current) {
          timeline.current.kill();
        }
      };
    }
  }, [isLoading, setIsLoading]);

  // Render the droplet animation (Phase 1)
  const DropletAnimation = () => {
    const dropletRef = useRef(null);
    const rippleRef = useRef(null);
    
    useEffect(() => {
      if (dropletRef.current && rippleRef.current) {
        // Droplet falling animation
        gsap.fromTo(
          dropletRef.current,
          { 
            y: -100, 
            opacity: 0,
            scale: 0.5
          },
          { 
            y: 0, 
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power2.out"
          }
        );
        
        // Ripple effect animation
        gsap.fromTo(
          rippleRef.current,
          { 
            scale: 0.1,
            opacity: 0.8
          },
          { 
            scale: 3,
            opacity: 0,
            duration: 1.5,
            delay: 0.5,
            ease: "power1.out"
          }
        );
      }
    }, []);
    
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <div ref={dropletRef} className="relative">
          <div className="w-12 h-16 bg-gradient-to-b from-secondary/80 to-secondary rounded-full rounded-t-[70%] transform rotate-12 filter drop-shadow-[0_0_10px_rgba(212,175,55,0.7)]"></div>
          <div ref={rippleRef} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border-2 border-secondary/50"></div>
        </div>
      </div>
    );
  };

  // Render the smoke and text animation (Phase 2)
  const SmokeTextAnimation = () => {
    const smokeRef = useRef(null);
    const textRef = useRef(null);
    
    useEffect(() => {
      if (smokeRef.current && textRef.current) {
        // Smoke swirling animation
        gsap.fromTo(
          smokeRef.current,
          { 
            opacity: 0,
            scale: 0.8
          },
          { 
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: "power1.inOut"
          }
        );
        
        // Create smoke particles
        const smokeContainer = smokeRef.current;
        for (let i = 0; i < 8; i++) {
          const particle = document.createElement('div');
          particle.className = 'absolute rounded-full bg-gradient-radial from-gray-500/20 to-transparent';
          
          // Random size and position
          const size = 100 + Math.random() * 200;
          particle.style.width = `${size}px`;
          particle.style.height = `${size}px`;
          particle.style.left = `${Math.random() * 100}%`;
          particle.style.top = `${Math.random() * 100}%`;
          particle.style.opacity = 0.1 + Math.random() * 0.3;
          
          smokeContainer.appendChild(particle);
          
          // Animate smoke particles
          gsap.to(particle, {
            x: (Math.random() - 0.5) * 50,
            y: (Math.random() - 0.5) * 50,
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.2, 1],
            duration: 5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });
        }
        
        // Text fade in animation
        gsap.fromTo(
          textRef.current,
          { 
            opacity: 0,
            y: 20,
            filter: "blur(10px)"
          },
          { 
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.5,
            delay: 0.5,
            ease: "power2.out"
          }
        );
      }
    }, []);
    
    return (
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <div ref={smokeRef} className="absolute inset-0 opacity-70"></div>
        <div ref={textRef} className="relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-serif text-secondary mb-4 filter drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]">
            Every scent begins with a story...
          </h2>
        </div>
      </div>
    );
  };

  // Render the golden particles and brand name animation (Phase 3)
  const ParticlesBrandAnimation = () => {
    const particlesRef = useRef(null);
    const brandRef = useRef(null);
    const taglineRef = useRef(null);
    
    useEffect(() => {
      if (particlesRef.current && brandRef.current && taglineRef.current) {
        // Create golden particles
        const particlesContainer = particlesRef.current;
        for (let i = 0; i < 50; i++) {
          const particle = document.createElement('div');
          particle.className = 'absolute rounded-full bg-secondary';
          
          // Random size and position
          const size = 2 + Math.random() * 4;
          particle.style.width = `${size}px`;
          particle.style.height = `${size}px`;
          particle.style.left = `${Math.random() * 100}%`;
          particle.style.top = `${Math.random() * 100}%`;
          particle.style.opacity = 0;
          
          particlesContainer.appendChild(particle);
          
          // Animate particles
          gsap.to(particle, {
            y: -50 - Math.random() * 100,
            x: (Math.random() - 0.5) * 100,
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
            duration: 3 + Math.random() * 2,
            delay: Math.random() * 2,
            repeat: -1,
            repeatDelay: Math.random() * 2,
            ease: "power1.out"
          });
        }
        
        // Particles container animation
        gsap.fromTo(
          particlesRef.current,
          { 
            opacity: 0,
            scale: 0.5
          },
          { 
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: "power2.inOut"
          }
        );
        
        // Brand name animation - letter by letter
        const letters = brandRef.current.querySelectorAll('.letter');
        gsap.fromTo(
          letters,
          { 
            opacity: 0,
            y: 20,
            filter: "blur(5px)"
          },
          { 
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            stagger: 0.15,
            duration: 0.8,
            ease: "power2.out"
          }
        );
        
        // Tagline animation
        gsap.fromTo(
          taglineRef.current,
          { 
            opacity: 0,
            y: 10
          },
          { 
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 2,
            ease: "power2.out"
          }
        );
      }
    }, []);
    
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
        <div ref={particlesRef} className="absolute inset-0"></div>
        <div ref={brandRef} className="relative z-10 text-center mb-4">
          <h1 className="text-5xl md:text-7xl font-serif text-secondary filter drop-shadow-[0_0_15px_rgba(212,175,55,0.7)]">
            {"EmerickScents".split('').map((letter, i) => (
              <span key={i} className="letter inline-block">{letter}</span>
            ))}
          </h1>
        </div>
        <div ref={taglineRef} className="relative z-10 text-center">
          <p className="text-xl md:text-2xl text-light tracking-widest filter drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">
            Where Luxury Meets Memory
          </p>
        </div>
      </div>
    );
  };

  // Render the finale animation (Phase 4)
  const FinaleAnimation = () => {
    const finaleRef = useRef(null);
    const shimmerRef = useRef(null);
    
    useEffect(() => {
      if (finaleRef.current && shimmerRef.current) {
        // Finale burst animation
        gsap.fromTo(
          finaleRef.current,
          { 
            scale: 0.9,
            opacity: 0.8
          },
          { 
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "back.out(1.7)"
          }
        );
        
        // Shimmer effect animation
        gsap.fromTo(
          shimmerRef.current,
          {
            x: "-100%",
            opacity: 0.7
          },
          {
            x: "100%",
            opacity: 0,
            duration: 1.5,
            ease: "power2.inOut"
          }
        );
      }
    }, []);
    
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        <div ref={finaleRef} className="relative text-center">
          <div ref={shimmerRef} className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-20"></div>
          <h1 className="text-6xl md:text-8xl font-serif text-secondary filter drop-shadow-[0_0_20px_rgba(212,175,55,0.8)]">
            EmerickScents
          </h1>
          <p className="text-xl md:text-2xl text-light tracking-widest mt-4 filter drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">
            Where Luxury Meets Memory
          </p>
        </div>
      </div>
    );
  };

  // Fade transition between phases
  const fadeTransition = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.8 } },
    exit: { opacity: 0, transition: { duration: 0.8 } }
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div 
          ref={containerRef}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-primary overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <AnimatePresence mode="wait">
            {currentPhase === 1 && (
              <motion.div 
                key="phase1"
                className="absolute inset-0 flex items-center justify-center"
                {...fadeTransition}
              >
                <DropletAnimation />
              </motion.div>
            )}
            
            {currentPhase === 2 && (
              <motion.div 
                key="phase2"
                className="absolute inset-0 flex items-center justify-center"
                {...fadeTransition}
              >
                <SmokeTextAnimation />
              </motion.div>
            )}
            
            {currentPhase === 3 && (
              <motion.div 
                key="phase3"
                className="absolute inset-0 flex items-center justify-center"
                {...fadeTransition}
              >
                <ParticlesBrandAnimation />
              </motion.div>
            )}
            
            {currentPhase === 4 && (
              <motion.div 
                key="phase4"
                className="absolute inset-0 flex items-center justify-center"
                {...fadeTransition}
              >
                <FinaleAnimation />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LuxuryLoader;