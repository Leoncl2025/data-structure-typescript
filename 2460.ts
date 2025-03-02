function applyOperations(nums: number[]): number[] {
    if (nums.length <= 1) return nums;
    const result: number[] = [];
    if (nums[0] != 0) result.push(nums[0]);
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] === 0) continue;
        if (nums[i] === nums[i - 1]) {
            result[result.length - 1] = result[result.length - 1] * 2;
            nums[i] = 0;
        } else {
            result.push(nums[i]);
        }
    }

    for (let i = result.length; i < nums.length; i++) {
        result.push(0);
    }

    return result;
};