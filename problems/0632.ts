import { MyPriorityQueue, NumberQueueElement } from '../sort/priorityQueue';

class RangeElement extends NumberQueueElement {
    constructor(value: number, index: number, public numIndex: number, public stackIndex) {
        super(value, index);
    }
    public get id(): string {
        return `@${this.stackIndex}_${this.numIndex}`;
    }
    public advance(nums: number[][]): void {
        this.numIndex++;
        if (this.numIndex < nums[this.stackIndex].length) {
            this.value = nums[this.stackIndex][this.numIndex];
        }
    }
    clone(): RangeElement {
        return new RangeElement(this.value, this.index, this.numIndex, this.stackIndex);
    }
}

function smallestRange(nums: number[][]): number[] {
    const minQueue = new MyPriorityQueue<RangeElement>(true);
    const maxQueue = new MyPriorityQueue<RangeElement>(false);
    const eleMaxMap = new Map<string, RangeElement>();
    nums.forEach((arr, index) => {
        const eleMin = new RangeElement(arr[0], 0, 0, index);
        const eleMax = new RangeElement(arr[0], 0, 0, index);
        eleMaxMap.set(eleMax.id, eleMax);
        minQueue.enqueue(eleMin);
        maxQueue.enqueue(eleMax);
    });
    let left = -1e5;
    let right = 1e5;
    while (true) {
        printQueue(minQueue);
        printQueue(maxQueue);
        const minEle = minQueue.peek() as RangeElement;
        const maxEle = maxQueue.peek() as RangeElement;
        const leftNew = minEle.value;
        const rightNew = maxEle.value;
        console.log([leftNew, rightNew], `minEle: [@${minEle.stackIndex}, ${minEle.numIndex}]`, `maxEle: [@${maxEle.stackIndex}, ${maxEle.numIndex}]`);
        if (rangeCompare(leftNew, rightNew, left, right) < 0) {
            left = leftNew;
            right = rightNew;
        }

        // update the queue
        if (minEle.numIndex >= nums[minEle.stackIndex].length - 1) {
            break;
        }
        const minEleInMaxQueue = eleMaxMap.get(minEle.id);
        minEleInMaxQueue.advance(nums);
        eleMaxMap.set(minEleInMaxQueue.id, minEleInMaxQueue);
        minEle.advance(nums);
        minQueue.modify(minEle);
        maxQueue.modify(minEleInMaxQueue);
    }
    return [left, right];
};

function rangeCompare(left0: number, right0: number, left1: number, right1: number): number {
    if (right0 - left0 !== right1 - left1) {
        return (right0 - left0) - (right1 - left1);
    }
    return left0 - left1;
}

function printQueue(queue: MyPriorityQueue<RangeElement>): void {
    const anotherQueue = queue.clone();
    let strBuilder = '';
    while (!anotherQueue.isEmpty()) {
        const ele = anotherQueue.dequeue() as RangeElement;
        strBuilder += `[${ele.value}, ${ele.stackIndex} ${ele.numIndex}] `;
    }
    console.log(strBuilder);
}

let nums1 = [[-89,1,69,89,90,98],[-43,-36,-24,-14,49,61,66,69],[73,94,94,96],[11,13,76,79,90],[-40,-20,1,9,12,12,14],[-91,-31,0,21,25,26,28,29,29,30],[23,88,89],[31,42,42,57],[-2,6,11,12,12,13,15],[-3,25,34,36,39],[-7,3,29,29,31,32,33],[4,11,14,15,15,18,19],[-34,9,12,19,19,19,19,20],[-26,4,47,53,64,64,64,64,64,65],[-51,-25,36,38,50,54],[17,25,38,38,38,38,40],[-30,12,15,19,19,20,22],[-14,-13,-10,68,69,69,72,74,75],[-39,42,70,70,70,71,72,72,73],[-67,-34,6,26,28,28,28,28,29,30,31]];
console.log(smallestRange(nums1));