import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Create context
const FilterContext = createContext();

// Custom hook to use the filter context
export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};

// Provider component
export const FilterProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeFilters, setActiveFilters] = useState({
    brand: '',
    collection: '',
    size: '',
    priceRange: '',
    sortBy: 'featured',
    isNew: false
  });

  // Category normalization mapping
  const categoryNormalization = {
    'Chanel Paris/ Bleu de Chanel': 'Chanel',
    'Chanel Paris / Bleu de Chanel': 'Chanel',
    'Yves Saint Laurent (YSL)': 'Yves Saint Laurent',
    'Hugo Boss (Boss)': 'Hugo Boss'
  };

  // Normalize a category name
  const normalizeCategory = (category) => {
    return categoryNormalization[category] || category;
  };

  // Parse URL search params on mount and location change
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const brand = searchParams.get('brand') || '';
    const collection = searchParams.get('collection') || '';
    const isNew = searchParams.get('isNew') === 'true';
    
    setActiveFilters(prev => ({
      ...prev,
      brand,
      collection,
      isNew
    }));
  }, [location.search]);

  // Apply filters without page reload
  const applyFilters = (filterType, value) => {
    // Normalize brand value if it's a category
    let normalizedValue = value;
    if (filterType === 'brand') {
      normalizedValue = normalizeCategory(value);
    }

    // Update the active filters state
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: normalizedValue
    }));

    // Update URL search params without page reload
    const searchParams = new URLSearchParams(location.search);
    
    if (normalizedValue) {
      searchParams.set(filterType, normalizedValue);
    } else {
      searchParams.delete(filterType);
    }
    
    // Use navigate to update URL without reload
    navigate({
      pathname: '/shop',
      search: searchParams.toString()
    }, { replace: true });
  };

  // Clear all filters
  const clearFilters = () => {
    setActiveFilters({
      brand: '',
      collection: '',
      size: '',
      priceRange: '',
      sortBy: 'featured',
      isNew: false
    });
    
    // Navigate to shop without any query params
    navigate('/shop', { replace: true });
  };

  // Handle filter change
  const handleFilterChange = (filterType, value) => {
    // For local filters that don't need URL updates
    if (filterType === 'size' || filterType === 'priceRange' || filterType === 'sortBy') {
      setActiveFilters(prev => ({
        ...prev,
        [filterType]: value
      }));
    } else {
      // For filters that should update the URL
      applyFilters(filterType, value);
    }
  };

  // Filter products by category (matches category field or product name)
  const filterProductsByCategory = (products, category) => {
    if (!category) return products;
    
    // Normalize the category for comparison
    const normalizedCategory = normalizeCategory(category);
    
    return products.filter(product => {
      // Normalize the product category
      const normalizedProductCategory = normalizeCategory(product.category);
      
      // Check if product's normalized category matches the selected normalized category
      const categoryMatch = normalizedProductCategory === normalizedCategory;
      
      // Check if product's name contains the category name (case-insensitive)
      const nameMatch = product.name.toLowerCase().includes(normalizedCategory.toLowerCase());
      
      // Return true if either condition is met
      return categoryMatch || nameMatch;
    });
  };

  // Value to be provided to consumers
  const value = {
    activeFilters,
    applyFilters,
    clearFilters,
    handleFilterChange,
    filterProductsByCategory,
    normalizeCategory
  };

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
};

export default FilterContext;