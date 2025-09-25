/**
 * Converts a string to a URL-friendly slug
 * @param {string} text - The text to convert to a slug
 * @returns {string} - The slugified text
 */
export const slugify = (text) => {
  if (!text) return '';
  
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')        // Replace spaces with -
    .replace(/&/g, '-and-')      // Replace & with 'and'
    .replace(/[^\w\-]+/g, '')    // Remove all non-word characters
    .replace(/\-\-+/g, '-')      // Replace multiple - with single -
    .replace(/^-+/, '')          // Trim - from start of text
    .replace(/-+$/, '');         // Trim - from end of text
};

/**
 * Finds a product by its slug
 * @param {Array} products - The array of products to search
 * @param {string} slug - The slug to search for
 * @returns {Object|null} - The found product or null
 */
export const findProductBySlug = (products, slug) => {
  if (!products || !Array.isArray(products) || !slug) return null;
  
  // Normalize the input slug
  const normalizedSlug = slugify(slug);
  
  // Try exact match first
  let product = products.find(product => slugify(product.name) === normalizedSlug);
  
  // If no exact match, try partial match
  if (!product) {
    product = products.find(product => {
      const productSlug = slugify(product.name);
      return productSlug.includes(normalizedSlug) || normalizedSlug.includes(productSlug);
    });
  }
  
  // If still no match and it looks like an ID, try finding by ID
  if (!product && !isNaN(parseInt(slug))) {
    product = products.find(product => product.id === parseInt(slug));
  }
  
  return product || null;
};

/**
 * Generates a product URL using its slug
 * @param {Object} product - The product object
 * @returns {string} - The product URL
 */
export const getProductUrl = (product) => {
  if (!product || !product.name) return '/shop';
  return `/product/${slugify(product.name)}`;
};