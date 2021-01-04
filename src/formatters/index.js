import assert from 'assert';
import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatters = { stylish, plain, json };
export const FORMATS = Object.keys(formatters);
const errorMessage = `Wrong output format! Available formats to output should be ${FORMATS.join(', ')}`;

export default (diffs, formatName) => {
  assert(FORMATS.includes(formatName), errorMessage);
  const toFormat = formatters[formatName];
  return toFormat(diffs);
};
