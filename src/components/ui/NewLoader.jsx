import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import logoImage from '../../assets/logo.png';

const NewLoader = ({ isLoading, setIsLoading }) => {
  const containerRef = useRef(null);
  const dropletRef = useRef(null);
  const rippleRef = useRef(null);
  const logoRef = useRef(null);
  const progressBarRef = useRef(null);
  const mistContainerRef = useRef(null);
  const timeline = useRef(null);
  const [progress, setProgress] = useState(0);

  // Create and animate the loader
  useEffect(() => {
    if (isLoading && containerRef.current) {
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

      // Create mist/smoke particles
      const mistContainer = mistContainerRef.current;
      for (let i = 0; i < 10; i++) {
        const mist = document.createElement('div');
        mist.className = 'absolute rounded-full bg-gradient-radial from-gray-500/10 to-transparent';
        
        // Random size and position
        const size = 100 + Math.random() * 200;
        mist.style.width = `${size}px`;
        mist.style.height = `${size}px`;
        mist.style.left = `${Math.random() * 100}%`;
        mist.style.top = `${Math.random() * 100}%`;
        mist.style.opacity = 0;
        
        mistContainer.appendChild(mist);
        
        // Animate mist particles
        gsap.to(mist, {
          opacity: 0.2,
          duration: 1,
          delay: 1 + Math.random() * 0.5,
          ease: "power1.inOut"
        });
        
        gsap.to(mist, {
          x: (Math.random() - 0.5) * 50,
          y: (Math.random() - 0.5) * 50,
          scale: 1.2,
          opacity: 0,
          duration: 5,
          delay: 2 + Math.random() * 1,
          ease: "sine.inOut"
        });
      }

      // Droplet animation
      timeline.current.fromTo(
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
          duration: 1.5,
          ease: "power2.out"
        }
      );
      
      // Ripple effect animation
      timeline.current.fromTo(
        rippleRef.current,
        { 
          scale: 0.1,
          opacity: 0.8
        },
        { 
          scale: 3,
          opacity: 0,
          duration: 1.5,
          ease: "power1.out"
        },
        "-=0.5" // Start slightly before the droplet animation finishes
      );
      
      // Logo fade-in animation
      timeline.current.fromTo(
        logoRef.current,
        { 
          opacity: 0,
          scale: 0.9,
          filter: "blur(10px)"
        },
        { 
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power2.out"
        },
        "-=0.8" // Start before the ripple animation finishes
      );

      // Progress bar animation
      timeline.current.to(
        progressBarRef.current,
        {
          scaleX: 1,
          duration: 3,
          ease: "power1.inOut",
          onUpdate: function() {
            // Update progress state based on the progress bar's scale
            const progressValue = Math.round(this.progress() * 100);
            setProgress(progressValue);
          }
        },
        "-=0.5" // Start slightly before the logo animation finishes
      );

      return () => {
        // Clean up timeline if component unmounts
        if (timeline.current) {
          timeline.current.kill();
        }
      };
    }
  }, [isLoading, setIsLoading]);

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
            background: 'linear-gradient(to bottom, #000000, #121212, #1a1a1a, #121212, #000000)'
          }}
        >
          {/* Mist/smoke background */}
          <div ref={mistContainerRef} className="absolute inset-0 overflow-hidden"></div>
          
          {/* Droplet and ripple container */}
          <div className="relative flex items-center justify-center mb-8">
            <div ref={dropletRef} className="relative">
              <div className="w-12 h-16 bg-gradient-to-b from-secondary/80 to-secondary rounded-full rounded-t-[70%] transform rotate-12 filter drop-shadow-[0_0_10px_rgba(212,175,55,0.7)]"></div>
            </div>
            <div ref={rippleRef} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border-2 border-secondary/50"></div>
          </div>
          
          {/* Logo */}
          <div ref={logoRef} className="relative z-10 mb-12">
            <img 
              src={logoImage} 
              alt="EmerickScents Logo" 
              className="h-24 md:h-32 filter drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]"
            />
          </div>
          
          {/* Progress bar */}
          <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
            <div 
              ref={progressBarRef} 
              className="h-full bg-secondary origin-left"
              style={{ transform: 'scaleX(0)' }}
            ></div>
          </div>
          
          {/* Progress percentage */}
          <div className="mt-4 text-secondary text-sm">{progress}%</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NewLoader;