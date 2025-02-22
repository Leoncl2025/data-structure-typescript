/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

import { TreeNode } from "./tree/TreeNode";

function recoverFromPreorder(traversal: string): TreeNode | null {
    if (traversal.length === 0) return null;
    const [depth, value] = getDepthAndValue(traversal);
    return buildTree(depth, value, 0)[0];
    
};

function buildTree(depth: number[], value: number[], index: number): [TreeNode | null, number] {
    if (index >= depth.length) return [null, index];

    const node = new TreeNode(value[index]);
    const nodeDep = depth[index];
    if (index + 1 >= depth.length) return [node, index + 1];
    if (depth[index + 1] !== nodeDep + 1) return [node, index + 1];
    const [child, nextIndex] = buildTree(depth, value, index + 1);
    node.left = child;
    if (nextIndex < depth.length && depth[nextIndex] === nodeDep + 1) {
        const [child, nextNextIndex] = buildTree(depth, value, nextIndex);
        node.right = child;
        return [node, nextNextIndex];
    }

    return [node, nextIndex];
}

// use regex
function getDepthAndValue(tra: string): [number[], number[]] {
    if (tra.length === 0) return [[], []];
    const depth: number[] = [];
    const value: number[] = []
    // "1-401--349---90--88"
    const regex = /(-*)(\d+)/g;
    let match;
    while ((match = regex.exec(tra)) !== null) {
        depth.push(match[1].length);
        value.push(parseInt(match[2]));
    }
    return [depth, value];
}

function print(tree: TreeNode | null) {
    if (tree === null) return;
    console.log(tree.val);
    print(tree.left);
    print(tree.right);
}

console.log(getDepthAndValue("1-401--349---90--88"));
const node = recoverFromPreorder("1-401--349---90--88");
print(node);