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

  // Load recent searches from localStorage on mount
  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  // Save recent searches to localStorage when they change
  useEffect(() => {
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  }, [recentSearches]);

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
  };

  // Handle search submission
  const handleSearchSubmit = () => {
    if (searchTerm.trim()) {
      addToRecentSearches(searchTerm);
    }
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
    removeSearchTerm
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;