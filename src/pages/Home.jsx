import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiInstagram } from 'react-icons/fi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import SectionTitle from '../components/ui/SectionTitle';
import Button from '../components/ui/Button';
import ProductCard from '../components/product/EnhancedProductCard';
import products from '../data/products';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const featuredRef = useRef(null);
  const collectionRef = useRef(null);
  const storyRef = useRef(null);
  const instagramRef = useRef(null);

  // Featured products
  const featuredProducts = products.filter(product => product.featured).slice(0, 4);

  // Instagram reels
  const instagramReels = [
    {
      id: 1,
      url: "https://www.instagram.com/reel/DO7xky6DF4i/?igsh=YzljYTk1ODg3Zg==",
      thumbnail: "https://source.unsplash.com/random/600x600?perfume,luxury&sig=1"
    },
    {
      id: 2,
      url: "https://www.instagram.com/reel/DOxhyh6jLkj/?igsh=YzljYTk1ODg3Zg==",
      thumbnail: "https://source.unsplash.com/random/600x600?perfume,bottle&sig=2"
    },
    {
      id: 3,
      url: "https://www.instagram.com/reel/DOs1GBdDFHQ/?igsh=YzljYTk1ODg3Zg==",
      thumbnail: "https://source.unsplash.com/random/600x600?perfume,scent&sig=3"
    },
    {
      id: 4,
      url: "https://www.instagram.com/reel/DOqacooDE6u/?igsh=YzljYTk1ODg3Zg==",
      thumbnail: "https://source.unsplash.com/random/600x600?perfume,fragrance&sig=4"
    },
    {
      id: 5,
      url: "https://www.instagram.com/reel/DOn6jQEjKYN/?igsh=YzljYTk1ODg3Zg==",
      thumbnail: "https://source.unsplash.com/random/600x600?perfume,luxury&sig=5"
    },
    {
      id: 6,
      url: "https://www.instagram.com/reel/DOiOs7LDBiD/?igsh=YzljYTk1ODg3Zg==",
      thumbnail: "https://source.unsplash.com/random/600x600?perfume,bottle&sig=6"
    }
  ];

  // GSAP animations
  useEffect(() => {
    // Hero section animation
    const heroTimeline = gsap.timeline();
    
    heroTimeline.fromTo(
      '.hero-title',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
    ).fromTo(
      '.hero-subtitle',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.6'
    ).fromTo(
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
          <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
          <video 
            ref={videoRef}
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="https://player.vimeo.com/external/373797931.hd.mp4?s=07c2d7d3f68f2564c7bb6cf1ff9effcf0f956a19&profile_id=175&oauth2_token_id=57447761" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
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
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <div className="w-[30px] h-[50px] rounded-full border-2 border-secondary flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-secondary rounded-full animate-scroll"></div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section ref={featuredRef} className="py-20 bg-dark">
        <div className="container-custom">
          <SectionTitle 
            title="Featured Fragrances" 
            subtitle="Discover our most coveted scents, crafted with the finest ingredients and designed to leave a lasting impression."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
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
                Founded in 2020, Emrickscents was born from a passion for artisanal perfumery and a desire to create fragrances that tell a story. Our founder, Emma Emrick, traveled the world studying under master perfumers before establishing our atelier in the heart of Paris.
              </p>
              <p className="text-gray-400 mb-8">
                Each Emrickscents fragrance is crafted with meticulous attention to detail, using only the finest ingredients sourced from sustainable producers around the globe. We believe in creating scents that not only smell exquisite but also evoke emotions and memories.
              </p>
              <Button to="/about" variant="outline">
                Learn More About Us
              </Button>
            </div>
            <div className="order-1 lg:order-2 story-image">
              <img 
                src="https://images.unsplash.com/photo-1615368144592-40f22d93cd3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                alt="Our Story" 
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Visit Our Store Section */}
      <section className="py-20 bg-gradient-luxury">
        <div className="container-custom text-center">
          <SectionTitle 
            title="Visit Our Store" 
            subtitle="Experience our luxury fragrances in person at our boutique in Ogudu Mall, Ojota."
          />
          
          <div className="max-w-md mx-auto">
            <p className="text-gray-300 mb-6">
              Our knowledgeable staff will guide you through our collections and help you discover the perfect scent that resonates with your personality.
            </p>
            <Button to="/store-locator" variant="primary">
              Find Our Store
            </Button>
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