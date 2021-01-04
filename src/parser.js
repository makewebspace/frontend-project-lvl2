import assert from 'assert';
import yaml from 'js-yaml';

const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
};

const availableTypes = Object.keys(parsers);
const errorMessage = `Wrong filetype! Available types is ${availableTypes.join(', ')}`;

export default (content, typeName) => {
  assert(availableTypes.includes(typeName), errorMessage);
  const parse = parsers[typeName];
  return parse(content);
};
