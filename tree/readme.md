# 为什么我们使用tree数据结构
*“树是最简单的数据结构，拥有一些原理或者说定理。牛顿的力学定律是解释和构建经典物理的工具，那么红黑树和它的几个特性以及衍生的定理是支撑其强大应用场景的基石。”*

*“它有左和右，是一个很好的规约思维：把问题分解为子问题。”*

## 二进制树 binary tree

### 增加了一些特性
[0124. Binary Tree Maximum Path Sum](../0124.ts)

我们给二进制树增加了一些特性，称之为`TreeNodeEnhanced`：

- `leftPathSum`：记录左子孩的最大路径，这个路径包括左孩子（下同）。
- `rightPathSum`
- `maxPathSum`：记录包含当前节点的最大和路径

定义好这些特性，我们就可以将问题规约成子问题。

```ts
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
```