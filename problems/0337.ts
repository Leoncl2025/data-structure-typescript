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

import { TreeNode } from '../tree/TreeNode';

const UnknownRob = -1;

class TreeNodeRob extends TreeNode {
    public rob: number = UnknownRob;
    public notRob: number = UnknownRob;
    public left: TreeNodeRob | null = null;
    public right: TreeNodeRob | null = null;
    public get visited(): boolean {
        return this.rob !== UnknownRob && this.notRob !== UnknownRob;
    }
    constructor(treeNode: TreeNode) {
        super(treeNode.val, treeNode.left, treeNode.right);
    }
}

function createTreeNodeRob(node: TreeNode): TreeNodeRob {
    const root = new TreeNodeRob(node);
    if (node.left) {
        root.left = createTreeNodeRob(node.left);
    }
    if (node.right) {
        root.right = createTreeNodeRob(node.right);
    }
    return root;
}

function recur(node: TreeNodeRob) {
    if (!node) {
        return;
    }
    if (node.visited) {
        return;
    }
    recur(node.left);
    recur(node.right);
    let valNotRobLeft = node.left?.rob ? node.left?.rob : 0;
    valNotRobLeft = Math.max(valNotRobLeft, node.left?.notRob ? node.left?.notRob : 0);
    let valNotRobRight = node.right?.rob ? node.right?.rob : 0;
    valNotRobRight = Math.max(valNotRobRight, node.right?.notRob ? node.right?.notRob : 0);
    const valNotRob = valNotRobLeft + valNotRobRight;
    const valRob = node.val + (node.left?.notRob ? node.left?.notRob : 0) + (node.right?.notRob ? node.right?.notRob : 0);
    node.rob = valRob;
    node.notRob = valNotRob;
}

function rob(root: TreeNode | null): number {
    const treeRoot = createTreeNodeRob(root);
    recur(treeRoot);
    return Math.max(treeRoot.rob, treeRoot.notRob);
};

const root = new TreeNode(3);
const left = new TreeNode(2);
const right = new TreeNode(3);
const leftLeft = new TreeNode(3);
const rightRight = new TreeNode(1);
root.left = left;
root.right = right;
left.right = leftLeft;
right.right = rightRight;
console.log(rob(root)); // expect 7