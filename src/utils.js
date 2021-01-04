import fs from 'fs';
import path from 'path';

export const getFullPath = (filepath) => path.resolve(process.cwd(), filepath);
export const readFile = (filepath) => fs.readFileSync(getFullPath(filepath), 'utf-8').trim();
export const getFileType = (filename) => path.extname(filename).substr(1);
export const isObject = (obj) => typeof obj === 'object' && obj !== null && !Array.isArray(obj);
export const getUniqKeys = (...args) => [...(new Set(args.flatMap((obj) => {
  if (!isObject(obj)) {
    throw new TypeError('Arguments should be an objects!');
  }
  return Object.keys(obj);
})))];
