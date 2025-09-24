import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  to, 
  href, 
  onClick, 
  className = '',
  disabled = false,
  fullWidth = false,
  type = 'button',
  ariaLabel,
  ...props 
}) => {
  const buttonRef = useRef(null);
  
  // Base classes
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-all duration-300 overflow-hidden relative';
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-secondary text-dark hover:bg-opacity-90 hover:shadow-gold btn-hover-shimmer',
    secondary: 'bg-dark text-light border border-secondary hover:bg-secondary hover:text-dark hover:shadow-gold btn-hover-shimmer',
    outline: 'bg-transparent border border-secondary text-secondary hover:bg-secondary hover:text-dark hover:shadow-gold btn-hover-shimmer',
    ghost: 'bg-transparent text-light hover:text-secondary',
    dark: 'bg-dark text-light hover:bg-gray-900 btn-hover-shimmer',
  };
  
  // Size classes
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg',
  };
  
  // Combine classes
  const buttonClasses = `
    ${baseClasses} 
    ${variantClasses[variant]} 
    ${sizeClasses[size]} 
    ${fullWidth ? 'w-full' : ''} 
    ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
    ${className}
  `;
  
  // Enhanced hover animations using GSAP
  useEffect(() => {
    if (buttonRef.current && !disabled) {
      // Create hover effect
      const button = buttonRef.current;
      
      // Create shimmer element
      const shimmer = document.createElement('div');
      shimmer.classList.add('absolute', 'inset-0', 'pointer-events-none', 'opacity-0');
      shimmer.style.background = 'linear-gradient(45deg, transparent, rgba(255,255,255,0.2), transparent)';
      shimmer.style.transform = 'translateX(-100%)';
      button.appendChild(shimmer);
      
      // Mouse enter animation
      const handleMouseEnter = () => {
        gsap.to(button, {
          y: -3,
          duration: 0.3,
          ease: "power2.out"
        });
        
        if (variant !== 'ghost') {
          gsap.to(shimmer, {
            opacity: 1,
            x: '100%',
            duration: 0.8,
            ease: "power2.inOut"
          });
          
          gsap.to(button, {
            boxShadow: '0 0 15px rgba(212, 175, 55, 0.5)',
            duration: 0.3
          });
        }
      };
      
      // Mouse leave animation
      const handleMouseLeave = () => {
        gsap.to(button, {
          y: 0,
          boxShadow: 'none',
          duration: 0.3,
          ease: "power2.out"
        });
        
        if (variant !== 'ghost') {
          gsap.set(shimmer, {
            opacity: 0,
            x: '-100%'
          });
        }
      };
      
      button.addEventListener('mouseenter', handleMouseEnter);
      button.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        button.removeEventListener('mouseenter', handleMouseEnter);
        button.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [variant, disabled]);
  
  // Button motion variants
  const buttonMotion = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.2 }
  };
  
  // Render as Link if 'to' prop is provided (internal link)
  if (to) {
    return (
      <motion.div {...buttonMotion}>
        <Link 
          ref={buttonRef}
          to={to} 
          className={buttonClasses}
          aria-label={ariaLabel}
          {...props}
        >
          {children}
        </Link>
      </motion.div>
    );
  }
  
  // Render as anchor if 'href' prop is provided (external link)
  if (href) {
    return (
      <motion.div {...buttonMotion}>
        <a 
          ref={buttonRef}
          href={href} 
          className={buttonClasses}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ariaLabel}
          {...props}
        >
          {children}
        </a>
      </motion.div>
    );
  }
  
  // Render as button by default
  return (
    <motion.button 
      ref={buttonRef}
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      {...buttonMotion}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;