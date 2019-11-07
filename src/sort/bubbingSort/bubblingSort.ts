/**
 * 冒泡排序
 * @param list
 * @constructor
 */
export const BubblingSort = (list: number[]): number[] => {
  const len = list.length;
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (list[i] > list[j]) {
        const temp = list[i];
        list[i] = list[j];
        list[j] = temp;
      }
    }
  }
  return list;
};
