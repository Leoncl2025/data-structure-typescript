/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
    const pPath = [];
    const qPath = [];
    if (find(root, p, pPath) && find(root, q, qPath)) {
        let i = 0;
        for (; i < pPath.length && i < qPath.length; i++) {
            if (pPath[i] != qPath[i]) {
                return pPath[i - 1];
            }
        }
        return pPath[i - 1];
    }
    return null;
};

var find = function(node, target, path) {
    if (node == null) {
        return false;
    }
    path.push(node);
    if (node == target) {
        return true;
    }
    if (find(node.left, target, path)) {
        return true;
    }
    if (find(node.right, target, path)) {
        return true;
    }
    path.pop();
    return false;
};

function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

function createTreeFromArray(array) {
    var root = new TreeNode(array[0]);
    var nodes = [root];
    for (var i = 1; i < array.length; i++) {
        var node = nodes.shift();
        if (array[i] != null) {
            node.left = new TreeNode(array[i]);
            nodes.push(node.left);
        }
        i++;
        if (array[i] != null) {
            node.right = new TreeNode(array[i]);
            nodes.push(node.right);
        }
    }
    return root;
}

var root = createTreeFromArray([3,5,1,6,2,0,8,null,null,7,4]);

//console.log(lowestCommonAncestor(root, root.left, root.right));
console.log(lowestCommonAncestor(root, root.left, root.left.right.right));