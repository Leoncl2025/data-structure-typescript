export enum NodeColor {
    white = "white",
    gray = "gray",
    black = "black"
}

const TimeUnset = -1;

export class TopologyDagVertex {
    constructor(
        public key,
        public outSet = new Set(),
        public inSet = new Set(),
        public discoverTime = TimeUnset,
        public finishTime = TimeUnset,
        public color = NodeColor.white
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
    public get outEdges(): TopologyDagVertex[] {
        return Array.from(this.outSet) as TopologyDagVertex[];
    }
    public get inEdges() {
        return Array.from(this.inSet) as TopologyDagVertex[];
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

// ------------------- Functions -------------------

/**
 * Build a list of vertices from the number of nodes and the prerequisites.
 * @param numNodes the number of nodes
 * @param prerequisites [[a, b], [b, c], ...] means a -> b, a depends on b
 */
export function buildTopologyVertexs(numNodes: number, prerequisites: number[][]) {
    const vertexs = new Array(numNodes).fill(0).map((_, i) => new TopologyDagVertex(i));
    for (const [a, b] of prerequisites) {
        vertexs[b].addOutEdge(vertexs[a]);
    }
    return vertexs;
}

export function detectCycle(vertexs: TopologyDagVertex[]) {
    let hasCycle = false;
    for (const vertex of vertexs) {
        if (vertex.color === NodeColor.black) {
            continue;
        }
        if (cycleDfs(vertex)) {
            hasCycle = true;
            break;
        }
    }

    // Reset color back to white
    for (const vertex of vertexs) {
        vertex.color = NodeColor.white;
    }
    return hasCycle;
}

function cycleDfs(vertex: TopologyDagVertex) {
    if (vertex.color === NodeColor.gray) {
        return true;
    }
    vertex.color = NodeColor.gray;
    for (const v of vertex.outEdges) {
        if (v.color === NodeColor.black) {
            continue;
        }
        if (cycleDfs(v)) {
            return true;
        }
    }
    vertex.color = NodeColor.black;
    return false;
}

export function topologicalSort(vertexs: TopologyDagVertex[]) {
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
    const vertexsSorted = vertexs.sort((a, b) => b.finishTime - a.finishTime);
    return vertexsSorted.map(v => v.key);

}

function dfs(vertex: TopologyDagVertex, discoverTime: number) {
    if (vertex.color === NodeColor.gray) {
        return false;
    }

    vertex.color = NodeColor.gray;
    vertex.discoverTime = discoverTime;
    let discoverTimeNew = discoverTime + 1;
    for (const v of vertex.outEdges) {
        if (v.color === NodeColor.black) {
            continue;
        }
        if (!dfs(v, discoverTimeNew)) {
            return false;
        }
        vertex.addOutEdge(v);
        discoverTimeNew = v.finishTime + 1;
    }
    vertex.color = NodeColor.black;
    vertex.finishTime = discoverTimeNew;
    return true;
}
