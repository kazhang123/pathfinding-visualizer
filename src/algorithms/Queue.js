export default class Queue {
  constructor() {
    this.elems = [];
    // this.first = 0; // index of first element in array
    // this.size = 0; // number of items in array
  }

  /**
   * pushes given object to end of queue
   * @param {*} elem
   */
  enqueue(elem) {
    this.elems.push(elem);
    // this.size++;
  }

  /**
   * returns and removes object at front of queue
   * resizes array downward when elements can fit into the first
   * 0...k-1 indices of the array to achieve O(1) amortized runtime
   *
   * assume function will not be called on an empty queue
   */
  dequeue() {
    // const front = this.elems[this.first];
    // this.elems[this.first] = null;
    // this.first++;
    // this.size--;

    // if (!this.isEmpty() && this.size === this.first) {
    //   // const newArray = this.elems.slice(this.first);
    //   // let newArray = [];
    //   // for (let i = 0; i < this.size; i++) {
    //   //   newArray.push(this.elems[i + this.first]);
    //   // }

    //   this.elems.splice(0, this.first);

    //   // this.elems = newArray;
    //   this.first = 0;
    // }

    // return front;
    return this.elems.shift();
  }

  /**
   * returns whether queue is empty
   */
  isEmpty() {
    return this.elems.length === 0;
  }

  /**
   * returns object at front of queue without removing it
   */
  front() {
    // return this.elems[this.first];
    return this.elems[0];
  }

  peek() {
    console.log(this.elems.slice());
    console.log(this.first);
    console.log(this.size);
  }
}
