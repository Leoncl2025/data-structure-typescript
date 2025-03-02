/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    let copyIndex = -1, checkIndex = 0;
    for (; checkIndex < nums.length; ++checkIndex) {
        const checkValue = nums[checkIndex];
        const copyValue = nums[copyIndex];
        const copyValuePrev = nums[copyIndex - 1];
        if (checkValue !== copyValue || checkValue !== copyValuePrev) {
            ++copyIndex;
            nums[copyIndex] = checkValue;
        }
    }

    return copyIndex + 1;
};

console.log(removeDuplicates([1,1,1,2,2,3]));