
const moduloBase = BigInt(10**9 + 7);
/**
 * @param {number} n
 * @param {number} k
 * @param {number} target
 * @return {number}
 */
var numRollsToTarget = function(n, k, target) {
    const m = target - n;
    const a = k - 1;
    const memo = Array(m + 1).fill(-1).map(x => Array(n + 1).fill(-1).map(x => Array(k + 1).fill(-1)));
    const memoMax = Array(m + 1).fill(-1).map(x => Array(n + 1).fill(-1).map(x => Array(k + 1).fill(-1)));
    const memoExt = Array(n + 1).fill(-1).map(x => Array(n + 1).fill(-1));
    const ret = bigCLE(BigInt(m), BigInt(n), BigInt(a), memo, memoMax, memoExt) % moduloBase;
    return Number(ret);
};

var Operation = 0;

const bigCLE = function(m, n, a, memo, memoMax, memoExt) {
    if (m === 0n) {
        return 1n;
    }
    if (n * a < m) {
        return 0n;
    }
    if (n * a === m) {
        return 1n;
    }
    if (n <= 0n) {
        return m === n ? 1n : 0n;
    }

    if (a <= 0n) {
        return m === 0n ? 1n : 0n;
    }

    if (memo[m][n][a] !== -1) {
        return memo[m][n][a];
    }

    Operation++;
    let count = 0n;
    for (let max = a; max >= 1n; --max) {
        count += bigCMax(m, n, max, memo, memoMax, memoExt);
        count += bigCMax(m, n, a - max + 1n, memo, memoMax, memoExt);
    }
    count = count % moduloBase;
    memo[m][n][a] = count;

    return count;
};

const bigCMax = function(m, n, max, memo, memoMax, memoExt) {
    if (max * n < m) {
        return 0n;
    }
    if (max * n === m) {
        return 1n;
    }

    if (m === max) {
        return n;
    }

    if (m <= 0n) {
        return 0n;
    }

    if (memoMax[m][n][max] !== -1) {
        return memoMax[m][n][max];
    }

    let ret = 0n;
    const loopEnd = m / max;
    for (let i = 1n; i <= loopEnd; ++i) {
        const factor = bigC(n, i, memoExt);
        const product = factor * (bigCLE(m - max * i, n - i, max - 1n, memo, memoMax, memoExt));
        ret += product;
    }

    ret = ret % moduloBase;
    memoMax[m][n][max] = ret;

    return ret;
};

/**
 * Put m elements into n buckets
 * @param {number} m the count of elements
 * @param {number} n the count of buckets
 * @returns the total count of putting m elements into n buckets
 */
const bigC = function(m, n, memoExt) {
    if (m < n) {
        return 0n;
    }

    if (m === n || n == 0n) {
        return 1n;
    }

    if (n === 1n) {
        return m;
    }

    if (memoExt[m][n] !== -1) {
        return memoExt[m][n];
    }

    let a = 1n;
    let b = 1n;
    for (let i = 1n; i <= n; ++i) {
        a *= m - i + 1n;
        b *= i;
    }

    const ret = a / b;
    memoExt[m][n] = ret;
    Operation++;

    return ret;
};

const getIndex = function(m, b, a) {
    return `${m},${b},${a}`;
};

// test
console.log(numRollsToTarget(5, 5, 12), Operation); // 1
console.log(numRollsToTarget(4, 6, 10), Operation); // 1
console.log(numRollsToTarget(30, 30, 50), Operation); // 1
console.log(numRollsToTarget(30, 30, 500), Operation); // 1
//console.log(numRollsToTarget(2, 6, 7), Operation); // 1