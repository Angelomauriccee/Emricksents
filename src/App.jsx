// src/App.jsx
import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { CartProvider } from './context/CartContext';
import { FilterProvider } from './context/FilterContext';
import { SearchProvider } from './context/SearchContext';

import Navbar from './components/layout/SearchNavbar';
import Footer from './components/layout/ReactiveFooter';
import ScrollToTop from './components/ui/ScrollToTop';
import MinimalistLoader from './components/ui/MinimalistLoader';
import CookieConsent from './components/ui/CookieConsent';

// Enhanced features
import './components/enhanced-styles.css';
import CustomCursor from './components/features/CustomCursor';
import NoiseOverlay from './components/features/NoiseOverlay';
import FloatingShapes from './components/features/FloatingShapes';
import ParticleBackground from './components/features/ParticleBackground';
import ScrollAnimations from './components/features/ScrollAnimations';

// Pages
import Home from './pages/Home';
import Shop from './pages/ReactiveShop';
import ProductDetails from './pages/EnhancedProductDetails';
import Cart from './pages/EnhancedCart';
import About from './pages/About';
import Contact from './pages/Contact';
import StoreLocator from './pages/StoreLocator';
import NotFound from './pages/NotFound';

// Data (to collect product image URLs)
import products from './data/products';

// OPTIONAL: preload the hero video too. If you don’t want to wait for video, set PRELOAD_VIDEO=false.
import heroVideo from './assets/videos/mixkit-spraying-a-perfume-sample-in-a-store-21980-hd-ready.mp4';

const CRITICAL_IMAGES = [
  '/images/our-story.jpg',
  // Add any other must-show images (e.g., hero poster, navbar logo variants, etc.)
];

const PRELOAD_VIDEO = true;

function preloadImage(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve(); // don’t block on errors
    img.src = url;
  });
}

function preloadVideo(url) {
  return new Promise((resolve) => {
    const v = document.createElement('video');
    v.preload = 'metadata';
    v.src = url;
    v.onloadeddata = () => resolve();
    v.onerror = () => resolve(); // don’t block on errors
  });
}

function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [hasVisited, setHasVisited] = useState(false);
  const [progress, setProgress] = useState(0); // 0–100 for loader UI (optional)

  // One-time “visited” flag
  useEffect(() => {
    const visited = localStorage.getItem('emrickscents_visited');
    if (visited) {
      setHasVisited(true);
    } else {
      localStorage.setItem('emrickscents_visited', 'true');
    }
  }, []);

  // Loader gate: preload assets + enforce min/max duration
  useEffect(() => {
    let done = false;

    const MIN_MS = hasVisited ? 1500 : 3000;
    const MAX_MS = hasVisited ? 3000 : 5000;

    // Gather unique product image URLs
    const productImages = [
      ...new Set(
        (products ?? []).flatMap((p) => p?.images || []).filter(Boolean)
      ),
    ];

    const imagesToLoad = [...CRITICAL_IMAGES, ...productImages];

    // Progress tracking
    const total = imagesToLoad.length + (PRELOAD_VIDEO ? 1 : 0);
    let loaded = 0;

    const track = () => {
      loaded += 1;
      const pct = Math.min(100, Math.round((loaded / Math.max(1, total)) * 100));
      setProgress(pct);
    };

    const imagePromises = imagesToLoad.map((url) =>
      preloadImage(url).then(track)
    );

    const videoPromise = PRELOAD_VIDEO
      ? preloadVideo(heroVideo).then(track)
      : Promise.resolve();

    const minDelay = new Promise((res) => setTimeout(res, MIN_MS));

    // When assets + min time are ready, hide loader—unless max time already fired.
    Promise.all([Promise.all(imagePromises), videoPromise, minDelay]).then(() => {
      if (!done) {
        done = true;
        setIsLoading(false);
      }
    });

    // Cleanup in case component unmounts early
    return () => {
      done = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasVisited]);

  // Optional: lock scroll while loading
  useEffect(() => {
    if (isLoading) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isLoading]);

  // Show the loader until the gate flips isLoading=false
  if (isLoading) {
    return (
      <MinimalistLoader
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        progress={progress} // your loader can read this; safe to ignore if unused
      />
    );
  }

  return (
    <CartProvider>
      <FilterProvider>
        <SearchProvider>
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
                  <Route path="/product/:slug" element={<ProductDetails />} />
                  <Route path="/p/:slug" element={<ProductDetails />} />
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
        </SearchProvider>
      </FilterProvider>
    </CartProvider>
  );
}

export default App;
