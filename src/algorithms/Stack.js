export default class Stack {
  constructor() {
    this.elems = [];
  }

  /**
   * pushes elem to top of stack
   * @param {*} elem 
   */
  push(elem) {
    this.elems.push(elem);
  }

  /**
   * returns and removes elem on top of stack
   */
  pop() {
    return this.elems.pop();
  }

  /**
   * returns true if stack is empty
   */
  isEmpty() {
    return this.elems.length === 0;
  }

  /**
   * returns elem on top of stack without removing it
   */
  peek() {
    return this.elems[this.elems.length - 1];
  }
}
