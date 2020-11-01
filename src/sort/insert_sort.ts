/**
 * 插入排序
 * @param list
 * @description 每次找出比当前元素更小的一个,然后交换, 从当前元素慢慢回退比较
 */
export const insertSort = (list: number[]): number[] => {
  let temp, j;
  const len = list.length;
  for (let i = 0; i < len; i++) {
    temp = list[i];
    j = i - 1;
    while (j >= 0 && list[j] > temp) {
      list[j + 1] = list[j];
      j--;
    }
    list[j + 1] = temp;
  }
  return list;
};
