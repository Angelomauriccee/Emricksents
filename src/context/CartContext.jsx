import { createContext, useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Cart notification component
const CartNotification = ({ product }) => {
  return (
    <motion.div 
      className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-dark border border-secondary rounded-md shadow-gold px-4 py-3 flex items-center"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="w-10 h-10 rounded-md overflow-hidden mr-3">
        {product.image && (
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div>
        <p className="text-light text-sm">
          <span className="text-secondary">Added to cart:</span> {product.name}
        </p>
        <p className="text-xs text-gray-400">
          ${product.price} • Click to view cart
        </p>
      </div>
    </motion.div>
  );
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationProduct, setNotificationProduct] = useState(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('emrickscents-cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
        setCartCount(parsedCart.reduce((sum, item) => sum + item.quantity, 0));
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
        // If there's an error, reset the cart
        localStorage.removeItem('emrickscents-cart');
        setCart([]);
        setCartCount(0);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('emrickscents-cart', JSON.stringify(cart));
    setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        const updatedCart = prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        // Save to localStorage immediately
        localStorage.setItem('emrickscents-cart', JSON.stringify(updatedCart));
        return updatedCart;
      } else {
        const updatedCart = [...prevCart, { ...product, quantity }];
        // Save to localStorage immediately
        localStorage.setItem('emrickscents-cart', JSON.stringify(updatedCart));
        return updatedCart;
      }
    });
    
    // Set notification product
    setNotificationProduct(product);
    
    // Show notification
    setShowNotification(true);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => {
      const updatedCart = prevCart.filter(item => item.id !== productId);
      // Save to localStorage immediately
      localStorage.setItem('emrickscents-cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart => {
      const updatedCart = prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      );
      // Save to localStorage immediately
      localStorage.setItem('emrickscents-cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    // Clear cart in localStorage
    localStorage.removeItem('emrickscents-cart');
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const value = {
    cart,
    cartCount,
    showNotification,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {showNotification && notificationProduct && (
          <CartNotification product={notificationProduct} />
        )}
      </AnimatePresence>
    </CartContext.Provider>
  );
};