// src/components/ui/CustomCursor.jsx
import { useEffect } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  useEffect(() => {
    // Only on desktop
    if (window.innerWidth <= 768) return;

    // Create main cursor
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    Object.assign(cursor.style, {
      position: 'fixed',
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      border: '1px solid rgba(212, 175, 55, 0.5)',
      pointerEvents: 'none', // 🔒 Blocks interaction with cursor
      zIndex: '9999',
      transform: 'translate(-50%, -50%)',
      transition: 'width 0.3s, height 0.3s, background-color 0.3s, border 0.3s',
      mixBlendMode: 'difference'
    });
    document.body.appendChild(cursor);

    // Inner dot
    const inner = document.createElement('div');
    inner.className = 'inner-cursor';
    Object.assign(inner.style, {
      position: 'absolute',
      width: '5px',
      height: '5px',
      borderRadius: '50%',
      backgroundColor: 'rgba(212, 175, 55, 0.8)',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    });
    cursor.appendChild(inner);

    // ✅ Hide the default cursor everywhere
    document.body.style.cursor = 'none';

    // Add class to body for CSS override
    document.body.classList.add('custom-cursor-active');

    // ✅ Move cursor instantly (no GSAP delay)
    const handleMouseMove = (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    // Hover effects
    const handleMouseEnter = () => {
      gsap.to(cursor, {
        width: '40px',
        height: '40px',
        backgroundColor: 'rgba(212, 175, 55, 0.1)',
        borderColor: 'rgba(212, 175, 55, 0.8)',
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(cursor, {
        width: '20px',
        height: '20px',
        backgroundColor: 'transparent',
        borderColor: 'rgba(212, 175, 55, 0.5)',
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    // Click effect
    const handleMouseDown = () => {
      gsap.to(cursor, {
        scale: 0.8,
        duration: 0.1,
        ease: 'power2.out'
      });
    };

    const handleMouseUp = () => {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.1,
        ease: 'power2.out'
      });
    };

    // Interactive elements
    const interactive = document.querySelectorAll('a, button, input, .hover-target, .product-card, .btn-primary, .social-icon');

    // Add events
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    interactive.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      
      interactive.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });

      if (cursor.parentNode) cursor.parentNode.removeChild(cursor);
      document.body.style.cursor = ''; // Restore default cursor on unmount
      document.body.classList.remove('custom-cursor-active');
    };
  }, []);

  return null;
};

export default CustomCursor;