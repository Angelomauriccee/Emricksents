import { createContext, useContext, useState, useEffect } from 'react';

// Create context
const SearchContext = createContext();

// Custom hook to use the search context
export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

// Provider component
export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [autoSuggestCache, setAutoSuggestCache] = useState({});

  // Load recent searches from localStorage on mount
  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      try {
        setRecentSearches(JSON.parse(savedSearches));
      } catch (error) {
        console.error('Error parsing recent searches:', error);
        setRecentSearches([]);
      }
    }

    // Load autosuggest cache from sessionStorage
    const savedCache = sessionStorage.getItem('autoSuggestCache');
    if (savedCache) {
      try {
        setAutoSuggestCache(JSON.parse(savedCache));
      } catch (error) {
        console.error('Error parsing autosuggest cache:', error);
        setAutoSuggestCache({});
      }
    }
  }, []);

  // Save recent searches to localStorage when they change
  useEffect(() => {
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  // Save autosuggest cache to sessionStorage when it changes
  useEffect(() => {
    sessionStorage.setItem('autoSuggestCache', JSON.stringify(autoSuggestCache));
  }, [autoSuggestCache]);

  // Add a search term to recent searches
  const addToRecentSearches = (term) => {
    if (!term.trim()) return;
    
    setRecentSearches(prev => {
      // Remove the term if it already exists to avoid duplicates
      const filteredSearches = prev.filter(search => search !== term);
      
      // Add the new term at the beginning
      const newSearches = [term, ...filteredSearches];
      
      // Limit to 10 recent searches
      return newSearches.slice(0, 10);
    });
  };

  // Clear all recent searches
  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  // Remove a specific search term
  const removeSearchTerm = (term) => {
    setRecentSearches(prev => prev.filter(search => search !== term));
  };

  // Handle search term change
  const handleSearchChange = (term) => {
    setSearchTerm(term);
    setIsSearching(term.trim() !== '');

    // Check if we have cached results for this term
    if (term.trim() && autoSuggestCache[term.trim()]) {
      setSearchResults(autoSuggestCache[term.trim()]);
    }
  };

  // Cache search results
  const cacheSearchResults = (term, results) => {
    if (term.trim()) {
      setAutoSuggestCache(prev => ({
        ...prev,
        [term.trim()]: results
      }));
    }
  };

  // Handle search submission
  const handleSearchSubmit = () => {
    if (searchTerm.trim()) {
      addToRecentSearches(searchTerm);
    }
  };

  // Clear autosuggest cache
  const clearAutoSuggestCache = () => {
    setAutoSuggestCache({});
    sessionStorage.removeItem('autoSuggestCache');
  };

  // Value to be provided to consumers
  const value = {
    searchTerm,
    searchResults,
    setSearchResults,
    recentSearches,
    isSearching,
    handleSearchChange,
    handleSearchSubmit,
    addToRecentSearches,
    clearRecentSearches,
    removeSearchTerm,
    cacheSearchResults,
    clearAutoSuggestCache,
    autoSuggestCache
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;