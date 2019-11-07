/**
 * 选择排序
 * @param list
 * @constructor
 * @description 每次找出一个最小的值然后放到前面合适的位置
 */
export const SelectSort = (list: number[]): number[] => {
  const len = list.length;
  let temp, minIndex;
  for (let i = 0; i < len; i++) {
    minIndex = i;
    for (let j = i + 1; j < len; j++) {
      if (list[j] < list[minIndex]) {
        minIndex = j;
      }
    }
    temp = list[i];
    list[i] = list[minIndex];
    list[minIndex] = temp;
  }
  return list;
};
