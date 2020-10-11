interface LeakyBucketConfig {
  burstSize?: number;
}

const defaultLeakyBucketConfig: LeakyBucketConfig = {
  burstSize: 2000,
};

/**
 * 漏桶算法-限流
 */
export class LeakyBucket {
  // 漏水的速率
  private rate: number;
  // 入水的速率
  private quantum: number;
  // 桶的大小
  private burstSize: number;
  // 桶的当前存水量
  private bufferSize: number;
  // 最后计算存水量的时间
  private lastTime: number;

  constructor(
    quantum: number,
    rate: number,
    config: LeakyBucketConfig = defaultLeakyBucketConfig
  ) {
    const { burstSize } = config;
    this.burstSize = burstSize;
    this.lastTime = new Date().getTime();
    this.rate = rate;
    this.quantum = quantum;
    this.bufferSize = 0;
  }

  /**
   * 计算当前存水量
   */
  private calcBucketBufferSize(): void {
    const cur = new Date().getTime();
    const gap = Math.floor((cur - this.lastTime) / 1000);
    this.lastTime = cur;
    const cap = this.bufferSize + gap * this.quantum - gap * this.rate;
    this.bufferSize = cap > this.burstSize ? this.burstSize : cap;
  }

  /**
   * 从存储中取指定数目的token
   * @param size
   */
  public acquire(size: number): boolean {
    this.calcBucketBufferSize();
    if (this.bufferSize < size) {
      return false;
    }
    this.bufferSize -= size;
    return true;
  }
}
