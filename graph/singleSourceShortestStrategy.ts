/**
 * The strategy interface for single source shortest path algorithms.
 */

import { GraphVertexBase } from "./vertextBase";

export interface SingleSourceShortestStrategy {
    /**
     * Finds the shortest path from the source vertex to all other vertices.
     * @param source The source vertex.
     */
    findShortestPaths(source: GraphVertexBase): void;
}