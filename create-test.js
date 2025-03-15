#!/usr/bin/env node
// create-test.js
// Creates an index.html file with a Base256-encoded image and converts it to Base64

import { createEncoder, CoreMapping } from './base437.js';
import fs from 'fs';

if (process.argv.length < 3) {
  console.error('Usage: node create-test.js <path-to-png-file>');
  process.exit(1);
}

const imagePath = process.argv[2];
const imageBuffer = fs.readFileSync(imagePath);

// Encode the image to Base256 with a remapped quotation mark for HTML safety
const htmlSafeMapping = CoreMapping.tr('"', 'U+201C').validate(); // Remap " for HTML safety
const htmlEncoder = createEncoder(htmlSafeMapping);
const base437Data = htmlEncoder.encode(new Uint8Array(imageBuffer));
const base437Url = `data:image/png;base437,${base437Data}`;

// Generate index.html content with inline script
const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <title>Base256 Image Test</title>
  <script type="module">
    import { createEncoder, CoreMapping } from './base437.js';

    // Create custom mapping and encoder
    const htmlSafeMapping = CoreMapping.tr('"', 'U+201C').validate();
    const htmlEncoder = createEncoder(htmlSafeMapping);

    window.onload = () => {
      const img = document.getElementById('testImage');
      const base437Src = img.getAttribute('src');
      const base64Src = htmlEncoder.toBase64Url(base437Src);
      img.setAttribute('src', base64Src);
      console.log('Converted to Base64:', base64Src);
    };
  </script>
</head>
<body>
  <img id="testImage" alt="Test Image" src="${base437Url}" width=200>
</body>
</html>
`.trim();

// Write the index.html file
fs.writeFileSync('index.html', htmlContent);
console.log('Created index.html with Base256-encoded image and conversion script');
