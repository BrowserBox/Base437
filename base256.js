// base256.js
// Base256 - See binary the way it wants to be seen
// Using Code Page 437 Unicode mappings

// CP437 to Unicode mapping (byte to code point)
const cp437ToUnicodeRaw = {
  "0": "U+200D", "1": "U+263A", "2": "U+263B", "3": "U+2665", "4": "U+2666", "5": "U+2663",
  "6": "U+2660", "7": "U+2022", "8": "U+25D8", "9": "U+25CB", "10": "U+25D9", "11": "U+2642",
  "12": "U+2640", "13": "U+266A", "14": "U+266B", "15": "U+263C", "16": "U+25BA", "17": "U+25C4",
  "18": "U+2195", "19": "U+203C", "20": "U+00B6", "21": "U+00A7", "22": "U+25AC", "23": "U+21A8",
  "24": "U+2191", "25": "U+2193", "26": "U+2192", "27": "U+2190", "28": "U+221F", "29": "U+2194",
  "30": "U+25B2", "31": "U+25BC", "32": "U+0020", "33": "U+0021", "34": "U+0022", "35": "U+0023",
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

// Pre-compute mappings at parse time
const byteToCodePoint = Object.fromEntries(
  Object.entries(cp437ToUnicodeRaw).map(([byte, unicode]) => [parseInt(byte), parseInt(unicode.slice(2), 16)])
);

const codePointToByte = Object.fromEntries(
  Object.entries(byteToCodePoint).map(([byte, codePoint]) => [codePoint, parseInt(byte)])
);

// Polyfill Buffer for browser if it doesn't exist
const BufferClass = typeof Buffer !== 'undefined' ? Buffer : class Buffer extends Uint8Array {
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
    return new TextDecoder(encoding).decode(this);
  }
};

// Helper to get raw bytes from various input types
function toBytes(input) {
  if (input instanceof ArrayBuffer) {
    return new Uint8Array(input);
  }
  if (input instanceof Uint8Array || input instanceof BufferClass || input instanceof Uint8ClampedArray) {
    return new Uint8Array(input);
  }
  if (typeof input === 'string') {
    return new TextEncoder().encode(input);
  }
  throw new Error('Unsupported input type');
}

// Helper to convert bytes to desired output type
function toOutput(bytes, outputType = 'uint8array') {
  switch (outputType.toLowerCase()) {
    case 'uint8array':
      return bytes;
    case 'arraybuffer':
      return bytes.buffer;
    case 'buffer':
      return BufferClass.from(bytes);
    case 'string':
      return new TextDecoder().decode(bytes);
    case 'array':
      return Array.from(bytes);
    default:
      throw new Error('Unsupported output type');
  }
}

/**
 * Encode data to Base256 string using CP437 Unicode points
 * @param {ArrayBuffer|Uint8Array|Buffer|Uint8ClampedArray|string} input - Input data
 * @returns {string} Base256 encoded string
 */
export function encodeBase256(input) {
  const bytes = toBytes(input);
  let result = '';
  
  for (const byte of bytes) {
    const codePoint = byteToCodePoint[byte];
    if (codePoint === undefined) throw new Error(`Invalid byte value: ${byte}`);
    result += String.fromCodePoint(codePoint);
  }
  
  return result;
}

/**
 * Decode Base256 string back to bytes
 * @param {string} input - Base256 encoded string
 * @param {string} [outputType='uint8array'] - Desired output type: 'uint8array', 'arraybuffer', 'buffer', 'string', 'array'
 * @returns {Uint8Array|ArrayBuffer|Buffer|string|number[]} Decoded data in specified format
 */
export function decodeBase256(input, outputType = 'uint8array') {
  if (typeof input !== 'string') {
    throw new Error('Input must be a string');
  }
  
  const bytes = new Uint8Array(input.length);
  
  for (let i = 0; i < input.length; i++) {
    const codePoint = input.codePointAt(i);
    const byte = codePointToByte[codePoint];
    if (byte === undefined) {
      throw new Error(`Invalid Base256 character at position ${i}: ${input[i]}`);
    }
    bytes[i] = byte;
  }
  
  return toOutput(bytes, outputType);
}

// Example usage (for testing):
if (typeof window === 'undefined' && typeof process !== 'undefined') {
  const testString = "Hello, World!";
  const encoded = encodeBase256(testString);
  console.log('Encoded:', encoded);
  const decoded = decodeBase256(encoded, 'string');
  console.log('Decoded:', decoded);
}
