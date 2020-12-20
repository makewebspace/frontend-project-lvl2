import yaml from 'js-yaml';

export const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
};

export default (content, format) => {
  if (!Object.keys(parsers).includes(format)) {
    throw Error('Wrong filetype');
  }
  return parsers[format](content);
};
