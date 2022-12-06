import { Node } from './node.js'

export default class Queue {
  constructor() {
    this.first = null;
    this.last = null;
  }

  enqueue(value) {
    const newNode = new Node(value);

    if (this.first) {
      this.last.next = newNode;
    } else {
      // Set the node of the queue's next to be the new node
      this.first = newNode;
    }

    //make the new node the last item on the queue
    this.last = newNode;
  }

  dequeue() {
    if (this.first) {
      const dequeued = this.first;
      this.first = dequeued.next;

      if (dequeued === this.last) {
        this.last = null;
      }

      return dequeued.value;
    }
  }

  length() {
    let result = 0;
    let node = this.first;

    while (node) {
      result++;
      node = node.next;
    }
    return result;
  }

  front() {
    return this.first.value;
  }

  back() {
    return this.last.value;
  }

  isEmpty() {
    return this.first === null;
  }

  flatten() {
    let result = [];
    let node = this.first;

    while (node) {
      result.push(node.value);
      node = node.next;
    }
    return result;
  }
}