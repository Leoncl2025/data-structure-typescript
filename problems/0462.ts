function minMoves2(nums: number[]): number {
    const midIndex = Math.floor(nums.length / 2)
    const sortedNums: number[] = nums.sort((n1,n2) => n1 - n2);
    const median = sortedNums[midIndex]
    return nums.reduce((prevVal, currentVal, currentIndex) => prevVal + Math.abs(currentVal - median), 0);
};
