## Rust 的 snowflake 算法

### build

`wasm-pack build --target nodejs`

### test

经过测试发现 无法再 node12.3.1 中使用, 当调用带 time 的函数的时候就会报错

### 方法

```text
struct Worker {
    fn generate() -> i64
    fn get_worker_id() -> i64
    fn get_epoch() -> i64
}
fn new_worker(i64) -> Worker
fn id_past_time(i64)->i64
fn id_sequence(i64)->i64
fn id_worker(i64)->i64
fn id_time(i64)->i64
```
