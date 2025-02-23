import { TreeNode } from "./tree/TreeNode";

class LinkNodeD {
    constructor(public prev: LinkNodeD, public next: LinkNodeD, public index: number) {
    }
}

function constructFromPrePost(preorder: number[], postorder: number[]): TreeNode | null {
    const preorderHead = buildLinkNode(preorder);
    const postorderHead = buildLinkNode(postorder);
    const preorderMap = buildNodeMap(preorderHead);
    const postorderMap = buildNodeMap(postorderHead);
    const treeNodeMap = new Map<number, TreeNode>();
    preorder.forEach((v, i) => {
        treeNodeMap.set(v, new TreeNode(v));
    });
    return buildLeafNode(preorderMap, postorderMap, preorderHead, postorderHead, treeNodeMap);
};

function buildNodeMap(head: LinkNodeD): Map<number, LinkNodeD> {
    const map = new Map<number, LinkNodeD>();
    let cur = head;
    while (cur) {
        map.set(cur.index, cur);
        cur = cur.next;
    }
    return map;
}

function buildLeafNode(
    preorderMap: Map<number, LinkNodeD>,
    postorderMap: Map<number, LinkNodeD>,
    preorderHead: LinkNodeD,
    postorderHead: LinkNodeD,
    treeNodeMap: Map<number, TreeNode>) {
    if (!preorderHead) return null;
    const leafNodes = findLeafNode(preorderMap, postorderMap, preorderHead, postorderHead);
    if (leafNodes.length === 0) return treeNodeMap.get(preorderHead.index); // root
    const nodeParentIndex = leafNodes[0];
    const nodeParent = treeNodeMap.get(nodeParentIndex);
    let postHeadNew = postorderHead;
    for (let i = 1; i < leafNodes.length; ++i) {
        const childIndex = leafNodes[i];
        const childProp = i === 1 ? "left" : "right";
        nodeParent[childProp] = treeNodeMap.get(childIndex);
        removeNode(preorderMap.get(childIndex));
        const postNodeRemoved = postorderMap.get(childIndex);
        if (postNodeRemoved == postHeadNew) {
            postHeadNew = postNodeRemoved.next;
        }
        removeNode(postNodeRemoved);
    }

    return buildLeafNode(preorderMap, postorderMap, preorderHead, postHeadNew, treeNodeMap);
}

function findLeafNode3(
    postorderMap: Map<number, LinkNodeD>,
    preorderHead: LinkNodeD): number[] {
    let cur = preorderHead;
    while (cur) {
        const postNode = postorderMap.get(cur.index);
        let nodes = [];
        const preorderNexts = [];
        const postorderNexts = [];
        let preCur = cur;
        let postCur = postNode;
        for (let i = 0; i < 3; ++i) {
            if (preCur) preorderNexts.push(preCur.index);
            if (postCur) postorderNexts.push(postCur.index);
            preCur = preCur?.next;
            postCur = postCur?.prev;
        }
        nodes.push(cur.index);
        if (preorderNexts[1] != undefined && postorderNexts[2] != undefined
            && preorderNexts[1] === postorderNexts[2]) {
            nodes.push(preorderNexts[1]);
        }

        if (preorderNexts[2] != undefined && postorderNexts[1] != undefined
            && preorderNexts[2] === postorderNexts[1]) {
            nodes.push(preorderNexts[2]);
        }

        if (nodes.length === 3) {
            return nodes;
        }
        cur = cur.next;
    }

    return [];
}

function findLeafNode (preorderMap: Map<number, LinkNodeD>,
    postorderMap: Map<number, LinkNodeD>,
    preorderHead: LinkNodeD,
    postorderHead: LinkNodeD): number[] {
    const find3 = findLeafNode3(postorderMap, preorderHead);
    if (find3.length === 3) return find3;
    const find2 = findLeafNode2(preorderMap, postorderHead);
    if (find2.length === 2) return find2;
    return [];
}

function findLeafNode2(
    preorderMap: Map<number, LinkNodeD>,
    postorderHead: LinkNodeD): number[] {
    let cur = postorderHead;
    while (cur) {
        const preNode = preorderMap.get(cur.index);
        let nodes = [];
        const preorderNexts = [];
        const postorderNexts = [];
        let preCur = preNode;
        let postCur = cur;
        for (let i = 0; i < 2; ++i) {
            if (preCur) preorderNexts.push(preCur.index);
            if (postCur) postorderNexts.push(postCur.index);
            postCur = postCur?.next;
            preCur = preCur?.prev;
        }
        nodes = [cur.index];
        if (preorderNexts[1] != undefined && postorderNexts[1] != undefined
            && preorderNexts[1] === postorderNexts[1]) {
            nodes.push(preorderNexts[1]);
        }
        if (nodes.length === 2) {
            return nodes.reverse();
        }


        cur = cur.next;
    }

    return [];
}

function buildLinkNode(arr: number[]): LinkNodeD | null {
    if (arr.length === 0) return null;
    let prev = null;
    let curr = null;
    const head = new LinkNodeD(null, null, arr[0]);
    arr.forEach((v, i) => {
        curr = i !== 0 ? new LinkNodeD(prev, null, v) : head;
        if (prev) {
            prev.next = curr;
        }
        prev = curr;
    });

    return head;
}

function removeNode(node: LinkNodeD) {
    if (!node) return null;
    const prev = node.prev;
    const next = node.next;
    if (prev) {
        prev.next = next;
    }

    if (next) {
        next.prev = prev;
    }

    node.next = node.prev = null;

    return prev;
}

function printLinkNode(head: LinkNodeD) {
    let cur = head;
    const str = [];
    while (cur) {
        str.push(cur.index);
        cur = cur.next;
    }

    console.log(str.join(","));
}

const node = constructFromPrePost([9, 5, 4, 10, 3, 1, 2, 8, 7, 6], [4, 5, 7, 8, 6, 2, 1, 3, 10, 9]);