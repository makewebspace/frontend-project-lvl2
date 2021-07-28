import parse from './parser.js';
import format from './formaters/index.js';
import { readFile, getFileType } from './utils.js';
import buildTree from './treeBuilder.js';

export default (filepath1, filepath2, formatName) => {
  const data1 = parse(readFile(filepath1), getFileType(filepath1));
  const data2 = parse(readFile(filepath2), getFileType(filepath2));
  const innerTree = buildTree(data1, data2);
  return format(innerTree, formatName);
};
