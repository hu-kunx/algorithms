//Rate Limiter

interface TokenBucketConfig {
  capacity?: number;
  initTokenCount?: number;
}

const defaultTokenBucketConfig: TokenBucketConfig = {
  capacity: 2000,
  initTokenCount: 0,
};

/**
 * 令牌桶-限流
 */
class TokenBucket {
  private lastTme: number;
  private availableTokens: number;
  private quantum: number;
  private capacity: number;

  constructor(
    quantum: number,
    config: TokenBucketConfig = defaultTokenBucketConfig
  ) {
    const { capacity, initTokenCount } = config;
    this.lastTme = new Date().getTime();
    this.availableTokens = initTokenCount;
    this.quantum = quantum;
    this.capacity = capacity;
  }

  /**
   * 获取当前可以token数量
   */
  public getTokenCount(): number {
    this.calcTokenCount();
    return this.availableTokens;
  }

  /**
   * 检查桶内是否有足够的token
   * @param size
   */
  private checkAdequate(size: number): boolean {
    return this.availableTokens > size;
  }

  /**
   * 计算桶内token是数目
   */
  private calcTokenCount(): number {
    const curTime = new Date().getTime();
    if (this.availableTokens === this.capacity) {
      this.lastTme = curTime;
      return;
    }
    const t = Math.floor((curTime - this.lastTme) / 1000);
    const cap = this.availableTokens + t * this.quantum;
    this.availableTokens =
      cap > this.capacity ? this.capacity : Math.max(cap, 0);
    this.lastTme = curTime;
  }

  /**
   * 获取指定数目的token
   * @param size
   */
  public acquire(size = 1): boolean {
    this.calcTokenCount();
    if (this.checkAdequate(size)) {
      this.availableTokens -= size;
      return true;
    }
    return false;
  }
}
