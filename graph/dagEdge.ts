import { EdgeBase } from "./edgeBase";
import { DagVertex } from "./dagVertex";

export class DagEdge extends EdgeBase {
    constructor(source: DagVertex, destination: DagVertex, weight: number) {
        super(source, destination, weight);
    }
}