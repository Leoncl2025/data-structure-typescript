function mergeArrays(nums1: number[][], nums2: number[][]): number[][] {
    let current1 = 0;
    let current2 = 0;
    const result = [];
    while (current1 < nums1.length || current2 < nums2.length) {
        if (current1 < nums1.length && current2 < nums2.length) {
            const num1 = nums1[current1];
            const num2 = nums2[current2];
            if (num1[0] === num2[0]) {
                result.push([num1[0], num1[1] + num2[1]]);
                current1++;
                current2++;
            } else if (num1[0] < num2[0]) {
                result.push(num1);
                current1++;
            } else {
                result.push(num2);
                current2++;
            }
            continue;
        }

        if (current1 < nums1.length) {
            result.push(nums1[current1]);
            current1++;
        }

        if (current2 < nums2.length) {
            result.push(nums2[current2]);
            current2++;
        }
    }

    return result;
};