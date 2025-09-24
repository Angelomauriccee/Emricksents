import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';

import Button from '../components/ui/Button';

const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-primary flex items-center justify-center py-20"
    >
      <div className="container-custom text-center">
        <h1 className="text-9xl font-serif text-secondary mb-6">404</h1>
        <h2 className="text-3xl md:text-4xl font-serif text-light mb-6">Page Not Found</h2>
        <p className="text-gray-400 mb-8 max-w-lg mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button to="/" variant="primary" className="flex items-center justify-center">
            <FiArrowLeft className="mr-2" />
            <span>Return to Homepage</span>
          </Button>
          <Button to="/shop" variant="outline">
            Explore Our Collection
          </Button>
        </div>
        
        <div className="mt-16">
          <p className="text-gray-500 mb-4">You might be interested in:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/shop" className="text-secondary hover:text-secondary-dark transition-colors">
              Shop
            </Link>
            <Link to="/about" className="text-secondary hover:text-secondary-dark transition-colors">
              About Us
            </Link>
            <Link to="/contact" className="text-secondary hover:text-secondary-dark transition-colors">
              Contact
            </Link>
            <Link to="/store-locator" className="text-secondary hover:text-secondary-dark transition-colors">
              Store Locator
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NotFound;