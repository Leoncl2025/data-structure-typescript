/**
 * https://leetcode.com/problems/burst-balloons/description/
 * You are given n balloons, indexed from 0 to n - 1. Each balloon is painted with a number on it represented by an array nums. You are asked to burst all the balloons.
If you burst the ith balloon, you will get nums[i - 1] * nums[i] * nums[i + 1] coins. If i - 1 or i + 1 goes out of bounds of the array, then treat it as if there is a balloon with a 1 painted on it.
Return the maximum coins you can collect by bursting the balloons wisely.
 */

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