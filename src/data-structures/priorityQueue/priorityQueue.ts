import { MaxHeap } from '../maxHeap/maxHeap';

export class ArrayQueue {
  protected queue: MaxHeap;
  constructor() {
    this.queue = new MaxHeap();
  }
  public remove(): number {
    return this.queue.del();
  }
  public push(value: number): number {
    this.queue.push(value);
    return this.queue.size();
  }
  public clear(): void {
    this.queue.clear();
  }
  public size(): number {
    return this.queue.size();
  }
}
