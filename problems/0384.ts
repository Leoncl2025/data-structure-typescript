class Solution {
    private originNums: number[];
    private nums: number[];
    constructor(nums: number[]) {
        this.nums = nums.slice();
        this.originNums = nums.slice();
    }

    reset(): number[] {
        this.nums = shuffle(this.originNums);
        return this.nums;
    }

    shuffle(): number[] {
        const i = randomInt(0, this.nums.length - 1);
        const j = randomInt(0, this.nums.length - 1);
        swap(this.nums, i, j);
        return this.nums;
    }
}

function shuffle(nums: number[]): number[] {
    const arr = nums.slice();
    const len = arr.length;
    for (let i = 0; i < len; i++) {
        const j = randomInt(i, len - 1);
        swap(arr, i, j);
    }
    return arr;
}

function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function swap(arr: number[], i: number, j: number): void {
    [arr[i], arr[j]] = [arr[j], arr[i]];
}

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(nums)
 * var param_1 = obj.reset()
 * var param_2 = obj.shuffle()
 */