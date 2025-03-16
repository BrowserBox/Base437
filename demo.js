// demo.js
// Interactive logic for the Base437 demo page

import { createEncoder, CoreMapping } from './base437.js';

let currentMapping = CoreMapping;
let encoder = createEncoder(currentMapping);

// Initialize the mapping table
function initMappingTable() {
  const table = document.getElementById('mappingTable');
  for (let i = 0; i < 256; i++) {
    const cell = document.createElement('div');
    cell.className = 'mapping-cell';
    const byte = i.toString();
    const unicode = currentMapping[byte];
    cell.textContent = String.fromCodePoint(parseInt(unicode.slice(2), 16));
    cell.title = `Byte ${byte} -> ${unicode}`;
    cell.addEventListener('click', () => editMapping(byte, cell));
    table.appendChild(cell);
  }
}

// Parse Unicode input (supports U+XXXX format only for now)
function parseUnicodeInput(input) {
  if (input && input.match(/^U\+[0-9A-F]{4}$/i)) {
    return input.toUpperCase();
  }
  return null;
}

// Edit a mapping using a dialog with metadata
function editMapping(byte, cell) {
  const dialog = document.getElementById('editMappingDialog');
  const byteInfo = document.getElementById('byteInfo');
  const originalMapping = document.getElementById('originalMapping');
  const currentChar = document.getElementById('currentChar');
  const newUnicodeInput = document.getElementById('newUnicode');
  const saveBtn = document.getElementById('saveMappingBtn');

  const unicode = currentMapping[byte];
  const codePoint = parseInt(unicode.slice(2), 16);
  const originalUnicode = CoreMapping[byte];
  const originalCodePoint = parseInt(originalUnicode.slice(2), 16);

  byteInfo.textContent = `Byte: ${byte} (0x${parseInt(byte).toString(16).padStart(2, '0').toUpperCase()})`;
  originalMapping.textContent = `OG Mapping: ${String.fromCodePoint(originalCodePoint)} (${originalUnicode})`;
  currentChar.textContent = `Current Character: ${String.fromCodePoint(codePoint)} (${unicode})`;
  newUnicodeInput.value = unicode;

  saveBtn.onclick = () => {
    const newUnicode = parseUnicodeInput(newUnicodeInput.value);
    if (newUnicode) {
      try {
        currentMapping = currentMapping.tr(byte, newUnicode).validate();
        encoder = createEncoder(currentMapping);
        const newCodePoint = parseInt(newUnicode.slice(2), 16);
        cell.textContent = String.fromCodePoint(newCodePoint);
        cell.title = `Byte ${byte} -> ${newUnicode}`;
        dialog.close();
      } catch (e) {
        alert(`Error: ${e.message}`);
      }
    } else {
      alert('Invalid Unicode format. Use "U+XXXX" where XXXX is a 4-digit hex code.');
    }
  };

  dialog.showModal();
}

// Handle input type switching
const inputText = document.getElementById('inputText');
const inputFile = document.getElementById('inputFile');
document.querySelectorAll('input[name="inputType"]').forEach(radio => {
  radio.addEventListener('change', () => {
    if (radio.value === 'text') {
      inputText.style.display = 'block';
      inputFile.style.display = 'none';
      inputFile.value = '';
    } else {
      inputText.style.display = 'none';
      inputFile.style.display = 'block';
      inputText.value = '';
    }
  });
});

// Encode to Base437
document.getElementById('encodeBtn').addEventListener('click', () => {
  const outputText = document.getElementById('outputText');
  if (inputText.style.display !== 'none' && inputText.value) {
    outputText.value = encoder.encode(inputText.value);
  } else if (inputFile.files.length > 0) {
    const file = inputFile.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const bytes = new Uint8Array(reader.result);
      outputText.value = encoder.encode(bytes);
    };
    reader.readAsArrayBuffer(file);
  } else {
    alert('Please enter text or select a file to encode.');
  }
});

// Decode from Base437
document.getElementById('decodeBtn').addEventListener('click', () => {
  const outputText = document.getElementById('outputText');
  const outputType = document.getElementById('outputType').value;
  const downloadLink = document.getElementById('downloadLink');
  if (!outputText.value) {
    alert('Please provide a Base437 string to decode.');
    return;
  }
  try {
    if (outputType === 'string') {
      inputText.value = encoder.decode(outputText.value, 'string');
      downloadLink.style.display = 'none';
    } else {
      const bytes = encoder.decode(outputText.value, 'uint8array');
      const blob = new Blob([bytes], { type: 'application/octet-stream' });
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = 'decoded_output';
      downloadLink.textContent = 'Download Decoded File';
      downloadLink.style.display = 'block';
      inputText.value = '[File decoded - click Download link]';
    }
  } catch (e) {
    alert(`Decoding error: ${e.message}`);
  }
});

// Convert demo image to Base64 if present
const demoImage = document.getElementById('demoImage');
if (demoImage) {
  const htmlSafeMapping = CoreMapping.tr('"', 'U+201C').validate();
  const htmlEncoder = createEncoder(htmlSafeMapping);
  window.onload = () => {
    const base64Src = htmlEncoder.toBase64Url(demoImage.getAttribute('src'));
    demoImage.setAttribute('src', base64Src);
    console.log('Demo image converted to Base64:', base64Src);
  };
}

// Initialize the demo
initMappingTable();
