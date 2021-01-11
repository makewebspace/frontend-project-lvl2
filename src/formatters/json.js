export default (diffs = []) => (diffs.length ? JSON.stringify(diffs, null, 2) : '');
