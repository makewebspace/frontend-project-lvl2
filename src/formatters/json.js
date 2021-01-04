export default (diffs = []) => {
  if (!diffs.length) {
    return '';
  }
  return JSON.stringify(diffs, null, 2);
};
