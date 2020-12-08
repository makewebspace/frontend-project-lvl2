export const FORMATS = {
  RAW: 'raw',
  STYLISH: 'stylish',
};

const formatTo = {
  [FORMATS.RAW]: (diffs) => diffs,
  [FORMATS.STYLISH]: (diffs) => {
    const toString = ({ key, val, operation = ' ' }) => `  ${operation} ${key}: ${val}`;
    return `{\n${diffs.map(toString).join('\n')}\n}`;
  },
};

const getFormatedDiff = (diffs, format = FORMATS.STYLISH) => formatTo[format](diffs);

export default getFormatedDiff;
