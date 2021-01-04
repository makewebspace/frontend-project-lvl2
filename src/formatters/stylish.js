import { DIFF_TYPE } from '../constants.js';

const toFormat = (diffs = [], nesting = 0) => {
  if (!diffs.length) return '';
  const padding = ' '.repeat(4 * nesting + 2);
  const getValueView = (val) => (Array.isArray(val) ? toFormat(val, nesting + 1) : val);
  const getDiffView = (type, key, value) => `${padding}${type} ${key}: ${getValueView(value)}`;
  const diffByType = {
    [DIFF_TYPE.ADD]: (key, val) => getDiffView('+', key, val),
    [DIFF_TYPE.DEL]: (key, val) => getDiffView('-', key, val),
    [DIFF_TYPE.UPD]: (key, val, prevVal) => `${getDiffView('-', key, prevVal)}\n${getDiffView('+', key, val)}`,
    [DIFF_TYPE.NOT]: (key, val) => getDiffView(' ', key, val),
  };
  const toString = ({ key, value, prevValue, type }) => diffByType[type](key, value, prevValue);
  return `{\n${diffs.map(toString).join('\n')}\n${padding.substring(2)}}`;
};

export default toFormat;
