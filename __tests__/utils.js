import { test } from '@jest/globals';
import { getUniqKeys, isObject } from '../src/utils.js';

test('getUniqKeys', () => {
  expect(getUniqKeys({}, {}, {})).toEqual([]);

  const expected = ['a', 'b', 'c'];
  expect(getUniqKeys({ a: 1, b: 2, c: 3 })).toEqual(expected);
  expect(getUniqKeys({ a: 1 }, { b: 2, c: 3 })).toEqual(expected);
  expect(getUniqKeys({ a: 1 }, { b: 2 }, { c: 3 })).toEqual(expected);

  expect(() => getUniqKeys(null)).toThrow();
  expect(() => getUniqKeys(undefined)).toThrow();
  expect(() => getUniqKeys([])).toThrow();
  expect(() => getUniqKeys(123)).toThrow();
  expect(() => getUniqKeys('str')).toThrow();
  expect(() => getUniqKeys(true)).toThrow();
  expect(() => getUniqKeys(NaN)).toThrow();
  expect(() => getUniqKeys(BigInt(1))).toThrow();
  expect(() => getUniqKeys(Symbol('1'))).toThrow();
  expect(() => getUniqKeys(() => {})).toThrow();
});

test('isObject', () => {
  expect(isObject({})).toBeTruthy();
  expect(isObject(Object.create(null))).toBeTruthy();

  expect(isObject(null)).not.toBeTruthy();
  expect(isObject([])).not.toBeTruthy();
  expect(isObject('string')).not.toBeTruthy();
  expect(isObject(NaN)).not.toBeTruthy();
  expect(isObject(() => {})).not.toBeTruthy();
  expect(isObject(true)).not.toBeTruthy();
  expect(isObject(123)).not.toBeTruthy();
  expect(isObject(Symbol('1'))).not.toBeTruthy();
  expect(isObject(undefined)).not.toBeTruthy();
  expect(isObject(BigInt(1))).not.toBeTruthy();
});
