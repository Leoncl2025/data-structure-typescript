import { TreeNode } from "./tree";
import { buildTree } from "./tree/treeNode.utils";

function minCameraCover(root: TreeNode | null): number {
    const rootEnhanced = cloneTree(root) as TreeNodeCamera;
    const cost0 = setCamera(rootEnhanced, 0, 0);
    const cost1 = setCamera(rootEnhanced, 0, 1);
    const minCost = getMinNullCost(cost0, cost1);
    return minCost;
};

function getChildCost(child: TreeNodeCamera, nodeSet: number): [boolean, number | null] {
    const leftCost = getTwoChildCost(child, nodeSet, 1, 0);
    if (child != null && leftCost == null) {
        return [false, null];
    }
    return [true, leftCost ?? 0];
}

function setCamera(node: TreeNodeCamera, parentSet: number, nodeSet: number) {
    if (!node) {
        return null;
    }

    const dp = node.monitorStateDP;
    if (dp[parentSet][nodeSet] != null) {
        return dp[parentSet][nodeSet];
    }

    if (parentSet == 1 || nodeSet == 1) {
        let selfCost = nodeSet;
        const [leftValid, leftCost] = getChildCost(node.left, nodeSet);
        if (!leftValid) {
            return null;
        }
        selfCost += leftCost ?? 0;
        const [rightValid, rightCost] = getChildCost(node.right, nodeSet);
        if (!rightValid) {
            return null;
        }
        selfCost += rightCost ?? 0;
        dp[parentSet][nodeSet] = selfCost;
        return selfCost;
    }

    const dependCostLeft = setCamera(node.left, 0, 1);
    const dependCostRight = setCamera(node.right, 0, 1);
    if (dependCostLeft == null && dependCostRight == null) {
        return null;
    }

    // depend on both
    let cost011 = null;
    if (dependCostLeft != null && dependCostRight != null) {
        cost011 = dependCostLeft + dependCostRight;
    }

    // depend on right
    let cost001 = null;
    if (dependCostRight != null) {
        const leftCost001 = setCamera(node.left, 0, 0);
        if (leftCost001 != null) {
            cost001 = dependCostRight + leftCost001;
        } else if (node.left == null) {
            cost001 = dependCostRight;
        }
    }

    // depend on left
    let cost010 = null;
    if (dependCostLeft != null) {
        const rightCost010 = setCamera(node.right, 0, 0);
        if (rightCost010 != null) {
            cost010 = dependCostLeft + rightCost010;
        } else if (node.right == null) {
            cost010 = dependCostLeft;
        }
    }

    return getMinNullCost(cost011, getMinNullCost(cost001, cost010));
}

const getTwoChildCost = (node: TreeNodeCamera, parentSet: number, nodeSet1: number, nodeSet2) => {
    const cost1 = setCamera(node, parentSet, nodeSet1);
    const cost2 = setCamera(node, parentSet, nodeSet2);
    return getMinNullCost(cost1, cost2);
};

const getMinNullCost = (cost1: number | null, cost2: number | null) => {
    let minCost = cost1;

    if (cost2 != null) {
        if (minCost == null || cost2 < minCost) {
            minCost = cost2;
        }
    }

    return minCost;
};

class TreeNodeCamera extends TreeNode {
    declare left: TreeNodeCamera | null;
    declare right: TreeNodeCamera | null;
    constructor(treeNode: TreeNode, public monitorStateDP: number[][] = new Array(2).fill(null).map(() => new Array(2).fill(null))) {
        super(treeNode.val, treeNode.left, treeNode.right);
    }
}

function cloneTree(root: TreeNode | null): TreeNodeCamera | null {
    if (!root) {
        return null;
    }

    const leftClone = cloneTree(root.left);
    const rightClone = cloneTree(root.right);
    const node = new TreeNodeCamera(root);
    node.left = leftClone;
    node.right = rightClone;
    return node;
}

const treeNode = buildTree([0,0,null,0,0]);
console.log(minCameraCover(treeNode)); // 1