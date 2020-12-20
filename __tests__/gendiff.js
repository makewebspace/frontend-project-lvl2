import genDiff from '../src/gendiff.js';
import { readFile } from '../src/utils.js';

const getRelativePath = (filename) => `__fixtures__/flat/${filename}`;

test('when files has difference', () => {
  const filepath1 = getRelativePath('file1.json');
  const filepath2 = getRelativePath('file2.json');
  const expected = readFile(getRelativePath('stylish_case1.txt'));
  const result = genDiff(filepath1, filepath2);
  expect(result).toBe(expected);
});

test('when files has not difference', () => {
  const filepath1 = getRelativePath('file1.json');
  const expected = readFile(getRelativePath('stylish_case2.txt'));
  const result = genDiff(filepath1, filepath1);
  expect(result).toBe(expected);
});

test('when file does not exist', () => {
  const filepath1 = getRelativePath('file1.json');
  expect(() => genDiff(filepath1, 'wrong-file')).toThrow(/ENOENT/);
});

test('when output format is wrong', () => {
  const filepath1 = getRelativePath('file1.json');
  expect(() => genDiff(filepath1, filepath1, 'wrongFormat')).toThrow('formatTo[format] is not a function');
});
