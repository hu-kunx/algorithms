/**
 * 平面上一点x1, y1, 绕平面上另一点x2, y2顺时针旋转θ角度 ，求旋转后的x1, y1对应的坐标x，y
 * @param x1
 * @param y1
 * @param originX
 * @param originY
 * @param deg
 * @constructor
 */
export const CoordinateRotate = (
  x1: number,
  y1: number,
  originX: number,
  originY: number,
  deg: number
): {
  x: number;
  y: number;
} => {
  const angleToRadian = (deg: number): number => ((2 * Math.PI) / 360) * deg;
  return {
    x:
      (x1 - originX) * Math.cos(angleToRadian(deg)) -
      (y1 - originY) * Math.sin(angleToRadian(deg)) +
      originX,
    y:
      (y1 - originY) * Math.cos(angleToRadian(deg)) +
      (x1 - originX) * Math.sin(angleToRadian(deg)) +
      originY,
  };
};
