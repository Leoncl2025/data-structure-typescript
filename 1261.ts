
class FindElements {
    private root: TreeNode | null;
    constructor(root: TreeNode | null) {
        this.root = root;
        this.repair(root, 0);
    }

    print(node: TreeNode) {
        if (!node)return;
        console.log(node.val);
        this.print(node.left);
        this.print(node.right);
    }

    repair(root: TreeNode | null, val: number) {
        if (root == null) return;
        if (root.val != -1) return;
        root.val = val;
        this.repair(root.left, 2*val + 1);
        this.repair(root.right, 2*val + 2);
    }

    find(target: number): boolean {
        return this.findHelper(this.root, target);
    }

    findHelper(node: TreeNode, val: number): boolean {
        if (!node) return false;
        if (node.val == val) return true;
        return this.findHelper(node.right, val) || this.findHelper(node.left, val);
    }

}
