import { DIFF_TYPE } from './constants.js';
import {
  getUniqKeys,
  isObjects,
  isEqual,
  sort,
} from './utils.js';

const isNotEqual = (value1, value2) => !isEqual(value1, value2);

const getDiffType = (value1, value2) => {
  switch (true) {
    case value1 === undefined:
      return DIFF_TYPE.ADDED;
    case value2 === undefined:
      return DIFF_TYPE.DELETED;
    case isObjects([value1, value2]):
      return DIFF_TYPE.NESTED;
    case isNotEqual(value1, value2):
      return DIFF_TYPE.UPDATED;
    case value1 === value2:
      return DIFF_TYPE.NO_DIFF;
    default:
      throw new Error(`Unexpected case when trying to compare ${value1} and ${value2}`);
  }
};

const buildTree = (data1, data2) => {
  if (!isObjects([data1, data2])) {
    return [];
  }
  const toTreeNode = (key) => {
    const prevValue = data1[key];
    const value = data2[key];
    return {
      key,
      value,
      prevValue,
      type: getDiffType(prevValue, value),
      children: buildTree(prevValue, value),
    };
  };
  const sortedKeys = sort(getUniqKeys([data1, data2]));
  return sortedKeys.map(toTreeNode);
};

export default buildTree;
