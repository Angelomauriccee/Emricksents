# Content Refinement Updates

This branch contains various content refinement updates to the EmrickScents website as requested. The following changes have been implemented:

## Homepage Fixes

1. **Instagram Section**:
   - Updated the Instagram section with proper thumbnails for the 6 provided reel links
   - Added static images in the `/src/assets/images/instagram-thumbnails/` directory as fallback images

2. **Our Story Image**:
   - Replaced the broken image with a suitable luxury perfume image from Unsplash
   - New image is stored at `/src/assets/images/our-story.jpg`

## About Page Updates

1. **In Our Story Section**:
   - Removed Emma Emrick's image
   - Updated "Emma Emrick" to "Emrick (Founder and Master Perfumer)"
   - Replaced "Emma Emrick" with "Emrick" in the quote

2. **Meet Our Team Section**:
   - Removed the entire "Meet Our Team" section
   - Removed related code including teamRef and teamMembers data
   - Removed team animation code

## Store-Locator Page Update

1. **In-Store Experience**:
   - Replaced the broken image with a relevant perfume boutique image
   - New image is stored at `/src/assets/images/store-interior.jpg`

## FAQ Page Update

1. **FAQ Content**:
   - Replaced all current FAQs with the provided new content
   - Updated the title to "Frequently Asked Questions (FAQ) – EmrickScents"
   - Added new questions and answers as specified

## Contact Page Update

1. **Opening Hours**:
   - Updated to Monday to Saturday: 10am – 8pm
   - Updated to Sunday: 2pm – 7pm

## Footer Update

1. **Footer Write-up**:
   - Replaced the existing write-up with the provided new content about EmrickScents being a luxury perfume boutique
   - Updated the opening hours in the footer to match the Contact page

## Product Page – Specification Updates

1. **Removed Fields**:
   - Removed the following fields from product specifications:
     - Concentration
     - Eau de Parfum
     - Longevity
     - Sillage
     - Season
     - Made in France

2. **Ingredients**:
   - Added real ingredients to each product's specification
   - Updated the code to display ingredients from the product data

3. **Product Descriptions**:
   - Updated product descriptions with proper write-ups for several products
   - Added detailed and accurate scent profiles and notes

## Implementation Details

- All images are stored in the appropriate directories
- Code changes maintain the existing styling and layout
- The updates enhance the luxury feel of the website
- All changes are committed to the `content-refinement` branch