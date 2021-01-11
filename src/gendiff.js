import parse from './parser.js';
import formatDiff from './formatters/index.js';
import { DIFF_TYPE } from './constants.js';
import {
  readFile,
  getUniqKeys,
  getFileType,
  isObjects,
} from './utils.js';

const getDiffType = (previous, current) => {
  switch (true) {
    case previous === undefined:
      return DIFF_TYPE.ADD;
    case current === undefined:
      return DIFF_TYPE.DEL;
    case !isObjects(previous, current)
      && !Object.is(previous, current):
      return DIFF_TYPE.UPD;
    default:
      return DIFF_TYPE.NOT;
  }
};

export const calculateDiff = (reference, comparable) => {
  if (!isObjects(reference, comparable)) {
    return [];
  }
  const toDiffObject = (key) => {
    const prevValue = reference[key];
    const value = comparable[key];
    return {
      key,
      value,
      prevValue,
      type: getDiffType(prevValue, value),
      children: calculateDiff(prevValue, value),
    };
  };
  return getUniqKeys(reference, comparable).sort().map(toDiffObject);
};

export default (filepath1, filepath2, formatName) => {
  const reference = parse(readFile(filepath1), getFileType(filepath1));
  const comparable = parse(readFile(filepath2), getFileType(filepath2));
  const result = calculateDiff(reference, comparable);
  return formatDiff(result, formatName);
};
