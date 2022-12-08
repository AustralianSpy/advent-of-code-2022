import { Node } from './node.js'

class Stack {
  constructor() {
    this.top = null;
  }

  length() {
    let result = 0;
    let node = this.top;

    while (node) {
      result++;
      node = node.next;
    }
    return result;
  }

  push(value) {
    this.top = new Node(value, this.top);
    return this;
  }

  pop() {
    const popped = this.top;
    this.top = popped.next;
    return popped.value;
  }

  peek() {
    return this.top.value;
  }

  isEmpty() {
    return this.top === null;
  }

  flatten() {
    let result = [];
    let node = this.top;

    while (node) {
      result.push(node.value);
      node = node.next;
    }
    return result.reverse();
  }
}

export { Stack };