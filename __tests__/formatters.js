import { test, beforeAll } from '@jest/globals';
import formatDiff, { FORMATS } from '../src/formatters/index.js';
import { readFile } from '../src/utils.js';
import parse from '../src/parser.js';

const getRelativePath = (filename) => `__fixtures__/${filename}`;

let diff;

beforeAll(() => {
  const content = readFile(getRelativePath('json'));
  diff = parse(content, 'json');
});

test.each(FORMATS)('%s', (formatName) => {
  const expected = readFile(getRelativePath(formatName));
  const actual = formatDiff(diff, formatName);
  expect(actual).toEqual(expected);
  expect(formatDiff([], formatName)).toBe('');
});
