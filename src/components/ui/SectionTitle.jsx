import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SectionTitle = ({ 
  title, 
  subtitle, 
  align = 'center', 
  light = true, 
  className = '',
  withLine = true
}) => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    // GSAP animation for section title
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: titleRef.current,
        start: 'top bottom-=100',
        toggleActions: 'play none none none'
      }
    });

    timeline.fromTo(
      titleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    );

    if (subtitleRef.current) {
      timeline.fromTo(
        subtitleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.4'
      );
    }

    if (lineRef.current) {
      timeline.fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.4'
      );
    }
  }, []);

  const alignmentClasses = {
    center: 'text-center mx-auto',
    left: 'text-left',
    right: 'text-right ml-auto'
  };

  return (
    <div className={`mb-12 ${alignmentClasses[align]} ${className}`}>
      <h2 
        ref={titleRef}
        className={`text-3xl md:text-4xl lg:text-5xl font-serif font-medium mb-4 ${light ? 'text-light' : 'text-dark'}`}
      >
        {title}
      </h2>
      
      {withLine && (
        <div className="relative flex justify-center mb-6">
          <div 
            ref={lineRef}
            className={`h-[2px] w-24 bg-secondary origin-center`}
          ></div>
        </div>
      )}
      
      {subtitle && (
        <p 
          ref={subtitleRef}
          className={`max-w-2xl text-lg ${light ? 'text-gray-400' : 'text-gray-600'} ${align === 'center' ? 'mx-auto' : ''}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;