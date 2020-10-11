import { CreateSortData } from '../sort_data';
import { BubblingSort } from './bubblingSort';
import { isOrderly } from '../check';

describe('冒泡', () => {
  test('倒序-->正序', () => {
    const arr = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
    BubblingSort(arr);
    expect(isOrderly(arr, 1)).toEqual(true);
  });

  test('正序-->正序', () => {
    const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    BubblingSort(arr);
    expect(isOrderly(arr, 1)).toEqual(true);
  });

  test('重复随机', () => {
    const arr = [2, 2, 2, 5, 34, 2, 1, 7, 3];
    BubblingSort(arr);
    expect(isOrderly(arr, 1)).toEqual(true);
  });

  test('随机无重复', () => {
    const arr = CreateSortData(200);
    BubblingSort(arr);
    expect(isOrderly(arr, 1)).toEqual(true);
  });
});
