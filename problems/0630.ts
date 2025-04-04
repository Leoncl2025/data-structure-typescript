import { MyPriorityQueue, NumberQueueElement } from "../sort/priorityQueue";

function scheduleCourse(courses: number[][]): number {
    const pq = new MyPriorityQueue(false);
    const coursesSorted = courses.sort((a, b) => a[1] - b[1]);
    let totalTime = 0;
    for (const course of coursesSorted) {
        const [duration, end] = course;
        totalTime += duration;
        pq.enqueue(new NumberQueueElement(duration, 0));
        if (totalTime > end) {
            const longestCourse = pq.dequeue() as NumberQueueElement;
            totalTime -= longestCourse.value;
        }
    }
    return pq.heap.length;
};

console.log(scheduleCourse([[100,200],[200,1300],[1000,1250],[2000,3200]])); // 3