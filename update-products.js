import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the products.js file
const productsFilePath = path.join(__dirname, 'src', 'data', 'products.js');
let productsFileContent = fs.readFileSync(productsFilePath, 'utf8');

// Extract the products array string
const productsMatch = productsFileContent.match(/const products = \[([\s\S]*?)\];/);
if (!productsMatch) {
  console.error('Could not find products array in file');
  process.exit(1);
}

const productsArrayString = productsMatch[1];

// Parse the products array manually
let productsArray = [];
try {
  // Create a temporary file to evaluate
  const tempFilePath = path.join(__dirname, 'temp-products.js');
  fs.writeFileSync(tempFilePath, `export default [${productsArrayString}];`);
  
  // Import the temporary file
  const importPath = `file://${tempFilePath}`;
  const importedProducts = await import(importPath);
  productsArray = importedProducts.default;
  
  // Clean up the temporary file
  fs.unlinkSync(tempFilePath);
} catch (error) {
  console.error('Error parsing products array:', error);
  process.exit(1);
}

// Fragrance descriptions and ingredients database
const fragranceData = {
  // Afnan fragrances
  'Afnan': {
    description: 'is an exquisite fragrance that captures the essence of luxury and sophistication. Crafted with precision and passion, it offers a unique olfactory experience that evolves beautifully throughout the day. The carefully selected notes create a harmonious blend that is both distinctive and memorable.',
    ingredients: 'Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Benzyl Salicylate, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol'
  },
  // Armaf fragrances
  'Armaf': {
    description: 'is a distinguished fragrance that embodies contemporary elegance with its sophisticated composition. The masterful blend of notes creates a captivating aura that makes a lasting impression. Perfect for the modern individual who appreciates quality craftsmanship in their fragrances.',
    ingredients: 'Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Alpha-Isomethyl Ionone'
  },
  // Chanel fragrances
  'Chanel': {
    description: 'is an iconic fragrance that represents timeless elegance and luxury. Created with the finest ingredients and unparalleled craftsmanship, it embodies the essence of the legendary fashion house. The sophisticated composition unfolds beautifully on the skin, revealing complex layers that tell a story of refinement and style.',
    ingredients: 'Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Citral, Eugenol, Farnesol, Benzyl Benzoate, Benzyl Alcohol, Benzyl Salicylate, Cinnamal, Cinnamyl Alcohol'
  },
  // Creed fragrances
  'Creed': {
    description: 'is an exceptional fragrance that exemplifies the house commitment to quality and artisanal craftsmanship. Created using traditional techniques and the finest natural ingredients, it offers a luxurious olfactory experience. The sophisticated blend of notes creates a distinctive signature that evolves beautifully throughout the day, revealing new facets with each passing hour.',
    ingredients: 'Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Citronellol, Geraniol, Eugenol, Farnesol, Citral, Benzyl Benzoate, Benzyl Salicylate, Benzyl Alcohol, Amyl Cinnamal, Coumarin'
  },
  // Dior fragrances
  'Dior': {
    description: 'is a magnificent fragrance that embodies the elegance and sophistication of the legendary fashion house. Created with exceptional ingredients and unparalleled craftsmanship, it offers a luxurious olfactory journey. The harmonious composition unfolds beautifully on the skin, revealing complex layers that tell a story of French refinement and timeless style.',
    ingredients: 'Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Citronellol, Geraniol, Coumarin, Citral, Benzyl Alcohol, Benzyl Benzoate, Farnesol, Benzyl Salicylate, Eugenol, Alpha-Isomethyl Ionone'
  },
  // Gucci fragrances
  'Gucci': {
    description: 'is an extraordinary fragrance that captures the essence of Italian luxury and contemporary style. Created with exceptional ingredients and innovative techniques, it offers a distinctive olfactory experience that is both sophisticated and modern. The carefully crafted composition unfolds beautifully on the skin, revealing complex layers that embody the creative vision of the iconic fashion house.',
    ingredients: 'Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Benzyl Salicylate, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Hydroxycitronellal'
  },
  // Lattafa fragrances
  'Lattafa': {
    description: 'is a captivating fragrance that showcases the rich tradition of Middle Eastern perfumery with a contemporary twist. The luxurious blend of precious ingredients creates an opulent olfactory experience that is both exotic and refined. Known for exceptional longevity and projection, this fragrance makes a memorable statement that lasts throughout the day and into the evening.',
    ingredients: 'Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Benzyl Benzoate, Coumarin, Citronellol, Geraniol, Eugenol, Benzyl Alcohol, Benzyl Salicylate, Farnesol, Citral'
  },
  // Mancera fragrances
  'Mancera': {
    description: 'is an exquisite fragrance that represents the perfect fusion of French elegance and Eastern opulence. Created with the finest ingredients and exceptional craftsmanship, it offers a luxurious olfactory journey that is both sophisticated and distinctive. The masterful composition unfolds beautifully on the skin, revealing complex layers that evolve throughout the day for a truly memorable experience.',
    ingredients: 'Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Benzyl Salicylate, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Alpha-Isomethyl Ionone'
  },
  // Montblanc fragrances
  'Montblanc': {
    description: 'is a distinguished fragrance that embodies the brand commitment to excellence and craftsmanship. Created with precision and attention to detail, it offers a sophisticated olfactory experience that is both refined and memorable. The harmonious blend of notes creates a signature scent that reflects the timeless elegance and quality associated with the legendary Montblanc name.',
    ingredients: 'Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Benzyl Salicylate'
  },
  // Prada fragrances
  'Prada': {
    description: 'is a sophisticated fragrance that captures the essence of modern luxury with its innovative composition. Created with exceptional ingredients and avant-garde techniques, it offers a distinctive olfactory experience that is both elegant and contemporary. The meticulously crafted blend unfolds beautifully on the skin, revealing complex layers that reflect the creative vision and refined aesthetic of the iconic Italian fashion house.',
    ingredients: 'Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Benzyl Salicylate, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Alpha-Isomethyl Ionone'
  },
  // Tom Ford fragrances
  'Tom Ford': {
    description: 'is an extraordinary fragrance that exemplifies the designer bold vision and commitment to luxury. Created with the finest ingredients and uncompromising attention to detail, it offers a sophisticated olfactory experience that is both distinctive and memorable. The complex composition unfolds beautifully on the skin, revealing layers of depth and character that make a powerful statement of style and refinement.',
    ingredients: 'Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Benzyl Benzoate, Citronellol, Geraniol, Eugenol, Citral, Benzyl Alcohol, Farnesol, Benzyl Salicylate, Cinnamal'
  },
  // Versace fragrances
  'Versace': {
    description: 'is a magnificent fragrance that embodies the glamour and opulence of the iconic Italian fashion house. Created with exceptional ingredients and masterful craftsmanship, it offers a luxurious olfactory experience that is both bold and sophisticated. The distinctive composition unfolds beautifully on the skin, revealing complex layers that capture the essence of Mediterranean luxury and contemporary style.',
    ingredients: 'Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Benzyl Salicylate, Alpha-Isomethyl Ionone'
  },
  // Yves Saint Laurent fragrances
  'Yves Saint Laurent': {
    description: 'is a captivating fragrance that embodies the brand legacy of Parisian elegance and bold creativity. Created with exceptional ingredients and innovative techniques, it offers a sophisticated olfactory journey that is both distinctive and refined. The masterful composition unfolds beautifully on the skin, revealing complex layers that reflect the house commitment to luxury and avant-garde style.',
    ingredients: 'Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Benzyl Salicylate, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Alpha-Isomethyl Ionone'
  },
  // Default for other brands
  'default': {
    description: 'is an exquisite fragrance that represents the pinnacle of perfumery artistry. Crafted with the finest ingredients and exceptional attention to detail, it offers a sophisticated olfactory journey that evolves beautifully on the skin. The harmonious blend of notes creates a distinctive signature that makes a lasting impression, perfect for those who appreciate refined luxury and quality craftsmanship.',
    ingredients: 'Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Benzyl Salicylate'
  }
};

// Function to get brand from product name or category
function getBrand(product) {
  const name = product.name.toLowerCase();
  const category = product.category.toLowerCase();
  
  if (name.includes('afnan') || category.includes('afnan')) return 'Afnan';
  if (name.includes('armaf') || category.includes('armaf')) return 'Armaf';
  if (name.includes('chanel') || category.includes('chanel')) return 'Chanel';
  if (name.includes('creed') || category.includes('creed')) return 'Creed';
  if (name.includes('dior') || category.includes('dior')) return 'Dior';
  if (name.includes('gucci') || category.includes('gucci')) return 'Gucci';
  if (name.includes('lattafa') || category.includes('lattafa')) return 'Lattafa';
  if (name.includes('mancera') || category.includes('mancera')) return 'Mancera';
  if (name.includes('montblanc') || category.includes('montblanc')) return 'Montblanc';
  if (name.includes('prada') || category.includes('prada')) return 'Prada';
  if (name.includes('tom ford') || category.includes('tom ford')) return 'Tom Ford';
  if (name.includes('versace') || category.includes('versace')) return 'Versace';
  if (name.includes('yves saint laurent') || name.includes('ysl') || 
      category.includes('yves saint laurent') || category.includes('ysl')) return 'Yves Saint Laurent';
  
  return 'default';
}

// Let's manually update the products.js file
console.log('Starting to update products...');

// Create a new array with updated products
const updatedProducts = [];

for (const product of productsArray) {
  // Get the brand
  const brand = getBrand(product);
  
  // Get description and ingredients based on brand
  const data = fragranceData[brand] || fragranceData.default;
  
  // Create a personalized description
  let personalizedDescription = product.description;
  if (!personalizedDescription || personalizedDescription.includes('Placeholder') || personalizedDescription.length < 50) {
    personalizedDescription = `${product.name} ${data.description}`;
  }
  
  // Create updated product without rating and reviews
  const { rating, reviews, ...rest } = product;
  
  // Add description and ingredients if they don't exist
  const updatedProduct = {
    ...rest,
    description: personalizedDescription,
    ingredients: product.ingredients || data.ingredients
  };
  
  updatedProducts.push(updatedProduct);
}

// Convert the updated products array to a string
const productsString = JSON.stringify(updatedProducts, null, 2)
  .replace(/"([^"]+)":/g, '$1:') // Convert "key": to key:
  .replace(/\&quot;/g, '\&quot;');       // Escape quotes in strings

// Update the products.js file
const updatedContent = `// Complete list of all perfumes in alphabetical order with proper image mapping
const products = ${productsString};

export default products;`;

fs.writeFileSync(productsFilePath, updatedContent);
console.log('Products updated successfully!');