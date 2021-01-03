import parse from './parser.js';
import formateDiff from './format.js';
import { DIFF_TYPE } from './constants.js';
import {
  readFile,
  getUniqKeys,
  getFileType,
  isObject,
} from './utils.js';

export const calculateDiff = (ref, comp, tree = []) => {
  const getValueBy = (val) => (isObject(val) ? calculateDiff(val, val) : val);
  const toDiffObject = (acc, key) => {
    const refVal = ref[key];
    const compVal = comp[key];
    const diff = { key, value: refVal };
    if (refVal === undefined) {
      diff.type = DIFF_TYPE.ADD;
      diff.value = getValueBy(compVal);
    } else if (compVal === undefined) {
      diff.type = DIFF_TYPE.DEL;
      diff.value = getValueBy(refVal);
    } else if (isObject(refVal) && isObject(compVal)) {
      diff.value = calculateDiff(refVal, compVal);
    } else if (refVal !== compVal) {
      diff.type = DIFF_TYPE.UPD;
      diff.value = getValueBy(compVal);
      diff.prevValue = getValueBy(refVal);
    }
    acc.push(diff);
    return acc;
  };
  return getUniqKeys(ref, comp).sort().reduce(toDiffObject, tree);
};

export default (filepath1, filepath2, format) => {
  const reference = parse(readFile(filepath1), getFileType(filepath1));
  const comparable = parse(readFile(filepath2), getFileType(filepath2));
  const result = calculateDiff(reference, comparable);
  return formateDiff(result, format);
};
