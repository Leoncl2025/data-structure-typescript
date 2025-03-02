class TreeNodeSet {
    index: number;
    profit: number;
    secondBob: number;
    visited: boolean;
    visitedAlice: boolean;
    nexts: TreeNodeSet[];
    constructor(index: number, profit: number) {
        this.index = index;
        this.profit = profit;
        this.secondBob = -1;
        this.visited = false;
        this.visitedAlice = false;
        this.nexts = [];
    }

    get isRoot() {
        return this.index === 0;
    }

    get isLeaf() {
        return this.nexts.length === 1 && !this.isRoot;
    }
}

function moveBob(bobNode: TreeNodeSet, second: number): boolean {
    if (bobNode.visited) {
        return false;
    }

    if (bobNode.isRoot) {
        bobNode.secondBob = second;
        bobNode.visited = true;
        return true;
    }

    bobNode.visited = true;
    for (let next of bobNode.nexts) {
        if (moveBob(next, second + 1)) {
            bobNode.secondBob = second
            return true;
        }
    }

    bobNode.visited = false;
    return false;
}

function moveAlice(aliceNode: TreeNodeSet, second: number): [boolean, number] {
    if (aliceNode.visitedAlice) {
        return [false, undefined];
    }

    if (aliceNode.isLeaf) {
        if (aliceNode.visited && aliceNode.secondBob === second) {
            return [true, Math.floor(aliceNode.profit / 2)];
        }

        if (aliceNode.visited && aliceNode.secondBob < second) {
            return [true, 0];
        }

        return [true, aliceNode.profit];
    }

    aliceNode.visitedAlice = true;
    let maxProfit = Number.MIN_SAFE_INTEGER;
    let findLeaf = false;
    for (let next of aliceNode.nexts) {
        const [found, profit] = moveAlice(next, second + 1);
        if (found) {
            let profitAlice = 0;
            if (aliceNode.visited && aliceNode.secondBob === second) {
                profitAlice = Math.floor(aliceNode.profit / 2);
            } else if (aliceNode.visited && aliceNode.secondBob < second) {
                profitAlice = 0;
            } else {
                profitAlice = aliceNode.profit;
            }

            maxProfit = Math.max(maxProfit, profitAlice + profit);
            findLeaf = true;
        }
    }

    aliceNode.visitedAlice = false;
    return [findLeaf, maxProfit];
}

function buildTree(edges: number[][], profits: number[]): TreeNodeSet[] {
    let nodes: TreeNodeSet[] = [];
    for (let i = 0; i < profits.length; i++) {
        nodes.push(new TreeNodeSet(i, profits[i]));
    }

    for (let edge of edges) {
        let [from, to] = edge;
        nodes[from].nexts.push(nodes[to]);
        nodes[to].nexts.push(nodes[from]);
    }

    return nodes;
}

function mostProfitablePath(edges: number[][], bob: number, amount: number[]): number {
    const nodes = buildTree(edges, amount);
    const bobNode = nodes[bob];
    const root = nodes[0];
    moveBob(bobNode, 0);
    const [found, profit] = moveAlice(root, 0);

    return profit;
};