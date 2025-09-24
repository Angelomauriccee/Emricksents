import { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFilter, FiX, FiChevronDown } from 'react-icons/fi';
import gsap from 'gsap';

import { useFilter } from '../context/FilterContext';
import { useSearch } from '../context/SearchContext';
import SectionTitle from '../components/ui/SectionTitle';
import ProductCard from '../components/product/EnhancedProductCard';
import Button from '../components/ui/Button';
import products from '../data/products';

const ReactiveShop = () => {
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { activeFilters, handleFilterChange, clearFilters, filterProductsByCategory } = useFilter();
  const { handleSearchChange, handleSearchSubmit } = useSearch();
  
  const filterRef = useRef(null);
  const productsRef = useRef(null);
  const prevFiltersRef = useRef(null);
  const prevSearchParamsRef = useRef(null);

  // Size options
  const sizeOptions = [
    { label: 'All Sizes', value: '' },
    { label: '25ml - 50ml', value: '25-50' },
    { label: '50ml - 100ml', value: '50-100' },
    { label: '100ml - 150ml', value: '100-150' },
    { label: '150ml - 200ml', value: '150-200' }
  ];

  // Price ranges in Naira
  const priceRanges = [
    { label: 'All Prices', value: '' },
    { label: 'Under ₦100,000', value: '0-100000' },
    { label: '₦300,000 - ₦500,000', value: '300000-500000' },
    { label: 'Above ₦500,000', value: '500000-10000000' }
  ];

  // Sort options
  const sortOptions = [
    { label: 'Featured', value: 'featured' },
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Newest', value: 'newest' }
  ];

  // Collections
  const collections = [
    { label: 'All Collections', value: '' },
    { label: 'Exclusive', value: 'exclusive' },
    { label: 'Limited Edition', value: 'limited' },
    { label: 'Signature Collections', value: 'signature' }
  ];

  // Check for search parameter - only run once when search params change
  useEffect(() => {
    const searchQuery = searchParams.get('search');
    const currentSearchParams = searchParams.toString();
    
    // Skip if search params haven't changed
    if (prevSearchParamsRef.current === currentSearchParams) {
      return;
    }
    
    prevSearchParamsRef.current = currentSearchParams;
    
    if (searchQuery) {
      handleSearchChange(searchQuery);
      handleSearchSubmit();
    }
  }, [searchParams, handleSearchChange, handleSearchSubmit]);

  // Memoized filter function to prevent unnecessary re-renders
  const filterAndSortProducts = useCallback(() => {
    let result = [...products];
    
    // Apply search filter from URL
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply brand filter using the enhanced filterProductsByCategory function
    if (activeFilters.brand) {
      result = filterProductsByCategory(result, activeFilters.brand);
    }
    
    // Apply collection filter
    if (activeFilters.collection) {
      result = result.filter(product => product.collection === activeFilters.collection);
    }
    
    // Apply isNew filter
    if (activeFilters.isNew) {
      result = result.filter(product => product.isNew === true);
    }
    
    // Apply size filter
    if (activeFilters.size) {
      const [min, max] = activeFilters.size.split('-').map(Number);
      result = result.filter(product => {
        const sizeNum = parseInt(product.size);
        return sizeNum >= min && sizeNum <= max;
      });
    }
    
    // Apply price range filter
    if (activeFilters.priceRange) {
      const [min, max] = activeFilters.priceRange.split('-').map(Number);
      result = result.filter(product => product.price >= min && product.price <= max);
    }
    
    // Apply sorting
    switch (activeFilters.sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => (a.isNew === b.isNew) ? 0 : a.isNew ? -1 : 1);
        break;
      default:
        result.sort((a, b) => (a.featured === b.featured) ? 0 : a.featured ? -1 : 1);
    }
    
    return result;
  }, [activeFilters, filterProductsByCategory, searchParams]);

  // Filter and sort products - only run when dependencies actually change
  useEffect(() => {
    const currentFilters = JSON.stringify(activeFilters);
    const currentSearchParams = searchParams.toString();
    
    // Skip if nothing has changed
    if (
      prevFiltersRef.current === currentFilters && 
      prevSearchParamsRef.current === currentSearchParams
    ) {
      return;
    }
    
    // Update refs
    prevFiltersRef.current = currentFilters;
    prevSearchParamsRef.current = currentSearchParams;
    
    // Apply filters and update state
    const filteredResults = filterAndSortProducts();
    setFilteredProducts(filteredResults);
  }, [activeFilters, searchParams, filterAndSortProducts]);

  // Get dynamic title based on active filters
  const getDynamicTitle = useCallback(() => {
    const searchQuery = searchParams.get('search');
    
    if (searchQuery) {
      return `Search Results: "${searchQuery}"`;
    } else if (activeFilters.brand) {
      return `Showing: ${activeFilters.brand}`;
    } else if (activeFilters.collection) {
      return `Collection: ${activeFilters.collection.charAt(0).toUpperCase() + activeFilters.collection.slice(1)}`;
    } else if (activeFilters.isNew) {
      return "New Arrivals";
    } else {
      return "Our Collection";
    }
  }, [activeFilters.brand, activeFilters.collection, activeFilters.isNew, searchParams]);

  // GSAP animations - only run once on mount
  useEffect(() => {
    gsap.fromTo(
      '.filter-header',
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
    );

    gsap.fromTo(
      '.product-grid',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  // Animation for product grid when filters change
  const prevProductsLengthRef = useRef(0);
  
  useEffect(() => {
    // Only animate if the number of products has changed
    if (
      productsRef.current && 
      filteredProducts.length !== prevProductsLengthRef.current
    ) {
      prevProductsLengthRef.current = filteredProducts.length;
      
      gsap.fromTo(
        productsRef.current.children,
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.5, 
          stagger: 0.05,
          ease: 'power2.out'
        }
      );
    }
  }, [filteredProducts.length]);

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
            title={getDynamicTitle()} 
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
          <AnimatePresence>
            <motion.aside 
              ref={filterRef}
              className={`lg:w-1/4 bg-dark p-6 rounded-lg shadow-luxury ${isFilterOpen ? 'block' : 'hidden'} lg:block`}
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
                        onChange={() => handleFilterChange('collection', collection.value)}
                        className="hidden"
                      />
                      <label
                        htmlFor={`collection-${collection.value}`}
                        className={`cursor-pointer flex items-center text-sm ${
                          activeFilters.collection === collection.value ? 'text-secondary' : 'text-gray-400'
                        } hover:text-secondary transition-colors`}
                      >
                        <span className={`w-4 h-4 mr-2 border rounded-full flex items-center justify-center ${
                          activeFilters.collection === collection.value ? 'border-secondary' : 'border-gray-600'
                        }`}>
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

              {/* New Arrivals Filter */}
              <div className="mb-6">
                <h4 className="text-light font-medium mb-3">New Arrivals</h4>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="new-arrivals"
                    checked={activeFilters.isNew}
                    onChange={() => handleFilterChange('isNew', !activeFilters.isNew)}
                    className="hidden"
                  />
                  <label
                    htmlFor="new-arrivals"
                    className={`cursor-pointer flex items-center text-sm ${
                      activeFilters.isNew ? 'text-secondary' : 'text-gray-400'
                    } hover:text-secondary transition-colors`}
                  >
                    <span className={`w-4 h-4 mr-2 border rounded flex items-center justify-center ${
                      activeFilters.isNew ? 'border-secondary bg-secondary bg-opacity-20' : 'border-gray-600'
                    }`}>
                      {activeFilters.isNew && (
                        <span className="text-xs text-secondary">✓</span>
                      )}
                    </span>
                    Show only new arrivals
                  </label>
                </div>
              </div>

              {/* Size Filter */}
              <div className="mb-6">
                <h4 className="text-light font-medium mb-3">Size</h4>
                <div className="space-y-2">
                  {sizeOptions.map((size) => (
                    <div key={size.value} className="flex items-center">
                      <input
                        type="radio"
                        id={`size-${size.value}`}
                        name="size"
                        checked={activeFilters.size === size.value}
                        onChange={() => handleFilterChange('size', size.value)}
                        className="hidden"
                      />
                      <label
                        htmlFor={`size-${size.value}`}
                        className={`cursor-pointer flex items-center text-sm ${
                          activeFilters.size === size.value ? 'text-secondary' : 'text-gray-400'
                        } hover:text-secondary transition-colors`}
                      >
                        <span className={`w-4 h-4 mr-2 border rounded-full flex items-center justify-center ${
                          activeFilters.size === size.value ? 'border-secondary' : 'border-gray-600'
                        }`}>
                          {activeFilters.size === size.value && (
                            <span className="w-2 h-2 bg-secondary rounded-full"></span>
                          )}
                        </span>
                        {size.label}
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
                        onChange={() => handleFilterChange('priceRange', range.value)}
                        className="hidden"
                      />
                      <label
                        htmlFor={`price-${range.value}`}
                        className={`cursor-pointer flex items-center text-sm ${
                          activeFilters.priceRange === range.value ? 'text-secondary' : 'text-gray-400'
                        } hover:text-secondary transition-colors`}
                      >
                        <span className={`w-4 h-4 mr-2 border rounded-full flex items-center justify-center ${
                          activeFilters.priceRange === range.value ? 'border-secondary' : 'border-gray-600'
                        }`}>
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
          </AnimatePresence>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            {/* Sort and Results Count */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 bg-dark p-4 rounded-lg">
              <p className="text-gray-400 mb-4 sm:mb-0">
                Showing <span className="text-secondary">{filteredProducts.length}</span> products
              </p>
              
              <div className="relative w-full sm:w-auto">
                <select
                  value={activeFilters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
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
            <div ref={productsRef} className="product-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-400 text-lg mb-4">No products match your current filters.</p>
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

export default ReactiveShop;