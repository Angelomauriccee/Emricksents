import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const SimpleImageZoom = ({ image, alt }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!isZoomed || !imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setPosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
    setPosition({ x: 50, y: 50 });
  };

  return (
    <div 
      className="relative overflow-hidden cursor-zoom-in group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <motion.img
        ref={imageRef}
        src={image}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-300"
        animate={{
          scale: isZoomed ? 2 : 1,
        }}
        style={{
          transformOrigin: `${position.x}% ${position.y}%`
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />
      
      {/* Zoom indicator */}
      <motion.div
        className="absolute top-4 right-4 bg-dark/80 text-secondary px-3 py-1 rounded-full text-xs font-light backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: isZoomed ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        Zoomed 2x
      </motion.div>

      {/* Hover hint */}
      <motion.div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-dark/80 text-light px-4 py-2 rounded-lg text-xs backdrop-blur-sm"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isZoomed ? 0 : 1, y: isZoomed ? 10 : 0 }}
        transition={{ duration: 0.3 }}
      >
        Hover to zoom
      </motion.div>
    </div>
  );
};

export default SimpleImageZoom;