import { TreeNode } from "../tree/TreeNode";

type TreeNodeLCA = TreeNode;

function lcaDeepestLeaves(root: TreeNodeLCA | null): TreeNodeLCA | null {
    const [node] = findRecur(root, 0);
    return node;
};

function findRecur(node: TreeNodeLCA | null, depth: number): [TreeNodeLCA | null, number] {
    if (!node) return [null, depth];
    const [left, leftDepth] = findRecur(node.left, depth + 1);
    const [right, rightDepth] = findRecur(node.right, depth + 1);
    if (leftDepth === rightDepth) {
        return [node, leftDepth];
    }
    return leftDepth > rightDepth ? [left, leftDepth] : [right, rightDepth];
}