import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiX, FiClock, FiTrash2 } from 'react-icons/fi';
import { useSearch } from '../../context/SearchContext';
import products from '../../data/products';

const SearchOverlay = ({ isOpen, onClose }) => {
  const { 
    searchTerm, 
    searchResults, 
    setSearchResults,
    recentSearches, 
    handleSearchChange, 
    handleSearchSubmit,
    removeSearchTerm,
    clearRecentSearches
  } = useSearch();
  
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Focus input when overlay opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      setInputValue(searchTerm);
    }
  }, [isOpen, searchTerm]);

  // Filter products based on search term
  useEffect(() => {
    if (!inputValue.trim()) {
      setSearchResults([]);
      return;
    }

    const filtered = products.filter(product => 
      product.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    
    setSearchResults(filtered);
  }, [inputValue, setSearchResults]);

  // Handle input change
  const onInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    handleSearchChange(value);
  };

  // Handle form submission
  const onSubmit = (e) => {
    e.preventDefault();
    handleSearchSubmit();
    
    if (inputValue.trim()) {
      navigate(`/shop?search=${encodeURIComponent(inputValue)}`);
      onClose();
    }
  };

  // Handle recent search click
  const onRecentSearchClick = (term) => {
    setInputValue(term);
    handleSearchChange(term);
  };

  // Format price in Naira
  const formatPrice = (price) => {
    return `₦${price.toLocaleString()}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 bg-dark bg-opacity-95 backdrop-blur-md z-50 flex items-start md:items-center justify-center overflow-y-auto py-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 md:top-8 md:right-8 text-light hover:text-secondary transition-colors"
            aria-label="Close search"
          >
            <FiX size={24} />
          </button>
          
          <div className="w-full max-w-5xl px-4 md:px-6 mt-12 md:mt-0">
            <div className="flex justify-center mb-6 md:mb-8">
              <img 
                src="/src/assets/logo.png" 
                alt="EmerickScents Logo" 
                className="h-12 md:h-16"
              />
            </div>
            
            <h2 className="text-2xl md:text-3xl font-serif text-secondary mb-6 md:mb-8 text-center">Search Our Collection</h2>
            
            {/* Search Form */}
            <form onSubmit={onSubmit} className="mb-6 md:mb-8">
              <div className="relative">
                <input 
                  ref={inputRef}
                  type="text" 
                  value={inputValue}
                  onChange={onInputChange}
                  placeholder="Search for perfumes..." 
                  className="w-full bg-transparent border-b-2 border-gray-600 focus:border-secondary py-3 md:py-4 px-4 text-lg md:text-xl text-light outline-none transition-colors"
                  autoFocus
                />
                <button 
                  type="submit"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary hover:text-secondary-dark transition-colors"
                >
                  <FiSearch size={24} />
                </button>
              </div>
            </form>
            
            {/* Search Results */}
            <AnimatePresence>
              {inputValue.trim() !== '' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                  className="mb-6 md:mb-8"
                >
                  <h3 className="text-light font-medium mb-4">
                    {searchResults.length > 0 
                      ? `Found ${searchResults.length} results` 
                      : 'No results found'}
                  </h3>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                    {searchResults.slice(0, 8).map(product => (
                      <motion.div
                        key={product.id}
                        whileHover={{ y: -5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Link 
                          to={`/product/${product.id}`}
                          onClick={onClose}
                          className="block bg-gray-900 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                        >
                          <div className="aspect-[3/4] overflow-hidden">
                            <img 
                              src={product.image} 
                              alt={product.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-2 md:p-3">
                            <h4 className="text-light text-xs md:text-sm font-medium line-clamp-1">{product.name}</h4>
                            <p className="text-secondary text-xs md:text-sm mt-1">{formatPrice(product.price)}</p>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                  
                  {searchResults.length > 8 && (
                    <div className="text-center mt-4">
                      <Link 
                        to={`/shop?search=${encodeURIComponent(inputValue)}`}
                        onClick={onClose}
                        className="text-secondary hover:text-secondary-dark transition-colors"
                      >
                        View all {searchResults.length} results
                      </Link>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Recent Searches */}
            {recentSearches.length > 0 && inputValue.trim() === '' && (
              <div className="mb-6 md:mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-gray-400">Recent Searches:</h3>
                  <button 
                    onClick={clearRecentSearches}
                    className="text-gray-500 hover:text-secondary text-sm flex items-center gap-1 transition-colors"
                  >
                    <FiTrash2 size={14} />
                    <span>Clear All</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((term, index) => (
                    <div 
                      key={index}
                      className="group flex items-center px-3 md:px-4 py-1 md:py-2 bg-dark border border-gray-700 rounded-full text-light hover:border-secondary hover:text-secondary transition-colors"
                    >
                      <FiClock size={14} className="mr-1 md:mr-2 text-gray-500 group-hover:text-secondary transition-colors" />
                      <button 
                        onClick={() => onRecentSearchClick(term)}
                        className="mr-1 md:mr-2 text-sm"
                      >
                        {term}
                      </button>
                      <button 
                        onClick={() => removeSearchTerm(term)}
                        className="text-gray-500 hover:text-red-500 transition-colors"
                        aria-label={`Remove ${term} from recent searches`}
                      >
                        <FiX size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Popular Searches */}
            {inputValue.trim() === '' && (
              <div>
                <h3 className="text-gray-400 mb-4">Popular Searches:</h3>
                <div className="flex flex-wrap gap-2">
                  {['Woody', 'Floral', 'Limited Edition', 'Signature', 'New Arrivals'].map((term) => (
                    <button 
                      key={term}
                      onClick={() => onRecentSearchClick(term)}
                      className="px-3 md:px-4 py-1 md:py-2 bg-dark border border-gray-700 rounded-full text-light hover:border-secondary hover:text-secondary transition-colors text-sm"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;