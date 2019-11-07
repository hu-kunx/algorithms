/**
 * 计算超出精度外的数字加法,
 * @param nums
 * @todo 这里还有优化方法,判断字符串的长度,如在精度内直接使用内置的+法
 */
export function decimalBigNumberAdd(...nums: (number | string)[]): string {
  const long = nums.reduce(
    (s, c) => (c.toString().length > s ? c.toString().length : s),
    0
  ) as number;
  const formatNums = nums.map(item => {
    item = item.toString();
    const l = long - item.length;
    return new Array(l)
      .fill(0)
      .concat(Array.from(item))
      .reverse();
  });
  const queue: [number[], number][] = [];
  const getValue = (): number[] =>
    formatNums.map(item => {
      const r = item.shift();
      return typeof r !== 'undefined' ? Number(r) : r;
    });
  queue.push([getValue(), 0]);
  const result = [];
  while (queue.length > 0) {
    const [calcs, digits] = queue.shift();
    const rest =
      calcs.reduce((s, c) => (s += typeof c === 'number' ? c : 0), 0) + digits;
    const newDigits = ~~(rest / 10);
    if (calcs.every(item => typeof item === 'undefined') && digits === 0) {
      break;
    }
    result.push(rest % 10);
    queue.push([getValue(), Number(newDigits)]);
  }
  return result.reverse().join('');
}
