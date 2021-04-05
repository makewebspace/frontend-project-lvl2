import { describe, test } from '@jest/globals';
import { readFile } from '../src/utils.js';
import genDiff from '../src/gendiff.js';
import { availableFormats } from '../src/formatters/index.js';

const getRelativePath = (filename) => `__fixtures__/${filename}`;

describe('when files has difference', () => {
  const jsonFile1 = getRelativePath('file1.json');
  const jsonFile2 = getRelativePath('file2.json');

  const yamlFile1 = getRelativePath('file1.yml');
  const yamlFile2 = getRelativePath('file2.yml');

  const actual = {
    json: (formatName) => genDiff(jsonFile1, jsonFile2, formatName),
    yaml: (formatName) => genDiff(yamlFile1, yamlFile2, formatName),
  };

  test.each(availableFormats)('in %s format', (formatName) => {
    const expected = readFile(getRelativePath(formatName));
    expect(actual.json(formatName)).toBe(expected);
    expect(actual.yaml(formatName)).toBe(expected);
  });
});

test('when file does not exist', () => {
  const filepath1 = getRelativePath('file1.json');
  expect(() => genDiff(filepath1, 'wrong-file')).toThrow(/ENOENT/);
});

test('when output format is wrong', () => {
  const filepath1 = getRelativePath('file1.json');
  expect(() => genDiff(filepath1, filepath1, 'wrongFormat')).toThrow(/Wrong output format/);
});

test('when file type is wrong', () => {
  const filepath1 = getRelativePath('file1.yml');
  const filepath2 = getRelativePath('empty.ini');
  expect(() => genDiff(filepath1, filepath2)).toThrow(/Wrong filetype/);
});
