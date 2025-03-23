
const TimeUnset = -1;

class DagVertex {
    constructor(
        public key,
        public outSet = new Set(),
        public inSet = new Set(),
        public discoverTime = TimeUnset,
        public finishTime = TimeUnset,
        public color = "white"
    ) {
    }

    private _visited = false;
    public get visited() {
        return this._visited;
    }
    public set visited(value) {
        this._visited = value;
    }
    public get outDegree() {
        return this.outSet.size;
    }
    public get inDegree() {
        return this.inSet.size;
    }
    public get outEdges(): DagVertex[] {
        return Array.from(this.outSet) as DagVertex[];
    }
    public get inEdges() {
        return Array.from(this.inSet) as DagVertex[];
    }
    public addOutEdge(vertex) {
        this.outSet.add(vertex);
        vertex.inSet.add(this);
    }
    public addInEdge(vertex) {
        this.inSet.add(vertex);
        vertex.outSet.add(this);
    }
    public removeOutEdge(vertex) {
        this.outSet.delete(vertex);
        vertex.inSet.delete(this);
    }
    public removeInEdge(vertex) {
        this.inSet.delete(vertex);
        vertex.outSet.delete(this);
    }
    public getNotVisitedOutEdges() {
        return this.outEdges.filter(v => !v.visited);
    }
}

function buildVertexs(numCourses: number, prerequisites: number[][]) {
    const vertexs = new Array(numCourses).fill(0).map((_, i) => new DagVertex(i));
    for (const [a, b] of prerequisites) {
        vertexs[a].addOutEdge(vertexs[b]);
    }
    return vertexs;
}

function detectCycle(vertexs: DagVertex[]) {
    let hasCycle = false;
    for (const vertex of vertexs) {
        if (vertex.color === "black") {
            continue;
        }
        if (cycleDfs(vertex)) {
            hasCycle = true;
            break;
        }
    }

    for (const vertex of vertexs) {
        vertex.color = "white";
    }
    return hasCycle;
}

function cycleDfs(vertex: DagVertex) {
    if (vertex.color === "gray") {
        return true;
    }
    vertex.color = "gray";
    for (const v of vertex.outEdges) {
        if (v.color === "black") {
            continue;
        }

        if (cycleDfs(v)) {
            return true;
        }
    }
    vertex.color = "black";
    return false;
}

function canFinish(numCourses: number, prerequisites: number[][]): boolean {
    const vertexs = buildVertexs(numCourses, prerequisites);
    const sorted = topologicalSort(vertexs);
    return sorted.length != 0;
};

function topologicalSort(vertexs: DagVertex[]) {
    let discoverTime = 0;
    if (vertexs.some(v => v.outSet.has(v))) {
        return [];
    }
    if (detectCycle(vertexs)) {
        return [];
    }
    const vertexsZeroInDegree = vertexs.filter(v => v.inDegree === 0);
    vertexsZeroInDegree.forEach(v => v.visited = false);
    if (vertexsZeroInDegree.length === 0) {
        return [];
    }
    for (const vertex of vertexsZeroInDegree) {
        if (!dfs(vertex, discoverTime)) {
            return [];
        }
        discoverTime = vertex.finishTime + 1;
    }
    const vertexsSorted = vertexs.sort((a, b) => a.discoverTime - b.discoverTime);
    return vertexsSorted

}

function dfs(vertex: DagVertex, discoverTime: number) {
    if (vertex.color === "gray") {
        return false;
    }

    vertex.color = "gray";
    vertex.discoverTime = discoverTime;
    let discoverTimeNew = discoverTime + 1;
    for (const v of vertex.outEdges) {
        if (v.color === "black") {
            continue;
        }
        if (!dfs(v, discoverTimeNew)) {
            return false;
        }
        vertex.addOutEdge(v);
        discoverTimeNew = v.finishTime + 1;
    }
    vertex.color = "black";
    vertex.finishTime = discoverTimeNew;
    return true;
}

let numCourses = 20;
let prerequisites = [[0,10],[3,18],[5,5],[6,11],[11,14],[13,1],[15,1],[17,4]];
numCourses = 3;
prerequisites = [[0,2],[1,2],[2,0]];
numCourses = 2;
prerequisites = [[1,0]];
numCourses = 100;
prerequisites = [[1,0],[2,0],[2,1],[3,1],[3,2],[4,2],[4,3],[5,3],[5,4],[6,4],[6,5],[7,5],[7,6],[8,6],[8,7],[9,7],[9,8],[10,8],[10,9],[11,9],[11,10],[12,10],[12,11],[13,11],[13,12],[14,12],[14,13],[15,13],[15,14],[16,14],[16,15],[17,15],[17,16],[18,16],[18,17],[19,17],[19,18],[20,18],[20,19],[21,19],[21,20],[22,20],[22,21],[23,21],[23,22],[24,22],[24,23],[25,23],[25,24],[26,24],[26,25],[27,25],[27,26],[28,26],[28,27],[29,27],[29,28],[30,28],[30,29],[31,29],[31,30],[32,30],[32,31],[33,31],[33,32],[34,32],[34,33],[35,33],[35,34],[36,34],[36,35],[37,35],[37,36],[38,36],[38,37],[39,37],[39,38],[40,38],[40,39],[41,39],[41,40],[42,40],[42,41],[43,41],[43,42],[44,42],[44,43],[45,43],[45,44],[46,44],[46,45],[47,45],[47,46],[48,46],[48,47],[49,47],[49,48],[50,48],[50,49],[51,49],[51,50],[52,50],[52,51],[53,51],[53,52],[54,52],[54,53],[55,53],[55,54],[56,54],[56,55],[57,55],[57,56],[58,56],[58,57],[59,57],[59,58],[60,58],[60,59],[61,59],[61,60],[62,60],[62,61],[63,61],[63,62],[64,62],[64,63],[65,63],[65,64],[66,64],[66,65],[67,65],[67,66],[68,66],[68,67],[69,67],[69,68],[70,68],[70,69],[71,69],[71,70],[72,70],[72,71],[73,71],[73,72],[74,72],[74,73],[75,73],[75,74],[76,74],[76,75],[77,75],[77,76],[78,76],[78,77],[79,77],[79,78],[80,78],[80,79],[81,79],[81,80],[82,80],[82,81],[83,81],[83,82],[84,82],[84,83],[85,83],[85,84],[86,84],[86,85],[87,85],[87,86],[88,86],[88,87],[89,87],[89,88],[90,88],[90,89],[91,89],[91,90],[92,90],[92,91],[93,91],[93,92],[94,92],[94,93],[95,93],[95,94],[96,94],[96,95],[97,95],[97,96],[98,96],[98,97],[99,97]];

console.log(canFinish(numCourses, prerequisites)); // true