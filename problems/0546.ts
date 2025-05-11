function removeBoxes(nums: number[]) {
    const dp = Array.from({ length: nums.length }, () => Array(nums.length).fill(0))
        .map(i => Array(i.length).fill(0)
        .map(j => Array(i.length + 1).fill(0).map(k => 0)));
    return recur(dp, 0, nums.length - 1, 0, nums);
}

function recur(dp: number[][][], i: number, j: number, k: number, nums: number[]): number {
    if (i > j) return 0;
    const i0 = i;
    const j0 = j;
    const k0 = k;
    if (dp[i][j][k] !== 0) return dp[i][j][k];
    const box = nums[i];
    let count = 0;
    for (let ind = i; ind <= j; ind++) {
        if (nums[ind] === box) {
            count++;
        } else {
            break;
        }
    }
    let res = (k + count) * (k + count) + recur(dp, i + count, j, 0, nums);
    const startIndex = i + count;
    for (let ind = startIndex; ind <= j; ind++) {
        if (nums[ind] === box) {
            //count++;
            res = Math.max(res, recur(dp, startIndex, ind - 1, 0, nums) + recur(dp, ind, j, k + count, nums));
        }
    }
    dp[i0][j0][k0] = res;
    return res;
}