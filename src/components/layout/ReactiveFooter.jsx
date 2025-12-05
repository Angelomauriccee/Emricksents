import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiInstagram, FiFacebook } from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useFilter } from "../../context/FilterContext";
import ReturnPolicyPopup from "../ui/ReturnPolicyPopup";
import logoImage from "../../assets/logo.png";
import FooterSnowCap from "../season/FooterSnowCap";

gsap.registerPlugin(ScrollTrigger);

const ReactiveFooter = () => {
  const [isReturnPolicyOpen, setIsReturnPolicyOpen] = useState(false);
  const { applyFilters } = useFilter();
  const navigate = useNavigate();

  useEffect(() => {
    // GSAP animation for footer
    gsap.fromTo(
      ".footer-content",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".footer",
          start: "top bottom-=100",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  // Handle collection link click
  const handleCollectionClick = (collection) => {
    applyFilters("collection", collection);
    // Use navigate to ensure proper SPA navigation
    navigate("/shop");
  };

  // Handle new arrivals click
  const handleNewArrivalsClick = () => {
    applyFilters("isNew", true);
    // Use navigate to ensure proper SPA navigation
    navigate("/shop");
  };

  return (
    <footer className="footer bg-dark pt-16 pb-8">
      <div className="container-custom footer-content">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div>
            <Link to="/">
              <img
                src={logoImage}
                alt="EmerickScents Logo"
                className="h-12 mb-4"
              />
            </Link>
            <p className="text-gray-400 mb-6">
              Emrickscents is a luxury perfume boutique offering a curated
              selection of rare, artisanal, and designer fragrances. Known for
              elegance and sophistication, the brand provides personalized
              consultations and cruelty-free, high-quality perfumes crafted with
              sustainably sourced ingredients. Emrickscents turns fragrance into
              a refined, sensory art form tailored to each individual.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/emrickscents?igsh=YzljYTk1ODg3Zg=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-secondary transition-colors"
                aria-label="Instagram"
              >
                <FiInstagram size={20} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-secondary transition-colors"
                aria-label="Facebook"
              >
                <FiFacebook size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-serif text-light mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/shop"
                  className="text-gray-400 hover:text-secondary transition-colors"
                >
                  Shop All Brands
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-secondary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/store-locator"
                  className="text-gray-400 hover:text-secondary transition-colors"
                >
                  Store Locator
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-secondary transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Collections */}
          <div>
            <h3 className="text-xl font-serif text-light mb-4">Collections</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => handleCollectionClick("signature")}
                  className="text-gray-400 hover:text-secondary transition-colors text-left"
                >
                  Signature Collection
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCollectionClick("limited")}
                  className="text-gray-400 hover:text-secondary transition-colors text-left"
                >
                  Limited Edition
                </button>
              </li>
              <li>
                <button
                  onClick={handleNewArrivalsClick}
                  className="text-gray-400 hover:text-secondary transition-colors text-left"
                >
                  New
                </button>
              </li>
            </ul>
          </div>

          {/* Store Hours */}
          <div>
            <h3 className="text-xl font-serif text-light mb-4">Store Hours</h3>
            <ul className="space-y-3">
              <li className="text-gray-400">Monday - Saturday: 10am - 8pm</li>
              <li className="text-gray-400">Sunday: 2pm - 7pm</li>
              <li className="text-gray-400 mt-4">
                <strong className="text-secondary">Location:</strong>
                <br />
                Ogudu Mall, Ojota
                <br />
                Lagos, Nigeria
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Emrickscents. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            {/* Only Return & Store Credit Policy */}
            <button
              onClick={() => setIsReturnPolicyOpen(true)}
              className="hover:text-secondary transition-colors cursor-pointer"
            >
              Return & Store Credit Policy
            </button>
          </div>
        </div>
      </div>

      {/* Return Policy Popup */}
      <ReturnPolicyPopup
        isOpen={isReturnPolicyOpen}
        onClose={() => setIsReturnPolicyOpen(false)}
      />
    </footer>
  );
};

export default ReactiveFooter;
