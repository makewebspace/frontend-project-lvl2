import fs from 'fs';
import path from 'path';

export const getFullPath = (filepath) => path.resolve(process.cwd(), filepath);
export const readFile = (filepath) => fs.readFileSync(getFullPath(filepath), 'utf-8');
export const getUniqKeys = (...args) => [...(new Set(args.flatMap((obj) => Object.keys(obj))))];
