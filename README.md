# The Base437 Encoding - See Binary the Way It Wants to Be Seen

***As IBM Code Page 437 Characters***

> A retro aesthetic meets modern utility! Base437 brings the nostalgic charm of the original Code Page 437 (OG IBM PC) character set to life, transforming binary data into a mesmerizing display of line-drawing symbols, Greek letters, and accented glyphs—a visual ode to the early computing era. But it’s not just eye candy! For the pragmatic engineer, Base437 strips away Base64’s obfuscation, letting you inspect binary data *close to the metal*. This raw clarity accelerates debugging and deepens your grasp of the data at hand. With a tightly curated 437-character set, Base437 ensures cross-context compatibility, and the intuitive `tr` API—complete with `validate()`—empowers you to sculpt encodings for any domain.

[Read more about Code Page 437, a.k.a, "High ~Elvish~ ASCII"](https://en.wikipedia.org/wiki/Code_page_437)

## Features

- **Vintage Visuals**: Encodes binary with the iconic Code Page 437 character set for a retro aesthetic.
- **Efficiency**: 1:1 byte-to-character mapping, outpacing Base64 in compactness.
- **Cross-Platform**: Seamless operation in Node.js and browsers.
- **Extensible**: Customize mappings for specific contexts (e.g., HTML, URLs) with the `tr` API.
- **Validated**: Ensures mapping integrity with `validate()`.
- **No Dependencies**: Pure JavaScript, lightweight, and self-contained.

## Installation

To get started, install Base437 via npm:

```bash
npm install base437
```

## Usage

### Basic Encoding/Decoding

```javascript
import { encode, decode } from 'base437';

// Encode a string to Base437
const text = "Hello, World!";
const encoded = encode(text);
console.log(encoded); // Displays with CP437 flair (e.g., line art and symbols)

// Decode back to a string
const decoded = decode(encoded, 'string');
console.log(decoded); // "Hello, World!"
```

### Using with Data URLs

Base437 includes a built-in method to convert its encoded data URLs to Base64 for browser rendering.

```javascript
import { encode, toBase64Url } from 'base437';

// Encode a PNG image to Base437
const pngData = new Uint8Array([137, 80, 78, 71, ...]); // PNG binary data
const base437Data = encode(pngData);
const base437Url = `data:image/png;base437,${base437Data}`;

// Convert to Base64 for browser use
const base64Url = toBase64Url(base437Url);
document.querySelector('img').src = base64Url; // Render the image
```

### CLI Usage

Run Base437 directly from the command line in Node.js.

```bash
# Encode a file to Base437
node base437.js input.bin > output.base437

# Decode a Base437 file back to binary
node base437.js output.base437 --decode > input.bin
```

## Extensibility: Sculpt Your Own Encodings

Base437 is your canvas for creativity! Like base64url adapts Base64 for URLs, Base437 lets you craft domain-specific encodings by remapping characters with the `tr` API. The core mapping preserves the original Code Page 437 set, but you can tweak it to avoid conflicts or enhance safety.

### How It Works

The `createEncoder` function builds an encoder/decoder pair from a mapping. Use `CoreMapping.tr(byte, newUnicode)` to create an immutable copy with remapped characters, and validate it with `validate()` to ensure no duplicates.

### Mapping Validation

The `validate()` method checks for duplicate Unicode code points, throwing an error if conflicts arise.

#### Example: base437htmlAttribute

Create a Base437 encoding safe for HTML attributes by remapping problematic characters:

```javascript
import { createEncoder, CoreMapping } from 'base437';

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
console.log(decoded); // "Hello "World" <Test> & More"
```

#### Example: Validating a Mapping

Prevent mapping conflicts:

```javascript
const invalidMapping = CoreMapping.tr('0', 'U+0020').validate(); // Throws: Duplicate Unicode code point found: U+0020
```

#### Crafting Other Domains

- `base437url`: Remap `/`, `?`, `#`, `=` for URL safety using invisible Unicode characters.
- `base437json`: Remap `\`, `"` for JSON string safety.

Use `CoreMapping.tr()` to adjust, validate, and pass to `createEncoder`.

## Developer Ergonomics

Base437 is designed with developers in mind:

- **Clear API**: Functions like `encode`, `decode`, and `toBase64Url` are intuitive and mirror Base64 conventions.
- **Validation**: The `validate()` method ensures your custom mappings are conflict-free.
- **Flexible Output**: Decode to `Uint8Array`, `ArrayBuffer`, `Buffer`, `string`, or `array` with a single parameter.
- **Cross-Platform**: Works seamlessly in Node.js and browsers, with a Buffer polyfill for browser compatibility.
- **No Dependencies**: Pure JavaScript, keeping your project lightweight.

>[!NOTE]  
Base437 is lightweight and doesn’t rely on any external dependencies, making it a great choice for minimalistic projects and performance-sensitive applications.

## Contributing

We invite you to shape Base437’s future! Share your custom encodings or enhancements via pull requests. Add reusable mappings to the `mappings/` directory!

> **Note**  
> Have a cool encoding like `base437url` or `base437json`? Open a PR—we’d love to feature it!

## License

MIT License - See the [LICENSE](LICENSE) file for details.

