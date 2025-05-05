function numberOfArithmeticSlices(nums: number[]): number {
    const {diffs, connectMap} = findAllDiff(nums);
    const sameValuesMap = getSameValues(nums);
    let ret = 0;
    sameValuesMap.forEach((val, key) => {
        const count = val.length;
        ret += countZero(count);
    });
    for (const diff of diffs) {
        const eles = buildEleArithmeticGraph(diff, nums, connectMap);
        const total = countEles(eles);
        ret += total;
    }
    return ret;
};

class EleArithmetic {
    public inEleSet: Set<EleArithmetic> = new Set();
    public outEleSet: Set<EleArithmetic> = new Set();
    public visited: boolean = false;
    public count1: number = 1;
    public count2: number = 0;
    public count3: number = 0;
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
    diff: number,
    nums: number[],
    connectMap: Map<number, number[]>[]
) {
    const eles = nums.map((val, ind) => {
        return new EleArithmetic(0, diff, 1, val, ind);
    });
    eles.forEach((ele, i) => {
        buildI(diff, ele, connectMap, eles);
    });
    return eles.filter((ele) => {
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
        countEle(ele);
    });
    eles.forEach((ele) => {
        total += ele.count3;
    });
    return total;
}

function countEle(ele: EleArithmetic) {
    if (ele.visited) {
        return;
    }
    ele.visited = true;
    ele.outEleSet.forEach((nextEle) => {
        countEle(nextEle);
        ele.count2 += nextEle.count1;
        ele.count3 += nextEle.count2 + nextEle.count3;
    });
}

function buildI(
    diff: number,
    startEle: EleArithmetic,
    connectMap: Map<number, number[]>[],
    eles: EleArithmetic[]
) {
    if (startEle.visited) {
        return;
    }
    startEle.visited = true;
    const connect = connectMap[startEle.startIndex];
    const nextEles = connect.get(diff);
    nextEles?.forEach((nextIndex) => {
        buildI(
            diff,
            eles[nextIndex],
            connectMap,
            eles
        );
        const nextEle = eles[nextIndex];
        startEle.connectTo(nextEle);
    });
}

function findAllDiff(nums: number[]) {
    const diffMapCount = new Map<number, number>();
    const connectMap: Map<number, number[]>[] = [];
    for (let i = 0; i < nums.length; i++) {
        connectMap[i] = new Map<number, number[]>();
        const connect = connectMap[i];
        for (let j = i + 1; j < nums.length; j++) {
            const diff = nums[j] - nums[i];
            if (diff === 0) {
                continue;
            }
            if (!connect.has(diff)) {
                connect.set(diff, []);
            }
            connect.get(diff).push(j);
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
    return {diffs: ret.sort((a, b) => {return a - b;}) as number[], connectMap};
}

function getSameValues(nums: number[]) {
    const ret = new Map<number, number[]>();
    for (let i = 0; i < nums.length; i++) {
        if (!ret.has(nums[i])) {
            ret.set(nums[i], []);
        }
        ret.get(nums[i]).push(i);
    }
    return ret;
}

function countZero(count: number): number {
    if (count <= 2) {
        return 0;
    }
    const total = Math.pow(2, count);
    return total - 1 - count - ((count * (count - 1)) / 2);
}