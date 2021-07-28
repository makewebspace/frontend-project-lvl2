import buildTree from '../src/treeBuilder.js';
import { data1, data2, expected } from '../__fixtures__/tree.js';

test('when objects has difference', () => {
  const actual = buildTree(data1, data2);
  expect(actual).toEqual(expected);
});

test('when objects is empty', () => {
  const actual = buildTree({}, {});
  expect(actual).toEqual([]);
});
