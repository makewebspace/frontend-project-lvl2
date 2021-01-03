import yaml from 'js-yaml';

export const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
};

export const availableTypes = Object.keys(parsers);

export default (content, type) => {
  if (!availableTypes.includes(type)) {
    throw Error(`Wrong filetype! Available types is ${availableTypes.join(', ').toUpperCase()}`);
  }
  const parse = parsers[type];
  return parse(content);
};
