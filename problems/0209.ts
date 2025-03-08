/**
Given an array of positive integers nums and a positive integer target, return the minimal length of a subarray whose sum is greater than or equal to target. If there is no such subarray, return 0 instead.

 

Example 1:

Input: target = 7, nums = [2,3,1,2,4,3]
Output: 2
Explanation: The subarray [4,3] has the minimal length under the problem constraint.
Example 2:

Input: target = 4, nums = [1,4,4]
Output: 1
Example 3:

Input: target = 11, nums = [1,1,1,1,1,1,1,1]
Output: 0
 
 */

function minSubArrayLen(target: number, nums: number[]): number {
    const arrDesc = [];
    let base = 0;
    let ret = 0;
    nums.forEach((num, index) => {
        base += num;
        arrDesc.push(num - base);
        const targetNew = target - base;
        const findIndex = find(arrDesc, targetNew);
        if (findIndex > -1) {
            const retNew = arrDesc.length - findIndex;
            console.log(`val ${num} index ${index} findIndex: ${findIndex}, retNew: ${retNew} base: ${base}, targetNew: ${targetNew} arrDesc: ${arrDesc}`);
            if (ret === 0 || retNew < ret) {
                ret = retNew;
            }
        }
    });
    return ret;
};

/**
 * Find the index of value that is equal or greater than target in a sorted array
 * @param numsDescend the array of nums sorted in descending order
 * @param target the target value to find
 */
function find(numsDescend: number[], target: number): number {
    let left = -1;
    let right = numsDescend.length - 1;

    while (left < right) {
        const mid = Math.ceil((left + right) / 2);
        if (numsDescend[mid] < target) {
            right = mid - 1;
        } else {
            left = mid;
        }
    }
    if (right > -1) {
        return numsDescend[right] >= target ? right : -1;
    }

    return -1;
}

console.log(minSubArrayLen(7, [2,3,1,2,4,3])); // expect 2