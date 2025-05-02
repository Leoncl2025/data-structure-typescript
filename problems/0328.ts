/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function oddEvenList(head: ListNode | null): ListNode | null {
    if (!head) return null;
    if (!head.next) return head;
    let oodTailI = head;
    let evenTailI = head.next;
    while (oodTailI && evenTailI) {
        const {oddTail, evenTail} = recur(oodTailI, evenTailI);
        oodTailI = oddTail;
        evenTailI = evenTail;
    }
    if (evenTailI) {
        oodTailI.next = evenTailI;
    }
    return head;
};

function recur(oddTail: ListNode, evenTail: ListNode): {oddTail: ListNode, evenTail: ListNode} {
    const firstOdd = evenTail.next;
    if (!firstOdd) return {oddTail: null, evenTail: null};
    const firstEven = firstOdd.next;
    insertAfter(oddTail, firstOdd);
    const newOddTail = firstOdd;
    evenTail.next = firstEven;
    return {oddTail: newOddTail, evenTail: firstEven};
}

function insertAfter(node: ListNode, newNode: ListNode): ListNode {
    const next = node.next;
    node.next = newNode;
    newNode.next = next;
    return newNode;
}