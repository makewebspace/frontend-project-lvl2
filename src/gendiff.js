import parse from './parser.js';
import formatDiff from './formatters/index.js';
import { readFile, getFileType } from './utils.js';
import buildTree from './treeBuilder.js';

export default (filepath1, filepath2, formatName) => {
  const reference = parse(readFile(filepath1), getFileType(filepath1));
  const comparable = parse(readFile(filepath2), getFileType(filepath2));
  const result = buildTree(reference, comparable);
  return formatDiff(result, formatName);
};
