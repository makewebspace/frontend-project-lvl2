import { test } from '@jest/globals';
import genDiff from '../src/gendiff.js';
import { readFile } from '../src/utils.js';

const getRelativePath = (filename) => `__fixtures__/flat/${filename}`;

test('when files has difference', () => {
  const expected = readFile(getRelativePath('stylish_case1.txt'));

  const jsonFile1 = getRelativePath('file1.json');
  const jsonFile2 = getRelativePath('file2.json');
  const jsonResult = genDiff(jsonFile1, jsonFile2);
  expect(jsonResult).toBe(expected);

  const yamlFile1 = getRelativePath('file1.yml');
  const yamlFile2 = getRelativePath('file2.yml');
  const yamlResult = genDiff(yamlFile1, yamlFile2);
  expect(yamlResult).toBe(expected);
});

test('when files has not difference', () => {
  const expected = readFile(getRelativePath('stylish_case2.txt'));

  const jsonFile = getRelativePath('file1.json');
  const jsonResult = genDiff(jsonFile, jsonFile);
  expect(jsonResult).toBe(expected);

  const yamlFile = getRelativePath('file1.yml');
  const yamlResult = genDiff(yamlFile, yamlFile);
  expect(yamlResult).toBe(expected);
});

test('when file does not exist', () => {
  const filepath1 = getRelativePath('file1.json');
  expect(() => genDiff(filepath1, 'wrong-file')).toThrow(/ENOENT/);
});

test('when output format is wrong', () => {
  const filepath1 = getRelativePath('file1.json');
  expect(() => genDiff(filepath1, filepath1, 'wrongFormat')).toThrow('formatTo[format] is not a function');
});

test('when file type is wrong', () => {
  const filepath1 = getRelativePath('file1.yml');
  const filepath2 = getRelativePath('empty.ini');
  expect(() => genDiff(filepath1, filepath2)).toThrow('Wrong filetype');
});
