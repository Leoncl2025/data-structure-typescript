class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.left = (left===undefined ? null : left)
        this.right = (right===undefined ? null : right)
    }
}

function sortedListToBST(head: ListNode | null): TreeNode | null {
    const arr = listToArray(head);
    return toBST(arr, 0, arr.length);
};

function listToArray(head: ListNode | null): number[] {
    let arr = [];
    while (head) {
        arr.push(head.val);
        head = head.next;
    }
    return arr;
}

function toBST(arr: number[], start: number, end: number): TreeNode | null {
    if (start >= end) {
        return null;
    }
    let mid = Math.floor((start + end) / 2);
    let root = new TreeNode(arr[mid]);
    root.left = toBST(arr, start, mid);
    root.right = toBST(arr, mid + 1, end);
    return root;
}