export default class PriorityQueue {
  constructor(scoreFunction) {
    this.heap = [null];
    this.scoreFunction = scoreFunction;
  }

  push(value) {
    this.heap.push(value);
    this.heapifyUp(this.heap.length - 1);
  }

  pop() {
    const min = this.heap[1];
    this.heap[1] = this.heap[this.heap.length - 1];
    this.heap.pop();
    this.heapifyDown(1);
    return min;
  }

  isEmpty() {
    return this.heap.length === 1;
  }

  peek() {
    const min = this.heap[1];
    return min;
  }

  leftChild(idx) {
    return 2 * idx;
  }

  rightChild(idx) {
    return 2 * idx + 1;
  }

  parent(idx) {
    return Math.floor(idx / 2);
  }

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

  swap(idxA, idxB) {
    let temp = this.heap[idxA];
    this.heap[idxA] = this.heap[idxB];
    this.heap[idxB] = temp;
  }
}
