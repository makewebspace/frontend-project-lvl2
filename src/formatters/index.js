import assert from 'assert';
import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';
import { FORMAT_NAME } from '../constants.js';

const formatters = {
  [FORMAT_NAME.STYLISH]: stylish,
  [FORMAT_NAME.PLAIN]: plain,
  [FORMAT_NAME.JSON]: json,
};
export const availableFormats = Object.keys(formatters);
const errorMessage = `Wrong output format! Available formats to output should be ${availableFormats.join(', ')}`;

export default (diffs, formatName = FORMAT_NAME.STYLISH) => {
  assert(availableFormats.includes(formatName), errorMessage);
  const toFormat = formatters[formatName];
  return toFormat(diffs);
};
