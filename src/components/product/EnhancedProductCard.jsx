import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShoppingBag } from 'react-icons/fi';
import gsap from 'gsap';
import { useCart } from '../../context/CartContext';
import { slugify } from '../../utils/slugify';

const EnhancedProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const cardRef = useRef(null);
  const { addToCart } = useCart();

  // GSAP animation for card entrance
  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { 
        y: 30, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8,
        ease: 'power3.out',
        delay: product.id * 0.1 % 0.5 // Stagger effect based on product ID
      }
    );
  }, [product.id]);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Set adding to cart state for animation
    setIsAddingToCart(true);
    
    // Add product to cart
    addToCart(product);
    
    // Reset state after animation completes
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 1000);
  };

  // Format price in Naira
  const formatPrice = (price) => {
    return `₦${price.toLocaleString()}`;
  };

  return (
    <motion.div 
      ref={cardRef}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/p/${slugify(product.name)}`} className="block">
        <div className="relative overflow-hidden rounded-lg bg-gray-900 mb-4">
          {/* Product Image */}
          <div className="aspect-[3/4] overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
            />
          </div>

          {/* Overlay */}
          <div className={`absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>

          {/* Quick Actions */}
          <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0">
            <div className="flex justify-center items-center">
              <motion.button 
                className="bg-secondary text-dark px-4 py-2 rounded-md flex items-center justify-center space-x-2 hover:bg-opacity-90 transition-colors relative overflow-hidden w-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                disabled={isAddingToCart}
              >
                <FiShoppingBag />
                <span>{isAddingToCart ? 'Adding...' : 'Add to Cart'}</span>
                
                {/* Shimmer effect on button */}
                <motion.div 
                  className="absolute inset-0 bg-white bg-opacity-20"
                  initial={{ x: '-100%' }}
                  animate={isAddingToCart ? { x: '100%' } : { x: '-100%' }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
              </motion.button>
            </div>
          </div>

          {/* Badge for new or sale items */}
          {product.isNew && (
            <div className="absolute top-4 left-4 bg-secondary text-dark text-xs px-2 py-1 rounded">
              NEW
            </div>
          )}
          {product.discount && (
            <div className="absolute top-4 right-4 bg-red-500 text-white text-xs px-2 py-1 rounded">
              {product.discount}% OFF
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="text-center">
          <h3 className="text-light font-medium text-lg mb-1 transition-colors group-hover:text-secondary">
            {product.name}
          </h3>
          <p className="text-gray-400 text-sm mb-2">{product.category}</p>
          <div className="flex justify-center items-center space-x-2">
            {product.originalPrice && (
              <span className="text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
            )}
            <span className="text-secondary font-medium">{formatPrice(product.price)}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default EnhancedProductCard;