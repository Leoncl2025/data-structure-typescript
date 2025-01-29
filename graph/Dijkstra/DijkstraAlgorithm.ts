import { MyPriorityQueue, IQueueElement } from "../../sort/priorityQueue";
import { DagEdge } from "../dagEdge";
import { DagVertex, getVerticesInGraph } from "../dagVertex";
import { SingleSourceShortestStrategy } from "../singleSourceShortestStrategy";

/**
 * The Dijkstra algorithm for finding the shortest path from a source vertex to all other vertices.
 */
export class DijkstraAlgorithm implements SingleSourceShortestStrategy {
    private priorityQueue: MyPriorityQueue;

    constructor() {
        this.priorityQueue = new MyPriorityQueue();
    }

    /**
     * Finds the shortest path from the source vertex to all other vertices.
     * @param source The source vertex.
     */
    findShortestPaths(source: DagVertex): void {
        this.priorityQueue.clear();
        const vertices = getVerticesInGraph(source);
        source.shortestPathEstimate = 0;
        vertices.forEach(v => this.priorityQueue.enqueue(v));

        while(!this.priorityQueue.isEmpty()) {
            const wavefront = this.priorityQueue.dequeue();
            const vertex = wavefront as DagVertex;

            vertex.outEdges
                .forEach(edge => {
                    relax(edge);
                    this.priorityQueue.modify(edge.destination as DagVertex);
            });
        }
    }
}

function relax(edge: DagEdge) {
    const u = edge.source as DagVertex;
    const v = edge.destination as DagVertex;

    if (v.shortestPathEstimate == null || v.shortestPathEstimate > u.shortestPathEstimate + edge.weight) {
        v.shortestPathEstimate = u.shortestPathEstimate + edge.weight;
    }

}