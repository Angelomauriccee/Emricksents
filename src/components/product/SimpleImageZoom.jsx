import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';

/**
 * Modern, smooth zoom:
 * - Hover to zoom with a soft spring
 * - Smoothly follows cursor (lens-style ring)
 * - Double-click / tap toggles zoom
 * - Always fills the parent (use inside a size-controlled wrapper)
 */
const SimpleImageZoom = ({
  image,
  alt = '',
  zoom = 2.4,          // desktop zoom factor
  mobileZoom = 2.0,     // mobile zoom factor
}) => {
  const wrapperRef = useRef(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  // Pointer position as percentage of image (0–100)
  const x = useMotionValue(50);
  const y = useMotionValue(50);

  // Smooth follow
  const sx = useSpring(x, { stiffness: 220, damping: 28, mass: 0.8 });
  const sy = useSpring(y, { stiffness: 220, damping: 28, mass: 0.8 });

  // Smooth scale
  const scale = useSpring(1, { stiffness: 220, damping: 28, mass: 0.8 });

  // Transform origin follows springed pointer
  const origin = useMotionTemplate`${sx}% ${sy}%`;

  useEffect(() => {
    const onTouchStart = () => setIsTouch(true);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    return () => window.removeEventListener('touchstart', onTouchStart);
  }, []);

  useEffect(() => {
    scale.set(isZoomed ? (isTouch ? mobileZoom : zoom) : 1);
  }, [isZoomed, isTouch, mobileZoom, zoom, scale]);

  const updatePointer = (clientX, clientY) => {
    if (!wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const px = ((clientX - rect.left) / rect.width) * 100;
    const py = ((clientY - rect.top) / rect.height) * 100;
    x.set(Math.max(0, Math.min(100, px)));
    y.set(Math.max(0, Math.min(100, py)));
  };

  const onMouseEnter = (e) => {
    updatePointer(e.clientX, e.clientY);
    setIsZoomed(true);
  };
  const onMouseMove = (e) => isZoomed && updatePointer(e.clientX, e.clientY);
  const onMouseLeave = () => setIsZoomed(false);
  const onDoubleClick = (e) => {
    updatePointer(e.clientX, e.clientY);
    setIsZoomed((z) => !z);
  };

  const onTouchStart = (e) => {
    const t = e.touches?.[0];
    if (!t) return;
    updatePointer(t.clientX, t.clientY);
    setIsZoomed((z) => !z);
  };
  const onTouchMove = (e) => {
    if (!isZoomed) return;
    const t = e.touches?.[0];
    if (!t) return;
    updatePointer(t.clientX, t.clientY);
  };

  return (
    <div
      ref={wrapperRef}
      className="relative w-full h-full overflow-hidden select-none"
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onDoubleClick={onDoubleClick}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
    >
      {/* Image fills the box; zoom via transformOrigin + scale */}
      <motion.img
        src={image}
        alt={alt}
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover will-change-transform"
        style={{ transformOrigin: origin, scale }}
        transition={{ type: 'spring', stiffness: 220, damping: 28, mass: 0.8 }}
      />

      {/* Lens ring */}
      <motion.div
        className="pointer-events-none absolute w-28 h-28 rounded-full border border-white/30 shadow-[0_0_0_200vmax_rgba(0,0,0,0.2)]"
        style={{
          left: useMotionTemplate`${sx}%`,
          top: useMotionTemplate`${sy}%`,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isZoomed ? 1 : 0,
        }}
      />

      {/* Hint / badge */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/55 text-white text-[11px] px-3 py-1 rounded-full backdrop-blur-sm">
        {isTouch ? (isZoomed ? 'Drag to pan • Tap to reset' : 'Tap to zoom') : (isZoomed ? 'Double-click to reset' : 'Hover or double-click to zoom')}
      </div>
    </div>
  );
};

export default SimpleImageZoom;
