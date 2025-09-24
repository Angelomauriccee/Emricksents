import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import Button from './Button';

const ReturnPolicyPopup = ({ isOpen, onClose }) => {
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="max-w-2xl mx-auto bg-dark border border-gray-800 rounded-lg shadow-2xl overflow-hidden max-h-[80vh]"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative p-6 md:p-8">
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-secondary transition-colors z-10"
                aria-label="Close"
              >
                <FiX size={24} />
              </button>
              
              <motion.div variants={childVariants}>
                <h3 className="text-2xl font-serif text-secondary mb-4">
                  Emrick's Perfume Return & Store Credit Policy
                </h3>
                
                <div className="text-gray-300 space-y-4 mb-6 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                  <p>
                    At Emrick's Perfume, customer satisfaction is our priority. While we do not offer refunds, we provide store credit for eligible returns under specific conditions. 
                    Kindly read our return and store credit policy carefully.
                  </p>
                  
                  <div>
                    <h4 className="text-secondary font-medium mb-2">1. Eligibility for Returns & Store Credit</h4>
                    <p>Customers may request a return under the following conditions:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Wrong Item Received: If you receive a different fragrance from what you ordered.</li>
                      <li>Damaged Product: If the perfume bottle arrives broken or leaking.</li>
                      <li>Defective Spray Mechanism: If the nozzle or atomizer is faulty and prevents proper spraying.</li>
                    </ul>
                    
                    <p className="mt-2">Conditions for Returns:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>The item must be unused, unopened, and in its original packaging for non-defective items.</li>
                      <li>The request must be made within 24 hours of purchase.</li>
                      <li>Immediate proof (clear photos and videos) must be provided upon receiving the order from the dispatch.</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-secondary font-medium mb-2">2. Non-Returnable Items</h4>
                    <p>We do not accept returns or provide store credit for the following:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Opened or used perfumes (for hygiene and authenticity reasons).</li>
                      <li>Items purchased on sale or during promotional offers.</li>
                      <li>Personalized or customized orders.</li>
                      <li>Requests made after 24 hours of purchase.</li>
                      <li>Returns due to allergic reactions, personal scent preferences, or gift-related dissatisfaction.</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-secondary font-medium mb-2">3. Return & Store Credit Process</h4>
                    <p>Step 1: Submit a return request via WhatsApp within 24 hours of receiving your order. Include clear photos and videos as proof.</p>
                    <p>Step 2: Our team will review your request and respond within 24 hours with further instructions.</p>
                    <p>Step 3: If approved, you will need to send the item back to our store. Upon receipt and verification, we will issue a store credit of equal value, valid for 14 working days.</p>
                  </div>
                  
                  <div>
                    <h4 className="text-secondary font-medium mb-2">4. Shipping Costs & Responsibility</h4>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>If the return is due to our error (damaged, defective, or incorrect product), we cover the return shipping cost.</li>
                      <li>If the return is due to customer preference or any non-qualifying reason, you are responsible for the return shipping cost.</li>
                    </ul>
                  </div>
                  
                  <p className="mt-4">
                    For any return-related inquiries, please contact us via{' '}
                    <a 
                      href="https://wa.me/2349065988598" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-secondary hover:underline"
                    >
                      +234 906 598 8598
                    </a>{' '}
                    for prompt assistance.
                  </p>
                  <p>Thank you for choosing Emrick's Perfume!</p>
                </div>
                
                <div className="flex justify-end mt-4">
                  <Button 
                    onClick={onClose}
                    variant="secondary"
                    size="sm"
                  >
                    Close
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ReturnPolicyPopup;