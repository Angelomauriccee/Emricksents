import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiTrash2,
  FiMinus,
  FiPlus,
  FiArrowLeft,
  FiShoppingBag,
} from "react-icons/fi";
import gsap from "gsap";

import Button from "../components/ui/Button";
import { useCart } from "../context/CartContext";
import { slugify } from "../utils/slugify";

const EnhancedCart = () => {
  const {
    cart: cartItems,
    updateQuantity: updateCartQuantity,
    removeFromCart,
    getTotalPrice,
  } = useCart();

  const cartRef = useRef(null);
  const summaryRef = useRef(null);

  // Calculate cart totals
  const subtotal = getTotalPrice();
  const shipping = 0; // ✅ FREE DELIVERY FOR LAGOS ORDERS (VALENTINE PROMO)
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

    // Create message with order details
    let messageText = "I would like to purchase the following:\n\n";

    // Add each product
    cartItems.forEach((item) => {
      messageText += `- Product: ${item.name}\n`;
      messageText += `- Price: ${formatPrice(item.price)}\n`;
      messageText += `- Quantity: ${item.quantity}\n`;
      messageText += `- Total: ${formatPrice(item.price * item.quantity)}\n\n`;
    });

    // Add grand total
    messageText += `Grand Total: ${formatPrice(total)}`;

    // URL encode the message
    const encodedMessage = encodeURIComponent(messageText);

    // Open WhatsApp with the message
    window.open(
      `https://wa.me/+2349065988598?text=${encodedMessage}`,
      "_blank",
    );
  };

  // GSAP animations
  useEffect(() => {
    if (cartRef.current && summaryRef.current) {
      const timeline = gsap.timeline();

      timeline
        .fromTo(
          cartRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        )
        .fromTo(
          summaryRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.6",
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
      <div className="container-custom mt-14">
        <div className="mb-5">
          <Link
            to="/shop"
            className="inline-flex items-center text-gray-400 hover:text-secondary transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            <span>Continue Shopping</span>
          </Link>
        </div>
        <h1 className="text-3xl md:text-4xl font-serif text-light mb-8">
          Your Shopping Cart
        </h1>

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
                    {/* Product - BUNDLE AWARE */}
                    <div className="col-span-1 md:col-span-6">
                      <div className="flex items-start space-x-4">
                        {" "}
                        {/* Changed to items-start for description alignment */}
                        <Link
                          to={
                            item.isBundle
                              ? "/build-your-box"
                              : `/product/${slugify(item.name)}`
                          }
                          className="block w-20 h-20 bg-gray-900 rounded-md overflow-hidden flex-shrink-0"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = "/images/placeholder-box.jpg";
                            }} // Fallback image
                          />
                        </Link>
                        <div className="flex-1 min-w-0">
                          {item.isBundle ? (
                            <div>
                              {/* BUNDLE NAME AS CLICKABLE LINK */}
                              <Link
                                to="/build-your-box"
                                className="text-light hover:text-amber-300 transition-colors font-bold flex items-center group"
                              >
                                {item.name}
                                <svg
                                  className="ml-2 w-4 h-4 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                  />
                                </svg>
                              </Link>

                              {/* BUNDLE DETAILS - EXACT FORMAT YOU SPECIFIED */}
                              <div className="mt-2 text-xs text-gray-300 whitespace-pre-line bg-gray-900/40 border-l-2 border-amber-500/30 pl-3 py-2 rounded-r font-mono leading-relaxed">
                                {item.description}
                              </div>
                            </div>
                          ) : (
                            <div>
                              <Link
                                to={`/product/${slugify(item.name)}`}
                                className="text-light hover:text-secondary transition-colors block"
                              >
                                {item.name}
                              </Link>
                              {item.size && (
                                <p className="text-gray-400 text-sm mt-1">
                                  {item.size}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* Price */}
                    <div className="col-span-1 md:col-span-2 flex md:block items-center justify-between">
                      <span className="md:hidden text-gray-400">Price:</span>
                      <span className="text-light">
                        {formatPrice(item.price)}
                      </span>
                    </div>

                    {/* Quantity - DISABLED FOR BUNDLES */}
                    <div className="col-span-1 md:col-span-2 flex md:justify-center items-center justify-between">
                      <span className="md:hidden text-gray-400">Quantity:</span>
                      {item.isBundle ? (
                        <span className="px-4 py-2 text-amber-300 font-medium bg-gray-900/50 rounded-md border border-amber-500/20">
                          Bundle
                        </span>
                      ) : (
                        <div className="flex items-center border border-gray-700 rounded-md">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="px-2 py-1 text-gray-400 hover:text-secondary transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            <FiMinus size={14} />
                          </button>
                          <span className="px-3 py-1 text-light">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="px-2 py-1 text-gray-400 hover:text-secondary transition-colors"
                            disabled={item.quantity >= 10}
                          >
                            <FiPlus size={14} />
                          </button>
                        </div>
                      )}
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
            </div>

            {/* Order Summary */}
            <div ref={summaryRef} className="lg:col-span-1">
              <div className="bg-dark rounded-lg p-6 sticky top-32">
                <h2 className="text-xl font-serif text-light mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  {/* ===== VALENTINE BENEFITS (INSIDE ORDER SUMMARY) ===== */}
                  <div className="space-y-2 p-3 bg-gray-900/30 rounded-lg border border-amber-500/20 -mx-3 mb-4">
                    <div className="flex items-start">
                      <div className="w-4 h-4 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                        <svg
                          className="w-2 h-2 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-xs text-amber-300">
                        Free delivery on all orders coming from Lagos
                      </span>
                    </div>
                    <div className="flex items-start">
                      <div className="w-4 h-4 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                        <svg
                          className="w-2 h-2 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <span className="text-xs text-amber-300">
                        Complimentary gift wrapping
                      </span>
                    </div>
                    <div className="flex items-start">
                      <div className="w-4 h-4 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                        <svg
                          className="w-2 h-2 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </div>
                      <span className="text-xs text-amber-300">
                        Handwritten Valentine Card Note (ON REQUEST)
                      </span>
                    </div>
                  </div>

                  {/* Original subtotal and totals */}
                  <div className="flex justify-between">
                    <span className="text-gray-400">Subtotal</span>
                    <span className="text-light">
                      ₦{subtotal.toFixed(2)}
                    </span>{" "}
                    {/* Changed $ to ₦ */}
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Shipping</span>
                    <span className="text-light">
                      ₦{shipping.toFixed(2)}
                    </span>{" "}
                    {/* Changed $ to ₦ */}
                  </div>
                  <div className="border-t border-gray-800 pt-4 flex justify-between">
                    <span className="text-light font-medium">Total</span>
                    <span className="text-secondary font-medium">
                      ₦{total.toFixed(2)}
                    </span>{" "}
                    {/* Changed $ to ₦ */}
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Subtotal</span>
                    <span className="text-light">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="border-t border-gray-800 pt-4 flex justify-between">
                    <span className="text-light font-medium">Total</span>
                    <span className="text-secondary font-medium">
                      {formatPrice(total)}
                    </span>
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
            <h2 className="text-2xl font-serif text-light mb-4">
              Your cart is empty
            </h2>
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
