import { LinkedListNode } from './LinkedListNode';

export class LinkedList {
  private head: {
    next: any;
    value: any;
  };
  private tail: {
    value: any;
    next: any;
  };

  public constructor() {
    this.head = null;
    this.tail = null;
  }

  /**
   * 向链表中新增一个元素
   * @param value
   */
  public append(value: any): {} {
    const newNode = new LinkedListNode(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      return this;
    }

    this.tail.next = newNode;
    this.tail = newNode;
    return this;
  }

  /**
   * 删除一个元素
   * @param value
   */
  public delete(value: any): any {
    if (!this.head) {
      return null;
    }
    let deleteNode: {} = null;
    while (this.head && value === this.head.value) {
      deleteNode = this.head;
      this.head = this.head.next;
    }

    let currentNode = this.head;

    if (currentNode !== null) {
      while (currentNode.next) {
        if (value === currentNode.next.value) {
          deleteNode = currentNode.next;
          currentNode = currentNode.next.next;
        } else {
          currentNode = currentNode.next;
        }
      }
    }

    if (this.tail.value === value) {
      this.tail.value = currentNode;
    }

    return deleteNode;
  }

  public find(value: any, callback?: (value: any) => void): {} {
    if (!this.head) {
      return null;
    }

    let currentNode = this.head;

    while (currentNode) {
      if (value !== undefined && value === currentNode.value) {
        if (callback) {
          callback(currentNode.value);
        }
        return currentNode;
      }

      currentNode = currentNode.next;
    }
    return null;
  }

  public deleteTail(): any {
    if (this.head === this.tail) {
      const deletedTail = this.tail;
      this.head = null;
      this.tail = null;
      return deletedTail;
    }
    const deletedTail = this.tail;
    let currentNode = this.head;
    while (currentNode.next) {
      if (!currentNode.next.next) {
        currentNode.next = null;
      } else {
        currentNode = currentNode.next;
      }
    }
    this.tail = currentNode;
    return deletedTail;
  }

  public deleteHead(): any {
    if (!this.head) {
      return null;
    }

    const deletedHead = this.head;

    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }

    return deletedHead;
  }

  public toArray(): any[] {
    const nodes = [];
    let currentNode = this.head;
    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }
    return nodes;
  }

  public toString(callback?: Function): string {
    return this.toArray()
      .map(node => node.toString(callback))
      .toString();
  }
}
