import { test } from '@jest/globals';
import { readFile } from '../src/utils.js';
import genDiff, { calculateDiff } from '../src/gendiff.js';
import { DIFF_TYPE } from '../src/constants.js';

const getRelativePath = (filename) => `__fixtures__/${filename}`;

test('when files has difference', () => {
  const stylish = 'stylish';
  const expected = readFile(getRelativePath(stylish));

  const jsonFile1 = getRelativePath('file1.json');
  const jsonFile2 = getRelativePath('file2.json');
  const jsonResult = genDiff(jsonFile1, jsonFile2, stylish);
  expect(jsonResult).toBe(expected);

  const yamlFile1 = getRelativePath('file1.yml');
  const yamlFile2 = getRelativePath('file2.yml');
  const yamlResult = genDiff(yamlFile1, yamlFile2, stylish);
  expect(yamlResult).toBe(expected);
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

test('calculateDiff', () => {
  const reference = {
    common: {
      setting1: 'Value 1',
      setting2: 200,
      setting3: true,
      setting6: {
        key: 'value',
        doge: {
          wow: '',
        },
      },
      nest: 'str',
    },
  };
  const comparable = {
    common: {
      follow: false,
      setting1: 'Value 1',
      setting3: null,
      setting4: 'blah blah',
      setting5: {
        key5: 'value5',
      },
      setting6: {
        key: 'value',
        ops: 'vops',
        doge: {
          wow: 'so much',
        },
      },
      nest: {
        key: 'value',
      },
    },
  };
  const expected = [
    {
      key: 'common',
      value: [
        { key: 'follow', value: false, type: DIFF_TYPE.ADD },
        {
          key: 'nest',
          value: [
            { key: 'key', value: 'value' },
          ],
          type: DIFF_TYPE.UPD,
          prevValue: 'str',
        },
        { key: 'setting1', value: 'Value 1' },
        { key: 'setting2', value: 200, type: DIFF_TYPE.DEL },
        {
          key: 'setting3',
          value: null,
          type: DIFF_TYPE.UPD,
          prevValue: true,
        },
        { key: 'setting4', value: 'blah blah', type: DIFF_TYPE.ADD },
        {
          key: 'setting5',
          value: [
            { key: 'key5', value: 'value5' },
          ],
          type: DIFF_TYPE.ADD,
        },
        {
          key: 'setting6',
          value: [
            {
              key: 'doge',
              value: [
                {
                  key: 'wow',
                  value: 'so much',
                  type: DIFF_TYPE.UPD,
                  prevValue: '',
                },
              ],
            },
            { key: 'key', value: 'value' },
            { key: 'ops', value: 'vops', type: DIFF_TYPE.ADD },
          ],
        },
      ],
    },
  ];
  const actual = calculateDiff(reference, comparable);
  expect(actual).toEqual(expected);
});
