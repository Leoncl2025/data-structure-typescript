function check(nums: number[], index: number) {
    const count = nums.length - index;
    return count <= nums[index];
}

function hit(nums: number[], index: number): [boolean, number] {
    const checkCur = check(nums, index);
    if (checkCur) {
        if (index === 0) {
            return [true, 0];
        }
        const checkNext = !check(nums, index - 1);
        return [checkNext, checkNext ? 0 : -1];
    }

    return [false, 1];
}

function find(numsSorted: number[], start: number, end: number): number {
  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    const [isHit, offset] = hit(numsSorted, mid);
    if (isHit) {
      return mid;
    } else if (offset > 0) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
  return -1;
}

function hIndex(citations: number[]): number {
    const index = find(citations, 0, citations.length - 1);
    if (index === -1) {
        return 0;
    }
    const count = citations.length - index;
    return count;  
};

console.log(hIndex([1,1,2,3,4,5,7])); // 3