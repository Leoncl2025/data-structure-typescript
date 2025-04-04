import { buildTopologyVertexs, topologicalSort } from "../graph/TopologicalSort/topologyDagVertex";

function canFinish(numCourses: number, prerequisites: number[][]) {
    const vertexs = buildTopologyVertexs(numCourses, prerequisites);
    const sorted = topologicalSort(vertexs);
    return sorted;
}

let numCourses = 4;
let prerequisites = [[1,0],[2,0],[3,1],[3,2]];

console.log(canFinish(numCourses, prerequisites)); // true