import { Snowflake } from './snowflake';

describe('雪花算法', () => {
  test('解析workerId是否正确', () => {
    const worker = new Snowflake.Worker(2n);
    const id = worker.generate();
    expect(Snowflake.getWorkerId(id)).toEqual(2n);
  });
  test('解析时间戳是否正确', () => {
    const worker = new Snowflake.Worker(2n);
    const id = worker.generate();
    const time = Snowflake.getTimeId(id);
    expect(time.toString().length).toEqual(13);
  });
  test('解析序列号是否正确', () => {
    const worker = new Snowflake.Worker(2n);
    const id = worker.generate();
    const seq = Snowflake.getSequenceId(id);
    expect([0n, 1n].includes(seq)).toEqual(true);
  });
  test('输如的机器号超出限制', () => {
    expect(() => new Snowflake.Worker(2099n)).toThrow(
      'Machine ID exceeds maximum limit'
    );
  });
  test('一秒钟生成的 key 超出上限', () => {
    // TODO
    expect(1).toBe(1);
  });
  test('运行中系统时间错误', () => {
    // TODO
    expect(1).toBe(1);
  });
  test('间隔一秒生成的 id 的序列化是否为 0', () => {
    // TODO
    expect(1).toBe(1);
  });
  test('epoch', () => {
    expect(Snowflake.getEpoch()).toBe(1577808000000n);
  });
});
