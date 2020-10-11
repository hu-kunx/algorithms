/**
 * 用于检测数组的正反序
 * @param slice 数组
 * @param kind 正序还是反序
 * @see 使用双指针两年判断
 */
export function isOrderly(slice: number[], kind: 1 | -1): boolean {
  const l = slice.length;
  if (l === 1) {
    return true;
  }
  let c = 0;
  let n = 1;
  for (; n < l; n++) {
    if (kind == 1) {
      if (slice[c] > slice[n]) {
        return false;
      }
    } else {
      if (slice[c] < slice[n]) {
        return false;
      }
    }
    c++;
  }
  return true;
}
