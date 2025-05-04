function numberOfArithmeticSlices(nums: number[]): number {
    const diffs = findAllDiff(nums);
    const mapValWithSortedIndex = generateValWithSortedIndex(nums);
    let ret = 0;
    mapValWithSortedIndex.forEach((val, key) => {
        const count = val.length;
        ret += countZero(count);
    });
    for (const diff of diffs) {
        const eles = buildEleArithmeticGraph(mapValWithSortedIndex, diff, nums);
        const total = countEles(eles);
        ret += total;
    }
    return ret;
};

class EleArithmetic {
    public inEleSet: Set<EleArithmetic> = new Set();
    public outEleSet: Set<EleArithmetic> = new Set();
    public visited: boolean = false;
    public total: number = 0;
    public constructor(
        public count: number, // the count of occurrences
        public diff: number, // the difference
        public length: number, // the length of the longest arithmetic subsequence
        public startVal: number, // the start value of the arithmetic subsequence
        public startIndex: number
    ) { }

    public get InDegree(): number {
        return this.inEleSet.size;
    }
    public get OutDegree(): number {
        return this.outEleSet.size;
    }
    public get totalDedup(): number {
        return (this.count - 1) * countArithmeticSlicesLength(this.length);
    }
    public get firstNext(): EleArithmetic | undefined {
        return Array.from(this.outEleSet)?.[0];
    }
    public clear() {
        this.inEleSet.forEach((ele) => {
            ele.deleteConnectTo(this);
        });
        this.outEleSet.forEach((ele) => {
            this.deleteConnectTo(ele);
        });
        this.inEleSet.clear();
        this.outEleSet.clear();
    }
    public deleteConnectTo(ele: EleArithmetic) {
        this.outEleSet.delete(ele);
        ele.inEleSet.delete(this);
    }
    public get isHead(): boolean {
        return this.InDegree === 0;
    }
    public get isTail(): boolean {
        return this.OutDegree === 0;
    }
    public connectTo(ele: EleArithmetic) {
        this.outEleSet.add(ele);
        ele.inEleSet.add(this);
    }
}

function buildEleArithmeticGraph(
    mapValWithSortedIndex: Map<number, number[]>,
    diff: number,
    nums: number[]
) {
    const elesMap = nums.reduce((acc, val, ind) => {
        if (!acc.has(ind)) {
            acc.set(ind, new EleArithmetic(0, diff, 1, val, ind));
        }
        return acc;
    }, new Map<number, EleArithmetic>());
    elesMap.forEach((ele) => {
        buildI(mapValWithSortedIndex, diff, nums, ele, elesMap);
    });
    return Array.from(elesMap.values()).filter((ele) => {
        return (ele.OutDegree + ele.InDegree) > 0;
    });
}

function countEles(
    eles: EleArithmetic[])
{
    let total = 0;
    eles.forEach((ele) => {
        ele.visited = false;
    });
    const head = eles.filter((ele) => ele.isHead);
    head.forEach((ele) => {
        countEle(ele, 0, 0);
    });
    eles.forEach((ele) => {
        total += ele.total;
    });
    return total;
}

function countEle(ele: EleArithmetic, freshLen: number, realLen: number) {
    const nextFreshLen = freshLen + (ele.visited ? 0 : 1);
    ele.visited = true;
    const nextRealLen = realLen + 1;
    const start = freshLen === 0 ? nextFreshLen : (nextRealLen - freshLen + 1);
    const end = nextRealLen;
    const startNorm = Math.max(3, start);
    let total = 0;
    if (end >= startNorm) {
        total = end - startNorm + 1;
    }
    ele.total += total;
    ele.outEleSet.forEach((nextEle) => {
        countEle(nextEle, nextFreshLen, nextRealLen);
    });
}

function findSingleLinkedListTail(
    ele: EleArithmetic
) {
    if (ele.OutDegree === 0 || ele.OutDegree > 1) {
        return ele;
    }
    const nextEle = Array.from(ele.outEleSet)[0];
    if (nextEle.InDegree > 1) {
        return ele;
    }
    return findSingleLinkedListTail(nextEle);
}

function buildI(
    mapValWithSortedIndex: Map<number, number[]>,
    diff: number,
    nums: number[],
    startEle: EleArithmetic,
    elesMap: Map<number, EleArithmetic>
) {
    if (startEle.visited) {
        return;
    }
    startEle.visited = true;
    const nextVal = startEle.startVal + diff;
    const nextIndexCandidates = findNextIndexCandidates(
        mapValWithSortedIndex,
        nextVal,
        startEle.startIndex
    );
    if (nextIndexCandidates.length === 0) {
        return;
    }
    nextIndexCandidates.forEach((nextIndex) => {
        const nextEle = elesMap.get(nextIndex);
        if (!nextEle) {
            return;
        }
        startEle.connectTo(nextEle);
        buildI(mapValWithSortedIndex, diff, nums, nextEle, elesMap);
    });
}

function findAllDiff(nums: number[]) {
    const diffMapCount = new Map<number, number>();
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            const diff = nums[j] - nums[i];
            if (!diffMapCount.has(diff)) {
                diffMapCount.set(diff, 0);
            }
            diffMapCount.set(diff, diffMapCount.get(diff) + 1);
        }
    }
    diffMapCount.delete(0);
    // filter out the count is less than 3
    const ret = Array.from(diffMapCount.entries()).filter(([key, value]) => {
        return value >= 2;
    }).map(([key, value]) => {
        return key;
    });
    return ret.sort((a, b) => {
        return a - b;
    });
}

function generateValWithSortedIndex(nums: number[]) {
    const ret = new Map<number, number[]>();
    for (let i = 0; i < nums.length; i++) {
        if (!ret.has(nums[i])) {
            ret.set(nums[i], []);
        }
        ret.get(nums[i]).push(i);
    }
    ret.forEach((value, key) => {
        value.sort((a, b) => a - b);
        ret.set(key, value);
    });
    return ret;
}

function findFirstGreater(
    numsSorted: number[],
    target: number) {
    let start = 0;
    let end = numsSorted.length;
    while (start < end) {
        const mid = Math.floor((start + end) / 2);
        if (numsSorted[mid] <= target) {
            start = mid + 1;
        } else {
            end = mid;
        }
    }
    return start > numsSorted.length - 1 ? -1 : start;
}

function findNextIndexCandidates(
    mapValWithSortedIndex: Map<number, number[]>,
    nextVal: number,
    currentIndex: number
) {
    const sortedIndex = mapValWithSortedIndex.get(nextVal);
    if (!sortedIndex) {
        return [];
    }
    const index = findFirstGreater(sortedIndex, currentIndex);
    if (index === -1) {
        return [];
    }
    return sortedIndex.slice(index);
}

function countArithmeticSlices(subSeq: number[]): number {
    const n = subSeq.length;
    return countArithmeticSlicesLength(n);
}

function countArithmeticSlicesLength(len: number): number {
    if (len <= 2) {
        return 0;
    }
    return (len - 1) * (len - 2) / 2;
}

function countZero(count: number): number {
    if (count <= 2) {
        return 0;
    }
    const total = Math.pow(2, count);
    return total - 1 - count - ((count * (count - 1)) / 2);
}

// console.log(getAllLongestArithmeticSubsequence([1,2,3,4,3], 1));
let nums0 = [0,-111,0,-11,0,-1111,1,2,3,4,4];
nums0 = [0,0,1,2,3,4];
nums0 = [11047,4750,3092,-3054,-8808,693,-2958,-3999,8199,-10245,-9365,-5588,1955,-9301,758,9668,1349,6843,7808,2447,-2466,-10810,-235,10207,5908,6382,-6116,9930,-611,10532,-5632,3284,7115,-7206,4199,8678,-7814,9283,2282,10552,-11225,2139,9102,-2630,8636,1648,-5547,-11123,9276,-2998,-1443,-9863,-7381,9262,10874,7734,3090,-4463,-5913,2071,-3966,10139,-3966,-11243,9967,9249,-11130,5641,-1450,434,7409,-3517,-8679,-10240,-1199,-671,7643,-4803,-10384,-10616,1866,2872,2591,-8296,-960,6569,5831,-2063,808,-9279,9611,3066,8839,-2738,9741,-4250,-2843,2884,-10572,9560,2782,-10771,-4178,-8879,662,-2091,11071,2341,8957,-7771,4591,-5496,5346,7727,-8091,9246,4710,10826,-4514,7391,-7246,7364,-11163,5072,-7676,3624,-9400,9293,10691,11092,1165,4858,8134,-4499,-1252,-1869,-6538,-7013,1703,-10388,-7695,2077,-3237,-5581,-6607,10452,-2803,9677,-3543,2587,5605,-3374,-8631,-10451,-7480,-9580,-8293,-1616,-1094,7435,-8911,8656,-10590,-36,236,-5303,742,9234,2654,-10916,5181,1373,-2306,2793,10419,7667,2098,5233,-301,-9434,1073,-7322,3837,-10673,-3837,6294,-4061,-1271,2795,9226,6272,-6960,4278,10467,-10400,7429,-7803,10942,1462,2231];
//nums0 = [79,20,64,28,67,81,60,58,97,85,92,96,82,89,46,50,15,2,36,44,54,2,90,37,7,79,26,40,34,67,64,28,60,89,46,31,9,95,43,19,47,64,48,95,80,31,47,19,72,99,28,46,13,9,64,4,68,74,50,28,69,94,93,3,80,78,23,80,43,49,77,18,68,28,13,61,34,44,80,70,55,85,0,37,93,40,47,47,45,23,26,74,45,67,34,20,33,71,48,96];
console.log(numberOfArithmeticSlices(nums0));
// console.log(numberOfArithmeticSlices([2,4,6,8,10]));