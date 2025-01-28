/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {
    const m = matrix.length;
    const n = matrix[0].length;
    const ret = [];
    toArray(matrix, ret, 0);
    return ret;
};

var toArray = function(matrix, ret, start) {
    const m = matrix.length;
    const n = matrix[0].length;
    const pastLen = start * 2;
    const mNew = m - pastLen;
    const nNew = n - pastLen;
    if (mNew <= 0 || nNew <= 0) {
        return;
    }
    // horizontal
    for (let i = 0; i < nNew; i++) {
        ret.push(matrix[start][start + i]);
    }
    // vertical
    for (let i = 1; i < mNew; i++) {
        ret.push(matrix[start + i][start + nNew - 1]);
    }
    if (mNew > 1 && nNew > 1) {
        // horizontal again
        for (let i = nNew - 2; i >= 0; i--) {
            ret.push(matrix[start + mNew - 1][start + i]);
        }
        // vertical again
        for (let i = mNew - 2; i > 0; i--) {
            ret.push(matrix[start + i][start]);
        }
    }
    toArray(matrix, ret, start + 1);
};

console.log(spiralOrder([[1,2,3,4],[5,6,7,8],[9,10,11,12]]));