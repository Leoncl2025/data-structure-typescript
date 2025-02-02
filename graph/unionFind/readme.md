并查集

# 实例
[0547. Number of Provinces](../../0547.ts)

# 数据结构
我们用数组来记录每个元素和其parent的信息。
### code
`rankSize`的作用是平衡树的深度，使得小树接在大树的根节点上。反之，大树的深度会加一。
```ts
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
```