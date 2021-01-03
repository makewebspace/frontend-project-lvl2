import { DIFF_TYPE } from './constants.js';

const formaters = {
  json: (diffs) => JSON.stringify(diffs, null, 2),
  stylish: (diffs, nest = 0) => {
    const padding = ' '.repeat(4 * nest + 2);
    const getValueView = (val) => (Array.isArray(val) ? formaters.stylish(val, nest + 1) : val);
    const getDiffView = (type, key, value) => `${padding}${type} ${key}: ${getValueView(value)}`;
    const diffByType = {
      [DIFF_TYPE.ADD]: (key, val) => getDiffView('+', key, val),
      [DIFF_TYPE.DEL]: (key, val) => getDiffView('-', key, val),
      [DIFF_TYPE.UPD]: (key, val, prevVal) => `${getDiffView('-', key, prevVal)}\n${getDiffView('+', key, val)}`,
      [undefined]: (key, val) => getDiffView(' ', key, val),
    };
    const toString = ({ key, value, prevValue, type }) => diffByType[type](key, value, prevValue);
    return `{\n${diffs.map(toString).join('\n')}\n${padding.substring(2)}}`;
  },
};

export const availableFormats = Object.keys(formaters);

export default (diffs, format) => {
  if (!availableFormats.includes(format)) {
    throw Error(`Wrong output format! Available formats to output is ${availableFormats.join(', ')}`);
  }
  const toFormat = formaters[format];
  return toFormat(diffs);
};
