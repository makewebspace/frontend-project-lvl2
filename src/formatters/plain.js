import { DIFF_TYPE } from '../constants.js';
import { isObject } from '../utils.js';

const getValueView = (val) => {
  if (isObject(val)) {
    return '[complex value]';
  }
  if (typeof val === 'string') {
    return `'${val}'`;
  }
  return val;
};

const getPropName = (props, key) => (props.length ? [...props, key].join('.') : key);
const getDiffView = (key, props, rest) => `Property '${getPropName(props, key)}' was ${rest}`;

const viewByType = {
  [DIFF_TYPE.ADD]: ({ key, value }, props) => getDiffView(key, props, `added with value: ${getValueView(value)}`),
  [DIFF_TYPE.DEL]: ({ key }, props) => getDiffView(key, props, 'removed'),
  [DIFF_TYPE.UPD]: ({ key, value, prevValue }, props) => {
    const rest = `updated. From ${getValueView(prevValue)} to ${getValueView(value)}`;
    return getDiffView(key, props, rest);
  },
  [DIFF_TYPE.NOT]: ({ key, children }, props, toFormat) => toFormat(children, [...props, key]),
};

const toFormat = (nodes, props) => {
  const toString = ({ type, ...node }) => viewByType[type](node, props, toFormat);
  return nodes.flatMap(toString);
};

export default (diffs = []) => toFormat(diffs, []).join('\n');
