function search(nums: number[], target: number): number {
    return find(nums, target, 0, nums.length);
};

function find(nums: number[], target: number, start: number, end: number): number {
    if (start >= end) {
        return -1;
    }
    if (start === end - 1) {
        return nums[start] === target ? start : -1;
    }
    const mid = Math.floor((start + end) / 2);
    const midVal = nums[mid];
    if (midVal === target) {
        return mid;
    }

    if (midVal > target) {
        if (nums[start] <= target || nums[start] > midVal) {
            return find(nums, target, start, mid);
        } else {
            return find(nums, target, mid + 1, end);
        }
    } else {
        if (nums[end - 1] >= target || nums[end - 1] < midVal) {
            return find(nums, target, mid + 1, end);
        } else {
            return find(nums, target, start, mid);
        }
    }
}

let nums = [7,8,1,2,3,4,5,6];
nums =[2,3,4,5,6,7,8,9,1];
let target = 2;
target = 9;
console.log(search(nums, target) === 7);