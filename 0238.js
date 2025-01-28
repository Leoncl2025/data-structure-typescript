/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
    const ret = Array(nums.length).fill(1);
    let prod = 1;
    for (let i = nums.length - 1; i >= 1; i--) {
        prod = prod * nums[i];
        ret[i] = prod;
    }

    prod = 1;
    for (i = 0; i < nums.length - 1; i++) {
        ret[i] = ret[i + 1] * prod;
        prod = prod * nums[i];
    }
    ret[nums.length - 1] = prod;
    return ret;  
};