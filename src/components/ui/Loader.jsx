import { useEffect } from 'react';
import { motion } from 'framer-motion';

const Loader = ({ isLoading, setIsLoading }) => {
  useEffect(() => {
    // Auto-hide loader after a set time
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [isLoading, setIsLoading]);

  // Variants for container animation
  const containerVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    },
    exit: { 
      opacity: 0,
      transition: { 
        duration: 0.5,
        when: "afterChildren",
        staggerChildren: 0.1,
        staggerDirection: -1
      }
    }
  };

  // Variants for logo animation
  const logoVariants = {
    initial: { y: -20, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      }
    },
    exit: { 
      y: -20, 
      opacity: 0,
      transition: { 
        duration: 0.4,
        ease: "easeIn"
      }
    }
  };

  // Variants for the loading bar
  const barVariants = {
    initial: { scaleX: 0 },
    animate: { 
      scaleX: 1,
      transition: { 
        duration: 1.8,
        ease: "easeInOut"
      }
    },
    exit: { 
      scaleX: 0,
      transition: { 
        duration: 0.4,
        ease: "easeIn"
      }
    }
  };

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-primary"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div 
        className="text-center"
        variants={logoVariants}
      >
        <h1 className="text-4xl md:text-5xl font-serif text-secondary mb-6">Emrickscents</h1>
        <p className="text-light text-lg mb-8">Luxury Fragrance Collection</p>
        
        <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden mx-auto mb-8">
          <motion.div 
            className="h-full bg-secondary origin-left"
            variants={barVariants}
          />
        </div>
        
        <div className="flex space-x-3 justify-center">
          <motion.div 
            className="w-3 h-3 rounded-full bg-secondary"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.5, 1]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatDelay: 0.2
            }}
          />
          <motion.div 
            className="w-3 h-3 rounded-full bg-secondary"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.5, 1]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatDelay: 0.2,
              delay: 0.2
            }}
          />
          <motion.div 
            className="w-3 h-3 rounded-full bg-secondary"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.5, 1]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatDelay: 0.2,
              delay: 0.4
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Loader;