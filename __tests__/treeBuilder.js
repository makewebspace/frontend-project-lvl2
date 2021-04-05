import buildTree from '../src/treeBuilder.js';
import { DIFF_TYPE } from '../src/constants.js';

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
  const actual = buildTree(reference, comparable);
  expect(actual).toEqual(expected);
});

test('when objects is empty', () => {
  const actual = buildTree({}, {});
  expect(actual).toEqual([]);
});
