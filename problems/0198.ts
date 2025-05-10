function rob(nums: number[]): number {
    // nx2
    const dp = Array.from({ length: nums.length }, () => [-1, -1]);
    recur(dp, 0, 0, nums);
    recur(dp, 0, 1, nums);
    console.log(dp);
    return Math.max(dp[0][0], dp[0][1]);
};

function recur(dp: number[][], i: number, robIndex: number, nums: number[]): number {
    if (i >= nums.length) return 0;
    if (dp[i][robIndex] !== -1) return dp[i][robIndex];
    let ans = 0;
    if (robIndex === 0) {
        ans = Math.max(recur(dp, i + 1, 0, nums), recur(dp, i + 1, 1, nums));
    } else {
        console.log(nums[i], i);
        ans = recur(dp, i + 1, 0, nums) + nums[i];
    }
    dp[i][robIndex] = ans;
    return ans;
}

rob([2,1]);