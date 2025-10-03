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

// Enhanced styles & features
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

// Import the exact same hero video URL used in Home.jsx
import heroVideoUrl from './assets/videos/mixkit-spraying-a-perfume-sample-in-a-store-21980-hd-ready.mp4';

/** Wait until the Home hero video can play through (best-effort).
 *  Falls back to 'loadeddata' and a 15s safety timeout so you never get stuck.
 *  Also updates a progress estimate using buffered ranges when available. */
function waitForHeroVideo(setProgress) {
  return new Promise((resolve) => {
    // Try to locate the actual <video> element on the page (exact src match)
    const selector = `video[src="${heroVideoUrl}"]`;
    let videoEl = document.querySelector(selector);

    // If not found (not rendered yet), create a hidden preloader video
    let created = false;
    if (!videoEl) {
      videoEl = document.createElement('video');
      videoEl.preload = 'auto';
      videoEl.src = heroVideoUrl;
      created = true;
    }

    const done = () => {
      cleanup();
      setProgress(100);
      resolve();
    };

    const onCanPlayThrough = () => done();
    const onLoadedData = () => done(); // fallback if 'canplaythrough' doesn't fire
    const onError = () => done();      // don't block forever on error

    const onProgress = () => {
      try {
        const b = videoEl.buffered;
        const d = videoEl.duration;
        if (b && b.length && isFinite(d) && d > 0) {
          const end = b.end(b.length - 1);
          const pct = Math.max(0, Math.min(99, Math.round((end / d) * 100)));
          setProgress((prev) => (pct > prev ? pct : prev));
        }
      } catch {
        // non-fatal: ignore errors
      }
    };

    videoEl.addEventListener('canplaythrough', onCanPlayThrough, { once: true });
    videoEl.addEventListener('loadeddata', onLoadedData, { once: true });
    videoEl.addEventListener('error', onError, { once: true });
    videoEl.addEventListener('progress', onProgress);

    // Kick loading and nudge autoplay pipeline (non-fatal if it fails)
    try {
      videoEl.muted = true;
      videoEl.play?.().catch(() => {});
      videoEl.load?.();
    } catch {
        // non-fatal: ignore errors
      }

    // Safety: if nothing fires within 15s, continue
    const timeout = setTimeout(done, 15000);

    function cleanup() {
      clearTimeout(timeout);
      videoEl.removeEventListener('canplaythrough', onCanPlayThrough);
      videoEl.removeEventListener('loadeddata', onLoadedData);
      videoEl.removeEventListener('error', onError);
      videoEl.removeEventListener('progress', onProgress);
      if (created) {
        // Detach source to free memory (in case browser actually fetched it)
        try { videoEl.src = ''; } catch {
          // non-fatal: ignore errors
        }
      }
    }
  });
}

export default function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // Block on initial mount + whenever you navigate to "/"
  useEffect(() => {
    let canceled = false;

    const run = async () => {
      // Only block on the homepage (where the hero video is)
      if (location.pathname !== '/') {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setProgress(0);

      // Ensure the DOM has painted so the <video> might be found
      requestAnimationFrame(async () => {
        await waitForHeroVideo((p) => !canceled && setProgress(p));
        if (!canceled) setIsLoading(false);
      });
    };

    run();
    return () => { canceled = true; };
  }, [location.pathname]);

  // Optional: lock scroll while loading
  useEffect(() => {
    if (!isLoading) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [isLoading]);

  return (
    <CartProvider>
      <FilterProvider>
        <SearchProvider>
          <div className="min-h-screen flex flex-col relative">
            {/* Loader overlay on top; app renders behind it */}
            <MinimalistLoader isLoading={isLoading} progress={progress} />

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
