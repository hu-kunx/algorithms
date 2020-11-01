/**
 * 二分搜索
 * @param list
 * @param target
 * @description 使用的是循环,缩小指针范围 需要查找的数组已经有序
 */
export const BinarySearch = (list: number[], target: number): number => {
  let min = 0,
    max = list.length - 1,
    mid;
  while (min <= max) {
    mid = Math.floor((max + min) / 2);
    if (list[mid] === target) {
      return mid;
    }
    if (list[mid] < target) {
      min = mid + 1;
    }
    if (list[mid] > target) {
      max = mid - 1;
    }
  }
  return null;
};
