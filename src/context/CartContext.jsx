import { createContext, useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom"; // ADD THIS IMPORT AT TOP OF FILE
const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

// Cart notification component
// Cart notification component - FIXED WITH CLICK HANDLER

const CartNotification = ({ product }) => {
  const navigate = useNavigate();

  const handleViewCart = (e) => {
    e.stopPropagation();
    navigate("/cart");
  };

  return (
    <motion.div
      className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-dark border border-secondary rounded-md shadow-gold px-4 py-3 flex items-center"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: "spring", damping: 15, stiffness: 300 },
      }}
      exit={{
        opacity: 0,
        y: 20,
        scale: 0.95,
        transition: { duration: 0.2 },
      }}
      onClick={() => navigate("/cart")}
    >
      <div className="w-10 h-10 rounded-md overflow-hidden mr-3">
        {product.image && (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "/images/placeholder.jpg";
            }}
          />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white">
          Added to cart: {product.name}
        </p>
        <div className="flex items-center mt-1">
          <span className="text-amber-300 font-bold text-sm">
            ₦
            {typeof product.price === "number"
              ? product.price.toLocaleString()
              : product.price}
          </span>
          <button
            onClick={handleViewCart}
            className="ml-3 text-xs text-amber-300 font-medium hover:underline hover:text-amber-400 transition-colors flex items-center"
            aria-label="View cart"
          >
            View cart →
          </button>
        </div>
      </div>

      {/* Progress bar for auto-dismiss */}
      <div className="absolute bottom-2 left-0 right-0 h-0.5 bg-white/20 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: "100%" }}
          animate={{ width: "0%" }}
          transition={{ duration: 3, ease: "linear" }}
          className="h-full bg-amber-400"
        />
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
    const savedCart = localStorage.getItem("emrickscents-cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
        setCartCount(parsedCart.reduce((sum, item) => sum + item.quantity, 0));
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error);
        // If there's an error, reset the cart
        localStorage.removeItem("emrickscents-cart");
        setCart([]);
        setCartCount(0);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("emrickscents-cart", JSON.stringify(cart));
    setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        const updatedCart = prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
        // Save to localStorage immediately
        localStorage.setItem("emrickscents-cart", JSON.stringify(updatedCart));
        return updatedCart;
      } else {
        const updatedCart = [...prevCart, { ...product, quantity }];
        // Save to localStorage immediately
        localStorage.setItem("emrickscents-cart", JSON.stringify(updatedCart));
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
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== productId);
      // Save to localStorage immediately
      localStorage.setItem("emrickscents-cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      );
      // Save to localStorage immediately
      localStorage.setItem("emrickscents-cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    // Clear cart in localStorage
    localStorage.removeItem("emrickscents-cart");
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
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
