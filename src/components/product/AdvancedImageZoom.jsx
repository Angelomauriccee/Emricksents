import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiZoomIn, FiZoomOut, FiX, FiMaximize2 } from 'react-icons/fi';

const AdvancedImageZoom = ({ images, currentIndex, onClose }) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showLens, setShowLens] = useState(false);
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(currentIndex);
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  const currentImage = images[currentImageIndex];

  // Handle mouse move for hover zoom
  const handleMouseMove = (e) => {
    if (zoomLevel === 1 && !isDragging) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setLensPosition({ x, y });
      setShowLens(true);
    }
  };

  const handleMouseLeave = () => {
    setShowLens(false);
  };

  // Handle click zoom
  const handleClick = () => {
    if (zoomLevel === 1) {
      setZoomLevel(2.5);
      setShowLens(false);
    }
  };

  // Handle double click for lightbox
  const handleDoubleClick = () => {
    setIsLightboxOpen(true);
  };

  // Handle zoom controls
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.5, 4));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.5, 1));
    if (zoomLevel <= 1.5) {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleReset = () => {
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  };

  // Handle dragging for panning
  const handleMouseDown = (e) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  const handleMouseMoveWhileDragging = (e) => {
    if (isDragging && zoomLevel > 1) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      
      // Constrain panning to image bounds
      const maxX = (imageRef.current.offsetWidth * (zoomLevel - 1)) / 2;
      const maxY = (imageRef.current.offsetHeight * (zoomLevel - 1)) / 2;
      
      setPosition({
        x: Math.max(-maxX, Math.min(maxX, newX)),
        y: Math.max(-maxY, Math.min(maxY, newY))
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle navigation in lightbox
  const handlePrevious = () => {
    setCurrentImageIndex(prev => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setCurrentImageIndex(prev => (prev < images.length - 1 ? prev + 1 : 0));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isLightboxOpen) {
        if (e.key === 'Escape') {
          setIsLightboxOpen(false);
        } else if (e.key === 'ArrowLeft') {
          handlePrevious();
        } else if (e.key === 'ArrowRight') {
          handleNext();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen]);

  return (
    <>
      {/* Main zoom container */}
      <div 
        ref={containerRef}
        className="relative w-full h-full overflow-hidden rounded-lg border border-secondary/20 cursor-zoom-in"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMoveWhileDragging}
        onMouseUp={handleMouseUp}
        style={{ cursor: zoomLevel > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in' }}
      >
        {/* Main image */}
        <motion.img
          ref={imageRef}
          src={currentImage}
          alt="Product"
          className="w-full h-full object-contain"
          animate={{
            scale: zoomLevel,
            x: position.x,
            y: position.y
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />

        {/* Hover lens */}
        {showLens && zoomLevel === 1 && (
          <div
            className="absolute w-48 h-48 rounded-full border-2 border-secondary pointer-events-none"
            style={{
              left: lensPosition.x - 96,
              top: lensPosition.y - 96,
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              background: 'rgba(0,0,0,0.1)',
              backdropFilter: 'blur(2px)'
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <FiZoomIn className="text-secondary text-2xl" />
            </div>
          </div>
        )}

        {/* Zoom indicator */}
        {zoomLevel > 1 && (
          <div className="absolute top-4 right-4 bg-dark/80 text-secondary px-3 py-1 rounded-full text-sm font-light">
            {Math.round(zoomLevel * 100)}%
          </div>
        )}

        {/* Instructions tooltip (first time only) */}
        {zoomLevel === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-dark/90 text-light px-4 py-2 rounded-lg text-xs"
          >
            Hover to zoom • Click to pan • Double-click for full view
          </motion.div>
        )}
      </div>

      {/* Zoom controls */}
      <div className="flex items-center justify-center gap-2 mt-4">
        <button
          onClick={handleZoomOut}
          disabled={zoomLevel <= 1}
          className="w-10 h-10 rounded-full border border-secondary flex items-center justify-center hover:bg-secondary hover:text-dark transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <FiZoomOut />
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 rounded-full border border-secondary text-secondary hover:bg-secondary hover:text-dark transition-colors text-sm"
        >
          Reset
        </button>
        <button
          onClick={handleZoomIn}
          disabled={zoomLevel >= 4}
          className="w-10 h-10 rounded-full border border-secondary flex items-center justify-center hover:bg-secondary hover:text-dark transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <FiZoomIn />
        </button>
        <button
          onClick={() => setIsLightboxOpen(true)}
          className="w-10 h-10 rounded-full border border-secondary flex items-center justify-center hover:bg-secondary hover:text-dark transition-colors ml-2"
        >
          <FiMaximize2 />
        </button>
      </div>

      {/* Lightbox modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* Close button */}
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-4 right-4 w-12 h-12 rounded-full bg-dark/80 border border-secondary flex items-center justify-center hover:bg-secondary hover:text-dark transition-colors z-10"
            >
              <FiX className="text-2xl" />
            </button>

            {/* Navigation buttons */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevious();
                  }}
                  className="absolute left-4 w-12 h-12 rounded-full bg-dark/80 border border-secondary flex items-center justify-center hover:bg-secondary hover:text-dark transition-colors z-10"
                >
                  ←
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-4 w-12 h-12 rounded-full bg-dark/80 border border-secondary flex items-center justify-center hover:bg-secondary hover:text-dark transition-colors z-10"
                >
                  →
                </button>
              </>
            )}

            {/* Lightbox image */}
            <motion.img
              key={currentImageIndex}
              src={images[currentImageIndex]}
              alt="Product full view"
              className="max-w-[90vw] max-h-[90vh] object-contain"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            />

            {/* Thumbnail strip */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 bg-dark/80 p-2 rounded-lg">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(index);
                    }}
                    className={`w-16 h-16 rounded overflow-hidden border-2 transition-all ${
                      index === currentImageIndex ? 'border-secondary scale-110' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Image counter */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-dark/80 text-secondary px-4 py-2 rounded-full text-sm">
              {currentImageIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdvancedImageZoom;