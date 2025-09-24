/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#121212',
        secondary: '#D4AF37', // Gold
        accent: '#F5F5F5',    // Cream
        dark: '#0A0A0A',
        light: '#FFFFFF',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      boxShadow: {
        'luxury': '0 4px 30px rgba(0, 0, 0, 0.1)',
        'gold': '0 4px 20px rgba(212, 175, 55, 0.15)',
      },
      backgroundImage: {
        'gradient-luxury': 'linear-gradient(to right, #121212, #2C2C2C)',
      },
    },
  },
  plugins: [],
}