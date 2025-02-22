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

// function recoverFromPreorder(traversal: string): TreeNode | null {
    
// };

// use regex
function getDepthAndValue(tra: string): [number[], number[]] {
    if (tra.length === 0) return [[], []];
    const depth: number[] = [];
    const value: number[] = []
    // "1-401--349---90--88"
    const regex = /(-*)(\d+)/g;
    let match;
    while ((match = regex.exec(tra)) !== null) {
        depth.push(match[1].length);
        value.push(parseInt(match[2]));
    }
    return [depth, value];
}

console.log(getDepthAndValue("1-401--349---90--88"));