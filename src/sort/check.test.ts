import { isOrderly } from './check';

describe('排序检查', () => {
  test('正序', () => {
    expect(isOrderly([1], 1)).toEqual(true);
    expect(isOrderly([1], -1)).toEqual(true);
    expect(isOrderly([1, 2, 3, 4, 5], 1)).toEqual(true);
    expect(isOrderly([1, 2, 3, 3, 4, 5], 1)).toEqual(true);
  });
  test('反序', () => {
    expect(isOrderly([5, 4, 3, 2, 1], -1)).toEqual(true);
    expect(isOrderly([5, 4, 3, 3, 2, 1], -1)).toEqual(true);
  });
  test('无序', () => {
    expect(isOrderly([1, 5, 5, 2, 99, 43, 2], 1)).toEqual(false);
    expect(isOrderly([1, 5, 5, 2, 99, 43, 2], -1)).toEqual(false);
  });
});
