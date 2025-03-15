#!/usr/bin/env node
// create-test.js
// Creates an index.html file with a Base256-encoded image and converts it to Base64

import { createEncoder, encode, toBase64Url, CoreMapping } from './base256.js';
import fs from 'fs';

if (process.argv.length < 3) {
  console.error('Usage: node create-test.js <path-to-png-file>');
  process.exit(1);
}

const imagePath = process.argv[2];
const imageBuffer = fs.readFileSync(imagePath);

// Encode the image to Base256 with a remapped quotation mark for HTML safety
const htmlSafeMapping = CoreMapping.tr('"', 'U+201C').validate();
const encoder = createEncoder(htmlSafeMapping);
const base256Data = encoder.encode(imageBuffer);
const base256Url = `data:image/png;base256,${base256Data}`;

// Generate index.html content
const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <title>Base256 Image Test</title>
  <script type="module" src="base256.js"></script>
</head>
<body>
  <img id="testImage" alt="Test Image" src="${base256Url}">
  <script>
    window.onload = () => {
      const img = document.getElementById('testImage');
      const base256Src = img.getAttribute('src');
      const base64Src = toBase64Url(base256Src);
      img.setAttribute('src', base64Src);
      console.log('Converted to Base64:', base64Src);
    };
  </script>
</body>
</html>
`;

// Write the index.html file
fs.writeFileSync('index.html', htmlContent.trim());
console.log('Created index.html with Base256-encoded image and conversion script');
