package snowflake

import (
	"testing"
	"time"
)


func TestWorker_Generate2(t *testing.T) {
	worker, _ := NewWorker(123)
	time.Sleep(time.Second)
	now := time.Now().UnixNano() / 1e6
	id, _ := worker.Generate()
	if id != Id((now -1573120745213)<<22 | (123 << workerShift) | 0) {
		t.Error("ID calculation error")
	}
}
func TestId_Time(t *testing.T) {
	worker, _ := NewWorker(123)
	time.Sleep(time.Second)
	id, _ := worker.Generate()
	now := time.Now().UnixNano() / 1e6
	t.Log(now,id.Time())
	if now != id.Time() {
		t.Error("ID time error")
	}
}
func TestWorker_Generate(t *testing.T) {
	// 每个节点每毫秒产生4096个ID序号。
	worker, _ := NewWorker(123)
	now1 := time.Now().UnixNano()/1e6
	next := time.Now().UnixNano() / 1e6
	for now1 <= next {
		now1 = time.Now().UnixNano() / 1e6
	}
	now := time.Now()
	for l := 4096; l >= 0; l-- {
		_, _ = worker.Generate()
	}
	t.Log("生成4095个id耗时:", time.Since(now))
}

func TestWorker_Generate_Sequence(t *testing.T) {
	// 每个节点每毫秒产生4096个ID序号。
	now1 := time.Now().UnixNano()/1e6
	worker, _ := NewWorker(123)
	next := time.Now().UnixNano() / 1e6
	for now1 <= next {
		now1 = time.Now().UnixNano() / 1e6
	}
	var s []int64
	for l := 4099; l >= 0; l-- {
		o, _ := worker.Generate()
		s = append(s, o.Sequence())
	}
	if !(s[4095] == 4095 && s[4096] == 0) {
		t.Error("Incremental ID error")
	}
}

func TestId_Sequence(t *testing.T) {
	worker, _ := NewWorker(123)
	id, _ := worker.Generate()
	if id.Sequence() != 0 {
		t.Error("Incremental ID error")
	}
}

func TestId_Worker(t *testing.T) {
	worker, _ := NewWorker(123)
	id, _ := worker.Generate()
	if id.Worker() != 123 {
		t.Error("workerId error")
	}
}
