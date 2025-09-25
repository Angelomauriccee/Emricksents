/**
 * Converts a string to a URL-friendly slug
 * @param {string} text - The text to slugify
 * @returns {string} - The slugified text
 */
export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')        // Replace spaces with -
    .replace(/&/g, '-and-')      // Replace & with 'and'
    .replace(/[^\w\-]+/g, '')    // Remove all non-word characters
    .replace(/\-\-+/g, '-');     // Replace multiple - with single -
};

/**
 * Extracts the ID from a slug string (e.g., "product-name-123" -> 123)
 * @param {string} slug - The slug containing the ID at the end
 * @returns {number} - The extracted ID
 */
export const getIdFromSlug = (slug) => {
  const parts = slug.split('-');
  const lastPart = parts[parts.length - 1];
  
  // Check if the last part is a number
  if (!isNaN(lastPart)) {
    return parseInt(lastPart, 10);
  }
  
  return null;
};