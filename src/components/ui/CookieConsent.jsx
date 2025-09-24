// src/components/ui/CookieConsent.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCheck, FiSettings } from 'react-icons/fi';
import { GiCookie } from 'react-icons/gi';
import Button from './Button';

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [cookiePreferences, setCookiePreferences] = useState({
    essential: true, // Always required
    functional: false,
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    // Check if cookie consent exists
    const cookieConsent = localStorage.getItem('emrickscents_cookie_consent');
    
    if (!cookieConsent) {
      // Show consent banner after a delay
      const timer = setTimeout(() => {
        setShowConsent(true);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      // Load saved preferences
      try {
        const savedPreferences = JSON.parse(cookieConsent);
        if (savedPreferences && typeof savedPreferences === 'object') {
          setCookiePreferences({
            ...cookiePreferences,
            ...savedPreferences
          });
        }
      } catch (error) {
        console.error('Error parsing cookie preferences:', error);
        // If there's an error, reset the consent
        localStorage.removeItem('emrickscents_cookie_consent');
        setShowConsent(true);
      }
    }
  }, []);

  // Apply cookie settings based on preferences
  useEffect(() => {
    // Only apply if user has made a choice (consent banner has been shown and dismissed)
    const hasConsented = localStorage.getItem('emrickscents_cookie_consent');
    if (hasConsented) {
      // Apply essential cookies (always enabled)
      applyEssentialCookies();
      
      // Apply other cookie types based on preferences
      if (cookiePreferences.functional) applyFunctionalCookies();
      if (cookiePreferences.analytics) applyAnalyticsCookies();
      if (cookiePreferences.marketing) applyMarketingCookies();
    }
  }, [cookiePreferences]);

  // Cookie application functions
  const applyEssentialCookies = () => {
    // Essential cookies for site functionality
    document.cookie = "essential_cookies=enabled; max-age=31536000; path=/; SameSite=Lax";
  };

  const applyFunctionalCookies = () => {
    // Functional cookies for remembering user preferences
    document.cookie = "functional_cookies=enabled; max-age=31536000; path=/; SameSite=Lax";
  };

  const applyAnalyticsCookies = () => {
    // Analytics cookies for tracking user behavior
    document.cookie = "analytics_cookies=enabled; max-age=31536000; path=/; SameSite=Lax";
    
    // Simulate analytics initialization
    window.analyticsEnabled = true;
  };

  const applyMarketingCookies = () => {
    // Marketing cookies for personalized ads
    document.cookie = "marketing_cookies=enabled; max-age=31536000; path=/; SameSite=Lax";
  };

  const handleTogglePreference = (type) => {
    setCookiePreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleAcceptAll = () => {
    const allEnabled = {
      essential: true,
      functional: true,
      analytics: true,
      marketing: true
    };
    
    setCookiePreferences(allEnabled);
    localStorage.setItem('emrickscents_cookie_consent', JSON.stringify(allEnabled));
    setShowConsent(false);
  };

  const handleEssentialOnly = () => {
    const essentialOnly = {
      essential: true,
      functional: false,
      analytics: false,
      marketing: false
    };
    
    setCookiePreferences(essentialOnly);
    localStorage.setItem('emrickscents_cookie_consent', JSON.stringify(essentialOnly));
    setShowConsent(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('emrickscents_cookie_consent', JSON.stringify(cookiePreferences));
    setShowConsent(false);
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    },
    exit: { 
      opacity: 0, 
      y: 50,
      transition: { 
        duration: 0.5, 
        ease: "easeIn" 
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const detailsVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: "auto",
      transition: { duration: 0.5 }
    },
    exit: { 
      opacity: 0, 
      height: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <AnimatePresence>
      {showConsent && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="max-w-4xl mx-auto bg-dark border border-gray-800 rounded-lg shadow-2xl overflow-hidden">
            <div className="relative p-6 md:p-8">
              <button 
                onClick={() => setShowConsent(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-secondary transition-colors"
                aria-label="Close"
              >
                <FiX size={24} />
              </button>
              
              <div className="flex flex-col md:flex-row items-start gap-6">
                <motion.div 
                  variants={childVariants}
                  className="hidden md:flex items-center justify-center w-16 h-16 bg-gray-900 rounded-full flex-shrink-0"
                >
                  <GiCookie className="text-secondary" size={28} />
                </motion.div>
                
                <div className="flex-grow">
                  <motion.h3 
                    variants={childVariants}
                    className="text-2xl font-serif text-secondary mb-3"
                  >
                    Enhance Your Experience
                  </motion.h3>
                  
                  <motion.p 
                    variants={childVariants}
                    className="text-gray-300 mb-4"
                  >
                    We use cookies to elevate your browsing experience, personalize content, and analyze our traffic. Your privacy matters to us at Emrickscents.
                  </motion.p>
                  
                  <motion.button
                    variants={childVariants}
                    onClick={toggleDetails}
                    className="text-secondary hover:underline mb-4 inline-flex items-center"
                  >
                    <FiSettings className="mr-2" />
                    {showDetails ? 'Hide cookie settings' : 'Customize cookie settings'}
                  </motion.button>
                  
                  <AnimatePresence>
                    {showDetails && (
                      <motion.div
                        variants={detailsVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="mb-6 bg-gray-900 p-4 rounded-md"
                      >
                        <h4 className="text-light font-medium mb-4">Cookie preferences:</h4>
                        <ul className="space-y-4">
                          <li className="flex items-center justify-between">
                            <div>
                              <p className="text-secondary font-medium">Essential Cookies</p>
                              <p className="text-sm text-gray-400">Required for the website to function properly.</p>
                            </div>
                            <div className="relative">
                              <input 
                                type="checkbox" 
                                checked={cookiePreferences.essential} 
                                disabled={true}
                                className="sr-only"
                              />
                              <div className="w-10 h-5 bg-secondary rounded-full shadow-inner"></div>
                              <div className="dot absolute w-3 h-3 bg-white rounded-full transition left-1 top-1"></div>
                            </div>
                          </li>
                          
                          <li className="flex items-center justify-between">
                            <div>
                              <p className="text-secondary font-medium">Functional Cookies</p>
                              <p className="text-sm text-gray-400">Remember your preferences and settings.</p>
                            </div>
                            <div 
                              className="relative cursor-pointer"
                              onClick={() => handleTogglePreference('functional')}
                            >
                              <input 
                                type="checkbox" 
                                checked={cookiePreferences.functional} 
                                readOnly
                                className="sr-only"
                              />
                              <div className={`w-10 h-5 ${cookiePreferences.functional ? 'bg-secondary' : 'bg-gray-600'} rounded-full shadow-inner transition-colors`}></div>
                              <div className={`dot absolute w-3 h-3 bg-white rounded-full transition ${cookiePreferences.functional ? 'left-6' : 'left-1'} top-1`}></div>
                            </div>
                          </li>
                          
                          <li className="flex items-center justify-between">
                            <div>
                              <p className="text-secondary font-medium">Analytics Cookies</p>
                              <p className="text-sm text-gray-400">Help us understand how you use our website.</p>
                            </div>
                            <div 
                              className="relative cursor-pointer"
                              onClick={() => handleTogglePreference('analytics')}
                            >
                              <input 
                                type="checkbox" 
                                checked={cookiePreferences.analytics} 
                                readOnly
                                className="sr-only"
                              />
                              <div className={`w-10 h-5 ${cookiePreferences.analytics ? 'bg-secondary' : 'bg-gray-600'} rounded-full shadow-inner transition-colors`}></div>
                              <div className={`dot absolute w-3 h-3 bg-white rounded-full transition ${cookiePreferences.analytics ? 'left-6' : 'left-1'} top-1`}></div>
                            </div>
                          </li>
                          
                          <li className="flex items-center justify-between">
                            <div>
                              <p className="text-secondary font-medium">Marketing Cookies</p>
                              <p className="text-sm text-gray-400">Allow us to provide personalized content.</p>
                            </div>
                            <div 
                              className="relative cursor-pointer"
                              onClick={() => handleTogglePreference('marketing')}
                            >
                              <input 
                                type="checkbox" 
                                checked={cookiePreferences.marketing} 
                                readOnly
                                className="sr-only"
                              />
                              <div className={`w-10 h-5 ${cookiePreferences.marketing ? 'bg-secondary' : 'bg-gray-600'} rounded-full shadow-inner transition-colors`}></div>
                              <div className={`dot absolute w-3 h-3 bg-white rounded-full transition ${cookiePreferences.marketing ? 'left-6' : 'left-1'} top-1`}></div>
                            </div>
                          </li>
                        </ul>
                        
                        <div className="mt-4 flex justify-end">
                          <Button 
                            onClick={handleSavePreferences}
                            variant="secondary"
                            size="sm"
                          >
                            Save Preferences
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <motion.div 
                    variants={childVariants}
                    className="flex flex-col sm:flex-row gap-3"
                  >
                    <Button 
                      onClick={handleAcceptAll}
                      variant="primary"
                      className="flex items-center justify-center"
                    >
                      <FiCheck className="mr-2" />
                      Accept All Cookies
                    </Button>
                    
                    <Button 
                      onClick={handleEssentialOnly}
                      variant="outline"
                    >
                      Essential Cookies Only
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;