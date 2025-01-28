/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalSquare = function(matrix) {
    const m = matrix.length;
    const n = matrix[0].length;
    if (m === 0 || n === 0) return 0;
    if (m === 1 && n === 1) return matrix[0][0] === '1' ? 1 : 0;
    const visitTable = Array.from({ length: m }, () => Array(n).fill(-1));
    let maxLen = 0;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            maxLen = Math.max(maxLen, visit(matrix, visitTable, i, j));
            console.log(maxLen);
        }
    }

    console.log(matrix);

    console.log(visitTable);

    return maxLen * maxLen;
};

function visit(matrix, visitTable, i, j) {
    if (!boundCheck(matrix, i, j) || matrix[i][j] === '0') return 0;
    if (visitTable[i][j] !== -1) return visitTable[i][j];
    if (!boundCheck(matrix, i + 1, j) || !boundCheck(matrix, i, j + 1) || !boundCheck(matrix, i + 1, j + 1)
        || matrix[i + 1][j] === '0' || matrix[i][j + 1] === '0' || matrix[i + 1][j + 1] === '0'
    ) {
        visitTable[i][j] = 1;
        return 1;
    }
    const next = visit(matrix, visitTable, i + 1, j + 1) + 1;
    const nextRight = visit(matrix, visitTable, i, j + 1) + 1;
    const nextLeft = visit(matrix, visitTable, i + 1, j) + 1;
    visitTable[i][j] = Math.min(next, nextRight, nextLeft);
    return visitTable[i][j];
}

function boundCheck(matrix, i, j) {
    return i >= 0 && i < matrix.length && j >= 0 && j < matrix[0].length;
}

console.log(maximalSquare([["1","1","1","1","0"],["1","1","1","1","0"],["1","1","1","1","1"],["1","1","1","1","1"],["0","0","1","1","1"]]

));