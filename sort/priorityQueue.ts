import { IComparable } from "./ICompareable";

export class NumberQueueElement implements IQueueElement {
    index: number;
    value: number;
    constructor(value: number, index: number) {
        this.value = value;
        this.index = index;
    }

    compareTo(other: NumberQueueElement): number {
        return this.value - other.value;
    }
    clone(): NumberQueueElement {
        return new NumberQueueElement(this.value, this.index);
    }
}

export interface IQueueElement extends IComparable {
    index: number;
    compareTo(other: IQueueElement): number;
    clone(): IQueueElement;
}

export class MyPriorityQueue<Q extends IQueueElement> {
    heap: Q[];
    private isMinHeap: boolean;
    constructor(isMinHeap = true) {
        this.heap = [];
        this.isMinHeap = isMinHeap;
    }

    clone() {
        const newQueue = new MyPriorityQueue(this.isMinHeap);
        for (let i = 0; i < this.heap.length; i++) {
            newQueue.add(this.heap[i].clone());
        }
        return newQueue;
    }

    clear() {
        this.heap = [];
    }
 
    // Helper Methods
    getLeftChildIndex(parentIndex) {
        return 2 * parentIndex + 1;
    }
 
    getRightChildIndex(parentIndex) {
        return 2 * parentIndex + 2;
    }
 
    getParentIndex(childIndex) {
        return Math.floor((childIndex - 1) / 2);
    }
 
    hasLeftChild(index) {
        return this.getLeftChildIndex(index)
            < this.heap.length;
    }
 
    hasRightChild(index) {
        return this.getRightChildIndex(index)
            < this.heap.length;
    }
 
    hasParent(index) {
        return this.getParentIndex(index) >= 0;
    }
 
    leftChild(index) {
        return this.heap[this.getLeftChildIndex(index)];
    }
 
    rightChild(index) {
        return this.heap[this.getRightChildIndex(index)];
    }
 
    parent(index) {
        return this.heap[this.getParentIndex(index)];
    }
 
    swap(indexOne, indexTwo) {
        const temp = this.heap[indexOne];
        this.heap[indexOne] = this.heap[indexTwo];
        this.heap[indexTwo] = temp;
        this.heap[indexOne].index = indexOne;
        this.heap[indexTwo].index = indexTwo;
    }
 
    peek() {
        if (this.heap.length === 0) {
            return null;
        }
        return this.heap[0];
    }
 
    // Removing an element will remove the
    // top element with highest priority then
    // heapifyDown will be called 
    remove() {
        return this.removeAt(0);
    }

    removeAt(index) {
        if (this.heap.length === 0) {
            return null;
        }
        const item = this.heap[index];
        this.swap(index, this.heap.length - 1);
        this.heap.pop();
        this.heapifyDown(index);
        this.heapifyUp(index);
        return item;
    }
 
    add(item: Q) {
        this.heap.push(item);
        item.index = this.heap.length - 1;
        this.heapifyUp(this.heap.length - 1);
    }

    enqueue(item) {
        return this.add(item);
    }

    dequeue() {
        return this.remove();
    }

    modify(item: Q) {
        if (!item) {
            throw new Error("Item to be modified is null");
        }
        this.heapifyDown(item.index);
        this.heapifyUp(item.index);
    }

    isEmpty() {
        return this.heap.length === 0;
    }
 
    heapifyUp(indexUp) {
        if (indexUp >= this.heap.length) {
            return;
        }
        let index = indexUp;
        if (this.isMinHeap) {
            while (this.hasParent(index) && this.parent(index).compareTo(this.heap[index])
            > 0) {
                this.swap(this.getParentIndex(index), index);
                index = this.getParentIndex(index);
            }
        } else {
            while (this.hasParent(index) && this.parent(index).compareTo(this.heap[index])
            < 0) {
                this.swap(this.getParentIndex(index), index);
                index = this.getParentIndex(index);
            }
        
        }
    }
 
    heapifyDown(index = 0) {
        let indexDown = index;
        while (this.hasLeftChild(indexDown)) {
            let nextChildIndex = 0;
            if (this.isMinHeap) {
                nextChildIndex = this.getLeftChildIndex(indexDown); // smallerChildIndex
                if (this.hasRightChild(indexDown) && this.rightChild(indexDown).compareTo(this.leftChild(indexDown))
                < 0) {
                    nextChildIndex = this.getRightChildIndex(indexDown);
                }
                if (this.heap[indexDown].compareTo(this.heap[nextChildIndex]) < 0) {
                    break;
                } else {
                    this.swap(indexDown, nextChildIndex);
                }
            } else {
                nextChildIndex = this.getLeftChildIndex(indexDown); // largerChildIndex
                if (this.hasRightChild(indexDown) && this.rightChild(indexDown).compareTo(this.leftChild(indexDown))
                > 0) {
                    nextChildIndex = this.getRightChildIndex(indexDown);
                }
                if (this.heap[indexDown].compareTo(this.heap[nextChildIndex]) > 0) {
                    break;
                } else {
                    this.swap(indexDown, nextChildIndex);
                }
            }
            indexDown = nextChildIndex;
        }
    }
}