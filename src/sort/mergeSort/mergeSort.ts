//// 合并
const mergeArray = (
  now: number[],
  origin: number[],
  low: number,
  mid: number,
  high: number
): void => {
  let l = low,
    h = mid + 1,
    k = 0;
  const m = mid,
    j = high;
  while (l <= m && h <= j) {
    if (origin[l] < origin[h]) {
      now[k++] = origin[l++];
    } else {
      now[k++] = origin[h++];
    }
  }
  while (l <= m) {
    now[k++] = origin[l++];
  }
  while (h <= j) {
    now[k++] = origin[h++];
  }
  for (let i = 0; i < k; i++) {
    origin[low + i] = now[i];
  }
};

//// 排序
const sort = (
  list: number[],
  low: number,
  high: number,
  temp: number[]
): void => {
  if (low < high) {
    const mid = Math.floor((high + low) / 2);
    sort(list, low, mid, temp);
    sort(list, mid + 1, high, temp);
    mergeArray(temp, list, low, mid, high);
  }
};

/**
 * @param list
 * @constructor
 */
export const MergeSort = (list: number[]): number[] => {
  if (!(Array.isArray(list) && list.length > 0)) return list;
  const arr: number[] = [];
  sort(list, 0, list.length - 1, arr);
  list = arr;
  return list;
};
