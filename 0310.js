/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[]}
 */

let deepth = 0;
function getKey(i, j) {
    return `${i}-${j}`;
}
var findMinHeightTrees = function(n, edges) {
    const nodes = Array.from({ length: n }, (_, i) => new Node(i));
    edges.forEach(([a, b]) => {
        nodes[a].connect(nodes[b]);
        nodes[b].connect(nodes[a]);
    });
    edges.forEach(([a, b]) => {
        const abH = getHeight(a, b, nodes);
        const baH = getHeight(b, a, nodes);
    });
    let minHeight = n;
    const result = [];
    const heightMap = [];
    for (let i = 0; i < n; i++) {
        let maxHeight = 0;
        for (const key of nodes[i].children) {
            maxHeight = Math.max(maxHeight, nodes[i].heights.get(key));
        }
        heightMap.push(maxHeight);
        minHeight = Math.min(minHeight, maxHeight);
    }
    heightMap.forEach((height, index) => {
        if (height === minHeight) {
            result.push(index);
        }
    })
    // console.log(nodes, heightMap, visitTable);
    return result;
};

function removeSetMap(setMap, key, setVal) {
    const set = setMap.get(key);
    if (!set) {
        return;
    }
    set.delete(setVal);
    if (set.size === 0) {
        setMap.delete(key);
    }
}

function addSetMap(setMap, key, setVal) {
    if (!setMap.has(key)) {
        setMap.set(key, new Set());
    }
    setMap.get(key).add(setVal);
}

class Node {
    constructor(id) {
        this.id = id;
        this.children = new Set();
        this.heights = new Map();
        this.heightsSetMap = new Map();
    }
    connect(node) {
        this.children.add(node.id);
        this.addHeight(-1, node.id);
    }
    addHeight(height, childId) {
        const originHeight = this.heights.get(childId);
        this.heights.set(childId, height);
        removeSetMap(this.heightsSetMap, originHeight, childId);
        addSetMap(this.heightsSetMap, height, childId);
    }
}

function getHeight(fromId, nextId, nodes) {
    deepth++;
    const fromNode = nodes[fromId];
    const nextNode = nodes[nextId];
    if (fromNode.heights.get(nextId) !== -1) return fromNode.heights.get(nextId);
    if (!nextNode.children.has(fromId)) {
        return 0;
    }
    const newFromId = nextId;
    const childrenSet = nextNode.heightsSetMap.get(-1);
    if (childrenSet) for (const key of childrenSet) {
        if (key !== fromId) {
            const newNextId = key;
            getHeight(newFromId, newNextId, nodes);
        }
    }
    let mht = 0;
    for ( const [keyHeight, valueIds] of nextNode.heightsSetMap.entries()) {
        if (!(valueIds.size === 1 && valueIds.has(fromId))) {
            mht = Math.max(mht, keyHeight);
        }
    }
    mht += 1;
    fromNode.addHeight(mht, nextId);
    return mht;
}

const { data } = require("./data");

console.log(findMinHeightTrees(4, [[1,0],[1,2],[1,3]]));
console.log(findMinHeightTrees(6, [[3,0],[3,1],[3,2],[3,4],[5,4]]));
console.log(findMinHeightTrees(20000, data));