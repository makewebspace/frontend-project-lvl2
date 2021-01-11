import { DIFF_TYPE } from '../constants.js';
import { isObject } from '../utils.js';

const getIndent = (depth, spaceCount = 4) => ' '.repeat(spaceCount * depth + 2);
const toBrackets = (output, depth) => `{\n${output.join('\n')}\n${getIndent(depth).substr(2)}}`;

const stringify = (val, depth) => {
  if (!isObject(val)) {
    return val;
  }
  const toString = ([key, value]) => `${getIndent(depth)}  ${key}: ${stringify(value, depth + 1)}`;
  const output = Object.entries(val).map(toString);
  return toBrackets(output, depth);
};

const getDiffView = (key, val, token, depth) => `${getIndent(depth)}${token} ${key}: ${stringify(val, depth + 1)}`;

const viewByType = {
  [DIFF_TYPE.ADDED]: ({ key, value }, depth) => getDiffView(key, value, '+', depth),
  [DIFF_TYPE.DELETED]: ({ key, prevValue }, depth) => getDiffView(key, prevValue, '-', depth),
  [DIFF_TYPE.UPDATED]: ({ key, value, prevValue }, depth) => {
    const deleted = getDiffView(key, prevValue, '-', depth);
    const added = getDiffView(key, value, '+', depth);
    return [deleted, added].join('\n');
  },
  [DIFF_TYPE.NESTED]: ({ key, children }, depth, toFormat) => {
    const nestedValue = toFormat(children, depth + 1);
    return getDiffView(key, nestedValue, ' ', depth);
  },
  [DIFF_TYPE.NO_DIFF]: ({ key, value, children }, depth, toFormat) => {
    const nestedValue = children.length ? toFormat(children, depth + 1) : value;
    return getDiffView(key, nestedValue, ' ', depth);
  },
};

const toFormat = (nodes, depth) => {
  const output = nodes.map((node) => viewByType[node.type](node, depth, toFormat));
  return toBrackets(output, depth);
};

export default (diffs = []) => (diffs.length ? toFormat(diffs, 0) : '');
