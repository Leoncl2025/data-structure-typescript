import { DijkstraAlgorithm } from "./DijkstraAlgorithm";
import { buildDag } from "../dagVertex";
import { SingleSourceShortestContext } from "../singleSourceShortestContext";

describe("Dijkstra Algorithm", () => {
    it("should find the shortest path from the source vertex to all other vertices", () => {
        const edges = [
            [0, 1, 10],
            [0, 4, 5],
            [1, 4, 2],
            [4, 1, 3],
            [1, 2, 1],
            [2, 3, 4],
            [3, 2, 6],
            [4, 3, 2],
            [4, 2, 9],
            [3, 0, 7]
        ];

        const vertices = buildDag(edges);
        const singleSourceShortestContext = new SingleSourceShortestContext();
        singleSourceShortestContext.setStrategy(new DijkstraAlgorithm());
        singleSourceShortestContext.findShortestPaths(vertices[0]);
        const verticesWithShortestPath = vertices.map(v => [+v.key, v.shortestPathEstimate])
            .sort((a, b) => +a[0] - +b[0]);
        expect(verticesWithShortestPath).toEqual([
            [0, 0],
            [1, 8],
            [2, 9],
            [3, 7],
            [4, 5] 
        ]);
    });
});