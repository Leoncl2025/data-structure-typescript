function maxAbsoluteSum(nums: number[]): number {
    let minVal = nums[0];
    let maxVal = nums[0];
    let ret = Math.abs(nums[0]);
    for (let i = 1; i < nums.length; ++i) {
        const val = nums[i];
        maxVal += val;
        minVal += val;
        ret = Math.max(ret, Math.abs(maxVal));
        ret = Math.max(ret, Math.abs(minVal));
        maxVal = Math.max(maxVal, val);
        minVal = Math.min(minVal, val);
    }

    return ret;
};