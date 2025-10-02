import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiPhone, FiClock } from 'react-icons/fi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import SectionTitle from '../components/ui/SectionTitle';
import Button from '../components/ui/Button';
import VideoBackground from '../components/ui/VideoBackground';

gsap.registerPlugin(ScrollTrigger);

const StoreLocator = () => {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  
  const mapRef = useRef(null);
  const storeInfoRef = useRef(null);

  // Store data - with specific coordinates for Ogudu Mall
  const store = {
    id: 1,
    name: 'Emrickscents',
    address: 'Ogudu Mall, Ojota, Lagos',
    country: 'Nigeria',
    phone: '+234 906 598 8598',
    hours: 'Mon-Sat: 10:00 AM - 8:00 PM, Sun: 12:00 PM - 6:00 PM',
    coordinates: { lat: 6.577359, lng: 3.379255 }, // Specific coordinates for Ogudu Mall
    image: '/images/store-interior.jpg'
  };

  // GSAP animations
  useEffect(() => {
    // Map animation
    gsap.fromTo(
      mapRef.current,
      { opacity: 0, scale: 0.95 },
      { 
        opacity: 1, 
        scale: 1, 
        duration: 0.8, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: mapRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play none none none'
        }
      }
    );

    // Store info animation
    gsap.fromTo(
      storeInfoRef.current,
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: storeInfoRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play none none none'
        }
      }
    );
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-primary"
    >
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black bg-opacity-60 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80" 
            alt="Store Locator" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container-custom relative z-20 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-light mb-6">
            Visit Our <span className="text-secondary">Store</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience our luxury fragrances in person at our boutique in Ogudu Mall, Ojota.
          </p>
        </div>
      </section>

      {/* Store Locator Section */}
      <section className="py-20 bg-dark">
        <div className="container-custom">
          <SectionTitle 
            title="Our Location" 
            subtitle="Visit our boutique to experience our fragrances in person"
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Store Info */}
            <div ref={storeInfoRef} className="lg:col-span-1">
              <div className="bg-gray-900 rounded-lg overflow-hidden">
                <div className="aspect-[16/9] overflow-hidden">
                  <img 
                    src={store.image} 
                    alt={store.name} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif text-light mb-4">{store.name}</h3>
                  
                  <div className="flex items-start mb-4">
                    <FiMapPin className="text-secondary mt-1 mr-3" />
                    <div>
                      <p className="text-gray-300">{store.address}</p>
                      <p className="text-secondary text-sm mt-1">{store.country}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start mb-4">
                    <FiPhone className="text-secondary mt-1 mr-3" />
                    <p className="text-gray-300">{store.phone}</p>
                  </div>
                  
                  <div className="flex items-start mb-6">
                    <FiClock className="text-secondary mt-1 mr-3" />
                    <p className="text-gray-300">{store.hours}</p>
                  </div>
                  
                  <Button 
                    variant="primary" 
                    href={`https://www.google.com/maps/search/?api=1&query=Ogudu+Mall+Ojota+Lagos+Nigeria`}
                    className="w-full"
                  >
                    Get Directions
                  </Button>
                </div>
              </div>
            </div>

            {/* Map */}
            <div ref={mapRef} className="lg:col-span-2">
              <div className="bg-gray-900 rounded-lg overflow-hidden h-[500px] relative">
                {!isMapLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                    <div className="text-center">
                      <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-gray-400">Loading map...</p>
                    </div>
                  </div>
                )}
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.8524543349096!2d3.3792553!3d6.5773587!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8d73a658782b%3A0x7a1de11d89cccc84!2sOgudu%20Mall!5e0!3m2!1sen!2sus!4v1694270284517!5m2!1sen!2sus" 
                   referrerPolicy="no-referrer-when-downgrade"
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy"
                  title="Emrickscents Store Location"
                  onLoad={() => setIsMapLoaded(true)}
                  className={isMapLoaded ? "opacity-100" : "opacity-0"}
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* In-Store Experience Section */}
      <section className="py-20 bg-gradient-luxury">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif text-light mb-6">The In-Store Experience</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Visit our Emrickscents boutique at Ogudu Mall to immerse yourself in the world of luxury fragrance. Our knowledgeable staff will guide you through our collections, helping you discover the perfect scent that resonates with your personality and preferences.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Our boutique offers complimentary fragrance consultations, where our experts will help you explore different notes and find your signature scent. Experience our fragrances in an elegant setting designed to engage all your senses.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Personalized fragrance consultations',
                  'Exclusive in-store collections',
                  'Gift wrapping services',
                  'Fragrance profiling',
                  'Refill services for select collections'
                ].map((service, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-secondary rounded-full mr-3"></span>
                    <span className="text-gray-300">{service}</span>
                  </li>
                ))}
              </ul>
              <Button to="/contact" variant="primary">
                Contact Us
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src="/images/store-interior.jpg" 
                    alt="Store Interior" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src="/images/our-story.jpg" 
                    alt="Perfume Display" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1594035910387-fea47794261f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                    alt="Fragrance Consultation" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1592914610354-fd354ea45e48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                    alt="Luxury Packaging" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
{/* CTA Section */}
         <section className="py-20 bg-dark">
           <div className="container-custom">
             <VideoBackground
               videoSrc="https://cdn.pixabay.com/video/2020/04/17/36356-410742856_large.mp4"
               posterSrc="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80"
               overlayOpacity={0.5}
               className="rounded-lg py-20"
             >
               <div className="text-center px-4">
                 <h2 className="text-3xl md:text-4xl font-serif text-light mb-6">Can't Visit Us In Person?</h2>
                 <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                   Explore our online store to shop our complete collection from anywhere in the world, or contact us for personalized recommendations.
                 </p>
                 <div className="flex flex-col sm:flex-row justify-center gap-4">
                   <Button to="/shop" variant="primary">
                     Shop Online
                   </Button>
                   <Button to="/contact" variant="outline">
                     Contact Us
                   </Button>
                 </div>
               </div>
             </VideoBackground>
           </div>
         </section>
       </motion.div>
     );
   };
   
   export default StoreLocator;