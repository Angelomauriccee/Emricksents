import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiTrash2, FiMinus, FiPlus, FiArrowLeft, FiShoppingBag } from 'react-icons/fi';
import gsap from 'gsap';

import Button from '../components/ui/Button';
import { useCart } from '../context/CartContext';

const EnhancedCart = () => {
  const { cart: cartItems, updateQuantity: updateCartQuantity, removeFromCart, getTotalPrice } = useCart();
  
  const cartRef = useRef(null);
  const summaryRef = useRef(null);

  // Calculate cart totals
  const subtotal = getTotalPrice();
  const shipping = subtotal > 0 ? 5000 : 0; // Shipping in Naira
  const total = subtotal + shipping;

  // Format price in Naira
  const formatPrice = (price) => {
    return `₦${price.toLocaleString()}`;
  };

  // Update quantity
  const updateQuantity = (productId, amount) => {
    updateCartQuantity(productId, amount);
  };

  // Remove item
  const removeItem = (productId) => {
    removeFromCart(productId);
  };

  // Handle WhatsApp checkout
  const handleWhatsAppCheckout = () => {
    if (cartItems.length === 0) return;
    
    const itemsList = cartItems.map(item => 
      `- ${item.product.name} (${item.quantity} x ${formatPrice(item.product.price)})`
    ).join('\n');
    
    const message = encodeURIComponent(
      `Hello, I would like to place an order:\n\n` +
      `${itemsList}\n\n` +
      `Subtotal: ${formatPrice(subtotal)}\n` +
      `Shipping: ${formatPrice(shipping)}\n` +
      `Total: ${formatPrice(total)}\n\n` +
      `Please provide me with payment details.`
    );
    
    window.open(`https://wa.me/1234567890?text=${message}`, '_blank');
  };

  // GSAP animations
  useEffect(() => {
    if (cartRef.current && summaryRef.current) {
      const timeline = gsap.timeline();
      
      timeline.fromTo(
        cartRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      ).fromTo(
        summaryRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      );
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-primary py-32"
    >
      <div className="container-custom">
        <h1 className="text-3xl md:text-4xl font-serif text-light mb-8">Your Shopping Cart</h1>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div ref={cartRef} className="lg:col-span-2">
              <div className="bg-dark rounded-lg overflow-hidden">
                <div className="hidden md:grid grid-cols-12 gap-4 p-6 border-b border-gray-800 text-gray-400">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-center">Total</div>
                </div>

                {cartItems.map((item) => (
                  <div 
                    key={item.id}
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 p-6 border-b border-gray-800 items-center"
                  >
                    {/* Product */}
                    <div className="col-span-1 md:col-span-6">
                      <div className="flex items-center space-x-4">
                        <Link to={`/product/${item.id}`} className="block w-20 h-20 bg-gray-900 rounded-md overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                          />
                        </Link>
                        <div>
                          <Link to={`/product/${item.id}`} className="text-light hover:text-secondary transition-colors">
                            {item.name}
                          </Link>
                          <p className="text-gray-400 text-sm mt-1">{item.size}</p>
                        </div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="col-span-1 md:col-span-2 flex md:block items-center justify-between">
                      <span className="md:hidden text-gray-400">Price:</span>
                      <span className="text-light">{formatPrice(item.price)}</span>
                    </div>

                    {/* Quantity */}
                    <div className="col-span-1 md:col-span-2 flex md:justify-center items-center justify-between">
                      <span className="md:hidden text-gray-400">Quantity:</span>
                      <div className="flex items-center border border-gray-700 rounded-md">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 text-gray-400 hover:text-secondary transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <FiMinus size={14} />
                        </button>
                        <span className="px-3 py-1 text-light">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-gray-400 hover:text-secondary transition-colors"
                          disabled={item.quantity >= 10}
                        >
                          <FiPlus size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="col-span-1 md:col-span-2 flex md:justify-between items-center justify-between">
                      <span className="md:hidden text-gray-400">Total:</span>
                      <span className="text-secondary font-medium">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        aria-label="Remove item"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link 
                  to="/shop" 
                  className="inline-flex items-center text-gray-400 hover:text-secondary transition-colors"
                >
                  <FiArrowLeft className="mr-2" />
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div ref={summaryRef} className="lg:col-span-1">
              <div className="bg-dark rounded-lg p-6 sticky top-32">
                <h2 className="text-xl font-serif text-light mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Subtotal</span>
                    <span className="text-light">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Shipping</span>
                    <span className="text-light">{formatPrice(shipping)}</span>
                  </div>
                  <div className="border-t border-gray-800 pt-4 flex justify-between">
                    <span className="text-light font-medium">Total</span>
                    <span className="text-secondary font-medium">{formatPrice(total)}</span>
                  </div>
                </div>
                
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="w-full flex items-center justify-center"
                  onClick={handleWhatsAppCheckout}
                  disabled={cartItems.length === 0}
                >
                  <FiShoppingBag className="mr-2" />
                  <span>Checkout with WhatsApp</span>
                </Button>
                
                <p className="text-gray-400 text-sm mt-4 text-center">
                  Secure checkout powered by WhatsApp
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-dark rounded-lg p-12 text-center">
            <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiShoppingBag size={32} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-serif text-light mb-4">Your cart is empty</h2>
            <p className="text-gray-400 mb-8">
              Looks like you haven't added any perfumes to your cart yet.
            </p>
            <Button to="/shop" variant="primary">
              Start Shopping
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default EnhancedCart;