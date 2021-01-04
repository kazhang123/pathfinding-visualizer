export default class PriorityQueue {
  constructor(scoreFunction) {
    this.heap = [null];
    this.scoreFunction = scoreFunction;
  }

  /**
   * pushes value into priority queue
   * @param {*} value 
   */
  push(value) {
    this.heap.push(value);
    this.heapifyUp(this.heap.length - 1);
  }

  /**
   * returns and removes minimum value in priority queue
   */
  pop() {
    const min = this.heap[1];
    this.heap[1] = this.heap[this.heap.length - 1];
    this.heap.pop();
    this.heapifyDown(1);
    return min;
  }

  /**
   * returns true if priority queue is empty
   */
  isEmpty() {
    return this.heap.length === 1;
  }

  /**
   * returns minimum value without removing it from priority queue
   */
  peek() {
    const min = this.heap[1];
    return min;
  }

  /**
   * returns index of the left child of element at given index
   * @param {*} idx 
   */
  leftChild(idx) {
    return 2 * idx;
  }

  /**
   * returns index of right child of element at given index
   * @param {*} idx 
   */
  rightChild(idx) {
    return 2 * idx + 1;
  }

  /**
   * returns index of parent of element at given index
   * @param {*} idx 
   */
  parent(idx) {
    return Math.floor(idx / 2);
  }

  /**
   * returns true if element at given index has a child
   * @param {*} idx 
   */
  hasAChild(idx) {
    return this.leftChild(idx) < this.heap.length;
  }

  /**
   * returns the child of the current index with the lowest score
   * assume function will be called only if currIdx has a child
   * @param {*} currIdx
   */
  minChild(currIdx) {
    const leftIdx = this.leftChild(currIdx);
    const rightIdx = this.rightChild(currIdx);

    // if no right child, then return left child
    if (rightIdx >= this.heap.length) {
      return leftIdx;
    }

    const leftScore = this.scoreFunction(this.heap[leftIdx]);
    const rightScore = this.scoreFunction(this.heap[rightIdx]);

    if (leftScore < rightScore) {
      return leftIdx;
    }

    return rightIdx;
  }

  /**
   * restores heap order by swapping down from given index until all children 
   * are larger than parents.
   * @param {*} currIdx 
   */
  heapifyDown(currIdx) {
    if (this.hasAChild(currIdx)) {
      const minChildIdx = this.minChild(currIdx);

      const childScore = this.scoreFunction(this.heap[minChildIdx]);
      const currScore = this.scoreFunction(this.heap[currIdx]);

      if (currScore > childScore) {
        this.swap(currIdx, minChildIdx);
        this.heapifyDown(minChildIdx);
      }
    }
  }

  /**
   * restores heap order by swapping up from given index until all children 
   * are larger than parents
   * @param {*} currIdx 
   */
  heapifyUp(currIdx) {
    if (currIdx === 1) {
      return;
    }

    const parentIdx = this.parent(currIdx);

    const currScore = this.scoreFunction(this.heap[currIdx]);
    const parentScore = this.scoreFunction(this.heap[parentIdx]);

    if (currScore < parentScore) {
      this.swap(currIdx, parentIdx);
      this.heapifyUp(parentIdx);
    }
  }

  /**
   * swap elements at idxA and idxB in the priority queue
   * @param {*} idxA 
   * @param {*} idxB 
   */
  swap(idxA, idxB) {
    let temp = this.heap[idxA];
    this.heap[idxA] = this.heap[idxB];
    this.heap[idxB] = temp;
  }
}
