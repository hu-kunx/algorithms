/**
 * @param list
 */
export const QuickSort = (list: number[]): void => {
  // 三值取中, 找到最有可能最好的中间值
  const mid = (a: number, b: number, c: number, x: number[]): number => {
    return x[a] < x[b]
      ? x[b] < x[c]
        ? b
        : x[a] < x[c]
        ? c
        : a
      : x[b] > x[c]
      ? b
      : x[a] > x[c]
      ? c
      : a;
  };

  // 递归排序
  const sort = (list: number[], low: number, high: number): void | number[] => {
    //// 数量较小时使用插入排序会更好一些
    // if (high - low < 7) {
    //   insertionSort(list, low, high)
    //   return;
    // }
    if (high - low <= 0) {
      return list;
    }

    let [l, h] = [low, high];

    // 取基准值
    const midIndex = mid(0, high, Math.floor((low + high) / 2), list);
    const temp = list[midIndex];
    list[midIndex] = list[low];
    list[low] = temp;

    // 每次循环结束 l 就会等于 midIndex 吧值还给他
    while (l < h) {
      // 从右边开始 找第一个 大于temp 的元素索引 放到 左边合适的位置
      while (l < h && list[h] >= temp) {
        h--;
      }
      list[l] = list[h];

      // 从左边开始 找一个 小于 temp的值,  吧它放到右边的合适位置上
      while (l < h && list[l] <= temp) {
        l++;
      }
      list[h] = list[l];
    }

    // 吧 temp 放到中间去
    list[l] = temp;

    // 递归排序 左边
    sort(list, low, l - 1);

    // 递归排序右边
    sort(list, l + 1, high);
  };

  sort(list, 0, list.length - 1);
};

/**
 * 三值取中
 *    输入下标
 *    返回下标
 * @param a
 * @param b
 * @param c
 * @param list
 */
export const mid = (
  a: number,
  b: number,
  c: number,
  list: number[]
): number => {
  let [A, B, C, T, t] = [list[a], list[b], list[c], 0, 0];
  if (A > B) {
    T = A;
    A = B;
    B = T;
    t = a;
    a = b;
    b = t;
  }
  if (A > C) {
    T = A;
    A = C;
    C = T;
    t = a;
    a = c;
    c = t;
  }
  if (B > C) {
    T = B;
    B = C;
    C = T;
    t = b;
    b = c;
    c = t;
  }
  return b;
};
