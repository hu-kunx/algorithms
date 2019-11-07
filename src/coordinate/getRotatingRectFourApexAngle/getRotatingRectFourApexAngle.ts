/**
 * 计算正方形 旋转后的四个顶角的坐标
 * @param iWidth
 * @param iHeight
 * @param X
 * @param Y
 * @param deg
 */
export const getRotatingRectFourApexAngle = (
  iWidth: number,
  iHeight: number,
  X: number,
  Y: number,
  deg: number
): { X: number; Y: number }[] => {
  const DegToRad = (ori: number): number => (ori / 180) * Math.PI;
  let ori = deg;
  const Width = iWidth;
  const Height = iHeight;
  ori -= 90;
  const length = Math.sqrt(Width ** 2 + Height ** 2);
  const rad = Math.atan2(Height, Width);
  const corner = [];

  let x = X + (length / 2) * Math.cos(DegToRad(ori) + rad);
  let y = Y + (length / 2) * Math.sin(DegToRad(ori) + rad);
  corner.push({ X: x, Y: y });

  x = X + (length / 2) * Math.cos(DegToRad(ori + 180) - rad);
  y = Y + (length / 2) * Math.sin(DegToRad(ori + 180) - rad);
  corner.push({ X: x, Y: y });

  x = X + (length / 2) * Math.cos(DegToRad(ori + 180) + rad);
  y = Y + (length / 2) * Math.sin(DegToRad(ori + 180) + rad);
  corner.push({ X: x, Y: y });

  x = X + (length / 2) * Math.cos(DegToRad(ori) - rad);
  y = Y + (length / 2) * Math.sin(DegToRad(ori) - rad);
  corner.push({ X: x, Y: y });

  return corner;
};
