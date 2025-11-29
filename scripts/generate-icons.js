// Run this script to generate PNG icons from SVG
// Usage: node scripts/generate-icons.js
// Requires: npm install sharp

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sizes = [192, 512];
const inputSvg = path.join(__dirname, '../public/pwa-512x512.svg');
const outputDir = path.join(__dirname, '../public');

async function generateIcons() {
  const svgBuffer = fs.readFileSync(inputSvg);
  
  for (const size of sizes) {
    const outputPath = path.join(outputDir, `pwa-${size}x${size}.png`);
    
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(outputPath);
    
    console.log(`Generated: pwa-${size}x${size}.png`);
  }
  
  console.log('Done! PNG icons generated.');
}

generateIcons().catch(console.error);
