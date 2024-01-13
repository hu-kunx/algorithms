/// 堆排序

/**
 * 交换数组两个位置的值
 * @param list
 * @param i
 * @param j
 */
function swap(list: number[], i: number, j: number): void {
  const temp = list[i];
  list[i] = list[j];
  list[j] = temp;
}

/**
 * 最大堆的调整
 * @param list
 * @param i
 * @param length
 */
function heapIfy(list: number[], i: number, length: number): void {
  const temp = list[i];
  for (let k = 2 * i + 1; k < length; k = 2 * k + 1) {
    if (k + 1 < length && list[k] < list[k + 1]) {
      k++;
    }
    if (list[k] > temp) {
      list[i] = list[k];
      i = k;
    } else {
      break;
    }
  }
  list[i] = temp;
}

/**
 * 堆排序
 * @param list
 */
export function heapSort(list: number[]): number[] {
  const len = list.length;

  // 构建堆
  for (let i = Math.floor(len / 2); i >= 0; i--) {
    heapIfy(list, i, len);
  }

  // 调整堆
  for (let i = len - 1; i >= 0; i--) {
    // 最大的放到最后面去
    swap(list, 0, i);
    heapIfy(list, 0, i);
  }
  return list;
}
