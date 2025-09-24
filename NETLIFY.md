# EmerickScents Perfume Store - Netlify Deployment Guide

This document provides instructions for deploying the EmerickScents Perfume Store to Netlify.

## Deployment Steps

1. **Connect to GitHub Repository**
   - Log in to your Netlify account
   - Click "New site from Git"
   - Select GitHub and authorize Netlify
   - Choose the "emrickscents-perfume-store" repository

2. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Advanced build settings: Add the following environment variables if needed:
     - `NODE_VERSION`: `16.14.0` (or your preferred Node version)

3. **Deploy the Site**
   - Click "Deploy site"
   - Wait for the build and deployment to complete

## Features Implemented in this Branch

This branch (`feature/shop-page-update`) includes the following enhancements:

1. **Redesigned Shop Dropdown Navigation**
   - Modern two-section menu with Categories and Collections
   - 34 luxury perfume brands in alphabetical order
   - Collections section with filtering options

2. **Enhanced Filtering Functionality**
   - Brand filtering by name field
   - Collection filtering by collection field
   - Seamless filter chaining
   - Smooth transitions between filtered states

3. **Updated Filter Section**
   - Size filter with multiple options
   - Collection filter with specified options
   - Price Range filter with Naira currency (₦)
   - Luxury styling for filters

4. **Dynamic Title Display**
   - Title showing currently selected category or collection
   - Premium typography and subtle animations

5. **Redesigned Featured Dropdown**
   - Smooth, elegant animations
   - Rounded corners and subtle shadows
   - Premium typography for luxury brand style

## Testing on Netlify

After deployment, verify the following functionality:

1. Navigation to the Shop page works correctly
2. Shop dropdown menu appears on hover with all brands and collections
3. Clicking on brands and collections filters products correctly
4. Filter sidebar works with all filter options
5. Dynamic title updates based on selected filters
6. All transitions and animations are smooth

## Troubleshooting

If you encounter any issues with the deployment:

1. Check the Netlify deploy logs for errors
2. Verify that all dependencies are correctly installed
3. Ensure the build command is correctly set
4. Check that the publish directory matches your project's output directory
5. Verify that the Netlify configuration file (`netlify.toml`) is correctly set up