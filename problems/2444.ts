/**
 * Design:
 * 1. Find the min max couple `MinMaxMarker`
 * 2. explore the left and right of the `MinMaxMarker` to find the min max couple
 * 3. Merge the min max couple
 */

const UnknownIndex = -1;
class MinMaxMarker {
    public minIndex: number;
    public maxIndex: number;
    constructor(public min: number, public max: number) {
        this.minIndex = UnknownIndex;
        this.maxIndex = UnknownIndex;
    }

    public addOrUpdateMinMax(val: number, index: number): void {
        if (val === this.min) {
            this.minIndex = index;
        }
        if (val === this.max) {
            this.maxIndex = index;
        }

        // not within the range of min and max
        if (val < this.min || val > this.max) {
            this.clean();
        }
    }

    public isValid(): boolean {
        return this.minIndex !== UnknownIndex && this.maxIndex !== UnknownIndex;
    }

    private clean() {
        this.minIndex = UnknownIndex;
        this.maxIndex = UnknownIndex;
    }
}

class MinMaxMarkerWithBounds extends MinMaxMarker {
    public leftBoundIndex: number;
    public rightBoundIndex: number;
    constructor(
        public min: number,
        public max: number,
        public minIndex: number,
        public maxIndex: number
    ) {
        super(min, max);
    }
}

function findMinMaxMarkerList(
    nums: number[], minK: number,
    maxK: number): MinMaxMarker[] {
    const createNewMM = () => new MinMaxMarker(minK, maxK);
    const retMMs: MinMaxMarker[] = [createNewMM()];
    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        const lastMM = retMMs[retMMs.length - 1];
        lastMM.addOrUpdateMinMax(num, i)
        if (lastMM.isValid()) {
            const newMM = createNewMM();
            newMM.addOrUpdateMinMax(num, i);
            retMMs.push(newMM);
        }
    }
    const lastMM = retMMs[retMMs.length - 1];
    if (retMMs.length > 0) {
        if (!lastMM.isValid()) {
            retMMs.pop();
        } else {
            const lastMM2 = retMMs[retMMs.length - 2];
            if (minK === maxK) {
                retMMs.pop();
            }
        }
    }

    return retMMs;
}

function expandBoundIndex(
    startIndex: number,
    direction: 'left' | 'right',
    mmm: MinMaxMarker,
    sideMmm: MinMaxMarker | undefined,
    nums: number[]
): number {
    const step = direction === 'left' ? -1 : 1;
    let boundIndex = startIndex;

    let hitMin = false;
    let hitMax = false;
    let nextIndex = startIndex;
    while (true) {
        if (nextIndex < 0 || nextIndex >= nums.length) {
            break;
        }
        const num = nums[nextIndex];
        if (num < mmm.min || num > mmm.max) {
            break;
        }
        hitMin = hitMin || (sideMmm && nextIndex === sideMmm.minIndex);
        hitMax = hitMax || (sideMmm && nextIndex === sideMmm.maxIndex);
        if (hitMin && hitMax) {
            break;
        }
        boundIndex = nextIndex;
        nextIndex = boundIndex + step;
    }

    return boundIndex;
}

function exploreBounds(
    mmm: MinMaxMarker,
    leftMmm: MinMaxMarker | undefined,
    rightMmm: MinMaxMarker | undefined,
    nums: number[],
) {
    let leftBoundIndex = Math.min(mmm.minIndex, mmm.maxIndex);
    let rightBoundIndex = Math.max(mmm.minIndex, mmm.maxIndex);

    // Explore left
    leftBoundIndex = expandBoundIndex(leftBoundIndex, 'left', mmm, leftMmm, nums);

    // Explore right
    rightBoundIndex = expandBoundIndex(rightBoundIndex, 'right', mmm, rightMmm, nums);
    const mmmWithBounds = new MinMaxMarkerWithBounds(
        mmm.min,
        mmm.max,
        mmm.minIndex,
        mmm.maxIndex
    );
    mmmWithBounds.leftBoundIndex = leftBoundIndex;
    mmmWithBounds.rightBoundIndex = rightBoundIndex;
    return mmmWithBounds;
}

function exploreBoundsOfList(
    mmms: MinMaxMarker[],
    nums: number[]
): MinMaxMarkerWithBounds[] {
    const mmmWithBoundsList: MinMaxMarkerWithBounds[] = [];
    mmms.forEach((mmm, index) => {
        const leftMmm = mmms[index - 1];
        const rightMmm = mmms[index + 1];
        const mmmWithBounds = exploreBounds(mmm, leftMmm, rightMmm, nums);
        mmmWithBoundsList.push(mmmWithBounds);
    });
    return mmmWithBoundsList;
}

function countFixedBound(
    mmmWithBounds: MinMaxMarkerWithBounds
) {
    const leftBoundIndex = mmmWithBounds.leftBoundIndex;
    const rightBoundIndex = mmmWithBounds.rightBoundIndex;
    const coreLeftIndex = Math.min(mmmWithBounds.minIndex, mmmWithBounds.maxIndex);
    const coreRightIndex = Math.max(mmmWithBounds.minIndex, mmmWithBounds.maxIndex);
    const leftCount = coreLeftIndex - leftBoundIndex + 1;
    const rightCount = rightBoundIndex - coreRightIndex + 1;
    return leftCount * rightCount;
}

function countFixedBoundOfList(
    mmmWithBoundsList: MinMaxMarkerWithBounds[]
) {
    // use reduce to count the total number of subarrays
    return mmmWithBoundsList.reduce((acc, mmmWithBounds) => {
        const count = countFixedBound(mmmWithBounds);
        return acc + count;
    }, 0);
}

function merge(
    mmmWB0: MinMaxMarkerWithBounds,
    mmmWB1: MinMaxMarkerWithBounds
) {
    if (!mmmWB0 || !mmmWB1) {
        return null;
    }
    const rightBoundIndex = mmmWB0.rightBoundIndex;
    const leftBoundIndex = mmmWB1.leftBoundIndex;
    if (rightBoundIndex + 1 < leftBoundIndex) {
        return null;
    }
    const newMmm = new MinMaxMarkerWithBounds(
        mmmWB0.min,
        mmmWB1.max,
        Math.min(mmmWB0.minIndex, mmmWB1.minIndex, mmmWB0.maxIndex, mmmWB1.maxIndex),
        Math.max(mmmWB0.minIndex, mmmWB1.minIndex, mmmWB0.maxIndex, mmmWB1.maxIndex)
    );
    newMmm.leftBoundIndex = mmmWB0.leftBoundIndex;
    newMmm.rightBoundIndex = mmmWB1.rightBoundIndex;
    return newMmm;
}

function lrReduce(
    lrList: [number, number][]
) {
    if (lrList.length == 0) {
        return 0;
    }
    let allSame = true;
    const sameVal = lrList[0][0];
    for (let i = 0; i < lrList.length; ++i) {
        if (lrList[i][0] !== lrList[i][1] || lrList[i][0] != sameVal) {
            allSame = false;
            break;
        }
    }
    if (allSame) {
        return Math.floor((lrList[0][0] * lrList[0][1]) * (lrList.length + 1)*lrList.length / 2);
    }
    let total = 0;
    for (let i = 0; i < lrList.length; i++) {
        const [left, _] = lrList[i];
        for (let j = i; j < lrList.length; j++) {
            const [_, right] = lrList[j];
            total += left * right;
        }
    }
    return total;
}

function calDiffBounds(mmm: MinMaxMarkerWithBounds) {
    const coreMin = Math.min(mmm.minIndex, mmm.maxIndex);
    const coreMax = Math.max(mmm.minIndex, mmm.maxIndex);
    return [
        coreMin - mmm.leftBoundIndex + 1,
        mmm.rightBoundIndex - coreMax + 1
    ];
}

function countSubarrays(nums: number[], minK: number, maxK: number): number {
    if (minK === maxK && Math.min(...nums) === minK && Math.max(...nums) === maxK) {
        return Math.floor(nums.length * (nums.length + 1) / 2);
    }
    const mmms = findMinMaxMarkerList(nums, minK, maxK);
    if (mmms.length === 0) {
        return 0;
    }
    let mmmB = exploreBoundsOfList(mmms, nums);
    let totalCount = 0;
    console.log(mmmB.length);
    const lrList = [];
    let prevMmmB = undefined;
    for (let i = 0; i < mmmB.length; i++) {
        if (!merge(prevMmmB, mmmB[i])) {
            totalCount += lrReduce(lrList);
            lrList.length = 0;
        }
        lrList.push(calDiffBounds(mmmB[i]));
        prevMmmB = mmmB[i];
    }

    totalCount += lrReduce(lrList);
    lrList.length = 0;
    return totalCount;
}

let nums9 = [0,3,10,10,7,10,0,10,2,10,0,1,6,4,5];
let minK = 0;
let maxK = 10;
console.log(countSubarrays(nums9, minK, maxK)); // 1386044581
