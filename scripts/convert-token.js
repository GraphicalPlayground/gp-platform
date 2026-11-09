// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

// eslint-disable-next-line
const fs = require('node:fs');
// eslint-disable-next-line
const path = require('node:path');
// eslint-disable-next-line
const process = require('node:process');

const args = process.argv.slice(2);

if (args.length < 2) {
  // eslint-disable-next-line no-console
  console.error('Usage: node convert-token.js <input-file> <output-file>');
  process.exit(1);
}

const [rawInputFile, rawOutputFile] = args.filter((arg) => !arg.startsWith('--'));
const inputFile = path.resolve(rawInputFile);

if (!fs.existsSync(inputFile)) {
  // eslint-disable-next-line no-console
  console.error(`Input file does not exist: ${inputFile}`);
  process.exit(1);
}

if (args.includes('--light') && args.includes('--dark')) {
  // eslint-disable-next-line no-console
  console.error('Cannot specify both --light and --dark flags');
  process.exit(1);
}
const isLightTheme = args.includes('--light');

const parseJsonFile = (filePath) => {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

const parseJsFile = (filePath) => {
  delete require.cache[require.resolve(filePath)];

  // eslint-disable-next-line
  return require(filePath);
};

let parsedData = {};

const extension = path.extname(inputFile).toLowerCase();

if (extension === '.json') {
  parsedData = parseJsonFile(inputFile);
} else if (extension === '.js') {
  parsedData = parseJsFile(inputFile);
} else {
  // eslint-disable-next-line no-console
  console.error(`Unsupported input file format: ${extension}`);
  process.exit(1);
}

const flattenObject = (obj, prefix = '', result = {}) => {
  for (const key in obj) {
    if (Object.hasOwn(obj, key)) {
      const propName = prefix ? `${prefix}.${key}` : key;
      const value = obj[key];

      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        flattenObject(value, propName, result);
      } else {
        result[propName] = value;
      }
    }
  }

  return result;
};

const flattenedData = flattenObject(parsedData);

const toKebabCase = (str) => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
};

const normalizeVariables = (value) => {
  if (typeof value !== 'string') {
    return value;
  }

  if (value.match(/^\{.*\}$/)) {
    value = 'var(--' + value.replace(/^\{(.*)\}$/, '$1').replace(/\./g, '-') + ')';
  }

  if (!value.startsWith('var(--')) {
    return value;
  }

  return value
    .replace(/base/g, 'gp')
    .replace(/brand/g, 'gp')
    .replace(/color-scale/g, 'color');
};

// Separate the variables into base and responsive groups
const baseTokens = {};
const mediaQueries = {};

Object.entries(flattenedData).forEach(([key, value]) => {
  if (key.includes('.$')) return;

  const isDark = key.endsWith('.dark');
  const isValue = key.endsWith('.value');

  const parts = key.split('.');
  let breakpoint = null;

  const responsiveIdx = parts.indexOf('responsive');

  if (responsiveIdx !== -1 && parts.length > responsiveIdx + 1) {
    breakpoint = parts[responsiveIdx + 1];
  }

  if (isLightTheme && isDark) return;

  if (!isLightTheme && isValue) {
    const variantBaseKey = key.slice(0, -6); // removes '.value'

    if (flattenedData[`${variantBaseKey}.dark`] !== undefined) {
      return;
    }
  }

  const cssKeyParts = parts.filter((p) => p !== 'value' && p !== 'dark' && p !== 'responsive' && p !== breakpoint);
  const normalizedKey = '--gp-' + cssKeyParts.map(toKebabCase).join('-');
  const normalizedValue = normalizeVariables(value);

  if (breakpoint) {
    if (!mediaQueries[breakpoint]) mediaQueries[breakpoint] = {};
    mediaQueries[breakpoint][normalizedKey] = normalizedValue;
  } else {
    baseTokens[normalizedKey] = normalizedValue;
  }
});

const generateCssVariables = (base, media) => {
  const outputLines = [];

  // Output Base Tokens First
  Object.entries(base).forEach(([key, value]) => {
    outputLines.push(`${key}: ${value};`);
  });

  // Output Responsive Tokens Wrapped in Media Queries
  Object.entries(media).forEach(([breakpoint, tokens]) => {
    outputLines.push(`\n@media (min-width: ${breakpoint}) {`);

    Object.entries(tokens).forEach(([key, value]) => {
      outputLines.push(`  ${key}: ${value};`);
    });

    outputLines.push(`}`);
  });

  return outputLines.join('\n');
};

const cssVariables = generateCssVariables(baseTokens, mediaQueries);

if (rawOutputFile === 'console') {
  // eslint-disable-next-line no-console
  console.log(cssVariables);
} else {
  const outputFile = path.resolve(rawOutputFile);

  if (fs.existsSync(outputFile) && args.includes('--force') === false) {
    // eslint-disable-next-line no-console
    console.error(`Output file already exists: ${outputFile}`);
    process.exit(1);
  }

  fs.writeFileSync(outputFile, cssVariables, 'utf8');
}
