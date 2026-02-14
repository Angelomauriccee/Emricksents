import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Import your existing components
import Button from "../../components/ui/Button";
// import SectionTitle from "/Emrickscents/Emricksents/src/components/ui/SectionTitle";
import products from "../../data/products";
// Add this after your existing imports (around line 5)
import { useCart } from "../../context/CartContext"; // Adjust path if needed

const BuildYourBox = () => {
  const navigate = useNavigate();

  // Initialize state from localStorage
  const [activeBox, setActiveBox] = useState(() => {
    const saved = localStorage.getItem("buildYourBox_activeBox");
    return saved ? JSON.parse(saved) : "red";
  });

  const [redBoxSlots, setRedBoxSlots] = useState(() => {
    const saved = localStorage.getItem("buildYourBox_redBoxSlots");
    return saved ? JSON.parse(saved) : 4;
  });

  const [blackBoxSlots, setBlackBoxSlots] = useState(() => {
    const saved = localStorage.getItem("buildYourBox_blackBoxSlots");
    return saved ? JSON.parse(saved) : 4;
  });

  const [redBoxProducts, setRedBoxProducts] = useState(() => {
    const saved = localStorage.getItem("buildYourBox_redBoxProducts");
    return saved ? JSON.parse(saved) : Array(16).fill(null);
  });

  const [blackBoxProducts, setBlackBoxProducts] = useState(() => {
    const saved = localStorage.getItem("buildYourBox_blackBoxProducts");
    return saved ? JSON.parse(saved) : Array(16).fill(null);
  });

  const [selectedSlotIndex, setSelectedSlotIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { addToCart } = useCart(); // Get cart function from context
  const [specialItems, setSpecialItems] = useState(Array(4).fill(null));
  const [isSpecialModalOpen, setIsSpecialModalOpen] = useState(false);
  const [specialSlotIndex, setSpecialSlotIndex] = useState(null);
  // Color palette matching website exactly
  const colors = {
    red: {
      primary: "from-[#2a0a0a] to-[#1a0808]",
      border: "border-amber-500/30",
      accent: "text-rose-400",
      gradient: "bg-gradient-to-r from-rose-500 to-amber-500",
      title: "For Her",
      subtitle: "Elegant & Romantic Fragrances",
    },
    black: {
      primary: "from-[#0a0a0a] to-[#1a1a1a]",
      border: "border-amber-500/30",
      accent: "text-amber-300",
      gradient: "bg-gradient-to-r from-amber-500 to-amber-300",
      title: "For Him",
      subtitle: "Sophisticated & Bold Scents",
    },
  };

  // Save to localStorage
  useEffect(
    () =>
      localStorage.setItem("buildYourBox_activeBox", JSON.stringify(activeBox)),
    [activeBox],
  );
  useEffect(
    () =>
      localStorage.setItem(
        "buildYourBox_redBoxSlots",
        JSON.stringify(redBoxSlots),
      ),
    [redBoxSlots],
  );
  useEffect(
    () =>
      localStorage.setItem(
        "buildYourBox_blackBoxSlots",
        JSON.stringify(blackBoxSlots),
      ),
    [blackBoxSlots],
  );
  useEffect(
    () =>
      localStorage.setItem(
        "buildYourBox_redBoxProducts",
        JSON.stringify(redBoxProducts),
      ),
    [redBoxProducts],
  );
  useEffect(
    () =>
      localStorage.setItem(
        "buildYourBox_blackBoxProducts",
        JSON.stringify(blackBoxProducts),
      ),
    [blackBoxProducts],
  );

  useEffect(() => setIsMounted(true), []);

  // Prevent background scroll when modal is open

  // Handlers
  const openProductModal = (slotIndex) => {
    setSelectedSlotIndex(slotIndex);
    setIsModalOpen(true);
  };

  const closeProductModal = () => {
    setIsModalOpen(false);
    setSelectedSlotIndex(null);
  };

  const handleProductSelect = (product) => {
    if (selectedSlotIndex === null) return;
    if (activeBox === "red") {
      const newRedProducts = [...redBoxProducts];
      newRedProducts[selectedSlotIndex] = product;
      setRedBoxProducts(newRedProducts);
    } else {
      const newBlackProducts = [...blackBoxProducts];
      newBlackProducts[selectedSlotIndex] = product;
      setBlackBoxProducts(newBlackProducts);
    }
    closeProductModal();
  };

  const removeProduct = (slotIndex) => {
    if (activeBox === "red") {
      const newRedProducts = [...redBoxProducts];
      newRedProducts[slotIndex] = null;
      setRedBoxProducts(newRedProducts);
    } else {
      const newBlackProducts = [...blackBoxProducts];
      newBlackProducts[slotIndex] = null;
      setBlackBoxProducts(newBlackProducts);
    }
  };

  const openSpecialItemModal = (slotIndex) => {
    setSpecialSlotIndex(slotIndex);
    setIsSpecialModalOpen(true);
  };

  const closeSpecialItemModal = () => {
    setIsSpecialModalOpen(false);
    setSpecialSlotIndex(null);
  };

  const handleSpecialItemSelect = (product) => {
    if (specialSlotIndex === null) return;
    const newSpecialItems = [...specialItems];
    newSpecialItems[specialSlotIndex] = product;
    setSpecialItems(newSpecialItems);
    closeSpecialItemModal();
  };

  const removeSpecialItem = (slotIndex) => {
    const newSpecialItems = [...specialItems];
    newSpecialItems[slotIndex] = null;
    setSpecialItems(newSpecialItems);
  };

  const clearSelections = () => {
    if (activeBox === "red") setRedBoxProducts(Array(16).fill(null));
    else setBlackBoxProducts(Array(16).fill(null));
  };

  const handleAddToCart = () => {
    const currentProducts =
      activeBox === "red" ? redBoxProducts : blackBoxProducts;
    const selectedItems = [...currentProducts, ...specialItems].filter(
      (p) => p,
    ); // COMBINE BOTH

    if (selectedItems.length < 4) {
      alert("Please select at least 4 fragrances to add to cart");
      return;
    }

    // Format with quantities (including special items)
    const productMap = {};
    selectedItems.forEach((product) => {
      if (productMap[product.id]) productMap[product.id].quantity += 1;
      else productMap[product.id] = { ...product, quantity: 1 };
    });

    // Format bundle string
    const bundleItems = Object.values(productMap)
      .map((item, index) => `${index + 1}: ${item.name} x ${item.quantity}`)
      .join("\n");

    const bundleTotal = Object.values(productMap).reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    const bundleName = `VALENTINE BUNDLE ${activeBox === "red" ? "Red-box(For her)" : "Black-box(For him)"}`;
    const bundleDescription = `${bundleItems}\nTotal: ₦${bundleTotal.toLocaleString()}`;

    // CREATE BUNDLE ITEM
    const bundleItem = {
      id: `valentine-bundle-${Date.now()}`,
      name: bundleName,
      description: bundleDescription,
      price: bundleTotal,
      quantity: 1,
      image:
        activeBox === "red"
          ? "/valentineprops/val-box-female.png"
          : "/valentineprops/val-box-male.png",
      category: "Valentine Bundle",
      isBundle: true,
      bundleItems: Object.values(productMap),
      createdAt: new Date().toISOString(),
    };

    // ADD TO REAL CART
    addToCart(bundleItem);

    // Reset special items after adding to cart
    setSpecialItems(Array(4).fill(null));
  };
  // ===== LUXURY MINIMALIST MODAL =====
  const ProductModal = () => {
    const filteredProducts = products.filter((product) =>
      activeBox === "red"
        ? product.category === "Women's Collection"
        : product.category === "Men's Collection",
    );

    return (
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-[100] flex items-start md:items-center justify-center p-0 backdrop-blur-sm"
            onClick={closeProductModal}
          >
            {/* Particles (reduced for mobile performance) */}
            <div className="fixed inset-0 pointer-events-none">
              {[...Array(30)].map((_, i) => (
                <div
                  key={i}
                  className="absolute bg-white rounded-full"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    width: `${Math.random() * 2 + 1}px`,
                    height: `${Math.random() * 2 + 1}px`,
                    opacity: Math.random() * 0.4,
                  }}
                />
              ))}
            </div>

            {/* MODAL CONTAINER - SEARCH OVERLAY STYLE */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-[#0a0a0a] rounded-3xl w-full h-full md:max-w-6xl md:h-auto md:max-h-[90vh] overflow-y-auto flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-4 sm:p-6 border-b border-gray-800 bg-gradient-to-r from-[#0a0a0a] to-[#1a1a1a] sticky top-0 z-10">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                      Select {activeBox === "red" ? "Her" : "His"} Fragrance
                    </h2>
                    <p className="text-amber-300 mt-1 text-sm sm:text-base">
                      Curated luxury collection • {filteredProducts.length}{" "}
                      items
                    </p>
                  </div>
                  <button
                    onClick={closeProductModal}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-red-500 to-rose-600 text-white flex items-center justify-center hover:from-red-600 hover:to-rose-700 transition-all shadow-lg border-2 border-red-400/30 flex-shrink-0"
                    title="Close"
                  >
                    <span className="text-xl sm:text-2xl font-bold">
                      &times;
                    </span>
                  </button>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6">
                {/* Responsive Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleProductSelect(product)}
                      className="group cursor-pointer bg-gray-900/50 rounded-xl border border-gray-800 overflow-hidden transition-all hover:border-amber-500/40"
                    >
                      <div className="relative h-48 sm:h-56 bg-[#0a0a0a] overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain p-2 sm:p-4 transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-3 sm:p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-serif font-bold text-base sm:text-lg text-white line-clamp-1">
                            {product.name}
                          </h3>
                          <span className="px-2 py-1 bg-gradient-to-r from-amber-500/10 to-rose-500/10 text-amber-300 text-[10px] sm:text-xs font-medium rounded-full border border-amber-500/20 whitespace-nowrap">
                            {product.category.split(" ")[0]}
                          </span>
                        </div>
                        <div className="space-y-2 mt-3 pt-2 border-t border-gray-800/50">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] sm:text-xs text-gray-400">
                              Price
                            </span>
                            <span className="font-bold text-amber-300 text-sm sm:text-base">
                              ₦{product.price.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex items-center justify-between pt-1">
                            <div className="flex items-center space-x-1.5">
                              <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
                              <span className="text-[10px] sm:text-xs text-gray-400">
                                Just for {activeBox === "red" ? "Her" : "Him"}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1.5 bg-gradient-to-r from-rose-500/10 to-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                              <span className="text-amber-300 font-medium text-[10px] sm:text-xs">
                                Select
                              </span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3 w-3 sm:h-4 sm:w-4 text-amber-300"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Empty State */}
                {filteredProducts.length === 0 && (
                  <div className="text-center py-12 sm:py-20">
                    <div className="text-5xl sm:text-7xl mb-4 sm:mb-6 animate-pulse">
                      ✨
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-3">
                      Collection Unavailable
                    </h3>
                    <p className="text-base sm:text-lg text-gray-300 max-w-xl mx-auto px-2">
                      Our curated {activeBox === "red" ? "women's" : "men's"}{" "}
                      luxury collection is being prepared with care. Check back
                      soon for an exquisite selection.
                    </p>
                    <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center gap-3 px-2">
                      <button
                        onClick={closeProductModal}
                        className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl font-medium hover:bg-gray-700 transition-colors border border-gray-700"
                      >
                        Return to Builder
                      </button>
                      <button className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-rose-500 to-amber-500 text-white rounded-xl font-medium hover:opacity-90 transition-opacity shadow-lg">
                        Notify Me When Available
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  // ===== SPECIAL ITEMS MODAL =====
  const SpecialItemsModal = () => {
    const filteredProducts = products.filter(
      (product) => product.category === "special collection",
    );

    return (
      <AnimatePresence>
        {isSpecialModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={closeSpecialItemModal}
          >
            <div className="fixed inset-0 pointer-events-none">
              {[...Array(50)].map((_, i) => (
                <div
                  key={i}
                  className="absolute bg-white rounded-full"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    width: `${Math.random() * 2 + 1}px`,
                    height: `${Math.random() * 2 + 1}px`,
                    opacity: Math.random() * 0.4,
                  }}
                />
              ))}
            </div>

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-[#0a0a0a] rounded-3xl w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl border border-amber-500/10 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-800 bg-gradient-to-r from-[#0a0a0a] to-[#1a1a1a]">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-3xl font-serif font-bold text-white">
                      Special Add-Ons
                    </h2>
                    <p className="text-amber-300/80 mt-1 text-lg">
                      Elevate your gift • {filteredProducts.length} exclusive
                      items
                    </p>
                  </div>
                  <button
                    onClick={closeSpecialItemModal}
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-rose-600 text-white flex items-center justify-center hover:from-red-600 hover:to-rose-700 transition-all shadow-lg hover:shadow-red-500/40 border-2 border-red-400/30"
                  >
                    <span className="text-2xl font-bold">&times;</span>
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    whileHover={{ y: -8 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleSpecialItemSelect(product)} // ✅ CORRECT HANDLER
                    className="group cursor-pointer"
                  >
                    {/* Card Container */}
                    <div className="bg-gradient-to-br from-gray-900/50 to-black rounded-2xl border border-gray-800 overflow-hidden transition-all duration-300 hover:border-amber-500/40 hover:shadow-xl hover:shadow-amber-500/10">
                      {/* Product Image - Full Container */}
                      <div className="relative h-56 bg-[#0a0a0a] overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      {/* Product Details - Clean & Minimalist */}
                      <div className="p-5">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-serif font-bold text-xl text-white leading-tight">
                            {product.name}
                          </h3>
                          <span className="px-3 py-1 bg-gradient-to-r from-amber-500/10 to-rose-500/10 text-amber-300 text-xs font-medium rounded-full border border-amber-500/20">
                            {product.category.split(" ")[0]}
                          </span>
                        </div>
                        <div className="space-y-3 mt-4 pt-4 border-t border-gray-800/50">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400 text-sm">Price</span>
                            <span className="font-bold text-amber-300 text-xl">
                              ₦{product.price.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                              <span className="text-xs text-gray-400">
                                Just for {activeBox === "red" ? "Her" : "Him"}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2 bg-gradient-to-r from-rose-500/10 to-amber-500/10 px-4 py-2 rounded-full border border-amber-500/20">
                              <span className="text-amber-300 font-medium text-sm">
                                Select
                              </span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-amber-300"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  // Helper variables
  const currentSlots = activeBox === "red" ? redBoxSlots : blackBoxSlots;
  const setCurrentSlots =
    activeBox === "red" ? setRedBoxSlots : setBlackBoxSlots;
  const currentProducts =
    activeBox === "red" ? redBoxProducts : blackBoxProducts;
  const boxColor = activeBox === "red" ? colors.red : colors.black;

  // REMOVED DISCOUNT - Total = Subtotal
  const currentSubtotal = currentProducts
    .filter((p) => p)
    .reduce((sum, p) => sum + (p?.price || 0), 0);
  const currentTotal = currentSubtotal; // No discount

  // Group products by ID for cart display
  const groupedProducts = currentProducts
    .filter((p) => p)
    .reduce((acc, product) => {
      if (acc[product.id]) acc[product.id].quantity += 1;
      else acc[product.id] = { ...product, quantity: 1 };
      return acc;
    }, {});

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };
  const itemLeft = {
    hidden: { opacity: 0, x: -50 },
    show: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };
  const itemRight = {
    hidden: { opacity: 0, x: 50 },
    show: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative pt-40 pb-16">
      {/* Star Particle Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[#0a0a0a]">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                opacity: Math.random() * 0.6,
              }}
            />
          ))}
        </div>
      </div>

      <div className="bg-gray-900/20 backdrop-blur-md rounded-3xl border border-amber-500/20 mx-4">
        <div className="container-custom relative z-10 py-8">
          {/* Header */}
          {/* RESPONSIVE HEADER - CENTERED TITLE ON DESKTOP */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
              {/* Back Button - Full width on mobile, left on desktop */}
              <div className="col-span-1 sm:col-span-1 text-left sm:text-left">
                <motion.button
                  whileHover={{ x: -5 }} // ✅ REMOVED backgroundColor
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(-1)}
                  className="absolute left-5 top-4 flex items-center text-gray-300 hover:text-amber-300 transition-colors"
                >
                  <svg
                    className="h-5 w-5 mr-2 flex-shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-medium whitespace-nowrap">
                    <span className="hidden sm:inline">Back to Shopping</span>
                    <span className="sm:hidden">Back</span>
                  </span>
                </motion.button>
              </div>

              {/* Title - Centered on ALL screens, spans full width on desktop */}
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="col-span-1 sm:col-span-3 text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-center"
              >
                Craft Your
                <span
                  className={`ml-2 bg-clip-text text-transparent ${colors.red.gradient}`}
                >
                  Valentine's Box
                </span>
              </motion.h1>

              {/* Spacer for desktop alignment */}
              <div className="col-span-1 sm:col-span-1"></div>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="text-gray-400 text-center mb-12"
          >
            Curate a bespoke fragrance experience
          </motion.p>

          <motion.div
            variants={container}
            initial="hidden"
            animate={isMounted ? "show" : "hidden"}
            className="grid grid-cols-1 lg:grid-cols-3 gap-12" // CHANGED gap-12 → gap-20
          >
            {/* LEFT COLUMN: Box Builder */}
            <motion.div variants={itemLeft} className="lg:col-span-2">
              {/* Box Selector */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mb-8 max-w-md mx-auto"
              >
                <div className="relative p-1 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden">
                  <motion.div
                    className="absolute inset-0 rounded-lg"
                    animate={{
                      x: activeBox === "red" ? 0 : "100%",
                      width: "50%",
                      background:
                        activeBox === "red"
                          ? "linear-gradient(to right, #f43f5e, #f59e0b)"
                          : "linear-gradient(to right, #f59e0b, #eab308)",
                    }}
                    transition={{
                      x: { type: "spring", stiffness: 400, damping: 25 },
                      background: { duration: 0.3 },
                    }}
                  />
                  <div className="relative flex space-x-2 z-10">
                    <button
                      onClick={() => setActiveBox("red")}
                      className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${activeBox === "red" ? "text-white" : "text-gray-400 hover:text-rose-300"}`}
                    >
                      For Her
                    </button>
                    <button
                      onClick={() => setActiveBox("black")}
                      className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${activeBox === "black" ? "text-white" : "text-gray-400 hover:text-amber-300"}`}
                    >
                      For Him
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Box Container */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeBox}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.4 }}
                  className="relative"
                >
                  <div
                    className={`rounded-3xl overflow-hidden shadow-xl border-2 ${boxColor.border} bg-gradient-to-br ${boxColor.primary} relative`}
                  >
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-amber-300 to-amber-500 rounded-full shadow-md"></div>

                    <div className="relative p-6">
                      {/* Section Title with Clear Button - LEFT ALIGNED WITH UNDERLINE */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="mb-6 flex items-center justify-between"
                      >
                        <div>
                          {/* Custom title with underline ONLY under "Her" or "Him" */}
                          <div className="flex items-end space-x-1.5">
                            <span className="text-xl font-serif text-gray-300">
                              For
                            </span>
                            <div className="relative inline-block">
                              <span
                                className={`text-2xl md:text-3xl font-serif font-bold ${
                                  activeBox === "red"
                                    ? "bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-amber-400"
                                    : "bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-yellow-300"
                                }`}
                              >
                                {activeBox === "red" ? "Her" : "Him"}
                              </span>
                              <div
                                className={`absolute -bottom-0.5 left-0 w-full h-0.5 ${
                                  activeBox === "red"
                                    ? "bg-gradient-to-r from-rose-400 to-amber-400"
                                    : "bg-gradient-to-r from-amber-400 to-yellow-300"
                                }`}
                              ></div>
                            </div>
                          </div>
                          <p className="text-gray-400 text-sm mt-1.5">
                            {boxColor.subtitle}
                          </p>
                        </div>
                        {currentProducts.some((p) => p) && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={clearSelections}
                            className="px-4 py-2 bg-gradient-to-r from-red-500/20 to-rose-600/20 border border-red-500/30 text-red-300 rounded-xl text-sm font-medium hover:bg-red-500/30 transition-all flex items-center space-x-2"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </motion.button>
                        )}
                      </motion.div>

                      {/* Slots Control */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="mb-6"
                      >
                        <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-800">
                          {/* Responsive layout: stacked on mobile, inline on desktop */}
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            {/* Text section - full width on mobile, auto on desktop */}
                            <div className="text-center sm:text-left w-full sm:w-auto">
                              <p className="text-sm font-medium text-amber-300 mb-1">
                                Number of Fragrance Slots
                              </p>
                              <p className="text-xs text-gray-400">
                                Customize your box size
                              </p>
                            </div>

                            {/* Buttons section - centered on mobile, right-aligned on desktop */}
                            <div className="flex items-center justify-center sm:justify-end space-x-4 w-full sm:w-auto">
                              <button
                                onClick={() =>
                                  setCurrentSlots(Math.max(4, currentSlots - 1))
                                }
                                disabled={currentSlots <= 4}
                                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                                  currentSlots > 4
                                    ? "bg-gray-800 text-amber-300 hover:bg-gray-700"
                                    : "bg-gray-800 text-gray-600 cursor-not-allowed"
                                }`}
                              >
                                -
                              </button>
                              <motion.div
                                key={currentSlots}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                transition={{ type: "spring", damping: 10 }}
                                className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-500 to-amber-500 flex items-center justify-center text-white font-bold text-xl shadow-lg"
                              >
                                {currentSlots}
                              </motion.div>
                              <button
                                onClick={() =>
                                  setCurrentSlots(
                                    Math.min(16, currentSlots + 1),
                                  )
                                }
                                disabled={currentSlots >= 16}
                                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                                  currentSlots < 16
                                    ? "bg-gray-800 text-amber-300 hover:bg-gray-700"
                                    : "bg-gray-800 text-gray-600 cursor-not-allowed"
                                }`}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      {/* GRID LAYOUT - IMAGE FILLS SLOT */}
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        <AnimatePresence>
                          {Array.from({ length: currentSlots }).map(
                            (_, index) => (
                              <motion.div
                                key={index}
                                layout
                                initial={{ opacity: 0, scale: 0.7 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.7 }}
                                transition={{
                                  duration: 0.35,
                                  delay: 0.5 + index * 0.04,
                                }}
                                whileHover={{
                                  scale: 1.07,
                                  borderColor:
                                    activeBox === "red" ? "#f87171" : "#fbbf24",
                                  transition: { duration: 0.2 },
                                }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => openProductModal(index)}
                                className={`aspect-square rounded-2xl border-2 cursor-pointer relative overflow-hidden group ${
                                  currentProducts[index]
                                    ? "border-transparent shadow-xl"
                                    : "border-dashed border-amber-500/30 bg-gray-900/20 hover:border-amber-400"
                                }`}
                              >
                                {/* Slot Number Badge */}
                                <div className="absolute top-3 left-3 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold bg-black/60 text-amber-300 z-20 border border-amber-500/30">
                                  {index + 1}
                                </div>

                                {/* REMOVE BUTTON */}
                                {currentProducts[index] && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      removeProduct(index);
                                    }}
                                    className="absolute top-3 right-3 w-7 h-7 rounded-full bg-gradient-to-r from-red-500 to-rose-600 text-white text-lg flex items-center justify-center hover:from-red-600 hover:to-rose-700 z-30 shadow-lg hover:shadow-red-500/30 transition-all"
                                    title="Remove product"
                                  >
                                    &times;
                                  </button>
                                )}

                                {currentProducts[index] ? (
                                  <div className="relative w-full h-full">
                                    <img
                                      src={currentProducts[index].image}
                                      alt={currentProducts[index].name}
                                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                                      <p className="text-white text-sm font-bold text-center w-full line-clamp-2 bg-gradient-to-r from-rose-300 to-amber-300 bg-clip-text text-transparent">
                                        {currentProducts[index].name}
                                      </p>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center">
                                    <div className="w-8 h-8 rounded-full border-2 border-dashed border-amber-400/50 flex items-center justify-center text-amber-300 text-2xl font-bold">
                                      +
                                    </div>
                                  </div>
                                )}
                              </motion.div>
                            ),
                          )}
                        </AnimatePresence>
                      </div>

                      {currentSlots < 16 && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.8 }}
                          className="col-span-4 mt-4 text-center text-sm text-amber-300"
                        >
                          <span className="inline-flex items-center">
                            <svg
                              className="w-4 h-4 mr-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                              />
                            </svg>
                            Add more slots to include additional fragrances
                          </span>
                        </motion.div>
                      )}
                    </div>
                    <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-amber-300 to-amber-500 rounded-full shadow-md"></div>
                  </div>
                </motion.div>
              </AnimatePresence>
              {/* ===== SPECIAL ITEMS SECTION ===== */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="mt-12 pt-8 border-t border-amber-500/20"
              >
                <div className="flex items-center justify-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 flex items-center justify-center mr-4">
                    <span className="text-white text-2xl font-bold">+</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-amber-400">
                    Special Add-Ons
                  </h3>
                </div>

                <p className="text-gray-400 text-center mb-8 max-w-2xl mx-auto">
                  Elevate your Valentine's gift with exclusive luxury add-ons.
                  Only 4 special slots available.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <motion.div
                      key={`special-${index}`}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => openSpecialItemModal(index)}
                      className={`aspect-square rounded-2xl border-2 flex flex-col items-center justify-center cursor-pointer relative overflow-hidden group ${
                        specialItems[index]
                          ? "border-transparent bg-white shadow-xl"
                          : "border-dashed border-amber-500/30 bg-gray-900/20 hover:border-amber-400"
                      }`}
                    >
                      {specialItems[index] ? (
                        <div className="relative w-full h-full">
                          <img
                            src={specialItems[index].image}
                            alt={specialItems[index].name}
                            className="w-full h-full object-cover"
                          />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeSpecialItem(index);
                            }}
                            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gradient-to-r from-red-500 to-rose-600 text-white text-sm flex items-center justify-center hover:from-red-600 hover:to-rose-700 z-10 shadow-lg"
                            title="Remove"
                          >
                            &times;
                          </button>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                            <p className="text-white text-xs font-bold text-center w-full line-clamp-2 bg-gradient-to-r from-rose-300 to-amber-300 bg-clip-text text-transparent">
                              {specialItems[index].name}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-8 h-8 rounded-full border-2 border-dashed border-amber-400/50 flex items-center justify-center text-amber-300 text-2xl font-bold">
                            +
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>

                <p className="text-xs text-amber-300 text-center mt-4 max-w-md mx-auto">
                  💝 These exclusive add-ons make your gift truly unforgettable
                </p>
              </motion.div>
            </motion.div>

            {/* RIGHT COLUMN: Cart Sidebar - NO DISCOUNT */}
            <motion.div variants={itemRight} className="sticky top-28 h-fit">
              <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="flex items-center justify-between mb-6 pb-4 border-b border-gray-800"
                >
                  <h2 className="text-2xl font-serif font-bold text-white flex items-center">
                    <span className="mr-3">📦</span>
                    Your {activeBox === "red" ? "Her" : "His"} Curation
                  </h2>
                  {Object.keys(groupedProducts).length > 0 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={clearSelections}
                      className="text-xs text-red-400 hover:text-red-300 font-medium flex items-center space-x-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      <span>Clear</span>
                    </motion.button>
                  )}
                </motion.div>

                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 mb-6">
                  {Object.keys(groupedProducts).length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="text-center py-8 text-gray-400"
                    >
                      <div className="text-5xl mb-3 text-amber-300 animate-pulse">
                        ✨
                      </div>
                      <p className="font-medium text-white">
                        Begin your {activeBox === "red" ? "her" : "his"}{" "}
                        curation
                      </p>
                      <p className="text-sm text-gray-400 mt-1">
                        Select fragrances to build your box
                      </p>
                    </motion.div>
                  ) : (
                    <AnimatePresence>
                      {Object.values(groupedProducts).map((item, idx) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 30 }}
                          transition={{
                            duration: 0.3,
                            delay: 0.6 + idx * 0.05,
                          }}
                          className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-amber-500/30 transition-colors group"
                        >
                          <div className="flex items-center min-w-0">
                            <div className="relative w-12 h-12 flex-shrink-0 rounded-xl overflow-hidden border-2 border-amber-500/20">
                              <div className="absolute inset-0 bg-gradient-to-br from-rose-500/20 to-amber-500/20"></div>
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="ml-3 overflow-hidden">
                              <p className="font-bold text-white text-sm line-clamp-1">
                                {item.name}
                              </p>
                              <div className="flex items-center mt-1">
                                <span className="px-2 py-0.5 bg-gradient-to-r from-amber-500/20 to-rose-500/20 text-amber-300 text-xs font-medium rounded-full">
                                  {item.quantity} slot
                                  {item.quantity > 1 ? "s" : ""}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <p className="font-bold text-amber-300 text-lg whitespace-nowrap">
                              ₦{(item.price * item.quantity).toLocaleString()}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              ₦{item.price.toLocaleString()} × {item.quantity}
                            </p>
                            <button
                              onClick={() => {
                                const slotIndex = currentProducts.findIndex(
                                  (p) => p?.id === item.id,
                                );
                                if (slotIndex !== -1) removeProduct(slotIndex);
                              }}
                              className="mt-1 w-6 h-6 rounded-full bg-gradient-to-r from-red-500/20 to-rose-600/20 text-red-300 flex items-center justify-center hover:bg-red-500/30 transition-colors text-sm"
                              title="Remove one"
                            >
                              &times;
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  )}
                </div>

                {/* ===== VALENTINE BENEFITS (INSIDE CART SIDEBAR) ===== */}
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

                {/* CART TOTALS - NO DISCOUNT */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 }}
                  className="border-t pt-5 space-y-3"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 font-medium">
                      Items Selected
                    </span>
                    <span className="font-bold text-white">
                      {currentProducts.filter((p) => p).length} / {currentSlots}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-gray-400">Subtotal</span>
                    <span className="font-medium text-white">
                      ₦{currentSubtotal.toLocaleString()}
                    </span>
                  </div>
                  {/* REMOVED DISCOUNT LINE */}
                  <div className="flex justify-between items-center text-2xl font-bold pt-3 border-t border-gray-800">
                    <span>Total</span>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-amber-400">
                      ₦{currentTotal.toLocaleString()}
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="mt-6"
                >
                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth={true}
                    disabled={currentProducts.filter((p) => p).length < 4}
                    onClick={handleAddToCart}
                  >
                    {currentProducts.filter((p) => p).length < 4
                      ? `✨ Add at least 4 fragrances`
                      : `🎁 Add ${activeBox === "red" ? "Her" : "His"} Box to Cart`}
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.85 }}
                  className="mt-4 text-center"
                >
                  <p className="text-xs text-amber-300">
                    Minimum 4 fragrances required • Free luxury box included
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* MODAL AT END */}
          <ProductModal />
          <SpecialItemsModal />
        </div>
      </div>
      {/* EXACT MATCH REFERENCE IMAGE NOTIFICATION */}
    </div>
  );
};

export default BuildYourBox;
