import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { CartProvider } from './context/CartContext'
import { FilterProvider } from './context/FilterContext'
import Navbar from './components/layout/ReactiveNavbar' // Updated to use ReactiveNavbar
import Footer from './components/layout/ReactiveFooter' // Updated to use ReactiveFooter
import ScrollToTop from './components/ui/ScrollToTop'
import NewLoader from './components/ui/NewLoader'
import CookieConsent from './components/ui/CookieConsent'

// Import enhanced styles
import './components/enhanced-styles.css'

// Import enhanced features
import CustomCursor from './components/features/CustomCursor'
import NoiseOverlay from './components/features/NoiseOverlay'
import FloatingShapes from './components/features/FloatingShapes'
import ParticleBackground from './components/features/ParticleBackground'
import ScrollAnimations from './components/features/ScrollAnimations'

// Pages
import Home from './pages/Home'
import Shop from './pages/ReactiveShop' // Updated to use ReactiveShop
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import About from './pages/About'
import Contact from './pages/Contact'
import StoreLocator from './pages/StoreLocator'
import NotFound from './pages/NotFound'

function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [hasVisited, setHasVisited] = useState(false);

  // Check if user has visited before to skip long intro for returning visitors
  useEffect(() => {
    const visited = localStorage.getItem('emrickscents_visited');
    if (visited) {
      setHasVisited(true);
      // Shorter loading time for returning visitors
      // We'll still show the loader but for a shorter duration
      // The loader component will handle the timing internally
    } else {
      // Set visited flag for future visits
      localStorage.setItem('emrickscents_visited', 'true');
    }
  }, []);

  if (isLoading) {
    return <NewLoader isLoading={isLoading} setIsLoading={setIsLoading} />;
  }

  return (
    <CartProvider>
      <FilterProvider>
        <div className="min-h-screen flex flex-col relative">
          {/* Enhanced features */}
          <CustomCursor />
          <NoiseOverlay />
          <FloatingShapes />
          <ParticleBackground />
          <ScrollAnimations />
          
          <Navbar />
          <ScrollToTop />
          <main className="flex-grow">
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/store-locator" element={<StoreLocator />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
          <CookieConsent />
        </div>
      </FilterProvider>
    </CartProvider>
  )
}

export default App