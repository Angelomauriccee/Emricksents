import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

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
  
  // Use refs to track previous values and prevent unnecessary updates
  const prevSearchTermRef = useRef('');
  const initialLoadDone = useRef(false);

  // Load recent searches from localStorage on mount
  useEffect(() => {
    if (initialLoadDone.current) return;
    
    try {
      const savedSearches = localStorage.getItem('recentSearches');
      if (savedSearches) {
        setRecentSearches(JSON.parse(savedSearches));
      }

      // Load autosuggest cache from sessionStorage
      const savedCache = sessionStorage.getItem('autoSuggestCache');
      if (savedCache) {
        setAutoSuggestCache(JSON.parse(savedCache));
      }
    } catch (error) {
      console.error('Error loading search data:', error);
      // Reset to defaults on error
      setRecentSearches([]);
      setAutoSuggestCache({});
    }
    
    initialLoadDone.current = true;
  }, []);

  // Save recent searches to localStorage when they change
  // Use a debounced approach to prevent too many writes
  useEffect(() => {
    if (!initialLoadDone.current) return;
    
    const saveTimeout = setTimeout(() => {
      try {
        localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
      } catch (error) {
        console.error('Error saving recent searches:', error);
      }
    }, 500);
    
    return () => clearTimeout(saveTimeout);
  }, [recentSearches]);

  // Save autosuggest cache to sessionStorage when it changes
  // Use a debounced approach to prevent too many writes
  useEffect(() => {
    if (!initialLoadDone.current) return;
    
    const saveTimeout = setTimeout(() => {
      try {
        sessionStorage.setItem('autoSuggestCache', JSON.stringify(autoSuggestCache));
      } catch (error) {
        console.error('Error saving autosuggest cache:', error);
      }
    }, 500);
    
    return () => clearTimeout(saveTimeout);
  }, [autoSuggestCache]);

  // Add a search term to recent searches
  const addToRecentSearches = useCallback((term) => {
    if (!term.trim()) return;
    
    setRecentSearches(prev => {
      // Skip update if the term is already at the top
      if (prev.length > 0 && prev[0] === term) {
        return prev;
      }
      
      // Remove the term if it already exists to avoid duplicates
      const filteredSearches = prev.filter(search => search !== term);
      
      // Add the new term at the beginning
      const newSearches = [term, ...filteredSearches];
      
      // Limit to 10 recent searches
      return newSearches.slice(0, 10);
    });
  }, []);

  // Clear all recent searches
  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  }, []);

  // Remove a specific search term
  const removeSearchTerm = useCallback((term) => {
    setRecentSearches(prev => prev.filter(search => search !== term));
  }, []);

  // Handle search term change
  const handleSearchChange = useCallback((term) => {
    // Skip if the term hasn't changed
    if (prevSearchTermRef.current === term) {
      return;
    }
    
    prevSearchTermRef.current = term;
    setSearchTerm(term);
    setIsSearching(term.trim() !== '');

    // Check if we have cached results for this term
    if (term.trim() && autoSuggestCache[term.trim()]) {
      setSearchResults(autoSuggestCache[term.trim()]);
    }
  }, [autoSuggestCache]);

  // Cache search results
  const cacheSearchResults = useCallback((term, results) => {
    if (!term.trim()) return;
    
    setAutoSuggestCache(prev => {
      // Skip update if the cache already has this term with the same results
      if (prev[term.trim()] && 
          prev[term.trim()].length === results.length && 
          JSON.stringify(prev[term.trim()]) === JSON.stringify(results)) {
        return prev;
      }
      
      return {
        ...prev,
        [term.trim()]: results
      };
    });
  }, []);

  // Handle search submission
  const handleSearchSubmit = useCallback(() => {
    if (searchTerm.trim()) {
      addToRecentSearches(searchTerm);
    }
  }, [searchTerm, addToRecentSearches]);

  // Clear autosuggest cache
  const clearAutoSuggestCache = useCallback(() => {
    setAutoSuggestCache({});
    sessionStorage.removeItem('autoSuggestCache');
  }, []);

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