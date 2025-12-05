// src/App.jsx
import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { CartProvider } from "./context/CartContext";
import { FilterProvider } from "./context/FilterContext";
import { SearchProvider } from "./context/SearchContext";
// main.jsx or App.jsx
import "./styles/viewport-fixes.css";

import Navbar from "./components/layout/SearchNavbar";
import Footer from "./components/layout/ReactiveFooter";
import ScrollToTop from "./components/ui/ScrollToTop";
import MinimalistLoader from "./components/ui/MinimalistLoader";
import CookieConsent from "./components/ui/CookieConsent";

// Enhanced features
import "./components/enhanced-styles.css";
import CustomCursor from "./components/features/CustomCursor";
import NoiseOverlay from "./components/features/NoiseOverlay";
import FloatingShapes from "./components/features/FloatingShapes";
import ParticleBackground from "./components/features/ParticleBackground";
import ScrollAnimations from "./components/features/ScrollAnimations";

// Pages
import Home from "./pages/Home";
import Shop from "./pages/ReactiveShop";
import ProductDetails from "./pages/EnhancedProductDetails";
import Cart from "./pages/EnhancedCart";
import About from "./pages/About";
import Contact from "./pages/Contact";
import StoreLocator from "./pages/StoreLocator";
import NotFound from "./pages/NotFound";

// holiday themes
import Snowfall from "./components/season/Snowfall";

// Data (to collect product image URLs)
import products from "./data/products";

// Videos to preload (import your local assets here)
const heroVideo =
  "https://res.cloudinary.com/drtmoxle9/video/upload/v1760953291/mixkit-spraying-a-perfume-sample-in-a-store-21980-hd-ready_ofse1v.mp4";
// If you add more local videos, import them and push into VIDEO_ASSETS below
// import storeLocatorVideo from './assets/video/store-locator.mp4';

const CRITICAL_IMAGES = [
  "https://res.cloudinary.com/drtmoxle9/video/upload/v1761010055/store-locator_cqwekj.mp4",
  // Add any other must-show images here
];

const VIDEO_ASSETS = [
  heroVideo,
  // storeLocatorVideo,
];

const PRELOAD_VIDEO = true;

// --- Preload helpers ---
function preloadImage(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve({ ok: true });
    img.onerror = () => resolve({ ok: false });
    img.src = url;
  });
}

function preloadVideo(url) {
  return new Promise((resolve) => {
    const v = document.createElement("video");
    // Safest signal that enough buffered to start quickly
    const onReady = () => cleanup(resolve({ ok: true }));
    const onError = () => cleanup(resolve({ ok: false }));

    const cleanup = (done) => {
      v.removeEventListener("canplaythrough", onReady);
      v.removeEventListener("loadeddata", onReady);
      v.removeEventListener("error", onError);
      done;
    };

    v.preload = "auto";
    v.muted = true; // helps Safari/iOS behavior
    v.src = url;

    // whichever fires first
    v.addEventListener("canplaythrough", onReady, { once: true });
    v.addEventListener("loadeddata", onReady, { once: true });
    v.addEventListener("error", onError, { once: true });
  });
}

export default function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [hasVisited, setHasVisited] = useState(false);
  const [progress, setProgress] = useState(0); // 0–100

  // One-time “visited” flag
  useEffect(() => {
    const visited = localStorage.getItem("emrickscents_visited");
    if (visited) {
      setHasVisited(true);
    } else {
      localStorage.setItem("emrickscents_visited", "true");
    }
  }, []);

  // Loader gate: preload assets + min/max timing
  useEffect(() => {
    let finished = false;

    // Feel free to tweak:
    const MIN_MS = 2000; // minimum time to show loader
    const MAX_MS = 18000; // hard cap so users are never stuck
    const includeVideos = PRELOAD_VIDEO;

    // Collect product images (unique)
    const productImages = [
      ...new Set(
        (products ?? []).flatMap((p) => p?.images || []).filter(Boolean)
      ),
    ];

    const imagesToLoad = [...CRITICAL_IMAGES, ...productImages];

    // Build all preload promises
    const imagePromises = imagesToLoad.map((url) =>
      preloadImage(url).then(() => tick())
    );

    const videoPromises = includeVideos
      ? VIDEO_ASSETS.map((url) => preloadVideo(url).then(() => tick()))
      : [];

    // For progress tracking:
    const totalCount =
      imagesToLoad.length + (includeVideos ? VIDEO_ASSETS.length : 0);
    let loadedCount = 0;
    function tick() {
      loadedCount += 1;
      const pct = Math.round((loadedCount / Math.max(totalCount, 1)) * 100);
      setProgress(Math.min(100, Math.max(0, pct)));
    }

    // If there’s nothing to preload, still respect MIN_MS
    if (totalCount === 0) setProgress(100);

    const minDelay = new Promise((res) => setTimeout(res, MIN_MS));
    const allAssets = Promise.all([...imagePromises, ...videoPromises]);

    // Hard timeout to never exceed MAX_MS
    const hardCap = new Promise((res) => setTimeout(res, MAX_MS));

    // Wait for: (assets AND minDelay) OR hardCap (whichever first)
    Promise.race([Promise.all([allAssets, minDelay]), hardCap]).then(() => {
      if (!finished) {
        finished = true;
        setProgress(100);
        setIsLoading(false);
      }
    });

    return () => {
      finished = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasVisited]);

  // Optional: lock scroll while loading
  useEffect(() => {
    if (!isLoading) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isLoading]);

  // Show the loader until gate flips
  if (isLoading) {
    return <MinimalistLoader isLoading={isLoading} progress={progress} />;
  }

  return (
    <CartProvider>
      <FilterProvider>
        <SearchProvider>
          <div className="min-h-screen flex flex-col relative">
            <CustomCursor />
            <NoiseOverlay />
            <FloatingShapes />
            <ParticleBackground />
            <ScrollAnimations />
            <Snowfall enabled={true} density={0.2} zIndex={1} />
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
