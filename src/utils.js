import fs from 'fs';
import path from 'path';
import assert from 'assert';

export const getFullPath = (filepath) => path.resolve(process.cwd(), filepath);
export const readFile = (filepath) => fs.readFileSync(getFullPath(filepath), 'utf-8').trim();
export const getFileType = (filename) => path.extname(filename).substr(1);
export const isObject = (obj) => typeof obj === 'object' && obj !== null && !Array.isArray(obj);
export const isObjects = (...args) => args.flat().every(isObject);
export const getUniqKeys = (...args) => {
  assert(isObjects(args), 'Arguments should be an objects!');
  const allKeysFromObjects = args.flatMap(Object.keys);
  return Array.from(new Set(allKeysFromObjects));
};
