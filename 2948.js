/**
 * @param {number[]} nums
 * @param {number} limit
 * @return {number[]}
 */
var lexicographicallySmallestArray = function(nums, limit) {
    const origionMap = nums.map((v, index) => new Element(index, v, false));
    const sortedArray = origionMap.slice().sort((a, b) => {
        if (a.value == b.value) {
            return a.index - b.index;
        }

        return a.value - b.value;
    });

    sortedArray.forEach((v, i) => {
        v.sortedIndex = i;
    });

    const smallestArray = origionMap.slice();
    smallestArray.forEach((s, i) => {
        s.smallestArrayIndex = i;
    });

    for (let i = 0; i < nums.length; ++i) {
        const ele = origionMap[i];
        if (ele.sorted) {
            continue;
        }

        const limitedSortedArray = findSortedArray(sortedArray, ele, limit);
        modifySmallestArray(smallestArray, limitedSortedArray);
    }

    return smallestArray.map(s => s.value);
};

const modifySmallestArray = (smallestArray, limitedSortedArray) => {
    const indexToBeModified = limitedSortedArray.map(l => l.smallestArrayIndex).sort((a, b) => a - b);
    indexToBeModified.forEach((saIndex, index) => {
        smallestArray[saIndex] = limitedSortedArray[index];
        limitedSortedArray[index].sorted = true;
    });
};

const findSortedArray = (sortedArray, ele, limit) => {
    const retSmall = [];
    for (let i = ele.sortedIndex - 1; i >= 0; --i) {
        const e = sortedArray[i];
        if (!isWithinLimit(e, sortedArray[i + 1], limit)) {
            break;
        }
        retSmall.push(e);
    }
    const retLarge = [];
    for (let i = ele.sortedIndex + 1; i < sortedArray.length; ++i) {
        const e = sortedArray[i];
        if (!isWithinLimit(e, sortedArray[i - 1], limit)) {
            break;
        }
        retLarge.push(e);
    }
    return retSmall.reverse().concat([ele]).concat(retLarge);
};

const isWithinLimit = (ele1, ele2, limit) => {
    return Math.abs(ele1.value - ele2.value) <= limit;
};

class Element {
    constructor(index, value, sorted) {
        this.index = index;
        this.value = value;
        this.sorted = sorted;
        this.sortedIndex = undefined;
        this.smallestArrayIndex = undefined;
    }
}


let nums = [5,100,44,45,16,30,14,65,83,64];
let limit = 15;
nums = [4,52,38,59,71,27,31,83,88,10];
limit = 14;
console.log(lexicographicallySmallestArray(nums, limit));