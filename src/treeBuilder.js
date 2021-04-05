import { DIFF_TYPE } from './constants.js';
import {
  getUniqKeys,
  isObjects,
  isEqual,
  sort,
} from './utils.js';

const isNotEqual = (val1, val2) => !isEqual(val1, val2);

const getDiffType = (previous, current) => {
  switch (true) {
    case previous === undefined:
      return DIFF_TYPE.ADDED;
    case current === undefined:
      return DIFF_TYPE.DELETED;
    case isObjects([previous, current]):
      return DIFF_TYPE.NESTED;
    case isNotEqual(previous, current):
      return DIFF_TYPE.UPDATED;
    case previous === current:
      return DIFF_TYPE.NO_DIFF;
    default:
      throw new Error(`Unexpected case when trying to compare ${previous} and ${current}`);
  }
};

const buildTree = (reference, comparable) => {
  if (!isObjects([reference, comparable])) {
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
      children: buildTree(prevValue, value),
    };
  };
  const sortedKeys = sort(getUniqKeys([reference, comparable]));
  return sortedKeys.map(toDiffObject);
};

export default buildTree;
