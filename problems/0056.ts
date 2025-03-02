function merge(intervals: number[][]): number[][] {
    intervals.sort((a, b) => a[0] - b[0]);
    const ret = [intervals[0]];
    for (let i = 0; i < intervals.length; ++i) {
        const last = ret[ret.length - 1];
        const interval = intervals[i];
        if (last[1] >= interval[0]) {
            last[1] = Math.max(last[1], interval[1]);
        } else {
            ret.push(interval);
        }
    }

    return ret;
};