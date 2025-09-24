# Emrickscents - Luxury Perfume Store

Emrickscents is a modern, luxurious online perfume store built with React, Tailwind CSS, and GSAP animations. The website features a high-end, sleek design that resembles top luxury brands.

![Emrickscents Preview](https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80)

## Features

- **Modern React Application**: Built with React and Vite for fast development and optimized production builds
- **Luxury UI/UX Design**: High-end, sleek, elegant, and visually stunning design
- **Responsive Design**: Fully responsive for mobile, tablet, and desktop devices
- **Advanced Animations**: Smooth animations and transitions using GSAP and Framer Motion
- **Complete E-commerce Features**:
  - Product listings with filtering and sorting
  - Detailed product pages with image galleries
  - Shopping cart functionality
  - WhatsApp checkout integration
  - Store locator with Google Maps integration
  - About Us and Contact pages
- **Performance Optimized**: Fast loading times and smooth interactions

## Tech Stack

- **React**: Frontend library for building user interfaces
- **Vite**: Next-generation frontend tooling
- **Tailwind CSS**: Utility-first CSS framework
- **GSAP**: Professional-grade animation library
- **Framer Motion**: Animation library for React
- **React Router**: Routing for React applications
- **React Icons**: Icon library for React
- **Swiper**: Modern mobile touch slider

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/emrickscents.git
   cd emrickscents
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `dist/` directory.

## Project Structure

```
emrickscents/
├── public/             # Public assets
├── src/
│   ├── assets/         # Images, videos, and other static assets
│   ├── components/     # Reusable components
│   │   ├── layout/     # Layout components (Navbar, Footer)
│   │   ├── product/    # Product-related components
│   │   └── ui/         # UI components (Button, SectionTitle)
│   ├── context/        # React context providers
│   ├── data/           # Sample data for products
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Page components
│   ├── utils/          # Utility functions
│   ├── App.jsx         # Main App component
│   ├── index.css       # Global styles
│   └── main.jsx        # Entry point
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
└── vite.config.js
```

## Features in Detail

### Homepage
- Luxury hero section with smooth animations
- Featured products section
- Collection highlights
- Parallax effects
- Brand story section
- Newsletter signup

### Product Listing
- Grid display of perfumes with hover effects
- Advanced filtering options (category, type, price range)
- Sorting functionality
- Responsive grid layout

### Product Details
- Image gallery with thumbnails
- Product information and description
- Fragrance notes breakdown
- Quantity selector
- WhatsApp checkout button
- Related products carousel

### Shopping Cart
- Add/remove items
- Update quantities
- Order summary
- WhatsApp checkout integration

### Store Locator
- Interactive map with store locations
- Store filtering by country
- Store details and opening hours
- Featured boutiques section

### About Us
- Brand story and values
- Team members section
- Manufacturing process
- Luxury imagery

### Contact Us
- Contact form
- Store information
- FAQ section
- WhatsApp integration

## Customization

### Styling
The project uses Tailwind CSS for styling. You can customize the design by modifying the `tailwind.config.js` file.

### Content
Product data is stored in `src/data/products.js`. You can modify this file to add, remove, or update products.

### Images
Replace the placeholder images in the components with your own images for a personalized look.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Images from [Unsplash](https://unsplash.com)
- Icons from [React Icons](https://react-icons.github.io/react-icons/)