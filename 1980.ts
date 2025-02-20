function findDifferentBinaryString(nums: string[]): string {
    const n = nums.length;
    const result = new Array(n).fill(0);
    const stringSet = new Set<string>(nums);
    while (stringSet.has(result.join(""))) {
        increaseOneBinary(result);
    }
    return result.join("");
};

function increaseOneBinary(nums: number[]) {
    let i = nums.length - 1;
    while (i >= 0) {
        if (nums[i] === 0) {
            nums[i] = 1;
            break;
        }
        nums[i] = 0;
        i--;
    }
}