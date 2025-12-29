import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FiFilter, FiX, FiChevronDown } from "react-icons/fi";
import gsap from "gsap";

import SectionTitle from "../components/ui/SectionTitle";
import ProductCard from "../components/product/ProductCard";
import Button from "../components/ui/Button";
import products from "../data/products";

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    category: searchParams.get("category") || "",
    type: searchParams.get("type") || "",
    collection: searchParams.get("collection") || "",
    priceRange: "",
    sortBy: "featured",
  });

  const filterRef = useRef(null);
  const productsRef = useRef(null);

  // Price ranges
  const priceRanges = [
    { label: "All Prices", value: "" },
    { label: "Under $100", value: "0-100" },
    { label: "$100 - $150", value: "100-150" },
    { label: "Over $150", value: "150-1000" },
  ];

  // Sort options
  const sortOptions = [
    { label: "Featured", value: "featured" },
    { label: "Price: Low to High", value: "price-asc" },
    { label: "Price: High to Low", value: "price-desc" },
    { label: "Newest", value: "newest" },
    { label: "Best Selling", value: "bestselling" },
  ];

  // Categories
  const categories = [
    { label: "All Categories", value: "" },
    { label: "Men's Collection", value: "Men's Collection" },
    { label: "Women's Collection", value: "Women's Collection" },
    { label: "Unisex Collection", value: "Unisex Collection" },
  ];

  // Types
  const types = [
    { label: "All Types", value: "" },
    { label: "Woody", value: "Woody" },
    { label: "Floral", value: "Floral" },
    { label: "Fresh", value: "Fresh" },
    { label: "Oriental", value: "Oriental" },
    { label: "Citrus", value: "Citrus" },
    { label: "Gourmand", value: "Gourmand" },
  ];

  // Collections
  const collections = [
    { label: "All Collections", value: "" },
    { label: "Signature", value: "signature" },
    { label: "Limited Edition", value: "limited" },
    { label: "Exclusive", value: "exclusive" },
    { label: "Gift Sets", value: "gift" },
  ];

  // Filter and sort products
  useEffect(() => {
    try {
      let result = [...products];

      // filters
      if (activeFilters.category) {
        result = result.filter((p) => p.category === activeFilters.category);
      }
      if (activeFilters.type) {
        result = result.filter((p) => p.type === activeFilters.type);
      }
      if (activeFilters.collection) {
        // example: limited => isNew
        if (activeFilters.collection === "limited") {
          result = result.filter((p) => p.isNew);
        }
      }
      if (activeFilters.priceRange) {
        const [minStr, maxStr] = activeFilters.priceRange.split("-");
        const min = Number(minStr ?? 0);
        const max = maxStr ? Number(maxStr) : Number.POSITIVE_INFINITY;
        result = result.filter((p) => p.price >= min && p.price <= max);
      }

      // sort
      switch (activeFilters.sortBy) {
        case "price-asc":
          result.sort((a, b) => a.price - b.price);
          break;
        case "price-desc":
          result.sort((a, b) => b.price - a.price);
          break;
        case "newest":
          result.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
          break;
        case "bestselling":
          result.sort((a, b) => b.reviews - a.reviews);
          break;
        default:
          result.sort((a, b) =>
            a.featured === b.featured ? 0 : a.featured ? -1 : 1
          );
      }

      setFilteredProducts(result);

      // ---- SAFE URL SYNC (only when needed) ----
      const next = new URLSearchParams();
      if (activeFilters.category) next.set("category", activeFilters.category);
      if (activeFilters.type) next.set("type", activeFilters.type);
      if (activeFilters.collection)
        next.set("collection", activeFilters.collection);

      const currentStr = window.location.search.replace(/^\?/, "");
      const nextStr = next.toString();

      // Only update if actually different (avoid iOS reload bug with empty "?")
      if (nextStr !== currentStr) {
        // If no filters, remove query entirely (not "?")
        if (!nextStr) {
          // react-router: pass empty params AND replace, which removes "?"
          setSearchParams({}, { replace: true });
        } else {
          setSearchParams(next, { replace: true });
        }
      }
    } catch (err) {
      // Swallow unexpected errors so the page doesn't hard-crash on iOS
      // eslint-disable-next-line no-console
      console.error("Filter/sort effect failed:", err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFilters]);

  // Handle filter change
  const handleFilterChange = (filterType, value) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  // Clear all filters
  const clearFilters = () => {
    setActiveFilters({
      category: "",
      type: "",
      collection: "",
      priceRange: "",
      sortBy: "featured",
    });
  };

  // GSAP animations
  useEffect(() => {
    gsap.fromTo(
      ".filter-header",
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
    );

    gsap.fromTo(
      ".product-grid",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
    );
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
        <div className="filter-header mb-12">
          <SectionTitle
            title="Our Collection"
            subtitle="Discover our exquisite range of luxury fragrances, crafted with the finest ingredients from around the world."
          />

          {/* Mobile Filter Toggle */}
          <div className="lg:hidden flex justify-center mt-8">
            <Button
              variant="outline"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center space-x-2"
            >
              <FiFilter />
              <span>Filters</span>
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <motion.aside
            ref={filterRef}
            className={`lg:w-1/4 bg-dark p-6 rounded-lg shadow-luxury ${
              isFilterOpen ? "block" : "hidden"
            } lg:block`}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-serif text-secondary">Filters</h3>
              <div className="flex space-x-4">
                <button
                  onClick={clearFilters}
                  className="text-sm text-gray-400 hover:text-secondary transition-colors"
                >
                  Clear All
                </button>
                <button
                  className="lg:hidden text-gray-400 hover:text-secondary transition-colors"
                  onClick={() => setIsFilterOpen(false)}
                >
                  <FiX size={20} />
                </button>
              </div>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <h4 className="text-light font-medium mb-3">Category</h4>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category.value} className="flex items-center">
                    <input
                      type="radio"
                      id={`category-${category.value}`}
                      name="category"
                      checked={activeFilters.category === category.value}
                      onChange={() =>
                        handleFilterChange("category", category.value)
                      }
                      className="hidden"
                    />
                    <label
                      htmlFor={`category-${category.value}`}
                      className={`cursor-pointer flex items-center text-sm ${
                        activeFilters.category === category.value
                          ? "text-secondary"
                          : "text-gray-400"
                      } hover:text-secondary transition-colors`}
                    >
                      <span
                        className={`w-4 h-4 mr-2 border rounded-full flex items-center justify-center ${
                          activeFilters.category === category.value
                            ? "border-secondary"
                            : "border-gray-600"
                        }`}
                      >
                        {activeFilters.category === category.value && (
                          <span className="w-2 h-2 bg-secondary rounded-full"></span>
                        )}
                      </span>
                      {category.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Type Filter */}
            <div className="mb-6">
              <h4 className="text-light font-medium mb-3">Fragrance Type</h4>
              <div className="space-y-2">
                {types.map((type) => (
                  <div key={type.value} className="flex items-center">
                    <input
                      type="radio"
                      id={`type-${type.value}`}
                      name="type"
                      checked={activeFilters.type === type.value}
                      onChange={() => handleFilterChange("type", type.value)}
                      className="hidden"
                    />
                    <label
                      htmlFor={`type-${type.value}`}
                      className={`cursor-pointer flex items-center text-sm ${
                        activeFilters.type === type.value
                          ? "text-secondary"
                          : "text-gray-400"
                      } hover:text-secondary transition-colors`}
                    >
                      <span
                        className={`w-4 h-4 mr-2 border rounded-full flex items-center justify-center ${
                          activeFilters.type === type.value
                            ? "border-secondary"
                            : "border-gray-600"
                        }`}
                      >
                        {activeFilters.type === type.value && (
                          <span className="w-2 h-2 bg-secondary rounded-full"></span>
                        )}
                      </span>
                      {type.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Collection Filter */}
            <div className="mb-6">
              <h4 className="text-light font-medium mb-3">Collection</h4>
              <div className="space-y-2">
                {collections.map((collection) => (
                  <div key={collection.value} className="flex items-center">
                    <input
                      type="radio"
                      id={`collection-${collection.value}`}
                      name="collection"
                      checked={activeFilters.collection === collection.value}
                      onChange={() =>
                        handleFilterChange("collection", collection.value)
                      }
                      className="hidden"
                    />
                    <label
                      htmlFor={`collection-${collection.value}`}
                      className={`cursor-pointer flex items-center text-sm ${
                        activeFilters.collection === collection.value
                          ? "text-secondary"
                          : "text-gray-400"
                      } hover:text-secondary transition-colors`}
                    >
                      <span
                        className={`w-4 h-4 mr-2 border rounded-full flex items-center justify-center ${
                          activeFilters.collection === collection.value
                            ? "border-secondary"
                            : "border-gray-600"
                        }`}
                      >
                        {activeFilters.collection === collection.value && (
                          <span className="w-2 h-2 bg-secondary rounded-full"></span>
                        )}
                      </span>
                      {collection.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="mb-6">
              <h4 className="text-light font-medium mb-3">Price Range</h4>
              <div className="space-y-2">
                {priceRanges.map((range) => (
                  <div key={range.value} className="flex items-center">
                    <input
                      type="radio"
                      id={`price-${range.value}`}
                      name="price"
                      checked={activeFilters.priceRange === range.value}
                      onChange={() =>
                        handleFilterChange("priceRange", range.value)
                      }
                      className="hidden"
                    />
                    <label
                      htmlFor={`price-${range.value}`}
                      className={`cursor-pointer flex items-center text-sm ${
                        activeFilters.priceRange === range.value
                          ? "text-secondary"
                          : "text-gray-400"
                      } hover:text-secondary transition-colors`}
                    >
                      <span
                        className={`w-4 h-4 mr-2 border rounded-full flex items-center justify-center ${
                          activeFilters.priceRange === range.value
                            ? "border-secondary"
                            : "border-gray-600"
                        }`}
                      >
                        {activeFilters.priceRange === range.value && (
                          <span className="w-2 h-2 bg-secondary rounded-full"></span>
                        )}
                      </span>
                      {range.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </motion.aside>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            {/* Sort and Results Count */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 bg-dark p-4 rounded-lg">
              <p className="text-gray-400 mb-4 sm:mb-0">
                Showing{" "}
                <span className="text-secondary">
                  {filteredProducts.length}
                </span>{" "}
                products
              </p>

              <div className="relative w-full sm:w-auto">
                <select
                  value={activeFilters.sortBy}
                  onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                  className="appearance-none bg-gray-900 border border-gray-800 text-light py-2 px-4 pr-8 rounded-md focus:outline-none focus:border-secondary transition-colors w-full"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                  <FiChevronDown />
                </div>
              </div>
            </div>

            {/* Products */}
            <div
              ref={productsRef}
              className="product-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-400 text-lg mb-4">
                    No products match your current filters.
                  </p>
                  <Button variant="outline" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Shop;
