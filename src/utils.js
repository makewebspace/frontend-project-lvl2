import fs from 'fs';
import path from 'path';
import { strict as assert } from 'assert';

export const getFullPath = (filepath) => path.resolve(process.cwd(), filepath);
export const readFile = (filepath) => fs.readFileSync(getFullPath(filepath), 'utf-8').trim();
export const getFileType = (filename) => path.extname(filename).substr(1);
export const isObject = (obj) => typeof obj === 'object' && obj !== null && !Array.isArray(obj);
export const isObjects = (args) => args.flat().every(isObject);
export const isEqual = (value1, value2) => {
  if (Array.isArray(value1) && Array.isArray(value2)) {
    return value1.length === value2.length && value1.every((item) => value2.includes(item));
  }
  return Object.is(value1, value2);
};
export const getUniqKeys = (args) => {
  assert(isObjects(args), 'Arguments should be an objects!');
  const allKeysFromObjects = args.flatMap(Object.keys);
  return Array.from(new Set(allKeysFromObjects));
};
export const sort = (arr) => {
  assert(Array.isArray(arr), 'Argument should be an array');
  const _ = [...arr];
  return _.sort();
};
