import { useEffect } from 'react';
import gsap from 'gsap';

const FloatingShapes = () => {
  useEffect(() => {
    const createFloatingShapes = () => {
      const container = document.createElement('div');
      container.className = 'fixed inset-0 pointer-events-none z-0 overflow-hidden';
      
      // Create multiple floating shapes
      const shapes = [
        {
          type: 'circle',
          size: 300,
          position: { top: '-100px', left: '-100px' },
          rotation: 360,
          duration: 60
        },
        {
          type: 'square',
          size: 200,
          position: { bottom: '10%', right: '5%' },
          rotation: -360,
          duration: 70
        },
        {
          type: 'diamond',
          size: 150,
          position: { top: '20%', right: '10%' },
          rotation: 180,
          duration: 50
        },
        {
          type: 'ellipse',
          size: 250,
          position: { bottom: '-50px', left: '15%' },
          rotation: -180,
          duration: 65
        }
      ];

      shapes.forEach((shape, index) => {
        const element = document.createElement('div');
        element.className = 'absolute opacity-0';
        
        // Apply styles based on shape type
        if (shape.type === 'circle') {
          element.className += ' rounded-full';
        } else if (shape.type === 'square') {
          element.className += ' transform rotate-45';
        } else if (shape.type === 'diamond') {
          element.className += ' rounded-3xl';
        } else if (shape.type === 'ellipse') {
          element.className += ' rounded-[40%]';
        }
        
        element.style.width = `${shape.size}px`;
        element.style.height = `${shape.size}px`;
        element.style.top = shape.position.top;
        element.style.left = shape.position.left;
        element.style.right = shape.position.right;
        element.style.bottom = shape.position.bottom;
        element.style.border = '1px solid rgba(212, 175, 55, 0.15)';
        element.style.backgroundColor = 'rgba(212, 175, 55, 0.02)';
        
        container.appendChild(element);

        // Animate the shape
        gsap.to(element, {
          opacity: 1,
          x: 'random(-20, 20)',
          y: 'random(-20, 20)',
          rotation: shape.rotation,
          duration: shape.duration,
          repeat: -1,
          yoyo: true,
          ease: 'none',
          delay: index * 0.5
        });

        // Add subtle glow effect
        gsap.to(element, {
          boxShadow: '0 0 20px rgba(212, 175, 55, 0.1)',
          repeat: -1,
          yoyo: true,
          duration: 3,
          delay: index * 0.3
        });
      });

      document.body.appendChild(container);
      return container;
    };

    const floatingShapes = createFloatingShapes();

    return () => {
      if (floatingShapes.parentNode) {
        floatingShapes.parentNode.removeChild(floatingShapes);
      }
    };
  }, []);

  return null;
};

export default FloatingShapes;