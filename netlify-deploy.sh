#!/bin/bash

# This script helps with deploying to Netlify for preview

# Install dependencies
npm install

# Build the project
npm run build

# Copy netlify-preview.toml to netlify.toml for the deployment
cp netlify-preview.toml netlify.toml

echo "Build completed. Ready for Netlify deployment."