import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiZoomIn, FiZoomOut } from 'react-icons/fi';

const ImageZoom = ({ image, alt }) => {
  const [showModal, setShowModal] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showZoom, setShowZoom] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  
  const imageRef = useRef(null);
  const zoomRef = useRef(null);
  
  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Handle mouse movement for zoom lens
  const handleMouseMove = (e) => {
    if (!imageRef.current || isMobile) return;
    
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    
    // Calculate mouse position relative to the image
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    // Keep the position within bounds
    const boundedX = Math.max(0, Math.min(100, x));
    const boundedY = Math.max(0, Math.min(100, y));
    
    setPosition({ x: boundedX, y: boundedY });
  };
  
  // Handle zoom in/out for mobile modal
  const handleZoomChange = (amount) => {
    const newZoom = zoomLevel + amount;
    if (newZoom >= 1 && newZoom <= 3) {
      setZoomLevel(newZoom);
    }
  };
  
  return (
    <>
      <div 
        className="relative w-full h-full cursor-zoom-in"
        onMouseEnter={() => setShowZoom(true)}
        onMouseLeave={() => setShowZoom(false)}
        onMouseMove={handleMouseMove}
        onClick={() => isMobile && setShowModal(true)}
        ref={imageRef}
      >
        <img 
          src={image} 
          alt={alt} 
          className="w-full h-full object-cover"
        />
        
        {/* Zoom lens for desktop */}
        {showZoom && !isMobile && (
          <div 
            className="absolute w-24 h-24 border-2 border-secondary rounded-full overflow-hidden pointer-events-none z-10"
            style={{ 
              left: `calc(${position.x}% - 48px)`, 
              top: `calc(${position.y}% - 48px)`,
              display: showZoom ? 'block' : 'none'
            }}
          >
            <div 
              ref={zoomRef}
              className="absolute w-[300%] h-[300%] bg-no-repeat"
              style={{ 
                backgroundImage: `url(${image})`,
                backgroundSize: '300%',
                backgroundPosition: `${position.x * 1.5}% ${position.y * 1.5}%`
              }}
            />
          </div>
        )}
        
        {/* Zoom icon indicator for mobile */}
        {isMobile && (
          <div className="absolute bottom-4 right-4 bg-dark bg-opacity-70 p-2 rounded-full">
            <FiZoomIn className="text-secondary" size={20} />
          </div>
        )}
      </div>
      
      {/* Modal for mobile zoom */}
      <AnimatePresence>
        {showModal && (
          <motion.div 
            className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
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
                transition={{ duration: 0.3 }}
              >
                <img 
                  src={image} 
                  alt={alt} 
                  className="max-w-full max-h-full object-contain"
                />
              </motion.div>
              
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 bg-dark bg-opacity-70 rounded-full px-4 py-2">
                <button 
                  className="text-white p-2"
                  onClick={() => handleZoomChange(-0.5)}
                  disabled={zoomLevel <= 1}
                >
                  <FiZoomOut size={20} />
                </button>
                <span className="text-white">{Math.round(zoomLevel * 100)}%</span>
                <button 
                  className="text-white p-2"
                  onClick={() => handleZoomChange(0.5)}
                  disabled={zoomLevel >= 3}
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