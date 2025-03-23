import { TreeNode } from './TreeNode';

function paddingToCenter(
    str: string,
    len: number): string {
    const padding = Math.floor((len - str.length) / 2);
    const leftPadding = ' '.repeat(padding);
    const rightPadding = ' '.repeat(len - str.length - padding);
    return leftPadding + str + rightPadding;
}

const nodeDilimiter = '';

function addToMatrix(
    matrix: TreeNode[][],
    root: TreeNode,
    level: number,
    index: number): void {
    if (level >= matrix.length) {
        return;
    }

    const safeIndex = index >= matrix[level].length ? matrix[level].length - 1 : index;
    matrix[level][safeIndex] = root;
    if (root.left) {
        addToMatrix(matrix, root.left, level + 1, index);
    }
    if (root.right) {
        addToMatrix(matrix, root.right, level + 1, index + 1);
    }
}


export function displayBinaryTree(
    root: TreeNode | null,
    toString: (r: TreeNode) => string): string {
    if (!root) {
        return '';
    }
    const maxLevel = getMaxTreeLevel(root);
    const matrixLen = 2 ** maxLevel;
    const matrixNodes = Array.from({ length: maxLevel }, () => Array(matrixLen).fill(null));
    addToMatrix(matrixNodes, root, 0, matrixNodes[0].length / 2);
    const eleMaxWidth = Math.max(...matrixNodes.flatMap((nodes) => nodes.map((node) => toString(node).length)));
    const matrixStr = [];
    matrixNodes.forEach((nodes, i) => {
        let str = nodes.map((node) => paddingToCenter(toString(node), eleMaxWidth)).join(nodeDilimiter);
        str = str.replace(/ *$/g, '');
        matrixStr.push(str);
        // console.log(i+'\t'+str);
    });
    const minStartIndex = Math.min(...matrixStr.map((str) => firstNotSpaceChar(str)));
    // strip the first spaces
    matrixStr.forEach((str, i) => {
        matrixStr[i] = str.substring(minStartIndex);
        console.log(i + '\t' + matrixStr[i]);
    });
}

function firstNotSpaceChar(
    str: string): number {
    let i = 0;
    while (i < str.length && str[i] === ' ') {
        i++;
    }
    return i;
}

function getMaxTreeLevel(
    root: TreeNode | null): number {
    if (!root) {
        return 0;
    }
    return Math.max(getMaxTreeLevel(root.left), getMaxTreeLevel(root.right)) + 1;
}