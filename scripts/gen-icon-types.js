import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { JSDOM } from 'jsdom';
import { exit } from 'process';

// Get the current sprite file path
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SVG_FILE_PATH = path.join(__dirname, '../assets/icons/sprite.svg');

// Read the sprite content
const svgContent = fs.readFileSync(SVG_FILE_PATH, 'utf8');

// Parse the SVG content using JSDOM
const dom = new JSDOM(svgContent);
const document = dom.window.document;

// Get all <symbol> elements
const symbols = document.querySelectorAll('symbol');

// Extract the ids of the symbols
const ids = [];
symbols.forEach((symbol) => {
  const id = symbol.getAttribute('id');
  if (id) {
    ids.push(id);
  }
});

if (ids.length === 0) {
  console.log('No icons found in the sprite file');
  exit(0);
}

// Generate the TypeScript union type
const typeName = 'IconId';
const typeDefinition = `export type ${typeName} =${ids.map((id) => `\n  | '${id}'`).join('')};\n`;

// Write the TypeScript type to a file
const outputFilePath = path.join(__dirname, '../app/components/icon/icon-types.ts');
fs.writeFileSync(outputFilePath, typeDefinition, 'utf8');

console.log(`Type definitions generated and written to ${outputFilePath}`);
