import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { FiMinus, FiPlus, FiShoppingBag, FiArrowLeft } from 'react-icons/fi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';
import gsap from 'gsap';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import ImageZoom from '../components/product/ImageZoom';

import Button from '../components/ui/Button';
import ProductCard from '../components/product/ProductCard';
import products from '../data/products';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart, cartCount } = useCart();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [showAddedToCart, setShowAddedToCart] = useState(false);
  
  const productRef = useRef(null);
  const imageRef = useRef(null);
  const infoRef = useRef(null);

  // Find product by ID
  useEffect(() => {
    const foundProduct = products.find(p => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
      
      // Find related products (same category or type)
      const related = products
        .filter(p => p.id !== foundProduct.id && (p.category === foundProduct.category || p.type === foundProduct.type))
        .slice(0, 4);
      setRelatedProducts(related);
    }
    
    // Reset quantity and active tab when product changes
    setQuantity(1);
    setActiveTab('description');
    
    // Scroll to top when product changes
    window.scrollTo(0, 0);
  }, [id]);

  // GSAP animations
  useEffect(() => {
    if (product && imageRef.current && infoRef.current) {
      const timeline = gsap.timeline();
      
      timeline.fromTo(
        imageRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      ).fromTo(
        infoRef.current,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      );
    }
  }, [product]);

  // Handle quantity change
  const handleQuantityChange = (amount) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  // Handle add to cart
  const handleAddToCart = () => {
    if (!product) return;
    
    addToCart(product, quantity);
    
    // Show confirmation
    setShowAddedToCart(true);
    setTimeout(() => setShowAddedToCart(false), 3000);
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center py-32">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-secondary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-light">Loading product details...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      ref={productRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-primary py-32"
    >
      <div className="container-custom">
        {/* Back to Shop Link */}
        <Link 
          to="/shop" 
          className="inline-flex items-center text-gray-400 hover:text-secondary transition-colors mb-8"
        >
          <FiArrowLeft className="mr-2" />
          <span>Back to Shop</span>
        </Link>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div ref={imageRef} className="space-y-4">
            <Swiper
              modules={[Navigation, Pagination, Thumbs]}
              thumbs={{ swiper: thumbsSwiper }}
              navigation
              pagination={{ clickable: true }}
              className="rounded-lg overflow-hidden aspect-[3/4] bg-gray-900"
            >
              {product.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <ImageZoom 
                    image={image} 
                    alt={`${product.name} - Image ${index + 1}`} 
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[Navigation, Thumbs]}
              className="thumbs-swiper"
            >
              {product.images.map((image, index) => (
                <SwiperSlide key={index} className="cursor-pointer rounded-md overflow-hidden">
                  <img 
                    src={image} 
                    alt={`${product.name} - Thumbnail ${index + 1}`} 
                    className="w-full h-full object-cover aspect-[3/4]" 
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Product Info */}
          <div ref={infoRef} className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-serif text-light mb-2">{product.name}</h1>
              <p className="text-gray-400">{product.category} • {product.type}</p>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-2xl text-secondary font-medium">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
              )}
              {product.discount && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                  {product.discount}% OFF
                </span>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-lg ${i < Math.floor(product.rating) ? 'text-secondary' : 'text-gray-400'}`}>
                    ★
                  </span>
                ))}
              </div>
              <span className="text-secondary">{product.rating}</span>
            </div>

            {/* Short Description */}
            <p className="text-gray-300 leading-relaxed">
              {product.description.split('.')[0] + '.'}
            </p>

            {/* Fragrance Notes */}
            <div className="space-y-3">
              <h3 className="text-light font-medium">Fragrance Notes:</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <p className="text-secondary text-sm">Top Notes</p>
                  <ul className="text-gray-400 text-sm space-y-1">
                    {product.details.topNotes.map((note, index) => (
                      <li key={index}>{note}</li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="text-secondary text-sm">Heart Notes</p>
                  <ul className="text-gray-400 text-sm space-y-1">
                    {product.details.heartNotes.map((note, index) => (
                      <li key={index}>{note}</li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="text-secondary text-sm">Base Notes</p>
                  <ul className="text-gray-400 text-sm space-y-1">
                    {product.details.baseNotes.map((note, index) => (
                      <li key={index}>{note}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Size */}
            <div>
              <h3 className="text-light font-medium mb-2">Size:</h3>
              <div className="flex space-x-3">
                <button className="px-4 py-2 border-2 border-secondary text-secondary rounded-md">
                  {product.size}
                </button>
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-light font-medium mb-2">Quantity:</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-700 rounded-md">
                  <button 
                    onClick={() => handleQuantityChange(-1)}
                    className="px-3 py-2 text-gray-400 hover:text-secondary transition-colors"
                    disabled={quantity <= 1}
                  >
                    <FiMinus />
                  </button>
                  <span className="px-4 py-2 text-light">{quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(1)}
                    className="px-3 py-2 text-gray-400 hover:text-secondary transition-colors"
                    disabled={quantity >= 10}
                  >
                    <FiPlus />
                  </button>
                </div>
                <p className="text-gray-400 text-sm">
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col space-y-4 pt-4">
              <div className="relative">
                <Button 
                  variant="primary" 
                  size="lg"
                  className="w-full flex items-center justify-center"
                  onClick={handleAddToCart}
                >
                  <FiShoppingBag className="mr-2" />
                  <span>Add to Cart</span>
                </Button>
                
                {showAddedToCart && (
                  <div className="absolute -top-12 left-0 right-0 bg-secondary text-primary text-center py-2 rounded-md animate-pulse">
                    Added to cart!
                  </div>
                )}
              </div>
            </div>

            {/* WhatsApp Order Note */}
            <div className="text-sm text-gray-400 pt-2">
              <p>After adding to cart, proceed to checkout via WhatsApp</p>
            </div>
          </div>
        </div>

        {/* Product Tabs - Only Description and Details */}
        <div className="mb-16">
          <div className="flex border-b border-gray-800 mb-8">
            <button 
              className={`px-6 py-3 font-medium ${
                activeTab === 'description' 
                  ? 'text-secondary border-b-2 border-secondary' 
                  : 'text-gray-400 hover:text-light'
              }`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button 
              className={`px-6 py-3 font-medium ${
                activeTab === 'details' 
                  ? 'text-secondary border-b-2 border-secondary' 
                  : 'text-gray-400 hover:text-light'
              }`}
              onClick={() => setActiveTab('details')}
            >
              Details
            </button>
          </div>

          <div className="bg-dark bg-opacity-50 rounded-lg p-8">
            {activeTab === 'description' && (
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p>{product.description}</p>
                <p>
                  Experience the artistry of fine perfumery with {product.name}. Each bottle is meticulously crafted to 
                  ensure the perfect balance of notes, creating a fragrance that evolves beautifully throughout the day.
                </p>
                <p>
                  Our perfumes are created using only the highest quality ingredients, sourced from sustainable producers 
                  around the world. We believe in ethical luxury that respects both people and planet.
                </p>
              </div>
            )}

            {activeTab === 'details' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-serif text-secondary mb-4">Product Specifications</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex border-b border-gray-800 pb-2">
                      <span className="w-1/3 text-gray-400">Size</span>
                      <span>{product.size}</span>
                    </li>
                    <li className="flex border-b border-gray-800 pb-2">
                      <span className="w-1/3 text-gray-400">Fragrance Type</span>
                      <span>{product.type}</span>
                    </li>
                    <li className="flex border-b border-gray-800 pb-2">
                      <span className="w-1/3 text-gray-400">Concentration</span>
                      <span>Eau de Parfum</span>
                    </li>
                    <li className="flex border-b border-gray-800 pb-2">
                      <span className="w-1/3 text-gray-400">Longevity</span>
                      <span>8-10 hours</span>
                    </li>
                    <li className="flex border-b border-gray-800 pb-2">
                      <span className="w-1/3 text-gray-400">Sillage</span>
                      <span>Moderate to Strong</span>
                    </li>
                    <li className="flex border-b border-gray-800 pb-2">
                      <span className="w-1/3 text-gray-400">Season</span>
                      <span>All Seasons</span>
                    </li>
                    <li className="flex">
                      <span className="w-1/3 text-gray-400">Made in</span>
                      <span>France</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-serif text-secondary mb-4">Ingredients</h3>
                  <p className="text-gray-300">
                    Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, 
                    Citronellol, Geraniol, Citral, Eugenol, Farnesol, Benzyl Benzoate, Benzyl Alcohol, 
                    Benzyl Salicylate, Cinnamal, Cinnamyl Alcohol, Isoeugenol.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-serif text-secondary mb-4">How to Use</h3>
                  <p className="text-gray-300 mb-4">
                    For best results, apply to pulse points: wrists, neck, behind ears, and inside elbows.
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-gray-300">
                    <li>Ensure skin is clean and moisturized</li>
                    <li>Hold bottle 3-6 inches away from skin</li>
                    <li>Spray onto pulse points</li>
                    <li>Allow fragrance to dry naturally - do not rub</li>
                    <li>Reapply as needed throughout the day</li>
                  </ol>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-serif text-light">You May Also Like</h2>
            <Link 
              to="/shop" 
              className="flex items-center text-secondary hover:text-secondary-dark transition-colors"
            >
              <span>View All</span>
              <span className="ml-1">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;