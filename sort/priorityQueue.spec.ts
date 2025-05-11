// test for priorityQueue
import { MyPriorityQueue, IQueueElement, NumberQueueElement } from './priorityQueue';

// use jest
describe('Priority Queue', () => {
    it('should return the correct order', () => {
        const pq = new MyPriorityQueue<NumberQueueElement>();
        pq.add(new NumberQueueElement(5, 0));
        pq.add(new NumberQueueElement(3, 1));
        pq.add(new NumberQueueElement(1, 2));
        pq.add(new NumberQueueElement(2, 3));
        pq.add(new NumberQueueElement(4, 4));

        expect((pq.dequeue()).value).toBe(1);
        expect((pq.dequeue()).value).toBe(2);
        expect((pq.dequeue()).value).toBe(3);
        expect((pq.dequeue()).value).toBe(4);
        expect((pq.dequeue()).value).toBe(5);
    });
});

it('should reorder the heap correctly after modifying an element to a lower value (min-heap)', () => {
    const pq = new MyPriorityQueue<NumberQueueElement>();
    const elements = [
        new NumberQueueElement(5, 0),
        new NumberQueueElement(3, 1),
        new NumberQueueElement(1, 2),
        new NumberQueueElement(2, 3),
        new NumberQueueElement(4, 4)
    ];
    elements.forEach(e => pq.add(e));

    // Modify the element with value 5 to value 0 (should become new min)
    elements[0].value = 0;
    pq.modify(elements[0]);

    expect((pq.dequeue()).value).toBe(0);
    expect((pq.dequeue()).value).toBe(1);
    expect((pq.dequeue()).value).toBe(2);
    expect((pq.dequeue()).value).toBe(3);
    expect((pq.dequeue()).value).toBe(4);
});

it('should reorder the heap correctly after modifying an element to a higher value (min-heap)', () => {
    const pq = new MyPriorityQueue<NumberQueueElement>();
    const elements = [
        new NumberQueueElement(1, 0),
        new NumberQueueElement(2, 1),
        new NumberQueueElement(3, 2),
        new NumberQueueElement(4, 3),
        new NumberQueueElement(5, 4)
    ];
    elements.forEach(e => pq.add(e));

    // Modify the element with value 1 to value 10 (should become new max)
    elements[0].value = 10;
    pq.modify(elements[0]);

    expect((pq.dequeue()).value).toBe(2);
    expect((pq.dequeue()).value).toBe(3);
    expect((pq.dequeue()).value).toBe(4);
    expect((pq.dequeue()).value).toBe(5);
    expect((pq.dequeue()).value).toBe(10);
});

it('should throw an error if modify is called with null', () => {
    const pq = new MyPriorityQueue();
    expect(() => pq.modify(null as any)).toThrow("Item to be modified is null");
});

it('should work for max-heap as well', () => {
    const pq = new MyPriorityQueue<NumberQueueElement>(false); // max-heap
    const elements = [
        new NumberQueueElement(5, 0),
        new NumberQueueElement(3, 1),
        new NumberQueueElement(1, 2),
        new NumberQueueElement(2, 3),
        new NumberQueueElement(4, 4)
    ];
    elements.forEach(e => pq.add(e));

    // Modify the element with value 1 to value 10 (should become new max)
    elements[2].value = 10;
    pq.modify(elements[2]);

    expect((pq.dequeue()).value).toBe(10);
    expect((pq.dequeue()).value).toBe(5);
    expect((pq.dequeue()).value).toBe(4);
    expect((pq.dequeue()).value).toBe(3);
    expect((pq.dequeue()).value).toBe(2);
});