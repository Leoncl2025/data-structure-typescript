import { TreeNode } from "./tree/treeNode";
import { buildTree } from "./tree/treeNode.utils";

const MIN_VALUE = -Infinity;
function maxPathSum(root: TreeNode | null): number {
    const rootEnhanced = cloneTree(root) as TreeNodeEnhanced;
    if (!rootEnhanced) {
        return 0;
    }

    return maxPathSumHelper(rootEnhanced);
    // printNode(rootEnhanced);
    // return findMaxPathSum(rootEnhanced);
};

function findMaxPathSum(node: TreeNodeEnhanced): number {
    if (!node) {
        return MIN_VALUE;
    }

    let max = node.maxPathSum;
    if (node.left) {
        max = Math.max(max, findMaxPathSum(node.left));
    }
    if (node.right) {
        max = Math.max(max, findMaxPathSum(node.right));
    }

    return max;
}

function maxPathSumHelper(node: TreeNodeEnhanced): number {
    if (!node) {
        return MIN_VALUE;
    }

    if (node.allMaxPathSum !== null) {
        return node.allMaxPathSum;
    }

    // assume the left/right and max path sum are initialized at the same time
    const leftAllMax = maxPathSumHelper(node.left);
    const rightAllMax = maxPathSumHelper(node.right);

    if (node.left != null) {
        node.leftPathSum = node.left.val + Math.max(node.left.leftPathSum, node.left.rightPathSum, 0);
    }
    else {
        node.leftPathSum = MIN_VALUE;
    }

    if (node.right != null) {
        node.rightPathSum = node.right.val + Math.max(node.right.leftPathSum, node.right.rightPathSum, 0);
    }
    else {
        node.rightPathSum = MIN_VALUE;
    }

    node.maxPathSum = node.val + Math.max(node.leftPathSum, 0) + Math.max(node.rightPathSum, 0);
    node.allMaxPathSum = Math.max(node.maxPathSum, leftAllMax, rightAllMax);

    return node.allMaxPathSum;
}

class TreeNodeEnhanced extends TreeNode {
    public leftPathSum: number;
    public rightPathSum: number;
    public maxPathSum: number;
    public allMaxPathSum: number;
    declare left: TreeNodeEnhanced | null;
    declare right: TreeNodeEnhanced | null;
    constructor(treeNode: TreeNode) {
        super(treeNode.val, treeNode.left, treeNode.right);
        this.leftPathSum = null;
        this.rightPathSum = null;
        this.maxPathSum = null;
        this.allMaxPathSum = null;
    }
}

function cloneTree(root: TreeNode | null): TreeNodeEnhanced | null {
    if (!root) {
        return null;
    }

    const leftClone = cloneTree(root.left);
    const rightClone = cloneTree(root.right);
    const node = new TreeNodeEnhanced(root);
    node.left = leftClone;
    node.right = rightClone;
    return node;
}

function printNode(node: TreeNodeEnhanced) {
    if (!node) {
        return null;
    }

    console.log(node.val, node.maxPathSum, node.leftPathSum, node.rightPathSum);
    printNode(node.left);
    printNode(node.right);    
}

let root = [-10,9,20,null,null,15,7];
console.log(maxPathSum(buildTree(root))); // 42
