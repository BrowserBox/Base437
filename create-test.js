#!/usr/bin/env node
// create-test.js
// Generates a styled Base437 demo page with interactive elements

import { createEncoder, CoreMapping } from './base437.js';
import fs from 'fs';

const imagePath = process.argv[2];
let base437Url = '';
if (imagePath) {
  const imageBuffer = fs.readFileSync(imagePath);
  const htmlSafeMapping = CoreMapping.tr('"', 'U+201C').validate();
  const htmlEncoder = createEncoder(htmlSafeMapping);
  const base437Data = htmlEncoder.encode(new Uint8Array(imageBuffer));
  base437Url = `data:image/png;base437,${base437Data}`;
}

// HTML content with inline CSS and structure
const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Base437 Interactive Demo</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f0f0f0;
    }
    h1 {
      color: #333;
      text-align: center;
    }
    .container {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
    }
    .section {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      flex: 1;
      min-width: 300px;
    }
    .mapping-section {
      overflow-x: auto; /* Enable horizontal scrolling */
    }
    .mapping-table {
      display: grid;
      grid-template-columns: repeat(16, 1fr);
      gap: 2px;
      margin: 10px 0;
      font-size: 12px;
      min-width: 600px; /* Ensure table doesn't shrink too much */
    }
    .mapping-cell {
      border: 1px solid #ddd;
      padding: 5px;
      text-align: center;
      cursor: pointer;
      background: #fff;
    }
    .mapping-cell:hover {
      background: #f5f5f5;
    }
    textarea, input[type="text"] {
      width: 100%;
      padding: 8px;
      margin: 5px 0;
      box-sizing: border-box;
      font-family: monospace;
    }
    button {
      padding: 8px 16px;
      margin: 5px 0;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background: #0056b3;
    }
    select {
      padding: 8px;
      margin: 5px 0;
    }
    #downloadLink {
      display: none;
      margin-top: 10px;
    }
    img {
      max-width: 100%;
      height: auto;
      margin-top: 10px;
    }
    dialog {
      border: 2px solid #ddd;
      border-radius: 8px;
      padding: 20px;
      background: #fff;
      font-family: Arial, sans-serif;
      max-width: 400px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }
    dialog h3 {
      margin: 0 0 15px;
      color: #333;
      font-size: 18px;
      text-align: center;
    }
    dialog .metadata {
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;
      font-size: 14px;
    }
    dialog .metadata div {
      display: flex;
      align-items: center;
      gap: 5px;
    }
    dialog .metadata .byte-info {
      font-weight: bold;
      color: #555;
    }
    dialog .metadata .char-display {
      font-size: 16px;
      font-weight: bold;
      color: #007bff;
    }
    dialog .metadata .char-display span {
      font-weight: normal;
      color: #666;
      font-size: 12px;
    }
    dialog .metadata .char-display.og {
      color: #28a745;
    }
    dialog .input-section {
      margin-bottom: 15px;
    }
    dialog label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
      color: #333;
    }
    dialog input {
      width: 100%;
      padding: 5px;
      font-family: monospace;
      border: 1px solid #ddd;
      border-radius: 4px;
      box-sizing: border-box;
    }
    dialog .live-preview {
      margin-top: 5px;
      font-size: 14px;
      color: #555;
    }
    dialog .live-preview span {
      font-size: 16px;
      font-weight: bold;
      color: #ff6f61;
    }
    dialog .dialog-buttons {
      text-align: right;
    }
    dialog button {
      padding: 8px 16px;
      margin-left: 10px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    dialog button:hover {
      background: #0056b3;
    }
    dialog button.cancel {
      background: #dc3545;
    }
    dialog button.cancel:hover {
      background: #c82333;
    }
  </style>
</head>
<body>
  <h1>Base437 Interactive Demo</h1>
  <div class="container">
    <div class="section mapping-section">
      <h2>Mapping Table (Edit to Customize)</h2>
      <div id="mappingTable" class="mapping-table"></div>
    </div>
    <div class="section">
      <h2>Encode/Decode</h2>
      <label><input type="radio" name="inputType" value="text" checked> Text</label>
      <label><input type="radio" name="inputType" value="file"> File</label>
      <textarea id="inputText" rows="4" placeholder="Enter text to encode..."></textarea>
      <input type="file" id="inputFile" style="display: none;">
      <button id="encodeBtn">Encode to Base437</button>
      <textarea id="outputText" rows="4" placeholder="Base437 output will appear here..."></textarea>
      <button id="decodeBtn">Decode from Base437</button>
      <select id="outputType">
        <option value="string">String</option>
        <option value="file">File</option>
      </select>
      <a id="downloadLink" download="decoded_output">Download Decoded File</a>
    </div>
    ${base437Url ? `
    <div class="section">
      <h2>Demo Image (Base437 Encoded)</h2>
      <p>This image is loaded from a Base437 data URL and converted to Base64.</p>
      <img id="demoImage" src="${base437Url}" alt="Demo Image" width="200">
    </div>` : ''}
  </div>
  <dialog id="editMappingDialog">
    <h3>Edit Mapping</h3>
    <div class="metadata">
      <div class="byte-info" id="byteInfo"></div>
      <div>
        <div class="char-display og" id="originalMapping"></div>
        <div class="char-display" id="currentChar"></div>
      </div>
    </div>
    <div class="input-section">
      <label for="newUnicode">New Unicode Value:</label>
      <input type="text" id="newUnicode" placeholder="e.g., U+2060">
      <div class="live-preview" id="livePreview">Live Preview: <span>-</span></div>
    </div>
    <div class="dialog-buttons">
      <button class="cancel" onclick="document.getElementById('editMappingDialog').close()">Cancel</button>
      <button id="saveMappingBtn">Save</button>
    </div>
  </dialog>
  <script type="module" src="demo.js"></script>
</body>
</html>
`.trim();

// Write the index.html file
fs.writeFileSync('index.html', htmlContent);
console.log('Created index.html with Base437 interactive demo');
