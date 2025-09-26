import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { FiSearch, FiShoppingBag, FiMenu, FiX } from 'react-icons/fi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import logoImage from '../../assets/logo.png';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { cartCount, showNotification } = useCart();
  const location = useLocation();

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

  const megaMenuCategories = [
    {
      title: 'Men',
      subcategories: ['Woody', 'Fresh', 'Oriental', 'Aromatic', 'Citrus', 'Spicy']
    },
    {
      title: 'Women',
      subcategories: ['Floral', 'Oriental', 'Woody', 'Fresh', 'Fruity', 'Gourmand']
    },
    {
      title: 'Unisex',
      subcategories: ['Niche', 'Artisanal', 'Luxury', 'Classic', 'Modern']
    },
    {
      title: 'Collections',
      subcategories: ['Limited Edition', 'Signature', 'Exclusive', 'Seasonal', 'Bestsellers']
    }
  ];

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
              <button 
                className="text-light hover:text-secondary transition-colors flex items-center"
                onMouseEnter={() => setIsMegaMenuOpen(true)}
              >
                All Brands <FiChevronDown className="ml-1" />
              </button>
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
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-light hover:text-secondary transition-colors"
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
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mega Menu */}
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
              <div className="container-custom grid grid-cols-4 gap-8">
                {megaMenuCategories.map((category, index) => (
                  <div key={index}>
                    <h3 className="text-secondary font-serif text-xl mb-4">{category.title}</h3>
                    <ul className="space-y-2">
                      {category.subcategories.map((subcat, idx) => (
                        <li key={idx}>
                          <Link 
                            to={`/shop?category=${category.title.toLowerCase()}&type=${subcat.toLowerCase()}`}
                            className="text-light hover:text-secondary transition-colors"
                          >
                            {subcat}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
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
                <Link to="/" className="text-2xl text-light hover:text-secondary transition-colors">
                  Home
                </Link>
                <Link to="/shop" className="text-2xl text-light hover:text-secondary transition-colors">
                  All Brands <FiChevronDown className="ml-1" />
                </Link>
                <Link to="/about" className="text-2xl text-light hover:text-secondary transition-colors">
                  About
                </Link>
                <Link to="/store-locator" className="text-2xl text-light hover:text-secondary transition-colors">
                  Store Locator
                </Link>
                <Link to="/contact" className="text-2xl text-light hover:text-secondary transition-colors">
                  Contact
                </Link>
              </nav>
              
              <div className="mt-auto">
                <div className="flex justify-center space-x-6 mb-8">
                  {['instagram', 'facebook', 'twitter'].map((social) => (
                    <a 
                      key={social}
                      href={`https://${social}.com`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-light hover:text-secondary transition-colors"
                    >
                      <span className="capitalize">{social}</span>
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

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div 
            className="fixed inset-0 bg-dark bg-opacity-95 backdrop-blur-md z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button 
              onClick={() => setSearchOpen(false)}
              className="absolute top-8 right-8 text-light hover:text-secondary transition-colors"
            >
              <FiX size={24} />
            </button>
            
            <div className="w-full max-w-3xl px-6">
              <div className="flex justify-center mb-8">
                <img 
                  src={logoImage} 
                  alt="EmerickScents Logo" 
                  className="h-16"
                />
              </div>
              <h2 className="text-3xl font-serif text-secondary mb-8 text-center">Search Our Collection</h2>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search for perfumes..." 
                  className="w-full bg-transparent border-b-2 border-gray-600 focus:border-secondary py-4 px-4 text-xl text-light outline-none transition-colors"
                  autoFocus
                />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary">
                  <FiSearch size={24} />
                </button>
              </div>
              <div className="mt-8">
                <h3 className="text-gray-400 mb-4">Popular Searches:</h3>
                <div className="flex flex-wrap gap-2">
                  {['Woody', 'Floral', 'Limited Edition', 'Gift Sets', 'New Arrivals'].map((term) => (
                    <button 
                      key={term}
                      className="px-4 py-2 bg-dark border border-gray-700 rounded-full text-light hover:border-secondary hover:text-secondary transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;