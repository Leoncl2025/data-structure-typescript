import { getVerticesInGraph, DagVertex } from './dagVertex';

describe('DagVertex', () => {
    describe('getVerticesInGraph', () => {
        it('should return all vertices in the graph', () => {
            const v1 = new DagVertex('1');
            const v2 = new DagVertex('2');
            const v3 = new DagVertex('3');
            const v4 = new DagVertex('4');
            const v5 = new DagVertex('5');
            const v6 = new DagVertex('6');

            v1.connectTo(v2, 1);
            v1.connectTo(v3, 1);
            v2.connectTo(v4, 1);
            v3.connectTo(v4, 1);
            v4.connectTo(v5, 1);
            v5.connectTo(v6, 1);

            const vertices = getVerticesInGraph(v1);
            expect(vertices).toEqual([v1, v3, v4, v5, v6, v2]);
        });
    });
});