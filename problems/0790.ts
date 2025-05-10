const moduledomino = 1000000007;

function foo(n: number): number {
    let res = 0;
    let full = 0;
    let top1 = 0;
    let top2 = 0;
    let bottom1 = 0;
    let bottom2 = 0;
    const dp = Array.from({ length: n + 1 }, () => Array(5).fill(0));
    dp[0] = [1, 0, 1, 0, 1];
    for (let i = 1; i <= n; i++) {
        full = i === 1 ? 1 : (getDp(dp, i - 1, 0) +
            getDp(dp, i - 2, 3) +
            getDp(dp, i - 2, 1) +
            Math.max(getDp(dp, i - 2, 2), getDp(dp, i - 2, 4)));
        dp[i][0] = full % moduledomino;
        top1 = getDp(dp, i - 1, 3) +
            getDp(dp, i - 1, 0);
        dp[i][1] = top1 % moduledomino;
        top2 = getDp(dp, i, 0);
        dp[i][2] = top2 % moduledomino;
        bottom1 = getDp(dp, i - 1, 1) +
            getDp(dp, i - 1, 0);
        dp[i][3] = bottom1 % moduledomino;
        bottom2 = getDp(dp, i, 0);
        dp[i][4] = bottom2 % moduledomino;
    }
    return dp[n][0] % moduledomino;
}

function getDp(dp: number[][], i: number, j: number): number {
    if (dp[i] === undefined || dp[i][j] === undefined) {
        return 0;
    }
    return dp[i][j];
}

console.log(foo(3)); // 8