// extern crate chrono;
//extern crate time;
extern crate wasm_bindgen;
//use chrono::Local;
use std::string::String;
use std::time::{SystemTime, UNIX_EPOCH};
use wasm_bindgen::prelude::*;

/// 因为编译目标是 wasm 而 [wasm_bindgen] 不支持 Result, 所以直接改为 panic!

// 2019-11-07T09:58:52.370Z
const EPOCH: i64 = 1573120745213;
// 时间戳占 41位
// const TIME_BITS: u8 = 41;
// 机器id占 10位
const WORKER_BITS: i64 = 10;
// 序列号id 12位
const SEQUENCE_BITS: i64 = 12;
// 时间戳左移位数
const TIME_SHIFT: i64 = WORKER_BITS + SEQUENCE_BITS;
// 机器id左移位数
const WORKER_SHIFT: i64 = SEQUENCE_BITS;
// 机器id最大值 10bit 最大值  4095
const MAX_WORKER: i64 = (-1 ^ (-1 << WORKER_BITS));
// 序列号id最大值 12bit 最大值 1023
const MAX_SEQUENCE: i64 = -1 ^ (-1 << SEQUENCE_BITS);

#[wasm_bindgen]
#[derive(Debug)]
pub struct Worker {
    last_time: i64,
    worker_id: i64,
    number: i64,
}

fn get_timestamp() -> i64 {
    //    Local::now().timestamp_millis() as i64

    //    let timespec = time::get_time();
    //    timespec.sec * 1000 + (timespec.nsec as f64 / 1000.0 / 1000.0) as i64

    let start = SystemTime::now();
    let since_the_epoch = start
        .duration_since(UNIX_EPOCH)
        .expect("Time went backwards");
    let ms = since_the_epoch.as_secs() as i64 * 1000i64
        + (since_the_epoch.subsec_nanos() as f64 / 1_000_000.0) as i64;
    ms
}

#[wasm_bindgen]
pub fn new_worker(worker_id: i64) -> Worker {
    // 要先检测workerId是否在上面定义的范围内
    if worker_id < 0 || worker_id > MAX_WORKER {
        panic!(String::from("Worker ID excess of quantity"));
    }
    // 生成一个新节点
    Worker {
        worker_id,
        last_time: 0,
        number: 0,
    }
}

#[wasm_bindgen]
pub fn t() -> i64 {
    //    Local::now().timestamp_millis()
    get_timestamp()
}

#[wasm_bindgen]
impl Worker {
    pub fn generate(&mut self) -> i64 {
        //        let mut now: i64 = Local::now().timestamp_millis() as i64;
        let mut now: i64 = get_timestamp();
        if self.last_time == now {
            self.number = (self.number + 1) & MAX_SEQUENCE;
            if self.number == 0 {
                // 如果当前工作节点在1毫秒内生成的ID已经超过上限 需要等待1毫秒再继续生成
                while now <= self.last_time {
                    //                    now = Local::now().timestamp_millis() as i64;
                    now = get_timestamp();
                }
            }
        } else {
            self.number = 0;
        }
        // 如果当前时间小于上一次ID生成的时间戳，说明系统时钟回退过这个时候应当返回错误
        if now < self.last_time {
            panic!(String::from("System time error"));
            //            return Err(String::from("System time error"));
        }
        self.last_time = now;
        let id = ((now - EPOCH) << TIME_SHIFT) | (self.worker_id << WORKER_SHIFT) | (self.number);
        return id;
    }
    pub fn get_worker_id(&self) -> i64 {
        self.worker_id
    }
    pub fn get_epoch(&self) -> i64 {
        EPOCH
    }
}

// 获取 id 中的时间戳
#[wasm_bindgen]
pub fn id_time(id: i64) -> i64 {
    return (id >> TIME_SHIFT) + EPOCH;
}

// 获取 id 中的机器号
#[wasm_bindgen]
pub fn id_worker(id: i64) -> i64 {
    return (id & (MAX_WORKER << WORKER_SHIFT)) >> WORKER_SHIFT;
}

// 获取 id 中的序列号
#[wasm_bindgen]
pub fn id_sequence(id: i64) -> i64 {
    return id & MAX_SEQUENCE;
}

// 过去了多少时间
#[wasm_bindgen]
pub fn id_past_time(id: i64) -> i64 {
    return id >> TIME_SHIFT;
}
