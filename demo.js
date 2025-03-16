// demo.js
// Interactive logic for the Base437 demo page

import { createEncoder, CoreMapping } from './base437.js';

let currentMapping = CoreMapping;
let encoder = createEncoder(currentMapping);
let mappingStack = [currentMapping]; // Stack to store previous mappings

// Add at the top of demo.js, after imports
const mappingFileInput = document.createElement('input');
mappingFileInput.type = 'file';
mappingFileInput.accept = '.json';
mappingFileInput.style.marginBottom = '10px';
mappingFileInput.addEventListener('change', handleMappingImport);

const saveMappingBtn = document.createElement('button');
saveMappingBtn.textContent = 'Save Mapping as JSON';
saveMappingBtn.style.marginLeft = '10px';
saveMappingBtn.addEventListener('click', handleMappingExport);

function handleMappingImport(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const importedMapping = JSON.parse(reader.result);
      // Validate the imported mapping
      const newMapping = Object.assign({}, CoreMapping, importedMapping).validate();
      currentMapping = newMapping;
      mappingStack.push(newMapping);
      encoder = createEncoder(currentMapping);
      // Refresh the table
      const table = document.getElementById('mappingTable');
      table.innerHTML = '';
      initMappingTable();
      alert('Mapping imported successfully!');
    } catch (e) {
      alert(`Import Error: ${e.message}`);
    }
  };
  reader.readAsText(file);
}

async function handleMappingExport() {
  const mappingJson = JSON.stringify(currentMapping, null, 2);
  if ('showSaveFilePicker' in window) {
    // Use File System Access API if available
    try {
      const handle = await window.showSaveFilePicker({
        suggestedName: 'base437_mapping.json',
        types: [{
          description: 'JSON File',
          accept: { 'application/json': ['.json'] },
        }],
      });
      const writable = await handle.createWritable();
      await writable.write(mappingJson);
      await writable.close();
      alert('Mapping saved successfully!');
    } catch (e) {
      if (e.name !== 'AbortError') alert(`Save Error: ${e.message}`);
    }
  } else {
    // Fallback to download link
    const blob = new Blob([mappingJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'base437_mapping.json';
    a.click();
    URL.revokeObjectURL(url);
  }
}

// Modify initMappingTable to add the file controls
function initMappingTable() {
  const tableContainer = document.getElementById('mappingTable').parentElement;
  const fileControls = document.createElement('div');
  fileControls.appendChild(mappingFileInput);
  fileControls.appendChild(saveMappingBtn);
  tableContainer.insertBefore(fileControls, document.getElementById('mappingTable'));
  const table = document.getElementById('mappingTable');
  for (let i = 0; i < 256; i++) {
    const cell = document.createElement('div');
    cell.className = 'mapping-cell';
    const byte = i.toString();
    const unicode = currentMapping[byte];
    cell.textContent = String.fromCodePoint(parseInt(unicode.slice(2), 16));
    cell.title = `${byte} -> ${unicode}`;
    cell.addEventListener('click', (e) => {
      // Close any open dialog and open a new one for the clicked cell
      const dialog = document.getElementById('editMappingDialog');
      if (dialog.open) {
        dialog.close();
      }
      editMapping(byte, cell);
    });
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

// Edit a mapping using a dialog with enhanced UX
function editMapping(byte, cell) {
  const dialog = document.getElementById('editMappingDialog');
  const byteInfo = document.getElementById('byteInfo');
  const originalMapping = document.getElementById('originalMapping');
  const currentCharEl = document.getElementById('currentChar');
  const newUnicodeInput = document.getElementById('newUnicode');
  const livePreview = document.getElementById('livePreview').querySelector('span');
  const saveBtn = document.getElementById('saveMappingBtn');

  const unicode = currentMapping[byte];
  const codePoint = parseInt(unicode.slice(2), 16);
  const originalUnicode = CoreMapping[byte];
  const originalCodePoint = parseInt(originalUnicode.slice(2), 16);
  const byteNum = parseInt(byte);
  const currentChar = String.fromCodePoint(codePoint);

  // Display byte info with binary character (if displayable: ASCII 32–126)
  let byteValue = String.fromCharCode(1);
  if (byteNum >= 32 && byteNum <= 126) {
    byteValue = `${String.fromCharCode(byteNum)}`;
  }
  let byteDisplay = `<div class=char-display>${byteValue} <span>${byteNum} (0x${byteNum.toString(16).padStart(2, '0').toUpperCase()})</span></div>`;
  byteInfo.innerHTML = byteDisplay;

  // Always display OG and current characters in the table
  originalMapping.innerHTML = `<div class="char-display og">${String.fromCodePoint(originalCodePoint)} <span>(${originalUnicode})</span></div>`;
  currentCharEl.innerHTML = `<div class="char-display current">${currentChar} <span>(${unicode})</span></div>`;

  // Set initial input value
  newUnicodeInput.value = unicode;

  // Live preview on input
  newUnicodeInput.oninput = () => {
    const newUnicode = parseUnicodeInput(newUnicodeInput.value);
    if (newUnicode) {
      const newCodePoint = parseInt(newUnicode.slice(2), 16);
      livePreview.textContent = String.fromCodePoint(newCodePoint);
    } else {
      livePreview.textContent = '-';
    }
  };

  saveBtn.onclick = () => {
    const newUnicode = parseUnicodeInput(newUnicodeInput.value);
    if (newUnicode) {
      try {
        // Create a new mapping with the updated value
        const newMapping = currentMapping.tr(currentChar, newUnicode).validate();
        // If validation succeeds, update the current mapping and push to stack
        currentMapping = newMapping;
        mappingStack.push(newMapping);
        encoder = createEncoder(currentMapping);
        const newCodePoint = parseInt(newUnicode.slice(2), 16);
        // Update the cell display and title
        cell.textContent = String.fromCodePoint(newCodePoint);
        cell.title = `${byte} -> ${newUnicode}`;
        dialog.close();
        console.log(mappingStack, {byte,newUnicode});
      } catch (e) {
        // If validation fails, revert to the previous good mapping
        if (mappingStack.length > 0) {
          currentMapping = mappingStack[mappingStack.length - 1];
          encoder = createEncoder(currentMapping);
        }
        // Show a styled alert with Unicode warning symbol and formatted error
        alert(
          `⚠️ Validation Error\n\n\t${e.message}\n\nReverted to previous mapping.`
        );
      }
    } else {
      alert(
        `⚠️ Input Error\n\n\tInvalid Unicode format.\n\tUse "U+XXXX" where XXXX is a 4-digit hex code.`
      );
    }
  };

  dialog.show();
  newUnicodeInput.oninput();
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
