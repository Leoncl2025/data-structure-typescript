/**
 * Define the directed acyclic graph node
 */
import { DagEdge } from "./dagEdge";
import { GraphVertexBase } from "./vertextBase";
import { IComparable } from "../sort/ICompareable";
import { IQueueElement } from "../sort/priorityQueue";

export class DagVertex implements IQueueElement, GraphVertexBase {
    public key: string;
    public index: number;

    private d: number;
    private _inDegree: number;
    private _outDegree: number;
    private _outEdges: DagEdge[];
    private _inEdges: DagEdge[];

    constructor(key: string) {
        this.key = key;
        this._inDegree = 0;
        this._outDegree = 0;
        this._outEdges = [];
        this._inEdges = [];
    }

    get shortestPathEstimate() {
        return this.d;
    }

    set shortestPathEstimate(value: number) {
        this.d = value;
    }

    get outAdjacentVertices() {
        return this._outEdges.map(e => e.destination as DagVertex);
    }

    get outEdges() {
        return this._outEdges;
    }

    get inAdjacentVertices() {
        return this._inEdges.map(e => e.source as DagVertex);
    }

    get inEdges() {
        return this._inEdges;
    }

    get inDegree() {
        return this._inDegree;
    }

    get outDegree() {
        return this._outDegree;
    }

    connectTo(vertex: DagVertex, weight: number) {
        const edge = new DagEdge(this, vertex, weight);
        this._outEdges.push(edge);
        vertex._inEdges.push(edge);
        vertex.incrementInDegree();
        this.incrementOutDegree();
        return edge;
    }

    connectFrom(vertex: DagVertex, weight: number) {
        return vertex.connectTo(this, weight);
    }

    incrementInDegree() {
        this._inDegree++;
    }

    incrementOutDegree() {
        this._outDegree++;
    }

    decrementInDegree() {
        this._inDegree--;
    }

    decrementOutDegree() {
        this._outDegree--;
    }

    compareTo(other: DagVertex): number {
        if (this.shortestPathEstimate == null && other.shortestPathEstimate == null) {
            return 0;
        }

        if (this.shortestPathEstimate == null) {
            return 1;
        }

        if (other.shortestPathEstimate == null) {
            return -1;
        }

        return this.shortestPathEstimate - other.shortestPathEstimate;
    }
}

export function getVerticesInGraph(vertex: DagVertex): DagVertex[] {
    const verticesSet = new Set<DagVertex>();
    const stack = [vertex];
    while (stack.length > 0) {
        const current = stack.pop();
        verticesSet.add(current);
        const funcAdd = (v: DagVertex) => {
            if (!verticesSet.has(v)) {
                stack.push(v);
            }
        };
        current.inAdjacentVertices.forEach(funcAdd);
        current.outAdjacentVertices.forEach(funcAdd);
    }
    return [...verticesSet];
}

/**
 * Build a directed acyclic graph from a list of edges.
 * e.g. [[1, 3, 4]] means there is an edge from 1 to 3 with weight 4.
 */
export function buildDag(edges: number[][]): DagVertex[] {
    const vertices = new Map<number, DagVertex>();
    edges.forEach(e => {
        const [source, destination, weight] = e;
        if (!vertices.has(source)) {
            vertices.set(source, new DagVertex(source.toString()));
        }
        if (!vertices.has(destination)) {
            vertices.set(destination, new DagVertex(destination.toString()));
        }
        vertices.get(source).connectTo(vertices.get(destination), weight);
    });
    return [...vertices.values()];
}