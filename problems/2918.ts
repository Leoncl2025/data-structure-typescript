function minSum(nums1: number[], nums2: number[]): number {
    const [sum1, zeros1] = getSumAndZeros(nums1);
    const [sum2, zeros2] = getSumAndZeros(nums2);
    let minSum = sum1;
    let minZeros = zeros1;
    let maxSum = sum2;
    let maxZeros = zeros2;
    if (sum1 > sum2) {
        minSum = sum2;
        minZeros = zeros2;
        maxSum = sum1;
        maxZeros = zeros1;
    }
    let result = minSum;
    maxSum = maxSum - minSum;
    const ret1 = helper(minZeros, maxSum, maxZeros);
    if (ret1 === -1) {
        return -1;
    }
    result += ret1;
    return result;
};

function getSumAndZeros(nums: number[]): [number, number] {
    let sum = 0;
    let zeros = 0;
    for (const num of nums) {
        if (num === 0) {
            zeros++;
        } else {
            sum += num;
        }
    }
    return [sum, zeros];
}

function helper(
    zeros1: number,
    sum2: number,
    zeros2: number
) {
    if (zeros1 === 0 && zeros2 === 0) {
        return sum2 == 0 ? 0 : -1;
    }
    if (zeros1 === 0) {
        return -1;
    }
    if (zeros2 === 0) {
        if (sum2 < zeros1) {
            return -1;
        }
        return sum2;
    }
    const total1 = zeros1;
    const total2 = sum2 + zeros2;
    return Math.max(total1, total2);
}

console.log(minSum([3,2,0,1,0], [6,5,0])); // 4