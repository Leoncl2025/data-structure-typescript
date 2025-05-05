class NumMatrix {
    private sumMatrix: number[][] = [];
    constructor(matrix: number[][]) {
        const n = matrix.length;
        const m = matrix[0].length;
        this.sumMatrix = new Array(n).fill(0).map(() => new Array(m).fill(Unknown));
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {
                accSum(this.sumMatrix, i, j, matrix);
            }
        }
    }

    sumRegion(row1: number, col1: number, row2: number, col2: number): number {
        const rbSum = getPrefixSum(this.sumMatrix, row2, col2);
        const lbSum = getPrefixSum(this.sumMatrix, row2, col1 - 1);
        const rtSum = getPrefixSum(this.sumMatrix, row1 - 1, col2);
        const ltSum = getPrefixSum(this.sumMatrix, row1 - 1, col1 - 1);
        return rbSum - lbSum - rtSum + ltSum;
    }
}

function getPrefixSum(sumMatrix: number[][], i: number, j: number): number {
    if (i < 0 || j < 0) {
        return 0;
    }
    return sumMatrix[i][j];
}

const Unknown = Number.MAX_VALUE;

function accSum(sumMatrix: number[][], indexI: number, indexJ: number, matrix: number[][]): number {
    if (sumMatrix[indexI][indexJ] !== Unknown) {
        return sumMatrix[indexI][indexJ];
    }
    // Calculate prefix sum for (indexI, indexJ)
    let up = indexI > 0 ? accSum(sumMatrix, indexI - 1, indexJ, matrix) : 0;
    let left = indexJ > 0 ? accSum(sumMatrix, indexI, indexJ - 1, matrix) : 0;
    let diag = (indexI > 0 && indexJ > 0) ? accSum(sumMatrix, indexI - 1, indexJ - 1, matrix) : 0;
    let sum = matrix[indexI][indexJ] + up + left - diag;
    sumMatrix[indexI][indexJ] = sum;
    return sum;
}