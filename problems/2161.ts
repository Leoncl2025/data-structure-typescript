function pivotArray(nums: number[], pivot: number): number[] {
    const lessBucket = [];
    const equalBucket = [];
    const greaterBucket = [];
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] < pivot) {
            lessBucket.push(nums[i]);
        } else if (nums[i] === pivot) {
            equalBucket.push(nums[i]);
        } else {
            greaterBucket.push(nums[i]);
        }
    }
    return lessBucket.concat(equalBucket).concat(greaterBucket);
};