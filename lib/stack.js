import { Node } from './node'

class Stack {
  constructor() {
    this.top = null;
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
}

export { Stack };