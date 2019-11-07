export class ArrayStack<T> {
  stack: T[];
  constructor() {
    this.stack = [];
  }
  public pop(): T {
    return this.stack.shift();
  }
  public push(value: T): number {
    this.stack.push(value);
    return this.stack.length;
  }
  public top(): null | T {
    const len = this.stack.length - 1;
    return len < 0 ? null : this.stack[len];
  }
  public clear(): void {
    this.stack.length = 0;
  }
  public size(): number {
    return this.stack.length;
  }
}

export class LinkedListStack {
  constructor() {
    // this.stack =
  }
}
