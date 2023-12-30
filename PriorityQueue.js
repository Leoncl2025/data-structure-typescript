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
    constructor(isMaxHeap = true) {
        this.heap = [];
        this._isMaxHeap = isMaxHeap;
    }
    enqueue(element) {
        this.heap.push(element);
        this._up(this.size() - 1);   
    }
    dequeue() {
        if (this.isEmpty()) {
            return null;
        }

        const ret = this.heap[0];
        this.heap[0] = this.heap[this.size() - 1];
        this.heap.pop();
        this._down(0);
        return ret;
    }
    peek() {
        if (this.isEmpty()) {
            return null;
        }
        return this.heap[0];
    }
    size() {
        return this.heap.length;
    }
    isEmpty() {
        return this.heap.length === 0;
    }
    _up(i) {
        if (i === 0 || i >= this.size()) {
            return;
        }

        let parent = this._parent(i);
        let current = i;
        while (this._isHigherPriority(current, parent)) {
            this._swap(current, parent);
            current = parent;
            parent = this._parent(current);
        }
    }
    _swap(i, j) {
        const temp = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = temp;
    }
    _isHigherPriority(i, j) {
        if (!this._boundaryCheck(i) || !this._boundaryCheck(j)) {
            return false;
        }

        // equal priority is not higher priority
        if (this._isMaxHeap) {
            return this.heap[i].compareTo(this.heap[j]) > 0;
        } else {
            return this.heap[i].compareTo(this.heap[j]) < 0;
        }
    }
    _boundaryCheck(i) {
        return i >= 0 && i < this.size();
    }
    _parent(i) {
        return Math.floor((i - 1) / 2);
    }
    _down(i) {
        if (!this._boundaryCheck(i)) {
            return;
        }

        let current = i;
        let child = this._leftChild(current);
        let childRight = this._rightChild(current);
        let childRightPriority = this._isHigherPriority(childRight, current);
        let childPriority = this._isHigherPriority(child, current);
        while (childPriority || childRightPriority) {
            if (childPriority && (!this._boundaryCheck(childRight) || this._isHigherPriority(child, childRight))) {
                this._swap(current, child);
                current = child;
            } else {
                this._swap(current, childRight);
                current = childRight;
            }
            child = this._leftChild(current);
            childRight = this._rightChild(current);
            childRightPriority = this._isHigherPriority(childRight, child);
            childPriority = this._isHigherPriority(child, childRight);
        }
    }
    _leftChild(i) {
        return i * 2 + 1;
    }
    _rightChild(i) {
        return i * 2 + 2;
    
    }
}

// test priority queue
const pq = new PriorityQueue(true);
console.log(pq.peek());
pq.enqueue(new QueueElement(4));
console.log(pq.peek());
pq.enqueue(new QueueElement(1));
console.log(pq.peek());
pq.enqueue(new QueueElement(-6));
console.log(pq.peek());
pq.enqueue(new QueueElement(2));
console.log(pq.peek());
pq.enqueue(new QueueElement(0));
console.log(pq.peek());
pq.enqueue(new QueueElement(8));
console.log(pq.peek());
console.log("dequeue");
while (!pq.isEmpty()) {
    console.log(pq.dequeue());
}