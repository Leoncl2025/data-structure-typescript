class MyQueue {
    constructor() {
        this.items = {}
        this.frontIndex = 0
        this.backIndex = 0
    }
    enqueue(item) {
        this.items[this.backIndex] = item
        this.backIndex++
    }
    dequeue() {
        const item = this.items[this.frontIndex]
        delete this.items[this.frontIndex]
        this.frontIndex++
        return item
    }
    length() {
        return this.backIndex - this.frontIndex;
    }
    peek() {
        return this.items[this.frontIndex]
    }
    tail() {
        return this.items[this.backIndex - 1];
    }
    get printQueue() {
        return this.items;
    }
}