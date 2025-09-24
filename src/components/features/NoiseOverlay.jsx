import { useEffect } from 'react';

const NoiseOverlay = () => {
  useEffect(() => {
    const createNoiseOverlay = () => {
      const overlay = document.createElement('div');
      overlay.className = 'fixed inset-0 w-full h-full pointer-events-none z-[1] opacity-0';
      
      // Create base64 noise texture
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 200;
      canvas.height = 200;
      
      // Generate noise pattern
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() * 255;
        data[i] = noise;     // Red
        data[i + 1] = noise; // Green
        data[i + 2] = noise; // Blue
        data[i + 3] = 30;    // Alpha - very subtle
      }
      
      ctx.putImageData(imageData, 0, 0);
      
      // Apply noise texture as background
      overlay.style.backgroundImage = `url(${canvas.toDataURL()})`;
      overlay.style.backgroundRepeat = 'repeat';
      overlay.style.backgroundSize = '200px 200px';
      
      document.body.appendChild(overlay);
      
      // Fade in the noise
      requestAnimationFrame(() => {
        overlay.style.transition = 'opacity 2s ease';
        overlay.style.opacity = '0.03';
      });
      
      return overlay;
    };

    const noiseOverlay = createNoiseOverlay();

    return () => {
      if (noiseOverlay.parentNode) {
        noiseOverlay.parentNode.removeChild(noiseOverlay);
      }
    };
  }, []);

  return null;
};

export default NoiseOverlay;