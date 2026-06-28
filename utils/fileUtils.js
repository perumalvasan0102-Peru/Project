'use strict';

const fs = require('fs');
const path = require('path');

function readJson(filePath) {
  const abs = path.resolve(filePath);
  if (!fs.existsSync(abs)) throw new Error(`File not found: ${abs}`);
  return JSON.parse(fs.readFileSync(abs, 'utf-8'));
}

function writeJson(filePath, data) {
  const abs = path.resolve(filePath);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, JSON.stringify(data, null, 2), 'utf-8');
}

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
}

function appendToFile(filePath, content) {
  fs.appendFileSync(filePath, content + '\n', 'utf-8');
}

module.exports = { readJson, writeJson, ensureDir, appendToFile };
