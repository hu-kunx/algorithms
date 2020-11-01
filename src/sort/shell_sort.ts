/**
 * 交换位置,最gap间隔的值做排序
 * @param list
 * @param gap
 * @param i
 * @description 检查gap间隔的值得大小关系  如果 左边大 就交换 如果 交换后 左边还有gap的位置 就递归向左检查 最后将temp值还原
 */
function insert(list: number[], gap: number, i: number): void {
  const temp = list[i];
  let j = i - gap;
  while (j >= 0 && list[j] > temp) {
    list[j + gap] = list[j];
    j -= gap;
  }
  list[j + gap] = temp;
}

/**
 * 希尔排序
 * @param list
 */
export const ShellSort = (list: number[]): number[] => {
  const len = list.length;
  let gap = 1;
  while (gap < len) {
    gap = gap * 3 + 1;
  }
  while (gap > 0) {
    for (let i = gap; i < len; i++) {
      insert(list, gap, i);
    }
    gap = Math.floor(gap / 3);
  }
  return list;
};
