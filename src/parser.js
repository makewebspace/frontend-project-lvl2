import yaml from 'js-yaml';
import { strict as assert } from 'assert';
import { FILE_TYPE } from './constants.js';

const parsers = {
  [FILE_TYPE.JSON]: JSON.parse,
  [FILE_TYPE.YAML]: yaml.load,
};

const availableTypes = Object.keys(parsers);
const errorMessage = `Wrong filetype! Available types is ${availableTypes.join(', ')}`;

export default (content, typeName) => {
  assert(availableTypes.includes(typeName), errorMessage);
  const parse = parsers[typeName];
  return parse(content);
};
