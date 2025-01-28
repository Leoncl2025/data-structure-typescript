class QueueElement {
    constructor(props) {
        this.props = props;
    }
    /**
     * Compare this to other
     * @param {*} other 
     * @returns 0 if equal, 1 if this is greater, -1 if other is greater
     */
    compareTo(other) {
        return this.props - other.props;
    }
}

class PriorityQueue {
    constructor(isMinHeap = true) {
        this.heap = [];
        this.isMinHeap = isMinHeap;
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
        if (this.heap.length === 0) {
            return null;
        }
        const item = this.heap[0];
        this.heap[0] = this.heap[this.heap.length - 1];
        this.heap.pop();
        this.heapifyDown();
        return item;
    }
 
    add(item) {
        this.heap.push(item);
        this.heapifyUp();
    }
 
    heapifyUp() {
        let index = this.heap.length - 1;
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
 
    heapifyDown() {
        let index = 0;
        while (this.hasLeftChild(index)) {
            let smallerChildIndex = this.getLeftChildIndex(index);
            if (this.isMinHeap) {
                if (this.hasRightChild(index) && this.rightChild(index).compareTo(this.leftChild(index))
                < 0) {
                smallerChildIndex = this.getRightChildIndex(index);
                }
                if (this.heap[index].compareTo(this.heap[smallerChildIndex]) < 0) {
                    break;
                } else {
                    this.swap(index, smallerChildIndex);
                }
            } else {
                if (this.hasRightChild(index) && this.rightChild(index).compareTo(this.leftChild(index))
                > 0) {
                smallerChildIndex = this.getRightChildIndex(index);
                }
                if (this.heap[index].compareTo(this.heap[smallerChildIndex]) > 0) {
                    break;
                } else {
                    this.swap(index, smallerChildIndex);
                }
            }
            index = smallerChildIndex;
        }
    }
}
let PriQueue = new PriorityQueue();

// Adding the Elements
PriQueue.add(new QueueElement(32));
PriQueue.add(new QueueElement(45));
PriQueue.add(new QueueElement(12));
PriQueue.add(new QueueElement(65));
PriQueue.add(new QueueElement(85));

 
 
console.log(PriQueue.peek());
console.log(PriQueue.remove());
console.log(PriQueue.peek());
console.log(PriQueue.remove());
console.log(PriQueue.peek());
console.log(PriQueue.remove());