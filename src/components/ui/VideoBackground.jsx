import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const VideoBackground = ({ 
  videoSrc, 
  posterSrc, 
  overlayOpacity = 0.35,
  className = '',
  children 
}) => {
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setIsLoaded(true);
    };

    const handleError = () => {
      setHasError(true);
      console.error('Video failed to load:', videoSrc);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);

    // Force load
    video.load();

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
    };
  }, [videoSrc]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Video element */}
      {!hasError ? (
        <motion.video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster={posterSrc}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </motion.video>
      ) : (
        // Fallback to poster image if video fails
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${posterSrc})` }}
        />
      )}

      {/* Gradient overlay for better text readability */}
      <div 
        className="absolute inset-0 z-10"
        style={{
          background: `linear-gradient(to bottom, rgba(0,0,0,${overlayOpacity + 0.2}), rgba(0,0,0,${overlayOpacity - 0.1}))`
        }}
      />

      {/* Content */}
      <div className="relative z-20">
        {children}
      </div>
    </div>
  );
};

export default VideoBackground;