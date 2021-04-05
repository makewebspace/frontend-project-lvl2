import fs from 'fs';
import path from 'path';
import { strict as assert } from 'assert';

export const getFullPath = (filepath) => path.resolve(process.cwd(), filepath);
export const readFile = (filepath) => fs.readFileSync(getFullPath(filepath), 'utf-8').trim();
export const getFileType = (filename) => path.extname(filename).substr(1);
export const isObject = (obj) => typeof obj === 'object' && obj !== null && !Array.isArray(obj);
export const isObjects = (args) => args.flat().every(isObject);
export const isEqual = (ref, comp) => {
  if (Array.isArray(ref) && Array.isArray(comp)) {
    return ref.length === comp.length && ref.every((item) => comp.includes(item));
  }
  return Object.is(ref, comp);
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
