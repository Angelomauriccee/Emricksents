// src/App.jsx
import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import { CartProvider } from "./context/CartContext";
import { FilterProvider } from "./context/FilterContext";
import { SearchProvider } from "./context/SearchContext";
import "./styles/viewport-fixes.css";

import Navbar from "./components/layout/SearchNavbar";
import Footer from "./components/layout/ReactiveFooter";
import ScrollToTop from "./components/ui/ScrollToTop";
// import MinimalistLoader from "./components/ui/MinimalistLoader";
import CookieConsent from "./components/ui/CookieConsent";

// Enhanced features
import "./components/enhanced-styles.css";
import CustomCursor from "./components/features/CustomCursor";
import NoiseOverlay from "./components/features/NoiseOverlay";
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

// Data (to collect product image URLs)
import products from "./data/products";

// Videos to preload (import your local assets here)
const heroVideo =
  "https://res.cloudinary.com/drtmoxle9/video/upload/v1760953291/mixkit-spraying-a-perfume-sample-in-a-store-21980-hd-ready_ofse1v.mp4";

const CRITICAL_IMAGES = [
  "https://res.cloudinary.com/drtmoxle9/video/upload/v1761010055/store-locator_cqwekj.mp4",
];

const VIDEO_ASSETS = [heroVideo];

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
    const onReady = () => cleanup(resolve({ ok: true }));
    const onError = () => cleanup(resolve({ ok: false }));

    const cleanup = (done) => {
      v.removeEventListener("canplaythrough", onReady);
      v.removeEventListener("loadeddata", onReady);
      v.removeEventListener("error", onError);
      done;
    };

    v.preload = "auto";
    v.muted = true;
    v.src = url;

    v.addEventListener("canplaythrough", onReady, { once: true });
    v.addEventListener("loadeddata", onReady, { once: true });
    v.addEventListener("error", onError, { once: true });
  });
}

// Layout component to handle per-route loading
const AppLayout = ({ children }) => {
  const location = useLocation();
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    // Trigger loading when route changes
    setIsNavigating(true);
    const timer = setTimeout(() => {
      setIsNavigating(false);
    }, 300); // Adjust duration as needed (match your loader animation)

    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Optional: lock scroll during navigation
  useEffect(() => {
    if (!isNavigating) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isNavigating]);

  return (
    <>
      {/* Navigation Loader */}
      <AnimatePresence>
        {isNavigating && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          ></motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen flex flex-col relative">
        <CustomCursor />
        <NoiseOverlay />
        <ParticleBackground />
        <ScrollAnimations />
        <Navbar />
        <ScrollToTop />
        <main className="flex-grow">{children}</main>
        <Footer />
        <CookieConsent />
      </div>
    </>
  );
};

export default function App() {
  const [setIsLoading] = useState(true);
  const [hasVisited, setHasVisited] = useState(false);
  const [setProgress] = useState(0);

  // One-time “visited” flag
  useEffect(() => {
    const visited = localStorage.getItem("emrickscents_visited");
    if (visited) {
      setHasVisited(true);
    } else {
      localStorage.setItem("emrickscents_visited", "true");
    }
  }, []);

  // Initial app load preloader (only runs once)
  useEffect(() => {
    let finished = false;

    const MIN_MS = 2000;
    const MAX_MS = 18000;
    const includeVideos = PRELOAD_VIDEO;

    const productImages = [
      ...new Set(
        (products ?? []).flatMap((p) => p?.images || []).filter(Boolean)
      ),
    ];

    const imagesToLoad = [...CRITICAL_IMAGES, ...productImages];
    const totalCount =
      imagesToLoad.length + (includeVideos ? VIDEO_ASSETS.length : 0);
    let loadedCount = 0;

    function tick() {
      loadedCount += 1;
      const pct = Math.round((loadedCount / Math.max(totalCount, 1)) * 100);
      setProgress(Math.min(100, Math.max(0, pct)));
    }

    if (totalCount === 0) setProgress(100);

    const minDelay = new Promise((res) => setTimeout(res, MIN_MS));
    const imagePromises = imagesToLoad.map((url) =>
      preloadImage(url).then(() => tick())
    );
    const videoPromises = includeVideos
      ? VIDEO_ASSETS.map((url) => preloadVideo(url).then(() => tick()))
      : [];
    const allAssets = Promise.all([...imagePromises, ...videoPromises]);
    const hardCap = new Promise((res) => setTimeout(res, MAX_MS));

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
  }, [hasVisited]);

  // // Show the initial loader until gate flips
  // if (isLoading) {
  //   return <MinimalistLoader isLoading={isLoading} progress={progress} />;
  // }

  return (
    <CartProvider>
      <FilterProvider>
        <SearchProvider>
          <AppLayout>
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
          </AppLayout>
        </SearchProvider>
      </FilterProvider>
    </CartProvider>
  );
}
