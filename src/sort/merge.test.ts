import { CreateSortData } from '../test-lib/sort_data';
import { MergeSort } from './merge';
import { isOrderly } from '../test-lib/check';
describe('归并', () => {
  test('传入空数组', () => {
    expect(MergeSort([])).toEqual([]);
  });
  test('倒序-->正序', () => {
    const arr = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
    MergeSort(arr);
    expect(isOrderly(arr, 1)).toEqual(true);
  });

  test('正序-->正序', () => {
    const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    MergeSort(arr);
    expect(isOrderly(arr, 1)).toEqual(true);
  });

  test('重复随机', () => {
    const arr = [2, 2, 2, 5, 34, 2, 1, 7, 3];
    MergeSort(arr);
    expect(isOrderly(arr, 1)).toEqual(true);
  });

  test('随机无重复', () => {
    const arr = CreateSortData(200);
    MergeSort(arr);
    expect(isOrderly(arr, 1)).toEqual(true);
  });
});
