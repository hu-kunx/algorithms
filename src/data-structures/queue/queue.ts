export class ArrayQueue<T> {
  private queue: T[];
  public constructor() {
    this.queue = [];
  }
  public shift(): T {
    return this.queue.shift();
  }
  public push(value: T): number {
    this.queue.push(value);
    return this.queue.length;
  }
  public clear(): void {
    this.queue.length = 0;
  }
  public size(): number {
    return this.queue.length;
  }
}

class LinkedNode<T> {
  public next: LinkedNode<T> = null;
  public data: T;
  public constructor(data: T) {
    this.data = data;
  }
}

export class LinkedQueue<T> {
  public root: LinkedNode<T>;
  public length = 0;
  public shift(): T {
    if (!this.root) {
      return null;
    }
    const temp = this.root.next;
    this.root = temp;
    this.length--;
    return temp.data;
  }
  public push(value: T): number {
    const node = new LinkedNode<T>(value);
    if (!this.root) {
      this.root = node;
      return this.length++;
    }
  }
  public clear(): void {
    this.root = null;
    this.length = 0;
  }
  public size(): number {
    return this.length;
  }
}
