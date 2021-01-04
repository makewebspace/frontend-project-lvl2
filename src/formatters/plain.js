import { DIFF_TYPE } from '../constants.js';

const getValueView = (val) => {
  if (Array.isArray(val)) {
    return '[complex value]';
  }
  if (typeof val === 'string') {
    return `'${val}'`;
  }
  return val;
};

const toFormat = (diffs = [], props = []) => {
  const getPropName = (key) => (props.length ? [...props, key].join('.') : key);
  const getDiffView = (key, rest) => `Property '${getPropName(key)}' was ${rest}`;
  const diffByType = {
    [DIFF_TYPE.ADD]: (key, val) => getDiffView(key, `added with value: ${getValueView(val)}`),
    [DIFF_TYPE.DEL]: (key) => getDiffView(key, 'removed'),
    [DIFF_TYPE.UPD]: (key, val, prevVal) => getDiffView(key, `updated. From ${getValueView(prevVal)} to ${getValueView(val)}`),
    [DIFF_TYPE.NOT]: (key, val, prevVal) => {
      if (Array.isArray(val)) {
        return toFormat(val, [...props, key]);
      }
      if (Array.isArray(prevVal)) {
        return toFormat(prevVal, [...props, key]);
      }
      return '';
    },
  };
  const toString = ({ key, value, prevValue, type }) => diffByType[type](key, value, prevValue);
  return diffs.map(toString).filter(Boolean).join('\n');
};

export default toFormat;
