import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Note: gsap.registerPlugin(ScrollTrigger) is called once globally in main.jsx

const ScrollAnimations = () => {
  useEffect(() => {
    // Track all triggers created in THIS effect so cleanup is scoped
    const localTriggers = [];

    // Hero entrance animation
    const heroTimeline = gsap.timeline();
    
    heroTimeline
      .from('.hero-content', { 
        opacity: 0, 
        y: 50, 
        duration: 1.2, 
        ease: 'power3.out' 
      })
      .from('.hero-title', { 
        opacity: 0, 
        y: 30, 
        duration: 1, 
        ease: 'power3.out' 
      }, '-=0.8')
      .from('.hero-subtitle', { 
        opacity: 0, 
        y: 20, 
        duration: 0.8, 
        ease: 'power3.out' 
      }, '-=0.6')
      .from('.hero-cta', { 
        opacity: 0, 
        y: 20, 
        duration: 0.8, 
        ease: 'power3.out' 
      }, '-=0.4');

    // Parallax mouse movement effect
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPercent = (clientX / innerWidth - 0.5) * 2;
      const yPercent = (clientY / innerHeight - 0.5) * 2;

      gsap.to('.hero-title', {
        x: xPercent * 10,
        y: yPercent * 10,
        duration: 1,
        ease: 'power2.out'
      });

      gsap.to('.hero-subtitle', {
        x: xPercent * 5,
        y: yPercent * 5,
        duration: 1,
        ease: 'power2.out'
      });

      gsap.to('.parallax-card', {
        x: xPercent * 5,
        y: yPercent * 5,
        duration: 1,
        ease: 'power2.out'
      });
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Scroll-triggered animations — track each trigger
    gsap.utils.toArray('.fade-in-section').forEach(section => {
      const st = ScrollTrigger.create({
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
        onEnter: () => gsap.fromTo(section, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' })
      });
      localTriggers.push(st);
    });

    // Text reveal animations
    gsap.utils.toArray('.text-reveal').forEach(text => {
      const st = ScrollTrigger.create({
        trigger: text,
        start: 'top 85%',
        end: 'bottom 15%',
        toggleActions: 'play none none reverse',
        onEnter: () => gsap.fromTo(text, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' })
      });
      localTriggers.push(st);
    });

    // Counter animations
    gsap.utils.toArray('.counter-animation').forEach(counter => {
      const st = ScrollTrigger.create({
        trigger: counter,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
        onEnter: () => gsap.from(counter, {
          textContent: 0,
          duration: 2,
          ease: 'power3.out',
          snap: { textContent: 1 }
        })
      });
      localTriggers.push(st);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      // Only kill triggers we created — not every trigger in the app
      localTriggers.forEach(trigger => trigger.kill());
    };
  }, []);

  return null;
};

export default ScrollAnimations;