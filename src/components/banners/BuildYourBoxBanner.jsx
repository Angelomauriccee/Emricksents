import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const BuildYourBoxBanner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="container-custom py-6 md:py-12"
    >
      <div className="bg-gradient-to-r from-[#2a0a0a] to-[#1a0808] rounded-2xl overflow-hidden border border-amber-500/20 flex flex-col md:flex-row items-center relative">
        {/* Decorative corner ribbons */}
        <div className="absolute -top-3 -left-3 w-12 h-12">
          <div className="w-full h-full bg-gradient-to-br from-rose-500 to-amber-500 rounded-full opacity-20 blur-sm"></div>
        </div>
        <div className="absolute -bottom-3 -right-3 w-12 h-12">
          <div className="w-full h-full bg-gradient-to-tl from-amber-500 to-rose-500 rounded-full opacity-20 blur-sm"></div>
        </div>

        {/* Content */}
        <div className="md:w-1/2 p-6 md:p-10 z-10">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-serif font-bold text-white mb-4"
          >
            Craft Your{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-amber-400">
              Valentine's Box
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-gray-300 mb-6 text-lg"
          >
            Curate a bespoke fragrance experience. Select 4+ scents to create a
            personalized luxury gift with complimentary ribbon wrapping.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link
              to="/build-your-box"
              className="inline-flex items-center bg-gradient-to-r from-rose-500 to-amber-500 text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity shadow-lg hover:shadow-amber-500/30 group"
            >
              <span>Build Your Box Now</span>
              <svg
                className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
            <p className="text-xs text-amber-300 mt-2 flex items-center">
              <svg
                className="w-3 h-3 mr-1 text-amber-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Free luxury box + ribbon wrap with every bundle
            </p>
          </motion.div>
        </div>

        {/* Image - REPLACE WITH YOUR ACTUAL BANNER IMAGE */}
        <div className="md:w-1/2 mt-6 md:mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="relative"
          >
            <img
              src="/valentineprops/origin-2.PNG"
              alt="Valentine's Build Your Box"
              className="w-full h-auto object-contain p-4 md:p-8"
              loading="lazy"
            />
            {/* Floating hearts decoration */}
            <div className="absolute -top-4 -right-4 w-16 h-16 text-rose-400/30 animate-ping">
              ❤️
            </div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 text-amber-300/30 animate-pulse">
              ✨
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default BuildYourBoxBanner;
