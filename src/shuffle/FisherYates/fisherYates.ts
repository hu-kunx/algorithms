/**
 * 交换元素
 * @param list
 * @param i
 * @param j
 */
function swap<T>(list: T[], i: number, j: number): void {
  const temp = list[i];
  list[i] = list[j];
  list[j] = temp;
}

/**
 * Fisher-Yates Shuffle算法
 * @param list
 * @description 确保每个元素只随机一次
 */
export const Shuffle = (list: number[]): number[] => {
  let len = list.length - 1;
  while (len >= 0) {
    swap<number>(list, len, Math.floor(Math.random() * len));
    len--;
  }
  return list;
};
