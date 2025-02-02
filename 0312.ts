function maxCoins(nums: number[]): number {
    const dp = Array(nums.length + 2).fill(0).map(() => Array(nums.length + 2).fill(-1));
    for (let i = 0; i < dp.length; ++i) {
        dp[i][i] = getProduct(nums, i);
    }
    return recur(dp, 1, nums.length, nums);
};

function getProduct(nums: number[], dpIndex: number): number {
    if (dpIndex === 0 || dpIndex === nums.length + 1) {
        return 1;
    }
    return getVal(nums, dpIndex - 1) * getVal(nums, dpIndex) * getVal(nums, dpIndex + 1);
}

function getVal(nums: number[], indexDp: number): number {
    if (indexDp === 0 || indexDp === nums.length + 1) {
        return 1;
    }
    return nums[indexDp - 1];
}

function recur(dp: number[][], a: number, b: number, nums: number[]): number {
    const coins = dp[a][b];
    if (coins !== -1) {
        return coins;
    }
    let max = 0;

    for (let target = a; target <= b; ++target) {
        const leftCoins = target == a ? 0 : recur(dp, a, target - 1, nums);
        const rightCoins = target == b ? 0 : recur(dp, target + 1, b, nums);
        const coins = leftCoins + rightCoins + getVal(nums, a - 1) * getVal(nums, target) * getVal(nums, b + 1);
        max = Math.max(max, coins);
    }
    dp[a][b] = max;
    return max;
}