import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useFilter } from '../../context/FilterContext';
import { FiSearch, FiShoppingBag, FiMenu, FiX } from 'react-icons/fi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SearchOverlay from '../search/SearchOverlay';
import logoImage from '../../assets/logo.png';

gsap.registerPlugin(ScrollTrigger);

const SearchNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { cartCount, showNotification } = useCart();
  const { applyFilters } = useFilter();
  const location = useLocation();
  const navigate = useNavigate();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setIsMegaMenuOpen(false);
    setSearchOpen(false);
  }, [location]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP animation for navbar
  useEffect(() => {
    const navbar = document.querySelector('.navbar');
    
    gsap.fromTo(
      navbar,
      { y: -100, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1, 
        ease: 'power3.out',
        delay: 0.5
      }
    );
  }, []);

  const navbarClasses = `navbar fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
    isScrolled ? 'bg-dark bg-opacity-95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-6'
  }`;

  // Brands in alphabetical order
  const brands = [
    'Afnan', 'Amouage', 'Armaf', 'Azzaro', 'Bentley', 'Burberry', 'Bvlgari', 
    'Calvin Klein', 'Carolina Herrera', 'Chanel Paris / Bleu de Chanel', 'Clive Christian', 
    'Creed', 'Davidoff', 'Dior', 'Dolce & Gabbana', 'Emporio Armani', 'Ferragamo', 
    'Giorgio Armani', 'Givenchy', 'Gucci', 'Guerlain Paris', 'Hermes', 'Hugo Boss (Boss)', 
    'Initio', 'Jean Paul Gaultier', 'Louis Vuitton', 'Montale Paris', 'Nishane', 
    'Paco Rabanne / Rabanne', 'Polo Ralph Lauren', 'Tom Ford', 'Valentino', 'Versace', 
    'Yves Saint Laurent (YSL)'
  ];

  // Collections
  const collections = [
    { name: 'All Collections', value: 'all' },
    { name: 'Limited Edition', value: 'limited' },
    { name: 'Signature Collections', value: 'signature' }
  ];

  // Social media links
  const socialLinks = [
    { name: 'instagram', url: 'https://www.instagram.com/emrickscents?igsh=YzljYTk1ODg3Zg==' },
    { name: 'facebook', url: 'https://facebook.com' }
  ];

  // Handle brand selection
  const handleBrandSelect = (brand) => {
    applyFilters('brand', brand);
    setIsMegaMenuOpen(false);
    // Use navigate to ensure proper SPA navigation
    navigate('/shop');
  };

  // Handle collection selection
  const handleCollectionSelect = (collection) => {
    if (collection === 'all') {
      applyFilters('collection', '');
    } else {
      applyFilters('collection', collection);
    }
    setIsMegaMenuOpen(false);
    // Use navigate to ensure proper SPA navigation
    navigate('/shop');
  };

  return (
    <>
      <header className={navbarClasses}>
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="z-10">
            <img 
              src={logoImage} 
              alt="EmerickScents Logo" 
              className="h-10 md:h-12"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="text-light hover:text-secondary transition-colors">
              Home
            </Link>
            <div className="relative">
              <Link 
                to="/shop"
                className="text-light hover:text-secondary transition-colors flex items-center"
                onMouseEnter={() => setIsMegaMenuOpen(true)}
              >
                All Brands
              </Link>
            </div>
            <Link to="/about" className="text-light hover:text-secondary transition-colors">
              About
            </Link>
            <Link to="/store-locator" className="text-light hover:text-secondary transition-colors">
              Store Locator
            </Link>
            <Link to="/contact" className="text-light hover:text-secondary transition-colors">
              Contact
            </Link>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-4 z-10">
            <button 
              onClick={() => setSearchOpen(true)}
              className="text-light hover:text-secondary transition-colors"
              aria-label="Search"
            >
              <FiSearch size={20} />
            </button>
            <Link to="/cart" className="text-light hover:text-secondary transition-colors relative">
              <FiShoppingBag size={20} />
              {cartCount > 0 && (
                <motion.span 
                  className="absolute -top-2 -right-2 bg-secondary text-dark text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold"
                  animate={showNotification ? {
                    scale: [1, 1.3, 1],
                    transition: { duration: 0.5, repeat: 2 }
                  } : {}}
                >
                  {cartCount}
                </motion.span>
              )}
              {showNotification && (
                <motion.span 
                  className="absolute -top-2 -right-2 bg-secondary opacity-50 rounded-full"
                  initial={{ width: '20px', height: '20px', opacity: 0.7 }}
                  animate={{ 
                    width: '40px', 
                    height: '40px', 
                    opacity: 0,
                    x: -10,
                    y: 10
                  }}
                  transition={{ duration: 1 }}
                />
              )}
            </Link>
            <button 
              className="lg:hidden text-light hover:text-secondary transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Enhanced Mega Menu */}
        <AnimatePresence>
          {isMegaMenuOpen && (
            <motion.div 
              className="absolute top-full left-0 w-full bg-dark bg-opacity-95 backdrop-blur-md shadow-lg py-8 hidden lg:block"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              onMouseLeave={() => setIsMegaMenuOpen(false)}
            >
              <div className="container-custom flex">
                {/* Categories Section */}
                <div className="w-3/4 pr-8 border-r border-gray-800">
                  <h3 className="text-secondary font-serif text-xl mb-6">Categories</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {brands.map((brand, index) => (
                      <button
                        key={index}
                        onClick={() => handleBrandSelect(brand)}
                        className="text-left text-light hover:text-secondary transition-colors py-1.5 text-sm"
                      >
                        {brand}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Collections Section */}
                <div className="w-1/4 pl-8">
                  <h3 className="text-secondary font-serif text-xl mb-6">Collections</h3>
                  <div className="flex flex-col space-y-4">
                    {collections.map((collection, index) => (
                      <button
                        key={index}
                        onClick={() => handleCollectionSelect(collection.value)}
                        className="text-left text-light hover:text-secondary transition-colors py-1.5"
                      >
                        {collection.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed inset-0 bg-dark bg-opacity-95 backdrop-blur-md z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col h-full pt-24 px-6 pb-8">
              <div className="flex justify-center mb-8">
                <img 
                  src={logoImage} 
                  alt="EmerickScents Logo" 
                  className="h-16"
                />
              </div>
              <nav className="flex flex-col space-y-6 text-center">
                <Link 
                  to="/" 
                  className="text-2xl text-light hover:text-secondary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/shop" 
                  className="text-2xl text-light hover:text-secondary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  All Brands 
                </Link>
                <Link 
                  to="/about" 
                  className="text-2xl text-light hover:text-secondary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
                <Link 
                  to="/store-locator" 
                  className="text-2xl text-light hover:text-secondary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Store Locator
                </Link>
                <Link 
                  to="/contact" 
                  className="text-2xl text-light hover:text-secondary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </Link>
              </nav>
              
              <div className="mt-auto">
                <div className="flex justify-center space-x-6 mb-8">
                  {socialLinks.map((social) => (
                    <a 
                      key={social.name}
                      href={social.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-light hover:text-secondary transition-colors"
                    >
                      <span className="capitalize">{social.name}</span>
                    </a>
                  ))}
                </div>
                <p className="text-center text-gray-400 text-sm">
                  &copy; {new Date().getFullYear()} Emrickscents. All rights reserved.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Search Overlay */}
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default SearchNavbar;