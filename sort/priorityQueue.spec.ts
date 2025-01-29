// test for priorityQueue
import { MyPriorityQueue, IQueueElement, NumberQueueElement } from './priorityQueue';

// use jest
describe('Priority Queue', () => {
    it('should return the correct order', () => {
        const pq = new MyPriorityQueue();
        pq.add(new NumberQueueElement(5, 0));
        pq.add(new NumberQueueElement(3, 1));
        pq.add(new NumberQueueElement(1, 2));
        pq.add(new NumberQueueElement(2, 3));
        pq.add(new NumberQueueElement(4, 4));

        expect((pq.dequeue() as NumberQueueElement).value).toBe(1);
        expect((pq.dequeue() as NumberQueueElement).value).toBe(2);
        expect((pq.dequeue() as NumberQueueElement).value).toBe(3);
        expect((pq.dequeue() as NumberQueueElement).value).toBe(4);
        expect((pq.dequeue() as NumberQueueElement).value).toBe(5);
    });
});