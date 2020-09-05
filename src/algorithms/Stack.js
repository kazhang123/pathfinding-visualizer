export default class Stack {
  constructor() {
    this.elems = [];
  }

  push(elem) {
    this.elems.push(elem);
  }

  pop() {
    return this.elems.pop();
  }

  isEmpty() {
    return this.elems.length === 0;
  }

  peek() {
    return this.elems[this.elems.length - 1];
  }
}
