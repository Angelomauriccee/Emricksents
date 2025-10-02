# Video Resources for Emrickscents

This document contains the curated video resources for the app enhancements.

## Hero Section Video

### Primary Option: Luxury Perfume Store Customer Service
- **Source**: Stock video platforms (Pexels/Pixabay)
- **Recommended URL**: Use existing Vimeo video or source from:
  - https://www.pexels.com/search/videos/perfume%20shop/
  - https://pixabay.com/videos/search/luxury%20shopping/
- **Requirements**: 
  - Shows customer service interaction
  - Bright, well-lit environment
  - Professional retail setting
  - Duration: 15-20 seconds (looped)
  - Resolution: 1920x1080 (Full HD)
  - Format: MP4

### Current Implementation
The app currently uses:
```
https://player.vimeo.com/external/373797931.hd.mp4?s=07c2d7d3f68f2564c7bb6cf1ff9effcf0f956a19&profile_id=175&oauth2_token_id=57447761
```

### Recommended Alternative Videos
1. **Pexels Video ID: 8447657** - Bottles of Perfume on the Table
   - URL: https://www.pexels.com/video/bottles-of-perfume-on-the-table-8447657/
   - Duration: ~15 seconds
   - Shows elegant perfume display

2. **Pexels Video ID: 5758891** - Perfumer Creating a Scent
   - URL: https://www.pexels.com/video/perfumer-creating-a-scent-5758891/
   - Duration: ~18 seconds
   - Shows craftsmanship and artisanal process

## Additional Videos for App Sections

### About Page - Manufacturing Process
- **Pexels Video ID: 5758891** - Perfumer Creating a Scent
- **URL**: https://www.pexels.com/video/perfumer-creating-a-scent-5758891/
- **Placement**: "Our Craftsmanship" section
- **Purpose**: Showcase artisanal perfume creation

### Shop Page - Product Showcase
- **Pexels Video ID: 8447657** - Bottles of Perfume on the Table
- **URL**: https://www.pexels.com/video/bottles-of-perfume-on-the-table-8447657/
- **Placement**: Header section
- **Purpose**: Visual appeal and product presentation

### Product Detail Pages - Application Tutorial
- **Pexels Video ID: 8447665** - Person Spraying Perfume on Wrist
- **URL**: https://www.pexels.com/video/person-spraying-perfume-on-wrist-8447665/
- **Placement**: "How to Use" section
- **Purpose**: Educational content

### Product Detail Pages - Perfume Ingredients
- **Pexels Video ID: 8447346** - Video of Perfume Ingredients
- **URL**: https://www.pexels.com/video/video-of-perfume-ingredients-8447346/
- **Placement**: Product description area
- **Purpose**: Show natural ingredients and quality

## Video Implementation Notes

### Technical Requirements
- All videos should be downloaded and optimized before deployment
- Use FFmpeg for compression: `ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k output.mp4`
- Create poster images for each video
- Implement lazy loading for performance

### File Structure
```
public/
  videos/
    hero-section.mp4
    hero-section-poster.jpg
    about-craftsmanship.mp4
    about-craftsmanship-poster.jpg
    shop-showcase.mp4
    shop-showcase-poster.jpg
    product-application.mp4
    product-application-poster.jpg
    product-ingredients.mp4
    product-ingredients-poster.jpg
```

### Video Optimization Settings
- **Resolution**: 1920x1080 for desktop, 1280x720 for mobile
- **Bitrate**: 2-3 Mbps
- **Format**: MP4 (H.264 codec)
- **Audio**: Remove audio track (muted videos)
- **Loop**: Seamless looping enabled

## Download Instructions

To download videos from Pexels:
1. Visit the video URL
2. Click the "Download" button
3. Select "Full HD" or "HD" quality
4. Save to `public/videos/` directory
5. Rename according to the file structure above

## Attribution

While Pexels videos are free to use, it's good practice to credit:
- Videos by Pexels (https://www.pexels.com)
- Individual contributors when possible

## Future Video Additions

Consider adding:
- Customer testimonial videos
- Behind-the-scenes store footage
- Seasonal collection showcases
- Fragrance note visualizations
- Gift packaging demonstrations