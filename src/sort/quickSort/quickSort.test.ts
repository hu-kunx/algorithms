import { QuickSort, mid } from './quickSort';
import { CreateSortData } from '../sort_data';
import { isOrderly } from '../check';

describe('快排', () => {
  test('倒序-->正序', () => {
    const arr = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
    QuickSort(arr);
    expect(isOrderly(arr, 1)).toEqual(true);
  });

  test('正序-->正序', () => {
    const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    QuickSort(arr);
    expect(isOrderly(arr, 1)).toEqual(true);
  });

  test('重复随机', () => {
    const arr = [2, 2, 2, 5, 34, 2, 1, 7, 3];
    QuickSort(arr);
    expect(isOrderly(arr, 1)).toEqual(true);
  });

  test('随机无重复', () => {
    const arr = CreateSortData(200);
    QuickSort(arr);
    expect(isOrderly(arr, 1)).toEqual(true);
  });
});

describe('middle', () => {
  test('[5,7,34,67,2,3,9] ====> 6', () => {
    const arr = [5, 7, 34, 67, 2, 3, 9];
    expect(mid(0, 6, 3, arr)).toBe(6);
  });

  test('[5,9,31] ====> 1', () => {
    const arr = [5, 9, 31];
    expect(mid(0, 1, 2, arr)).toBe(1);
  });

  test('[76,34,12] ====> 1', () => {
    const arr = [76, 34, 12];
    expect(mid(0, 1, 2, arr)).toBe(1);
  });

  test('[76,2989,12] ====> 0', () => {
    const arr = [76, 2989, 12];
    expect(mid(0, 1, 2, arr)).toBe(0);
  });
});
