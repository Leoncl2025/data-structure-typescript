import { GraphVertexBase } from "./vertextBase";

export class EdgeBase {
    private _source: GraphVertexBase;
    private _destination: GraphVertexBase;
    private _weight: number;

    constructor(source: GraphVertexBase, destination: GraphVertexBase, weight: number) {
        this._source = source;
        this._destination = destination;
        this._weight = weight;
    }

    get source() {
        return this._source;
    }

    get destination() {
        return this._destination;
    }

    get weight() {
        return this._weight;
    }
}