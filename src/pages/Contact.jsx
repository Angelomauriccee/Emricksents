import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiPhone, FiMail, FiClock, FiSend } from 'react-icons/fi';
import { FaWhatsapp, FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import SectionTitle from '../components/ui/SectionTitle';
import Button from '../components/ui/Button';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState(null);
  
  const mapRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In a real app, this would send the form data to info@emrickscents.com
    // For now, we'll just simulate a successful submission
    console.log("Sending email to info@emrickscents.com with data:", formData);
    setFormStatus('success');
    
    // Reset form after successful submission
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setFormStatus(null);
    }, 5000);
  };

  // Handle WhatsApp contact
  const handleWhatsAppContact = () => {
    const message = encodeURIComponent('Hello, I would like to know more about Emrickscents products.');
    window.open(`https://wa.me/2349065988598?text=${message}`, '_blank');
  };

  // GSAP animations
  useEffect(() => {
    // Map animation
    gsap.fromTo(
      mapRef.current,
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: mapRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play none none none'
        }
      }
    );

    // Form animation
    gsap.fromTo(
      formRef.current,
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play none none none'
        }
      }
    );

    // Info animation
    gsap.fromTo(
      infoRef.current,
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: infoRef.current,
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
            src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80" 
            alt="Contact Us" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container-custom relative z-20 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-light mb-6">
            Contact <span className="text-secondary">Us</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We'd love to hear from you. Reach out to us with any questions, feedback, or inquiries.
          </p>
        </div>
      </section>

      {/* Map Section */}
      <section ref={mapRef} className="py-20 bg-dark">
        <div className="container-custom">
          <div className="bg-gray-900 rounded-lg overflow-hidden h-[400px]">
            {/* Updated Google Maps iframe to specifically point to Ogudu Mall */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.8524543349096!2d3.3792553!3d6.5773587!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8d73a658782b%3A0x7a1de11d89cccc84!2sOgudu%20Mall!5e0!3m2!1sen!2sus!4v1694270284517!5m2!1sen!2sus" 
               referrerPolicy="no-referrer-when-downgrade"
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy"
              title="Emrickscents Location"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-20 bg-primary">
        <div className="container-custom">
          <SectionTitle 
            title="Get in Touch" 
            subtitle="We're here to answer any questions you may have about our products or services"
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div ref={formRef} className="lg:col-span-2">
              <div className="bg-dark rounded-lg p-8">
                <h3 className="text-2xl font-serif text-light mb-6">Send Us a Message</h3>
                
                {formStatus === 'success' && (
                  <div className="bg-green-900 bg-opacity-20 border border-green-700 text-green-400 rounded-md p-4 mb-6">
                    Thank you for your message! We'll get back to you shortly.
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-gray-400 mb-2">Your Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-gray-900 border border-gray-800 rounded-md px-4 py-3 text-light focus:outline-none focus:border-secondary transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-gray-400 mb-2">Your Email</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-gray-900 border border-gray-800 rounded-md px-4 py-3 text-light focus:outline-none focus:border-secondary transition-colors"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="subject" className="block text-gray-400 mb-2">Subject</label>
                    <input 
                      type="text" 
                      id="subject" 
                      name="subject" 
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-gray-900 border border-gray-800 rounded-md px-4 py-3 text-light focus:outline-none focus:border-secondary transition-colors"
                      required
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-gray-400 mb-2">Your Message</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows="6" 
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full bg-gray-900 border border-gray-800 rounded-md px-4 py-3 text-light focus:outline-none focus:border-secondary transition-colors"
                      required
                    ></textarea>
                  </div>
                  
                  <Button 
                    type="submit" 
                    variant="primary" 
                    className="flex items-center"
                  >
                    <FiSend className="mr-2" />
                    <span>Send Message</span>
                  </Button>
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <div ref={infoRef} className="lg:col-span-1">
              <div className="bg-dark rounded-lg p-8 h-full">
                <h3 className="text-2xl font-serif text-light mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-gray-900 p-3 rounded-md mr-4">
                      <FiMapPin className="text-secondary" size={24} />
                    </div>
                    <div>
                      <h4 className="text-light font-medium mb-1">Our Location</h4>
                      <p className="text-gray-400">
                        Emrickscents<br />
                        Ogudu Mall, Ojota<br />
                        Lagos, Nigeria
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-gray-900 p-3 rounded-md mr-4">
                      <FiPhone className="text-secondary" size={24} />
                    </div>
                    <div>
                      <h4 className="text-light font-medium mb-1">Phone Number</h4>
                      <p className="text-gray-400">+234 906 598 8598</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-gray-900 p-3 rounded-md mr-4">
                      <FiMail className="text-secondary" size={24} />
                    </div>
                    <div>
                      <h4 className="text-light font-medium mb-1">Email Address</h4>
                      <p className="text-gray-400">info@emrickscents.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-gray-900 p-3 rounded-md mr-4">
                      <FiClock className="text-secondary" size={24} />
                    </div>
                    <div>
                      <h4 className="text-light font-medium mb-1">Opening Hours</h4>
                      <p className="text-gray-400">
                        Monday - Saturday: 10am - 8pm<br />
                        Sunday: 2pm - 7pm
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-800">
                  <h4 className="text-light font-medium mb-4">Connect With Us</h4>
                  <div className="flex space-x-4">
                    <a 
                      href="https://instagram.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-gray-900 w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-secondary transition-colors"
                      aria-label="Instagram"
                    >
                      <FaInstagram size={20} />
                    </a>
                    <a 
                      href="https://facebook.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-gray-900 w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-secondary transition-colors"
                      aria-label="Facebook"
                    >
                      <FaFacebook size={20} />
                    </a>
                    <a 
                      href="https://twitter.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-gray-900 w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-secondary transition-colors"
                      aria-label="Twitter"
                    >
                      <FaTwitter size={20} />
                    </a>
                    <a 
                      href="https://wa.me/2349065988598" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-900 w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-secondary transition-colors"
                      aria-label="WhatsApp"
                    >
                      <FaWhatsapp size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-dark">
        <div className="container-custom">
          <SectionTitle 
            title="Frequently Asked Questions (FAQ) – EmrickScents" 
            subtitle="Find answers to common questions about our products and services"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "What do I do if an item is damaged?",
                answer: "If your order arrives damaged (e.g., broken bottle or faulty spray), please contact us immediately within 24 hours with clear photos/videos. We'll review your request and assist you. For full details, kindly check our Return & Store Credit Policy."
              },
              {
                question: "Can my package be delivered to an office address?",
                answer: "Yes! Your package can be delivered to any address that suits you. Simply enter your preferred delivery address (home, office, etc.) when placing your order."
              },
              {
                question: "If I return an item, will I receive my refund or exchange?",
                answer: "We do not offer refunds, but eligible returns may receive store credit, valid for 14 working days. Please review our Return & Store Credit Policy for conditions and step-by-step instructions."
              },
              {
                question: "Are all products on EmrickScents original and genuine?",
                answer: "Absolutely! We only offer 100% genuine and original perfumes, sourced directly from trusted brands and suppliers."
              },
              {
                question: "Can I sample your fragrances before purchasing a full bottle?",
                answer: "Yes! We offer a discovery set that includes samples of our most popular fragrances — a perfect way to explore and find your signature scent before committing to a full-size bottle."
              },
              {
                question: "Are your products cruelty-free?",
                answer: "Yes, all Emrickscents products are cruelty-free. We do not test on animals, nor do we work with suppliers who test on animals. We are committed to ethical and sustainable practices."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-900 rounded-lg p-6">
                <h4 className="text-xl font-serif text-secondary mb-3">{faq.question}</h4>
                <p className="text-gray-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp CTA Section */}
      <section className="py-20 bg-gradient-luxury">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-light mb-6">Need Immediate Assistance?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Connect with us on WhatsApp for quick responses to your questions about our products, orders, or anything else you need help with.
          </p>
          <Button 
            variant="primary" 
            size="lg" 
            className="flex items-center mx-auto"
            href="https://wa.me/2349065988598"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp className="mr-2" size={20} />
            <span>Chat with Us on WhatsApp</span>
          </Button>
        </div>
      </section>
    </motion.div>
  );
};

export default Contact;