import { test } from '@jest/globals';
import { readFile } from '../src/utils.js';
import parse from '../src/parser.js';
import formatDiff, { availableFormats } from '../src/formaters/index.js';

const getFixturePath = (filename) => `__fixtures__/${filename}`;

const content = readFile(getFixturePath('json'));
const diff = parse(content, 'json');

test.each(availableFormats)('%s', (formatName) => {
  const expected = readFile(getFixturePath(formatName));
  const actual = formatDiff(diff, formatName);
  expect(actual).toEqual(expected);
  expect(formatDiff([], formatName)).toBe('');
});
