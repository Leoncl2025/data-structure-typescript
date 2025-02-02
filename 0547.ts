function findCircleNum(isConnected: number[][]): number {
    const uf = new UnionFind(isConnected.length);
    for (let i = 0; i < isConnected.length; ++i) {
        for (let j = i + 1; j < isConnected.length; ++j) {
            if (isConnected[i][j]) {
                uf.union(i, j);
            }
        }
    }

    const provinces = Array(isConnected.length).fill(0).map((_, i) => uf.find(i));
    console.log(provinces);
    return (new Set(provinces)).size;
}

class UnionFind {
    private parent: number[];
    private rankSize: number[];

    constructor(n: number) {
        this.parent = new Array(n).fill(0).map((_, i) => i);
        this.rankSize = new Array(n).fill(1);
    }

    get Parent() {
        return this.parent;
    }

    find(x: number) {
        if (x === this.parent[x]) {
            return x;
        }

        return this.find(this.parent[x]);
    }

    union(x: number, y: number) {
        const xParent = this.find(x);
        const yParent = this.find(y);

        console.log(x, ":", xParent, y, ": ", yParent);
        if (xParent == yParent) {
            return;
        }

        const diff = this.rankSize[xParent] - this.rankSize[yParent];
        if (diff === 0) {
            this.parent[yParent] = xParent;
            this.rankSize[xParent]++;
        } else if (diff < 0) {
            this.rankSize[yParent] += this.rankSize[xParent];
            this.parent[xParent] = yParent;
        } else {
            this.rankSize[xParent] += this.rankSize[yParent];
            this.parent[yParent] = xParent;
        }
        console.log(this.parent);
    }
}

let isConnected = [[1,0,0,1],[0,1,1,0],[0,1,1,1],[1,0,1,1]];
console.log(findCircleNum(isConnected)); // 1