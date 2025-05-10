function rob(nums: number[]): number {
    if (nums.length === 1) {
        return nums[0];
    }
    const dp = Array(nums.length).fill(0).map(() => Array(2).fill(0)
    .map(() => Array(2).fill(-1)));
    recur(dp, 0, 0, 0, nums);
    recur(dp, 0, 1, 1, nums);
    return Math.max(
        dp[0][0][0],
        dp[0][1][1],
        0
    );
}

const NotPossible = -2;

function recur(
    dp: number[][][],
    index: number,
    robIndex: number,
    startIndex: number,
    nums: number[]
) {
    if (index >= nums.length - 1) {
        if (robIndex === 1 && startIndex === 1) {
            return NotPossible;
        }
        if (robIndex === 1) {
            return nums[index];
        }
        return 0;
    }
    if (dp[index][robIndex][startIndex] !== -1) {
        return dp[index][robIndex][startIndex];
    }
    let result = NotPossible;
    if (robIndex === 1) {
        const nextRes = recur(dp, index + 1, 0, startIndex, nums);
        if (nextRes !== NotPossible) {
            result = nextRes + nums[index];
        }
    } else {
        result = Math.max(
            recur(dp, index + 1, 0, startIndex, nums),
            recur(dp, index + 1, 1, startIndex, nums)
        );
    }
    dp[index][robIndex][startIndex] = result;
    return result;
}

console.log(rob([1]));