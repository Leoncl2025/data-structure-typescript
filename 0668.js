/**
 * @param {number} m
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var findKthNumber = function(m, n, k) {
    if (m === 1 || n === 1) {
        return k;
    }
    if ( m*n === k) {
        return m*n;
    }
    if (k === 1) {
        return 1;
    }
    const M = Math.max(m, n);
    const N = Math.min(m, n);
    const MN = m * n;
    let start = 1;
    let end = MN;
    let mid = getMidIndex(start, end);
    let midCount = countLessOrEuqalThan(M, N, mid);
    while (start < end) {
        if (midCount < k) {
            start = mid + 1;
        //}
        //else if ( midCount == k) {
        //    break;
        } else {
            end = mid;
        }
        mid = getMidIndex(start, end);
        midCount = countLessOrEuqalThan(M, N, mid);
        if (check(mid, k, M, N, midCount)) {
            break;
        }
    }
    return mid;
};

function check(mid, k, M, N, midCount) {
    let midPrevCount = mid === 1 ? 1 : countLessOrEuqalThan(M, N, mid - 1);
    return midPrevCount < k && midCount >= k;
}

function countLessOrEuqalThan(M, N, target) {
    let count = 0;
    let cj = 0;
    for (let i = N; i > 0; i--) {
        const ci = findLessOrEqualThan(i, M, target);
        if (cj !== 0 && ci === 0) {
            break;
        }
        cj = ci;
        count += ci;
    }
    return count;
}

function findLessOrEqualThan(col, M, target) {
    return Math.min(Math.floor(target / col), M);
}

function getMidIndex(a, b) {
    return Math.floor((a + b) / 2);
}

// console.log(findKthNumber(3, 3, 5)); // 3
// console.log(findKthNumber(9895, 28405, 100787757)); // 6
//console.log(findKthNumber(42, 34, 401)); // 6
console.log(findKthNumber(46, 9, 9));
