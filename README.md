# Base256

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Base256 Documentation</title>
  <style>
    body {
      background-color: #1a1a1a;
      color: #00ff00;
      font-family: 'Courier New', monospace;
    }
    h1, h2, h3 {
      color: #00ff00;
    }
    code {
      background-color: #333;
      padding: 2px 5px;
      border-radius: 3px;
    }
    pre {
      background-color: #222;
      padding: 10px;
      border-left: 3px solid #00cc00;
    }
  </style>
</head>
<body>
  <h1>The Base256 Encoding - See binary as it wants to be seen</h1>

  <div style="background-color: #1a1a1a; color: #00ff00; padding: 15px; border-left: 5px solid #00cc00; font-family: 'Courier New', monospace;">
    <h2 style="color: #00ff00;">A Retro Aesthetic Meets Modern Utility</h2>
    <p>Step into the nostalgic glow of the original Code Page 437 (OG IBM PC) character set with Base256! This encoding transforms binary data into a mesmerizing display of line-drawing symbols, Greek letters, and accented glyphs—<em>a visual ode to the early computing era</em>. But it’s not just eye candy! For the pragmatic engineer, Base256 strips away Base64’s obfuscation, letting you inspect binary data <strong>close to the metal</strong>. This raw clarity accelerates debugging and deepens your grasp of the data at hand.</p>
    <p>With a tightly curated 256-character set, Base256 ensures cross-context compatibility. The intuitive <code>CoreMapping.tr()</code> API empowers you to remap characters for any domain, while the built-in <code>validate()</code> method prevents conflicts—making Base256 both a work of art and a powerhouse tool.</p>
  </div>

  <h2>Features</h2>
  <ul>
    <li><strong>Vintage Visuals</strong>: Encodes binary with the iconic Code Page 437 character set for a retro aesthetic.</li>
    <li><strong>Efficiency</strong>: 1:1 byte-to-character mapping, outpacing Base64 in compactness.</li>
    <li><strong>Cross-Platform</strong>: Seamless operation in Node.js and browsers.</li>
    <li><strong>Extensible</strong>: Customize mappings for specific contexts (e.g., HTML, URLs) with the <code>tr</code> API.</li>
    <li><strong>Validated</strong>: Ensures mapping integrity with <code>validate()</code>.</li>
    <li><strong>No Dependencies</strong>: Pure JavaScript, lightweight, and self-contained.</li>
  </ul>

  <h2>Installation</h2>
  <pre><code>npm install base256</code></pre>

  <h2>Usage</h2>

  <h3>Basic Encoding/Decoding</h3>
  <pre><code>import { encode, decode } from 'base256';

  // Encode a string to Base256
  const text = "Hello, World!";
  const encoded = encode(text);
  console.log(encoded); // Displays with CP437 flair (e.g., line art and symbols)

  // Decode back to a string
  const decoded = decode(encoded, 'string');
  console.log(decoded); // "Hello, World!"</code></pre>

  <h3>Using with Data URLs</h3>
  <p>Base256 includes a built-in method to convert its encoded data URLs to Base64 for browser rendering.</p>
  <pre><code>import { encode, toBase64Url } from 'base256';

  // Encode a PNG image to Base256
  const pngData = new Uint8Array([137, 80, 78, 71, ...]); // PNG binary data
  const base256Data = encode(pngData);
  const base256Url = `data:image/png;base256,${base256Data}`;

  // Convert to Base64 for browser use
  const base64Url = toBase64Url(base256Url);
  document.querySelector('img').src = base64Url; // Render the image</code></pre>

  <h3>CLI Usage</h3>
  <p>Run Base256 directly from the command line in Node.js.</p>
  <pre><code># Encode a file to Base256
  node base256.js input.bin > output.base256

  # Decode a Base256 file back to binary
  node base256.js output.base256 --decode > input.bin</code></pre>

  <h2>Extensibility: Sculpt Your Own Encodings</h2>

  <p>Base256 is a canvas for creativity! Like <code>base64url</code> adapts Base64 for URLs, Base256 lets you craft domain-specific encodings by remapping characters with the <code>tr</code> API. The core mapping preserves the original Code Page 437 set, but you can tweak it to avoid conflicts or enhance safety.</p>

  <h3>How It Works</h3>
  <p>The <code>createEncoder</code> function builds an encoder/decoder pair from a mapping. Use <code>CoreMapping.tr(byte, newUnicode)</code> to create an immutable copy with remapped characters, and validate it with <code>validate()</code> to ensure no duplicates.</p>

  <h4>Mapping Validation</h4>
  <p>The <code>validate()</code> method checks for duplicate Unicode code points, throwing an error if conflicts arise.</p>

  <h3>Example: <code>base256htmlAttribute</code></h3>
  <p>Create a Base256 encoding safe for HTML attributes by remapping problematic characters:</p>
  <pre><code>import { createEncoder, CoreMapping } from 'base256';

// Customize mapping for HTML safety
const htmlSafeMapping = CoreMapping
  .tr('"', 'U+201C') // Remap quotation mark
  .tr('<', 'U+2062') // Remap less-than
  .tr('>', 'U+2063') // Remap greater-than
  .tr('&', 'U+2064') // Remap ampersand
  .validate(); // Ensure no conflicts

const htmlEncoder = createEncoder(htmlSafeMapping);

// Encode safely for HTML attributes
const encoded = htmlEncoder.encode('Hello "World" <Test> & More');
console.log(encoded); // Safe string for HTML use
const decoded = htmlEncoder.decode(encoded, 'string');
console.log(decoded); // "Hello "World" <Test> & More"</code></pre>

  <h3>Example: Validating a Mapping</h3>
  <p>Prevent mapping conflicts:</p>
  <pre><code>const invalidMapping = CoreMapping.tr('0', 'U+0020').validate(); // Throws: Duplicate Unicode code point found: U+0020</code></pre>

  <h3>Crafting Other Domains</h3>
  <ul>
    <li><strong>base256url</strong>: Remap <code>/</code>, <code>?</code>, <code>#</code>, <code>=</code> for URL safety using invisible Unicode characters.</li>
    <li><strong>base256json</strong>: Remap <code>\</code>, <code>"</code> for JSON string safety.</li>
  </ul>
  <p>Use <code>CoreMapping.tr()</code> to adjust, validate, and pass to <code>createEncoder</code>.</p>

  <h2>Contributing</h2>
  <p>We invite you to shape Base256’s future! Share your custom encodings or enhancements via pull requests. Add reusable mappings to the <code>mappings/</code> directory!</p>

  <h2>License</h2>
  <p>MIT License - See the <a href="LICENSE">LICENSE</a> file for details.</p>
</body>
</html>
