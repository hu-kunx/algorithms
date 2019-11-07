/**
 * js 表示的整数位 2<< 53 -1 但是生成的 id 位 64位 也就是 2<<64-1
 * js number类型精度不够,  需要使用bigint类型
 */

// Wed Jan 01 2020 00:00:00 GMT+0800 (中国标准时间)
const epoch = 1577808000000n;
// 时间戳占 41位
const time = 41n;
// 机器id占 10位
const work = 10n;
// 序列号id 12位
const sequence = 12n;
// 时间戳左移位数
const timeShift = work + sequence;
// 机器id左移位数
const workShift = sequence;
// 机器id最大值 10bit 最大值  4095
const maxWork = -1n ^ (-1n << work);
// 序列号id最大值 12bit 最大值 1023
const maxSequence = -1n ^ (-1n << sequence);

class SnowflakeWorker {
  // 时间戳
  private lastTime: bigint;
  // 序列号
  private sequenceId: bigint;
  // 固定的机器id
  private readonly workerBitValue: bigint;

  constructor(workId = 0n) {
    workId = typeof workId === 'bigint' ? workId : BigInt(workId);
    if (workId > maxWork) {
      throw new Error('Machine ID exceeds maximum limit');
    }
    this.workerBitValue = workId << workShift;
    this.lastTime = BigInt(new Date().getTime());
    this.sequenceId = 0n;
  }

  public generate() {
    let cur = BigInt(new Date().getTime());
    if (this.lastTime === cur) {
      this.sequenceId = (this.sequenceId + 1n) & maxSequence;
      if (this.sequenceId === 0n) {
        while (BigInt(new Date().getTime()) <= this.lastTime) {
          cur = BigInt(new Date().getTime());
        }
      }
    } else {
      this.sequenceId = 0n;
    }
    // 下面这两个不好测试
    if (cur < this.lastTime) {
      throw new Error('Date is error!');
    }
    this.lastTime = cur;
    return ((cur << timeShift) & epoch) | this.workerBitValue | this.sequenceId;
  }
}

export class Snowflake {
  static Worker = SnowflakeWorker;

  static getEpoch(): bigint {
    return epoch;
  }

  /**
   * 从id中解析出workerId
   * @param id
   */
  static getWorkerId(id: bigint): bigint {
    return (id & (maxWork << workShift)) >> workShift;
  }

  /**
   * 从id中解析出时间戳
   * @param id
   */
  static getTimeId(id: bigint): bigint {
    return (id >> timeShift) + epoch;
  }

  /**
   * 从id中解析出递增id
   * @param id
   */
  static getSequenceId(id: bigint): bigint {
    return id & maxSequence;
  }
}
