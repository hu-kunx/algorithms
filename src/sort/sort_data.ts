import { Shuffle } from '../shuffle/FisherYates/fisherYates';

/**
 * 生成随机的指定长度的混乱无重复的数组
 * @param max
 * @constructor
 */
export const CreateSortData = (max: number): number[] => {
  const arr: number[] = [];
  for (let i = 0; i < max; i++) {
    arr.push(i);
  }
  Shuffle(arr);
  return arr;
};
