import { buildDag } from "./graph/dagVertex";
import { DijkstraAlgorithm } from "./graph/Dijkstra/DijkstraAlgorithm";
import { SingleSourceShortestContext } from "./graph/singleSourceShortestContext";

function minCost(grid: number[][]): number {
    const m = grid.length;
    const n = grid[0].length;
    if (m <= 1 && n <= 1) {
        return 0;
    }
    const edges = buildEdges(grid);
    const vertices = buildDag(edges);
    const sourceVertex = vertices.filter(v => v.key == "0")[0];
    const singleSourceShortestContext = new SingleSourceShortestContext();
    singleSourceShortestContext.setStrategy(new DijkstraAlgorithm());
    singleSourceShortestContext.findShortestPaths(sourceVertex);
    const keyOfTargetVertex = (m * n - 1).toString();
    const targetVertex = vertices.filter(v => v.key == keyOfTargetVertex)[0];
    return targetVertex.shortestPathEstimate; 
};

function buildEdges(grid: number[][]): number[][] {
    const edges: number[][] = [];
    const m = grid.length;
    const n = grid[0].length;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            const vertex = i * n + j;

            // right
            if (j + 1 < n) {
                edges.push([vertex, vertex + 1, grid[i][j] == 1 ? 0 : 1]);
            }

            // left
            if (j - 1 >= 0) {
                edges.push([vertex, vertex - 1, grid[i][j] == 2 ? 0 : 1]);
            }

            // down
            if (i + 1 < m) {
                edges.push([vertex, vertex + n, grid[i][j] == 3 ? 0 : 1]);
            }

            // up
            if (i - 1 >= 0) {
                edges.push([vertex, vertex - n, grid[i][j] == 4 ? 0 : 1]);
            }
        }
    }
    return edges;
}

let grid = [[1,1,1,1],[2,2,2,2],[1,1,1,1],[2,2,2,2]];
console.log(minCost(grid));