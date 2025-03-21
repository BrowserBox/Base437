#!/usr/bin/env node
// base437.js
// Base437 - See binary the way it wants to be seen
// Using Code Page 437 Unicode mappings

//
//  MIT License
  //  
  //  Copyright (c) 2025 Cris & DOSAYGO
  //  
  //  Permission is hereby granted, free of charge, to any person obtaining a copy
  //  of this software and associated documentation files (the "Software"), to deal
  //  in the Software without restriction, including without limitation the rights
  //  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  //  copies of the Software, and to permit persons to whom the Software is
  //  furnished to do so, subject to the following conditions:
  //  
  //  The above copyright notice and this permission notice shall be included in all
  //  copies or substantial portions of the Software.
  //  
  //  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  //  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  //  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  //  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  //  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  //  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  //  SOFTWARE.
  //
//

// --- Core Character Mapping ---

// CP437 to Unicode mapping (byte to code point)
export const CoreMapping = {
  /***
     * Unicode character 0x2060 is chosen as the "null" (ASCII: 0) character in base437, because
     * of the following desirable properties:
     * 
     * - Does not trigger rendering changes (like Emoji display)
     * - Is ignored for text segmentation.
     * - Is zero-width and does not affect layout.
     *
     * In many ways it is rendered how the original Null character was rendered in DOS Code Page 437
     * Or Windows CP1252.
     * 
     * More information about this Word Joiner character is below:
     *
     *   The word joiner (WJ) is a Unicode format character which is used to indicate that line 
     *   breaking should not occur at its position.[1] It does not affect the formation of ligatures or cursive 
     *   joining and is ignored for the purpose of text segmentation.[1] It is encoded since Unicode version 3.2 
     *   (released in 2002) as U+2060 word joiner (&NoBreak;).
     *
     *   The word joiner replaces the zero-width no-break space (ZWNBSP, U+FEFF), as a usage of the no-break space 
     *   of zero width.
     *
     * - From Wikipedia contributors. (2024, April 4). Word joiner. In Wikipedia, The Free Encyclopedia. 
     * Retrieved 16:17, March 15, 2025, from https://en.wikipedia.org/w/index.php?title=Word_joiner&oldid=1217244655
  ***/
  "0": "U+2060", 

  /***
    * The rest of this table is taken entirely and unmodified from a mapping between the original
    * Code Page 437 ASCII codes and their equivalent Unicode characters today.
    * 
    * This table and more information about Code Page 437 can be found on the relevant Wikipedia page,
    * quoted below:
    *
    *   Code page 437 (CCSID 437) is the character set of the original IBM PC (personal computer).
    *   It is also known as CP437, OEM-US, OEM 437, PC-8, or MS-DOS Latin US. The set includes all 
    *   printable ASCII characters as well as some accented letters (diacritics), Greek letters, icons, and line-
    *   drawing symbols. It is sometimes referred to as the "OEM font" or "high ASCII", or as "extended ASCII" (
    *   one of many mutually incompatible ASCII extensions).
    *
    *   This character set remains the primary set in the core of any EGA and VGA-compatible graphics card. As such, 
    *   text shown when a PC reboots, before fonts can be loaded and rendered, is typically rendered using this character 
    *   set. Many file formats developed at the time of the IBM PC are based on code page 437 as well.
    *
    * - From Wikipedia contributors. (2025, February 10). Code page 437. In Wikipedia, The Free Encyclopedia. 
    * Retrieved 16:27, March 15, 2025, from https://en.wikipedia.org/w/index.php?title=Code_page_437&oldid=1275058912
    *
    *
  ***/
  "1": "U+263A", "2": "U+263B", "3": "U+2665", "4": "U+2666", "5": "U+2663",
  "6": "U+2660", "7": "U+2022", "8": "U+25D8", "9": "U+25CB", "10": "U+25D9", "11": "U+2642",
  "12": "U+2640", "13": "U+266A", "14": "U+266B", "15": "U+263C", "16": "U+25BA", "17": "U+25C4",
  "18": "U+2195", "19": "U+203C", "20": "U+00B6", "21": "U+00A7", "22": "U+25AC", "23": "U+21A8",
  "24": "U+2191", "25": "U+2193", "26": "U+2192", "27": "U+2190", "28": "U+221F", "29": "U+2194",
  "30": "U+25B2", "31": "U+25BC", "32": "U+0020", "33": "U+0021", 

  // Domain-speicifc mappings
    //"34": "U+0022",  // regular ASCII quote "
    // The below line demonstrates how a mapping could conceptually be modified to 
    // product output suitable for a HTML attribute. In this change the conflicting quote '"' character
    // is mapped to a unicode quote character that does not interefere with HTML attribute
    // parsing. 
    "34": "U+201C", // unicode quote
    // We provide an API for these changes
    // CoreMapping.tr(from, to)
    //

  "35": "U+0023",
  "36": "U+0024", "37": "U+0025", "38": "U+0026", "39": "U+0027", "40": "U+0028", "41": "U+0029",
  "42": "U+002A", "43": "U+002B", "44": "U+002C", "45": "U+002D", "46": "U+002E", "47": "U+002F",
  "48": "U+0030", "49": "U+0031", "50": "U+0032", "51": "U+0033", "52": "U+0034", "53": "U+0035",
  "54": "U+0036", "55": "U+0037", "56": "U+0038", "57": "U+0039", "58": "U+003A", "59": "U+003B",
  "60": "U+003C", "61": "U+003D", "62": "U+003E", "63": "U+003F", "64": "U+0040", "65": "U+0041",
  "66": "U+0042", "67": "U+0043", "68": "U+0044", "69": "U+0045", "70": "U+0046", "71": "U+0047",
  "72": "U+0048", "73": "U+0049", "74": "U+004A", "75": "U+004B", "76": "U+004C", "77": "U+004D",
  "78": "U+004E", "79": "U+004F", "80": "U+0050", "81": "U+0051", "82": "U+0052", "83": "U+0053",
  "84": "U+0054", "85": "U+0055", "86": "U+0056", "87": "U+0057", "88": "U+0058", "89": "U+0059",
  "90": "U+005A", "91": "U+005B", "92": "U+005C", "93": "U+005D", "94": "U+005E", "95": "U+005F",
  "96": "U+0060", "97": "U+0061", "98": "U+0062", "99": "U+0063", "100": "U+0064", "101": "U+0065",
  "102": "U+0066", "103": "U+0067", "104": "U+0068", "105": "U+0069", "106": "U+006A", "107": "U+006B",
  "108": "U+006C", "109": "U+006D", "110": "U+006E", "111": "U+006F", "112": "U+0070", "113": "U+0071",
  "114": "U+0072", "115": "U+0073", "116": "U+0074", "117": "U+0075", "118": "U+0076", "119": "U+0077",
  "120": "U+0078", "121": "U+0079", "122": "U+007A", "123": "U+007B", "124": "U+007C", "125": "U+007D",
  "126": "U+007E", "127": "U+2302", "128": "U+00C7", "129": "U+00FC", "130": "U+00E9", "131": "U+00E2",
  "132": "U+00E4", "133": "U+00E0", "134": "U+00E5", "135": "U+00E7", "136": "U+00EA", "137": "U+00EB",
  "138": "U+00E8", "139": "U+00EF", "140": "U+00EE", "141": "U+00EC", "142": "U+00C4", "143": "U+00C5",
  "144": "U+00C9", "145": "U+00E6", "146": "U+00C6", "147": "U+00F4", "148": "U+00F6", "149": "U+00F2",
  "150": "U+00FB", "151": "U+00F9", "152": "U+00FF", "153": "U+00D6", "154": "U+00DC", "155": "U+00A2",
  "156": "U+00A3", "157": "U+00A5", "158": "U+20A7", "159": "U+0192", "160": "U+00E1", "161": "U+00ED",
  "162": "U+00F3", "163": "U+00FA", "164": "U+00F1", "165": "U+00D1", "166": "U+00AA", "167": "U+00BA",
  "168": "U+00BF", "169": "U+2310", "170": "U+00AC", "171": "U+00BD", "172": "U+00BC", "173": "U+00A1",
  "174": "U+00AB", "175": "U+00BB", "176": "U+2591", "177": "U+2592", "178": "U+2593", "179": "U+2502",
  "180": "U+2524", "181": "U+2561", "182": "U+2562", "183": "U+2556", "184": "U+2555", "185": "U+2563",
  "186": "U+2551", "187": "U+2557", "188": "U+255D", "189": "U+255C", "190": "U+255B", "191": "U+2510",
  "192": "U+2514", "193": "U+2534", "194": "U+252C", "195": "U+251C", "196": "U+2500", "197": "U+253C",
  "198": "U+255E", "199": "U+255F", "200": "U+255A", "201": "U+2554", "202": "U+2569", "203": "U+2566",
  "204": "U+2560", "205": "U+2550", "206": "U+256C", "207": "U+2567", "208": "U+2568", "209": "U+2564",
  "210": "U+2565", "211": "U+2559", "212": "U+2558", "213": "U+2552", "214": "U+2553", "215": "U+256B",
  "216": "U+256A", "217": "U+2518", "218": "U+250C", "219": "U+2588", "220": "U+2584", "221": "U+258C",
  "222": "U+2590", "223": "U+2580", "224": "U+03B1", "225": "U+00DF", "226": "U+0393", "227": "U+03C0",
  "228": "U+03A3", "229": "U+03C3", "230": "U+00B5", "231": "U+03C4", "232": "U+03A6", "233": "U+0398",
  "234": "U+03A9", "235": "U+03B4", "236": "U+221E", "237": "U+03C6", "238": "U+03B5", "239": "U+2229",
  "240": "U+2261", "241": "U+00B1", "242": "U+2265", "243": "U+2264", "244": "U+2320", "245": "U+2321",
  "246": "U+00F7", "247": "U+2248", "248": "U+00B0", "249": "U+2219", "250": "U+00B7", "251": "U+221A",
  "252": "U+207F", "253": "U+00B2", "254": "U+25A0", "255": "U+00A0"
};

/**
 * Creates an immutable copy of the CoreMapping with a specific byte remapped to a new Unicode code point.
 * @param {string} byte - The byte value as a string (e.g., '"') or number (e.g., "34") to remap.
 * @param {string} newUnicode - The new Unicode code point (e.g., "U+201C").
 * @returns {Object} A new immutable mapping object with the remapped value.
 */
Object.defineProperty(CoreMapping, 'tr', {
  value: function (byte, newUnicode) {
    const byteNum = typeof byte === 'string' ? byte.charCodeAt(0).toString() : byte.toString();
    if (!CoreMapping[byteNum]) {
      throw new Error(`Byte ${byte} not found in CoreMapping`);
    }
    if (!newUnicode.match(/^U\+[0-9A-F]{4}$/i)) {
      throw new Error('Invalid Unicode format; use "U+XXXX" where XXXX is a 4-digit hex code');
    }

    const newMapping = { ...CoreMapping };
    newMapping[byteNum] = newUnicode;
    Object.defineProperty(newMapping, 'tr', { value: CoreMapping.tr });
    Object.defineProperty(newMapping, 'validate', { value: CoreMapping.validate });

    return Object.freeze(newMapping);
  }
});

/**
 * Validates the mapping to ensure no duplicate Unicode code points.
 * @returns {Object} The validated mapping (same as input if valid).
 * @throws {Error} If a duplicate Unicode code point is found.
 */
Object.defineProperty(CoreMapping, 'validate', {
  value: function () {
    const codePoints = new Set();
    for (const unicode of Object.values(this)) {
      const codePoint = parseInt(unicode.slice(2), 16);
      if (codePoints.has(codePoint)) {
        throw new Error(`Duplicate Unicode code point found: ${unicode}`);
      }
      codePoints.add(codePoint);
    }
    const newMapping = { ...this };
    Object.defineProperty(newMapping, 'tr', { value: CoreMapping.tr });
    Object.defineProperty(newMapping, 'validate', { value: CoreMapping.validate });

    return Object.freeze(newMapping);
  }
});

// Polyfill Buffer for browser if it doesn't exist
const BufferClass = typeof globalThis.Buffer !== 'undefined' ? globalThis.Buffer : class Buffer extends Uint8Array {
  static from(data) {
    if (data instanceof ArrayBuffer || data.buffer instanceof ArrayBuffer) {
      return new this(new Uint8Array(data));
    }
    if (typeof data === 'string') {
      return new this(new TextEncoder().encode(data));
    }
    return new this(data);
  }
  toString(encoding = 'utf8') {
    if (encoding === 'base64') {
      // Base64 encoding
      const base64Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      let base64 = '';
      for (let i = 0; i < this.length; i += 3) {
        const chunk = (this[i] << 16) + (i + 1 < this.length ? this[i + 1] << 8 : 0) + (i + 2 < this.length ? this[i + 2] : 0);
        base64 += base64Chars[(chunk >> 18) & 63] +
                  base64Chars[(chunk >> 12) & 63] +
                  (i + 1 < this.length ? base64Chars[(chunk >> 6) & 63] : '=') +
                  (i + 2 < this.length ? base64Chars[chunk & 63] : '=');
      }
      return base64;
    }
    return new TextDecoder(encoding).decode(this);
  }
};

// --- Core Base437 Encoding Logic ---

/**
 * Creates a Base437 encoder/decoder with a custom mapping.
 * @param {Object<string, string>} cp437ToUnicode - Mapping of byte values (0-255) to Unicode code points (e.g., "U+2060").
 * @returns {{ encode: Function, decode: Function }} - An object with encode and decode functions.
 */
export function createEncoder(cp437ToUnicode = CoreMapping) {
  const byteToCodePointMap = Object.freeze(Object.fromEntries(
    Object.entries(cp437ToUnicode).map(([byte, unicode]) => [parseInt(byte), parseInt(unicode.slice(2), 16)])
  ));

  const codePointToByteMap = Object.freeze(Object.fromEntries(
    Object.entries(byteToCodePointMap).map(([byte, codePoint]) => [codePoint, parseInt(byte)])
  ));

  const BufferPolyfill = typeof globalThis.Buffer !== 'undefined' ? globalThis.Buffer : class Buffer extends Uint8Array {
    static from(data) {
      if (data instanceof ArrayBuffer || data.buffer instanceof ArrayBuffer) {
        return new this(new Uint8Array(data));
      }
      if (typeof data === 'string') {
        return new this(new TextEncoder().encode(data));
      }
      return new this(data);
    }
    toString(encoding = 'utf8') {
      if (encoding === 'base64') {
        const base64Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        let base64 = '';
        for (let i = 0; i < this.length; i += 3) {
          const chunk = (this[i] << 16) + (i + 1 < this.length ? this[i + 1] << 8 : 0) + (i + 2 < this.length ? this[i + 2] : 0);
          base64 += base64Chars[(chunk >> 18) & 63] +
                    base64Chars[(chunk >> 12) & 63] +
                    (i + 1 < this.length ? base64Chars[(chunk >> 6) & 63] : '=') +
                    (i + 2 < this.length ? base64Chars[chunk & 63] : '=');
        }
        return base64;
      }
      return new TextDecoder(encoding).decode(this);
    }
  };

  function inputToBytes(input) {
    if (input instanceof ArrayBuffer) {
      return new Uint8Array(input);
    }
    if (input instanceof Uint8Array || input instanceof BufferPolyfill || input instanceof Uint8ClampedArray) {
      return new Uint8Array(input);
    }
    if (typeof input === 'string') {
      return new TextEncoder().encode(input);
    }
    throw new Error('Unsupported input type: must be ArrayBuffer, Uint8Array, Buffer, Uint8ClampedArray, or string');
  }

  function bytesToOutput(bytes, outputType = 'uint8array') {
    switch (outputType.toLowerCase()) {
      case 'uint8array':
        return bytes;
      case 'arraybuffer':
        return bytes.buffer;
      case 'buffer':
        return BufferPolyfill.from(bytes);
      case 'string':
        return new TextDecoder().decode(bytes);
      case 'array':
        return Array.from(bytes);
      default:
        throw new Error(`Unsupported output type: ${outputType}. Use 'uint8array', 'arraybuffer', 'buffer', 'string', or 'array'`);
    }
  }

  return {
    /**
     * Encodes data to a Base437 string using the provided mapping.
     * @param {ArrayBuffer|Uint8Array|Buffer|Uint8ClampedArray|string} input - Input data to encode.
     * @returns {string} Base437-encoded string.
     */
    encode(input) {
      const bytes = inputToBytes(input);
      let result = '';
      for (const byte of bytes) {
        const codePoint = byteToCodePointMap[byte];
        if (codePoint === undefined) {
          throw new Error(`Invalid byte value: ${byte}. Must be between 0 and 255`);
        }
        result += String.fromCodePoint(codePoint);
      }
      return result;
    },

    /**
     * Decodes a Base437 string back to bytes using the provided mapping.
     * @param {string} input - Base437-encoded string.
     * @param {string} [outputType='uint8array'] - Desired output type: 'uint8array', 'arraybuffer', 'buffer', 'string', 'array'.
     * @returns {Uint8Array|ArrayBuffer|Buffer|string|number[]} Decoded data in the specified format.
     */
    decode(input, outputType = 'uint8array') {
      if (typeof input !== 'string') {
        throw new Error('Input must be a string');
      }

      const bytes = new Uint8Array(input.length);
      let i = 0;
      for(const char of input) {
        const codePoint = char.codePointAt(0);
        const byte = codePointToByteMap[codePoint];
        if (byte === undefined) {
          throw new Error(`Invalid Base437 character at position ${i}: ${input[i]}`);
        }
        bytes[i] = byte;
        i++;
      }

      return bytesToOutput(bytes, outputType);
    },


    // --- Extensions ---

    /**
     * Converts a Base437-encoded data URL to a Base64-encoded data URL for use in HTML.
     * This is an example of a domain-specific extension that converts Base437 data to another format.
     * See the README for how to create your own domain-specific extensions.
     * @param {string} dataUrl - The Base437 data URL (e.g., "data:image/png;base437,éPNG...").
     * @returns {string} The Base64 data URL (e.g., "data:image/png;base64,iVBORw0KGgo...").
     */
    toBase64Url(dataUrl) {
      if (typeof dataUrl !== 'string' || !dataUrl.startsWith('data:')) {
        throw new Error('Input must be a valid data URL');
      }

      const match = dataUrl.match(/^data:([^;]+);base437,(.*)$/);
      if (!match) {
        throw new Error('Input must be a Base437-encoded data URL');
      }

      const mimeType = match[1];
      const base437Data = match[2];

      const bytes = this.decode(base437Data, 'uint8array');
      const base64Data = BufferClass.from(bytes).toString('base64');

      return `data:${mimeType};base64,${base64Data}`;
    }
  };
}

export const { encode, decode, toBase64Url } = createEncoder();

// --- CLI and Global Setup ---

if (typeof window === 'undefined' && typeof globalThis.process !== 'undefined' && import.meta.url === `file://${process.argv[1]}` ) {
  if (process.argv[2]) {
    let fs;
    import('fs').then(module => {
      fs = module;
      const fileContent = fs.readFileSync(process.argv[2]);
      const decodeMode = process.argv[3] === '--decode';
      const recodedFileContent = (decodeMode ? decode : encode)(decodeMode ? fileContent.toString() : fileContent);
      process.stdout.write(recodedFileContent);
    });
  } else {
    console.info(`Usage: ${process.argv[1]} [file] [--decode]`);
  }
} else {
  if (!globalThis.__base437_no_globals) {
    globalThis.createEncoder = createEncoder;
    globalThis.CoreMapping = CoreMapping;
  }
}
