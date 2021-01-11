import { describe, test } from '@jest/globals';
import { readFile } from '../src/utils.js';
import genDiff, { calculateDiff } from '../src/gendiff.js';
import { DIFF_TYPE } from '../src/constants.js';
import { availableFormats } from '../src/formatters/index.js';

const getRelativePath = (filename) => `__fixtures__/${filename}`;

describe('gendiff', () => {
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
});

describe('calculateDiff', () => {
  test('when objects has difference', () => {
    const reference = {
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
    };
    const comparable = {
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
    };
    const expected = [
      {
        key: 'follow',
        prevValue: undefined,
        value: false,
        type: DIFF_TYPE.ADDED,
        children: [],
      },
      {
        key: 'nest',
        prevValue: 'str',
        value: {
          key: 'value',
        },
        type: DIFF_TYPE.UPDATED,
        children: [],
      },
      {
        key: 'setting1',
        prevValue: 'Value 1',
        value: 'Value 1',
        type: DIFF_TYPE.NO_DIFF,
        children: [],
      },
      {
        key: 'setting2',
        prevValue: 200,
        value: undefined,
        type: DIFF_TYPE.DELETED,
        children: [],
      },
      {
        key: 'setting3',
        prevValue: true,
        value: null,
        type: DIFF_TYPE.UPDATED,
        children: [],
      },
      {
        key: 'setting4',
        prevValue: undefined,
        value: 'blah blah',
        type: DIFF_TYPE.ADDED,
        children: [],
      },
      {
        key: 'setting5',
        prevValue: undefined,
        value: {
          key5: 'value5',
        },
        type: DIFF_TYPE.ADDED,
        children: [],
      },
      {
        key: 'setting6',
        prevValue: {
          key: 'value',
          doge: {
            wow: '',
          },
        },
        value: {
          key: 'value',
          ops: 'vops',
          doge: {
            wow: 'so much',
          },
        },
        type: DIFF_TYPE.NESTED,
        children: [
          {
            key: 'doge',
            prevValue: {
              wow: '',
            },
            value: {
              wow: 'so much',
            },
            type: DIFF_TYPE.NESTED,
            children: [
              {
                key: 'wow',
                prevValue: '',
                value: 'so much',
                type: DIFF_TYPE.UPDATED,
                children: [],
              },
            ],
          },
          {
            key: 'key',
            prevValue: 'value',
            value: 'value',
            type: DIFF_TYPE.NO_DIFF,
            children: [],
          },
          {
            key: 'ops',
            prevValue: undefined,
            value: 'vops',
            type: DIFF_TYPE.ADDED,
            children: [],
          },
        ],
      },
    ];
    const actual = calculateDiff(reference, comparable);
    expect(actual).toEqual(expected);
  });

  test('when objects is empty', () => {
    const actual = calculateDiff({}, {});
    expect(actual).toEqual([]);
  });
});
