/* eslint-disable object-curly-newline */
import { DIFF_TYPE } from '../constants.js';
import { isObject } from '../utils.js';

const stringify = (value) => {
  if (value === null) {
    return null;
  }
  if (isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return String(value);
};

const format = (nodes, path) => {
  const toString = ({ key, type, value, prevValue, children }) => {
    const property = path ? `${path}.${key}` : key;
    switch (type) {
      case DIFF_TYPE.ADDED:
        return `Property '${property}' was added with value: ${stringify(value)}`;
      case DIFF_TYPE.DELETED:
        return `Property '${property}' was removed`;
      case DIFF_TYPE.UPDATED:
        return `Property '${property}' was updated. From ${stringify(prevValue)} to ${stringify(value)}`;
      case DIFF_TYPE.NESTED:
        return format(children, property);
      case DIFF_TYPE.NO_DIFF:
        return format(children, property);
      default:
        throw new Error(`Unknown inner tree node type ${type}`);
    }
  };
  return nodes.flatMap(toString);
};

export default (innerTree = []) => format(innerTree, '').join('\n');
