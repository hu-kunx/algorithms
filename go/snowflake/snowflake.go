package snowflake

import (
    "encoding/base64"
    "github.com/pkg/errors"
    "strconv"
    "time"
)

const (
    // 2019-11-07T09:58:52.370Z
    epoch = 1573120745213
    // 时间戳占 41位
    timeBits = 41
    // 机器id占 10位
    workerBits = 10
    // 序列号id 12位
    sequenceBits = 12
    // 时间戳左移位数
    timeShift = workerBits + sequenceBits
    // 机器id左移位数
    workerShift = sequenceBits
    // 机器id最大值 10bit 最大值  4095
    maxWorker = -1 ^ (-1 << workerBits)
    // 序列号id最大值 12bit 最大值 1023
    maxSequence = -1 ^ (-1 << sequenceBits)
)

type Id int64

type Worker struct {
    lastTime int64
    workerId int64
    number   int64
}

func NewWorker(workerId int64) (*Worker, error) {
    // 要先检测workerId是否在上面定义的范围内
    if workerId < 0 || workerId > maxWorker {
        return nil, errors.New("Worker ID excess of quantity")
    }
    // 生成一个新节点
    return &Worker{
        lastTime: 0,
        workerId: workerId,
        number:   0,
    }, nil
}

func (w *Worker) Generate() (Id, error) {
    now := time.Now().UnixNano() / 1e6
    if w.lastTime == now {
        w.number = (w.number + 1)&maxSequence
        if w.number == 0 {
            // 如果当前工作节点在1毫秒内生成的ID已经超过上限 需要等待1毫秒再继续生成
            for now <= w.lastTime {
                now = time.Now().UnixNano() / 1e6
            }
        }
    } else {
        w.number = 0
    }
    // 如果当前时间小于上一次ID生成的时间戳，说明系统时钟回退过这个时候应当返回错误
    if now < w.lastTime {
        return 0, errors.New("System time error")
    }
    w.lastTime = now
    ID := Id(((now - epoch) << timeShift) | (w.workerId << workerShift) | (w.number))
    return ID, nil
}

func (f Id) Time() int64 {
    return (int64(f) >> timeShift) + epoch
}

func (f Id) Worker() int64 {
    return int64(f) & (maxWorker << workerShift) >> workerShift
}
func (f Id) Sequence() int64 {
    return int64(f) & maxSequence
}
func (f Id) Bytes() []byte {
    return []byte(f.String())
}
func (f Id) Base64() string {
    return base64.StdEncoding.EncodeToString(f.Bytes())
}

func (f Id) String() string {
    return strconv.FormatInt(int64(f), 10)
}
