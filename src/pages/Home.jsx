import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiInstagram } from 'react-icons/fi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import SectionTitle from '../components/ui/SectionTitle';
import Button from '../components/ui/Button';
import ProductCard from '../components/product/EnhancedProductCard';
import products from '../data/products';
import { FiRefreshCw, FiHeadphones, FiShield, FiMessageCircle } from 'react-icons/fi';
// ✅ Import your promo grid
import PromoGrid from '../components/promo/promoGrid';
import PopularBrandWordmarks from "../components/brands/PopularBrandWordmarks";

// 👉 Import the video as a local asset (Vite will bundle & serve it)
const heroVideo = "https://res.cloudinary.com/drtmoxle9/video/upload/v1760953291/mixkit-spraying-a-perfume-sample-in-a-store-21980-hd-ready_ofse1v.mp4";

const visitVideo = "https://res.cloudinary.com/drtmoxle9/video/upload/v1760993254/WhatsApp_Video_2025-10-03_at_12.17.56_9ff62370_my13ne.mp4";


gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const featuredRef = useRef(null);
  const collectionRef = useRef(null);
  const storyRef = useRef(null);
  const instagramRef = useRef(null);
  const visitVideoRef = useRef(null);


  // Featured products
  const featuredProducts = products.filter(product => product.featured).slice(0, 4);
  // New arrivals products
const newProducts = products.filter(p => p.isNew).slice(0, 8);


  // Instagram reels
  const instagramReels = [
    {
      id: 1,
      url: "https://www.instagram.com/reel/DO7xky6DF4i/?igsh=YzljYTk1ODg3Zg==",
      thumbnail: "https://res.cloudinary.com/drtmoxle9/image/upload/v1761048324/reel4_m0lbjl.jpg"
    },
    {
      id: 2,
      url: "https://www.instagram.com/reel/DOxhyh6jLkj/?igsh=YzljYTk1ODg3Zg==",
      thumbnail: "https://res.cloudinary.com/drtmoxle9/image/upload/v1761048319/reel1_l8jzu2.jpg"
    },
    {
      id: 3,
      url: "https://www.instagram.com/reel/DOs1GBdDFHQ/?igsh=YzljYTk1ODg3Zg==",
      thumbnail: "https://res.cloudinary.com/drtmoxle9/image/upload/v1761048315/reel2_znsxf4.jpg"
    },
    {
      id: 4,
      url: "https://www.instagram.com/reel/DOqacooDE6u/?igsh=YzljYTk1ODg3Zg==",
      thumbnail: "https://res.cloudinary.com/drtmoxle9/image/upload/v1761048317/reel3_hnkk7y.jpg"
    },
    {
      id: 5,
      url: "https://www.instagram.com/reel/DOn6jQEjKYN/?igsh=YzljYTk1ODg3Zg==",
      thumbnail: "https://res.cloudinary.com/drtmoxle9/image/upload/v1761048318/reel6_uwwlbd.jpg"
    },
    {
      id: 6,
      url: "https://www.instagram.com/reel/DOiOs7LDBiD/?igsh=YzljYTk1ODg3Zg==",
      thumbnail: "https://res.cloudinary.com/drtmoxle9/image/upload/v1761048314/reel5_sykiqt.jpg"
    }
  ];

  // GSAP animations
  useEffect(() => {
    // Hero section animation
    const heroTimeline = gsap.timeline();
    heroTimeline
      .fromTo(
        '.hero-title',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
      )
      .fromTo(
        '.hero-subtitle',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      )
      .fromTo(
        '.hero-button',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.4'
      );

    // Featured products animation
    gsap.fromTo(
      '.featured-product',
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: featuredRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play none none none'
        }
      }
    );

    // Scroll-triggered animations
    gsap.fromTo(
      '.collection-image',
      { x: -50, opacity: 0 },
      { 
        x: 0, 
        opacity: 1, 
        duration: 1, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: collectionRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play none none none'
        }
      }
    );

    gsap.fromTo(
      '.collection-content',
      { x: 50, opacity: 0 },
      { 
        x: 0, 
        opacity: 1, 
        duration: 1, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: collectionRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play none none none'
        }
      }
    );

    gsap.fromTo(
      '.story-image',
      { scale: 0.9, opacity: 0 },
      { 
        scale: 1, 
        opacity: 1, 
        duration: 1, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: storyRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play none none none'
        }
      }
    );

    // Instagram posts animation
    gsap.fromTo(
      '.instagram-post',
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.6, 
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: instagramRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play none none none'
        }
      }
    );

    // Parallax effect
    gsap.to('.parallax-bg', {
      y: '30%',
      ease: 'none',
      scrollTrigger: {
        trigger: '.parallax-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  }, []);

  // Nudge autoplay on iOS/Safari and handle errors gracefully
  // Nudge autoplay on iOS/Safari and handle errors gracefully (hero + visit video)
useEffect(() => {
  const setup = (v) => {
    if (!v) return () => {};
    const tryPlay = () => {
      // some browsers need an explicit call after metadata loads
      v.play?.().catch(() => {});
    };
    v.muted = true; // ensure muted for autoplay policies
    tryPlay();
    v.addEventListener('loadeddata', tryPlay);
    return () => v.removeEventListener('loadeddata', tryPlay);
  };

  const cleanupHero = setup(videoRef.current);
  const cleanupVisit = setup(visitVideoRef.current);
  return () => {
    cleanupHero?.();
    cleanupVisit?.();
  };
}, []);


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          {/* The video itself */}
          <video
            ref={videoRef}
            src={heroVideo}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover"
            onError={(e) => {
              // eslint-disable-next-line no-console
              console.error('Hero video failed to load/play', e?.currentTarget?.error);
            }}
          >
            Your browser does not support the video tag.
          </video>

          {/* Dark scrim on top of video */}
          <div className="absolute inset-0 bg-black/50 z-10 pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="container-custom relative z-20 text-center">
          <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif text-light mb-6">
            Discover Your <span className="text-secondary">Signature</span> Scent
          </h1>
          <p className="hero-subtitle text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Luxury fragrances crafted with passion and precision for the discerning individual
          </p>
          <div className="hero-button">
            <Button to="/shop" variant="primary" size="lg" className="mx-auto">
              <span>Explore Collection</span>
              <FiArrowRight className="ml-2" />
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
         <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-40 animate-bounce">
          <div className="w-[30px] h-[50px] rounded-full border-2 border-secondary flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-secondary rounded-full animate-scroll"></div>
          </div>
        </div>

        {/* --- SVG Wave Divider (sway) --- */}
        {/* Make sure this color matches the next section background.
            If 'text-dark' doesn't exist in your theme, replace it with your hex, e.g. text-[#0b0b0b]. */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 w-full leading-none z-30 text-dark"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="block w-full h-[80px] md:h-[120px]"
          >
            <path
              d="M0,0 C150,100 350,0 600,0 C850,0 1050,100 1200,0 L1200,120 L0,120 Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </section>


       <PromoGrid />
       <PopularBrandWordmarks />
      {/* Featured Products Section */}
      <section ref={featuredRef} className="py-20 bg-dark">
        <div className="container-custom">
          <SectionTitle 
            title="Featured Fragrances" 
            subtitle="Discover our most coveted scents, crafted with the finest ingredients and designed to leave a lasting impression."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="featured-product">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button to="/shop" variant="outline">
              View All Products
            </Button>
          </div>
        </div>
      </section>


      {/* New Arrivals Section */}
{newProducts.length > 0 && (
  <section className="py-20 bg-dark/95">
    <div className="container-custom">
      <SectionTitle
        title="New Arrivals"
        subtitle="Fresh releases we’ve just unboxed — discover what’s new in store."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {newProducts.map((product) => (
          <div key={product.id} className="featured-product">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Button to="/shop?new=1&isNew=true" variant="outline">
          Browse All New Arrivals
        </Button>
      </div>
    </div>
  </section>
)}


      {/* Collection Highlight */}
      <section ref={collectionRef} className="py-20 bg-gradient-luxury">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="collection-image overflow-hidden rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                alt="Luxury Perfume Collection" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="collection-content">
              <h2 className="text-3xl md:text-4xl font-serif text-secondary mb-4">Limited Edition Collection</h2>
              <p className="text-gray-400 mb-6">
                Introducing our exclusive Limited Edition Collection, a celebration of rare ingredients and masterful craftsmanship. Each fragrance in this collection is produced in small batches, ensuring unparalleled quality and exclusivity.
              </p>
              <p className="text-gray-400 mb-8">
                Featuring notes of rare oud, precious florals, and exotic spices sourced from around the world, these fragrances are designed for those who appreciate the extraordinary.
              </p>
              <Button to="/shop?collection=limited" variant="primary">
                Explore Limited Edition
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Parallax Quote Section */}
      <section className="parallax-section relative py-32 overflow-hidden">
        <div className="parallax-bg absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80" 
            alt="Luxury Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
        
        <div className="container-custom relative z-10 text-center">
          <blockquote className="max-w-4xl mx-auto">
            <p className="text-2xl md:text-3xl lg:text-4xl font-serif text-light italic mb-6">
              "A fragrance is like a signature, so that even after a person has left the room, their fragrance remains."
            </p>
            <footer className="text-secondary text-xl">— Diana Vreeland</footer>
          </blockquote>
        </div>
      </section>

      {/* Our Story Section */}
      <section ref={storyRef} className="py-20 bg-dark">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <SectionTitle 
                title="Our Story" 
                subtitle="" 
                align="left"
                withLine={false}
              />
              <p className="text-gray-400 mb-6">
                EmrickScents was launched in 2025 with one simple belief: great perfumes should be accessible, genuine, and personal. Born out of a deep love for fragrance and the art behind scent-making, our store is dedicated to bringing you premium perfumes from trusted brands always 100% authentic and beautifully packaged.
<br /> <br />
We know how powerful scent can be the way a fragrance can evoke memories, enhance mood, and make an impression. That’s why at EmrickScents, we don’t settle for “just smells good.” Every perfume we stock is selected for its character, quality, and identity. We offer discovery sets so you can explore without committing, fast delivery to wherever is most convenient for you, and a return & store credit policy that puts your satisfaction first.
              </p>
              <p className="text-gray-400 mb-8">
                We are new, but we’re passionate. Our promise is to treat every customer like a friend: honest, thoughtful, and always here to help you find your signature scent.
              </p>
              <Button to="/about" variant="outline">
                Learn More About Us
              </Button>
            </div>
            <div className="order-1 lg:order-2 story-image">
              <img 
                src="/images/our-story.jpg" 
                alt="Our Story" 
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

     {/* Visit Our Store (video background) */}
<section className="relative py-24 overflow-hidden">
  {/* Video background */}
  <video
    ref={visitVideoRef}
    src={visitVideo}
    autoPlay
    loop
    muted
    playsInline
    preload="metadata"
    className="absolute inset-0 w-full h-full object-cover"
    // optional poster to avoid a black flash before video starts:
    // poster="/images/store-poster.jpg"
    onError={(e) => {
      // eslint-disable-next-line no-console
      console.error('Visit video failed to load/play', e?.currentTarget?.error);
    }}
  />

  {/* Dark overlay for contrast */}
  <div className="absolute inset-0 bg-black/50" />

  {/* Centered content */}
  <div className="container-custom relative z-10 text-center">
    <SectionTitle
      title="Visit Our Store"
      subtitle="Experience our luxury fragrances in person at our boutique in Ogudu Mall, Ojota."
    />
    <div className="max-w-md mx-auto">
      <p className="text-gray-200 mb-6">
        Our knowledgeable staff will guide you through our collections and help you
        discover the perfect scent that resonates with your personality.
      </p>
      <Button to="/store-locator" variant="primary">
        Find Our Store
      </Button>
    </div>
  </div>
</section>


{/* Store Benefits */}
<section className="relative my-20 md:my-24 lg:my-28 py-20 md:py-24 bg-dark">

  <div className="container-custom">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="flex items-start space-x-4 p-6 rounded-xl bg-black/40 border border-gray-800">
        <div className="shrink-0">
          <FiRefreshCw className="text-secondary" size={28} />
        </div>
        <div>
          <h3 className="text-light font-medium mb-1">Satisfied or Refunded</h3>
          <p className="text-gray-400 text-sm">
            Easy returns & store credit if it’s not a match. Shop with confidence.
          </p>
        </div>
      </div>

      <div className="flex items-start space-x-4 p-6 rounded-xl bg-black/40 border border-gray-800">
        <div className="shrink-0">
          <FiHeadphones className="text-secondary" size={28} />
        </div>
        <div>
          <h3 className="text-light font-medium mb-1">Top-Notch Support</h3>
          <p className="text-gray-400 text-sm">
            Fragrance guidance from real humans, quick, friendly, and expert.
          </p>
        </div>
      </div>

      <div className="flex items-start space-x-4 p-6 rounded-xl bg-black/40 border border-gray-800">
        <div className="shrink-0 flex">
          <FiShield className="text-secondary" size={28} />
          <FiMessageCircle className="text-secondary ml-2" size={24} />
        </div>
        <div>
          <h3 className="text-light font-medium mb-1">Secure Payments via WhatsApp</h3>
          <p className="text-gray-400 text-sm">
            Confirm your order and pay securely through WhatsApp checkout.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>



      {/* Instagram Gallery */}
      <section ref={instagramRef} className="py-20 bg-dark">
        <div className="container-custom">
          <SectionTitle 
            title="Follow Our Journey" 
            subtitle="Join us on Instagram for behind-the-scenes content, fragrance inspiration, and more."
          />
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {instagramReels.map((reel) => (
              <a 
                key={reel.id}
                href={reel.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="instagram-post block overflow-hidden rounded-lg group relative"
              >
                <img 
                  src={reel.thumbnail}
                  alt="Instagram Reel" 
                  className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                  <FiInstagram 
                    size={32} 
                    className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                  />
                </div>
              </a>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <a 
              href="https://www.instagram.com/emrickscents?igsh=YzljYTk1ODg3Zg==" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-secondary hover:text-secondary-dark transition-colors"
            >
              <span>Follow us @emrickscents</span>
              <FiArrowRight className="ml-2" />
            </a>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
