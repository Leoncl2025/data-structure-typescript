/**
 Do not return anything, modify nums in-place instead.
 */
function sortColors(nums: number[]): void {
    let l0 = -1, l1 = -1, r2 = nums.length, cur = -1;
    while(true) {
        cur = l1 + 1;
        if (cur >= r2) {
            break;
        }
        const val = nums[cur];
        if (val === 1) {
            l1++;
        } else if (val === 0) {
            l0++;
            nums[l0] = 0;
            l1++;
            if (l1 !== l0) {
                nums[l1] = 1;
            }
        } else {
            r2--;
            swapNums(nums, r2, cur);
        }
    }
}

function swapNums(nums: number[], index0: number, index1: number) {
    if (index0 === index1 || index0 < 0 || index1 < 0 || index0 >= nums.length || index1 >= nums.length) {
        return;
    }
    const temp = nums[index0];
    nums[index0] = nums[index1];
    nums[index1] = temp;
}

console.log(sortColors([2,0,2,1,1,0]));