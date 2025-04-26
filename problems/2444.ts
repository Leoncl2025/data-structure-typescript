function countSubarrays(nums: number[], minK: number, maxK: number): number {
    let maxi = -1;
    let mini = -1;
    let start = -1;
    let count = 0;
    nums.forEach((v, i) => {
        if (v > maxK || v < minK) {
            start = i;
        }
        if (v == maxK) {
            maxi = i;
        }
        if (v == minK) {
            mini = i;
        }
        count += Math.max(0, Math.min(mini, maxi) - start);
    }
    );
    return count;
};

console.log(countSubarrays([1,3,5,2,7,5]
, 2, 5));