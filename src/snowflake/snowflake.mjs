// 2019-11-07T09:58:52.370Z
const EPOCH = 1573120745213n;
// 时间戳占 41位
// const TIME_BITS: u8 = 41;
// 机器id占 10位
const WORKER_BITS = 10n;
// 序列号id 12位
const SEQUENCE_BITS = 12n;
// 时间戳左移位数
const TIME_SHIFT = WORKER_BITS + SEQUENCE_BITS;
// 机器id左移位数
const WORKER_SHIFT = SEQUENCE_BITS;
// 机器id最大值 10bit 最大值  4095
const MAX_WORKER = -1n ^ (-1n << WORKER_BITS);
// 序列号id最大值 12bit 最大值 1023
const MAX_SEQUENCE = -1n ^ (-1n << SEQUENCE_BITS);

export class Worker {
  worker_id = 0n;
  number = 0n;
  last_time = 0n;

  constructor(worker_id) {
    if (worker_id < 0 || worker_id > MAX_WORKER) {
      throw 'Worker ID excess of quantity';
    }
    this.worker_id = worker_id;
  }

  generate() {
    let now = BigInt(new Date().getTime());
    if (this.last_time === now) {
      this.number = (this.number + 1n) & MAX_SEQUENCE;
      if (this.number === 0n) {
        // 如果当前工作节点在1毫秒内生成的ID已经超过上限 需要等待1毫秒再继续生成
        while (now <= this.last_time) {
          now = BigInt(new Date().getTime());
        }
      }
    } else {
      this.number = 0n;
    }
    // 如果当前时间小于上一次ID生成的时间戳，说明系统时钟回退过这个时候应当返回错误
    if (now < this.last_time) {
      throw 'System time error';
    }
    this.last_time = now;
    return (
      ((now - EPOCH) << TIME_SHIFT) |
      (this.worker_id << WORKER_SHIFT) |
      this.number
    );
  }

  get_epoch() {
    return EPOCH;
  }

  get_worker_id() {
    return this.worker_id;
  }
}

// 获取 id 中的时间戳
export function id_time(id) {
  return (id >> TIME_SHIFT) + EPOCH;
}

// 获取 id 中的机器号
export function id_worker(id) {
  return (id & (MAX_WORKER << WORKER_SHIFT)) >> WORKER_SHIFT;
}

// 获取 id 中的序列号
export function id_sequence(id) {
  return id & MAX_SEQUENCE;
}

// 过去了多少时间
export function id_past_time(id) {
  return id >> TIME_SHIFT;
}
