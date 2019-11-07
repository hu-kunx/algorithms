export class LinkedListNode<T = any> {
  public value: T;
  public next: T | null;
  constructor(value: T, next: T = null) {
    this.value = value;
    this.next = next;
  }
  public toString(callback?: (value: string) => string): string {
    const defaultCallback = (value: string): string => {
      return callback ? callback(value) : value;
    };
    return defaultCallback(this.value.toString());
  }
}
