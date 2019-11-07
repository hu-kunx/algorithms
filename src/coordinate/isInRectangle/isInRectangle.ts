interface Coords {
  X: number;
  Y: number;
}

const getFourDegValue = (
  iWidth: number,
  iHeight: number,
  X: number,
  Y: number,
  deg: number
): Coords[] => {
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

/**
 * 给定的点是否存在于目标内部
 * @param X 点的x
 * @param Y 点的y
 * @param x 矩形中心点的x
 * @param y 矩形中心点的y
 * @param iWidth 矩形的宽度
 * @param iHeight 矩形的高度
 * @param deg 矩形的旋转角度
 */
export const isInRectangle = (
  X: number,
  Y: number,
  x: number,
  y: number,
  iWidth: number,
  iHeight: number,
  deg: number
): boolean => {
  const vectorProduct = (vA: Coords, vB: Coords) => {
    return vA.X * vB.Y - vB.X * vA.Y;
  };
  const isIntersected = (A: Coords, B: Coords, C: Coords, D: Coords) => {
    const AB = { X: A.X - B.X, Y: A.Y - B.Y };
    const BA = { X: B.X - A.X, Y: B.Y - A.Y };
    const AD = { X: A.X - D.X, Y: A.Y - D.Y };
    const DA = { X: D.X - A.X, Y: D.Y - A.Y };
    const BC = { X: B.X - C.X, Y: B.Y - C.Y };
    const CB = { X: C.X - B.X, Y: C.Y - B.Y };
    const BD = { X: B.X - D.X, Y: B.Y - D.Y };
    const DB = { X: D.X - B.X, Y: D.Y - B.Y };
    const AC = { X: A.X - C.X, Y: A.Y - C.Y };
    const CA = { X: C.X - A.X, Y: C.Y - A.Y };
    const ZERO = Math.pow(10, -9);
    return (
      vectorProduct(AC, AD) * vectorProduct(BC, BD) <= ZERO &&
      vectorProduct(CA, CB) * vectorProduct(DA, DB) <= ZERO
    );
  };
  const Contains = (point: Coords): boolean => {
    const corner = getFourDegValue(iWidth, iHeight, X, Y, deg);
    const center = { X, Y };
    return !(
      isIntersected(point, center, corner[0], corner[1]) ||
      isIntersected(point, center, corner[1], corner[2]) ||
      isIntersected(point, center, corner[2], corner[3]) ||
      isIntersected(point, center, corner[3], corner[0])
    );
  };
  return Contains({ X: x, Y: y });
};
