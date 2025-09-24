import { useEffect } from 'react';

const ParticleBackground = () => {
  useEffect(() => {
    const createParticleBackground = () => {
      const canvas = document.createElement('canvas');
      canvas.className = 'fixed inset-0 w-full h-full pointer-events-none z-0';
      
      const ctx = canvas.getContext('2d');
      let animationId;
      
      // Set canvas size
      const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      
      resizeCanvas();
      
      // Particle system
      const particles = [];
      const particleCount = 50;
      
      class Particle {
        constructor() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.size = Math.random() * 2 + 1;
          this.speedX = Math.random() * 0.5 - 0.25;
          this.speedY = Math.random() * 0.5 - 0.25;
          this.opacity = Math.random() * 0.3 + 0.1;
        }
        
        update() {
          this.x += this.speedX;
          this.y += this.speedY;
          
          // Wrap around edges
          if (this.x > canvas.width) this.x = 0;
          if (this.x < 0) this.x = canvas.width;
          if (this.y > canvas.height) this.y = 0;
          if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`;
          ctx.fill();
        }
      }
      
      // Initialize particles
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
      
      // Animation loop
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
          particle.update();
          particle.draw();
        });
        
        animationId = requestAnimationFrame(animate);
      };
      
      animate();
      
      // Handle resize
      window.addEventListener('resize', resizeCanvas);
      
      return canvas;
    };

    const particleCanvas = createParticleBackground();
    document.body.appendChild(particleCanvas);

    return () => {
      if (particleCanvas.parentNode) {
        particleCanvas.parentNode.removeChild(particleCanvas);
      }
    };
  }, []);

  return null;
};

export default ParticleBackground;