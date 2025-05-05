import { TreeNode } from '../tree/TreeNode';

class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
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