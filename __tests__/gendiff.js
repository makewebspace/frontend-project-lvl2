import genDiff from '../src/gendiff.js';

test('gendiff', () => {
  const filepath1 = '__fixtures__/file1.json';
  const filepath2 = '__fixtures__/file2.json';
  const result = genDiff(filepath1, filepath2);
  expect(result).toBeTruthy();
});
