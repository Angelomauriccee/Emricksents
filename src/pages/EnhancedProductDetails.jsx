import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
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
import '../components/swiper-custom.css';
import AdvancedImageZoom from '../components/product/AdvancedImageZoom';
import { slugify, findProductBySlug } from '../utils/slugify';

import Button from '../components/ui/Button';
import ProductCard from '../components/product/EnhancedProductCard';
import products from '../data/products';

const EnhancedProductDetails = () => {
  const { id, slug } = useParams();
  const navigate = useNavigate();
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

  // Find product by slug or ID
  useEffect(() => {
    let foundProduct;
    const paramSlug = slug || id; // Use either slug or id from params
    
    if (paramSlug) {
      // First try to find by slug
      foundProduct = findProductBySlug(products, paramSlug);
      
      // If not found by slug and it looks like an ID, try finding by ID as fallback
      if (!foundProduct && !isNaN(parseInt(paramSlug))) {
        foundProduct = products.find(p => p.id === parseInt(paramSlug));
        
        // If found by ID, redirect to slug URL
        if (foundProduct) {
          const productSlug = slugify(foundProduct.name);
          navigate(`/product/${productSlug}`, { replace: true });
          return;
        }
      }
      
      if (foundProduct) {
        setProduct(foundProduct);
        
        // Find related products
        const related = products
          .filter(p => 
            p.id !== foundProduct.id && 
            (p.category === foundProduct.category || p.gender === foundProduct.gender)
          )
          .slice(0, 4);
        setRelatedProducts(related);
      } else {
        // Product not found, redirect to shop
        navigate('/shop');
      }
    }
  }, [id, slug, navigate]);

  // GSAP animations
  useEffect(() => {
    if (product && productRef.current) {
      const timeline = gsap.timeline();
      
      timeline
        .fromTo(
          imageRef.current,
          { x: -50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
        )
        .fromTo(
          infoRef.current,
          { x: 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          '-=0.6'
        );
    }
  }, [product]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product, quantity });
      setShowAddedToCart(true);
      setTimeout(() => setShowAddedToCart(false), 3000);
    }
  };

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-secondary mx-auto mb-4"></div>
          <p className="text-light">Loading product...</p>
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
      className="min-h-screen py-20"
    >
      <div className="container-custom">
        {/* Back Button */}
        <Link 
          to="/shop" 
          className="inline-flex items-center text-secondary hover:text-secondary/80 transition-colors mb-8"
        >
          <FiArrowLeft className="mr-2" />
          Back to Shop
        </Link>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Product Images */}
          <div ref={imageRef}>
            {/* Desktop: Advanced Zoom */}
            <div className="hidden md:block">
              <AdvancedImageZoom 
                images={product.images || [product.image, product.packImage, product.displayImage].filter(Boolean)}
                currentIndex={0}
              />
            </div>

            {/* Mobile: Simple Swiper */}
            <div className="md:hidden space-y-4">
              <Swiper
                modules={[Navigation, Pagination, Thumbs]}
                thumbs={{ swiper: thumbsSwiper }}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                  enabled: true,
                  disabledClass: "swiper-button-disabled"
                }}
                pagination={{ clickable: true }}
                className="rounded-lg overflow-hidden aspect-[3/4] bg-gray-900 product-swiper"
              >
                {product.images && product.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img 
                      src={image} 
                      alt={`${product.name} - Image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </SwiperSlide>
                ))}
                <div className="swiper-button-next"></div>
                <div className="swiper-button-prev"></div>
              </Swiper>
              
              {product.images && product.images.length > 1 && (
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
              )}
            </div>
          </div>

          {/* Product Info */}
          <div ref={infoRef} className="space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-serif text-light mb-2">
                {product.name}
              </h1>
              <p className="text-gray-400">{product.brand}</p>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-secondary">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-light">Quantity:</span>
              <div className="flex items-center border border-secondary rounded-lg">
                <button
                  onClick={decreaseQuantity}
                  className="p-3 hover:bg-secondary/10 transition-colors"
                >
                  <FiMinus className="text-secondary" />
                </button>
                <span className="px-6 text-light">{quantity}</span>
                <button
                  onClick={increaseQuantity}
                  className="p-3 hover:bg-secondary/10 transition-colors"
                >
                  <FiPlus className="text-secondary" />
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              variant="primary"
              size="lg"
              className="w-full"
            >
              <FiShoppingBag className="mr-2" />
              Add to Cart
            </Button>

            {/* Added to Cart Message */}
            {showAddedToCart && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-secondary/10 border border-secondary text-secondary px-4 py-3 rounded-lg text-center"
              >
                Added to cart successfully!
              </motion.div>
            )}

            {/* Product Details Tabs */}
            <div className="border-t border-gray-800 pt-6">
              <div className="flex gap-4 mb-6">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`pb-2 border-b-2 transition-colors ${
                    activeTab === 'description'
                      ? 'border-secondary text-secondary'
                      : 'border-transparent text-gray-400 hover:text-light'
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab('notes')}
                  className={`pb-2 border-b-2 transition-colors ${
                    activeTab === 'notes'
                      ? 'border-secondary text-secondary'
                      : 'border-transparent text-gray-400 hover:text-light'
                  }`}
                >
                  Notes
                </button>
                <button
                  onClick={() => setActiveTab('details')}
                  className={`pb-2 border-b-2 transition-colors ${
                    activeTab === 'details'
                      ? 'border-secondary text-secondary'
                      : 'border-transparent text-gray-400 hover:text-light'
                  }`}
                >
                  Details
                </button>
              </div>

              <div className="text-gray-300">
                {activeTab === 'description' && (
                  <p>{product.description}</p>
                )}
                {activeTab === 'notes' && (
                  <div className="space-y-4">
                    {product.notes && (
                      <>
                        {product.notes.top && (
                          <div>
                            <h4 className="text-secondary font-semibold mb-2">Top Notes</h4>
                            <p>{product.notes.top.join(', ')}</p>
                          </div>
                        )}
                        {product.notes.middle && (
                          <div>
                            <h4 className="text-secondary font-semibold mb-2">Middle Notes</h4>
                            <p>{product.notes.middle.join(', ')}</p>
                          </div>
                        )}
                        {product.notes.base && (
                          <div>
                            <h4 className="text-secondary font-semibold mb-2">Base Notes</h4>
                            <p>{product.notes.base.join(', ')}</p>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
                {activeTab === 'details' && (
                  <div className="space-y-2">
                    <p><span className="text-secondary">Category:</span> {product.category}</p>
                    <p><span className="text-secondary">Gender:</span> {product.gender}</p>
                    <p><span className="text-secondary">Size:</span> {product.size}</p>
                    {product.concentration && (
                      <p><span className="text-secondary">Concentration:</span> {product.concentration}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-serif text-light mb-8 text-center">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map(relatedProduct => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default EnhancedProductDetails;