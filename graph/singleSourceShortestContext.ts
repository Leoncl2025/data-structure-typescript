/**
 * Single source shortest path context.
 */

import { DagVertex } from "./dagVertex";
import { SingleSourceShortestStrategy } from "./singleSourceShortestStrategy";

export class SingleSourceShortestContext {
    private _strategy: SingleSourceShortestStrategy;

    constructor() {
    }

    public setStrategy(strategy: SingleSourceShortestStrategy) {
        this._strategy = strategy;
    }

    public findShortestPaths(source: DagVertex) {
        if (!this._strategy) {
            throw new Error("Strategy not set.");
        }

        this._strategy.findShortestPaths(source);
    }
}