extern crate snowflake;

#[test]
fn new_worker() {
    let s = snowflake::new_worker(3);
    assert_eq!(s.get_worker_id(), 3);
    println!("worker: {:?}", s);
}

#[test]
fn generate() {
    let mut w = snowflake::new_worker(3);
    let id = w.generate();
    println!("id: {:?}", id);
}

#[test]
fn parse() {
    let mut w = snowflake::new_worker(123);
    let id = w.generate();
    println!("time: {:?}", snowflake::id_time(id));
    println!("workerId: {:?}", snowflake::id_worker(id));
    println!("seq: {:?}", snowflake::id_sequence(id));
    assert_eq!(
        snowflake::id_time(id) - snowflake::id_past_time(id),
        w.get_epoch()
    );
    assert_eq!(snowflake::id_sequence(id), 0);
    assert_eq!(snowflake::id_worker(id), 123);
}
