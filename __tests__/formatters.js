import { test, beforeAll } from '@jest/globals';
import formatDiff, { availableFormats } from '../src/formatters/index.js';
import { readFile } from '../src/utils.js';
import parse from '../src/parser.js';

const getFixturePath = (filename) => `__fixtures__/${filename}`;

let diff;

beforeAll(() => {
  const content = readFile(getFixturePath('json'));
  diff = parse(content, 'json');
});

test.each(availableFormats)('%s', (formatName) => {
  const expected = readFile(getFixturePath(formatName));
  const actual = formatDiff(diff, formatName);
  expect(actual).toEqual(expected);
  expect(formatDiff([], formatName)).toBe('');
});
