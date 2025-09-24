import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollAnimations = () => {
  useEffect(() => {
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

      // Apply subtle parallax to hero elements
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

      // Parallax for cards and elements
      gsap.to('.parallax-card', {
        x: xPercent * 5,
        y: yPercent * 5,
        duration: 1,
        ease: 'power2.out'
      });
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Scroll-triggered animations
    gsap.utils.toArray('.fade-in-section').forEach(section => {
      gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      });
    });

    // Stagger animations for product cards
    gsap.utils.toArray('.product-card').forEach((card, index) => {
      gsap.from(card, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: index * 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          end: 'bottom 15%',
          toggleActions: 'play none none reverse'
        }
      });
    });

    // Hover effects for buttons and cards
    gsap.utils.toArray('.hover-target').forEach(element => {
      element.addEventListener('mouseenter', () => {
        gsap.to(element, {
          scale: 1.05,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      element.addEventListener('mouseleave', () => {
        gsap.to(element, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });

    // Social icons hover effects
    gsap.utils.toArray('.social-icon').forEach(icon => {
      icon.addEventListener('mouseenter', () => {
        gsap.to(icon, {
          y: -5,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      icon.addEventListener('mouseleave', () => {
        gsap.to(icon, {
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });

    // Text reveal animations
    gsap.utils.toArray('.text-reveal').forEach(text => {
      gsap.from(text, {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: text,
          start: 'top 85%',
          end: 'bottom 15%',
          toggleActions: 'play none none reverse'
        }
      });
    });

    // Counter animations
    gsap.utils.toArray('.counter-animation').forEach(counter => {
      const finalValue = parseInt(counter.textContent);
      gsap.from(counter, {
        textContent: 0,
        duration: 2,
        ease: 'power3.out',
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: counter,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      });
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return null;
};

export default ScrollAnimations;