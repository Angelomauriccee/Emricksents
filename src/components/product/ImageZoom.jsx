import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiZoomIn, FiZoomOut } from 'react-icons/fi';

const ImageZoom = ({
  image,
  alt = '',
  /** Aspect ratio for the display area. Use "auto" to disable and let the parent control height. */
  ratio = '3/4',
  /** "cover" fills the box (recommended for galleries). Use "contain" if you need full image visible. */
  fit = 'cover',
  /** Max zoom for mobile modal */
  maxZoom = 3,
  /** Min zoom for mobile modal */
  minZoom = 1,
  /** Zoom step per tap on mobile controls */
  zoomStep = 0.5,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showZoom, setShowZoom] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const zoomRef = useRef(null);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle mouse movement for zoom lens
  const handleMouseMove = (e) => {
    if (!imageRef.current || isMobile) return;
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setPosition({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    });
  };

  // Handle zoom in/out for mobile modal
  const handleZoomChange = (amount) => {
    const next = Math.max(minZoom, Math.min(maxZoom, zoomLevel + amount));
    setZoomLevel(next);
  };

  // Tailwind object-fit class
  const objectFitClass = fit === 'contain' ? 'object-contain' : 'object-cover';
  // Aspect-ratio wrapper (optional)
  const ratioClass = ratio === 'auto' ? '' : `aspect-[${ratio}]`;

  return (
    <>
      {/* Outer wrapper gives predictable height via aspect ratio (unless ratio="auto") */}
      <div ref={containerRef} className={`relative w-full ${ratioClass}`}>
        {/* Display layer fills the wrapper */}
        <div
          className="absolute inset-0 cursor-zoom-in"
          onMouseEnter={() => setShowZoom(true)}
          onMouseLeave={() => setShowZoom(false)}
          onMouseMove={handleMouseMove}
          onClick={() => isMobile && setShowModal(true)}
          ref={imageRef}
        >
          <img
            src={image}
            alt={alt}
            className={`absolute inset-0 w-full h-full ${objectFitClass}`}
            draggable={false}
          />

          {/* Zoom lens for desktop */}
          {showZoom && !isMobile && (
            <div
              className="absolute w-24 h-24 border-2 border-secondary rounded-full overflow-hidden pointer-events-none z-10"
              style={{
                left: `calc(${position.x}% - 48px)`,
                top: `calc(${position.y}% - 48px)`,
              }}
            >
              <div
                ref={zoomRef}
                className="absolute w-[300%] h-[300%] bg-no-repeat"
                style={{
                  backgroundImage: `url(${image})`,
                  backgroundSize: '300%',
                  backgroundPosition: `${position.x * 1.5}% ${position.y * 1.5}%`,
                }}
              />
            </div>
          )}

          {/* Zoom icon indicator for mobile */}
          {isMobile && (
            <div className="absolute bottom-4 right-4 bg-dark/70 p-2 rounded-full">
              <FiZoomIn className="text-secondary" size={20} />
            </div>
          )}
        </div>
      </div>

      {/* Modal for mobile zoom */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <button
              className="absolute top-4 right-4 text-white p-2 z-10"
              onClick={() => setShowModal(false)}
            >
              <FiX size={24} />
            </button>

            <div className="relative w-full h-full overflow-hidden">
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                drag
                dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
                initial={{ scale: 1 }}
                animate={{ scale: zoomLevel }}
                transition={{ duration: 0.25 }}
              >
                <img
                  src={image}
                  alt={alt}
                  className="max-w-full max-h-full object-contain"
                  draggable={false}
                />
              </motion.div>

              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-4 bg-dark/70 rounded-full px-4 py-2">
                <button
                  className="text-white p-2 disabled:opacity-50"
                  onClick={() => handleZoomChange(-zoomStep)}
                  disabled={zoomLevel <= minZoom}
                >
                  <FiZoomOut size={20} />
                </button>
                <span className="text-white">{Math.round(zoomLevel * 100)}%</span>
                <button
                  className="text-white p-2 disabled:opacity-50"
                  onClick={() => handleZoomChange(zoomStep)}
                  disabled={zoomLevel >= maxZoom}
                >
                  <FiZoomIn size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ImageZoom;
