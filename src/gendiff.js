import { readFile, getUniqKeys } from './utils.js';
import getFormatedDiff from './format.js';

const buildDiffTree = (ref, comp, tree = []) => {
  const toDiffObject = (acc, key) => {
    const refVal = ref[key];
    const compVal = comp[key];
    if (refVal === undefined) {
      acc.push({ key, val: compVal, operation: '+' });
    } else if (compVal === undefined) {
      acc.push({ key, val: refVal, operation: '-' });
    } else if (refVal !== compVal) {
      acc.push({ key, val: refVal, operation: '-' });
      acc.push({ key, val: compVal, operation: '+' });
    } else {
      acc.push({ key, val: refVal });
    }
    return acc;
  };
  return getUniqKeys(ref, comp).sort().reduce(toDiffObject, tree);
};

export default (filepath1, filepath2, format) => {
  const reference = JSON.parse(readFile(filepath1));
  const comparable = JSON.parse(readFile(filepath2));
  const result = buildDiffTree(reference, comparable);
  return getFormatedDiff(result, format);
};
