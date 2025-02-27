function ll(arr: number[]): number {
    const dataSet = new Map();
    arr.forEach((n, i) => {dataSet.set(n, i)});
    const dp = new Array(arr.length).fill(-1).map(() => new Array(arr.length).fill(-1));
    let max = 0;
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            try {
                const result = recur(dataSet, dp, i, j, arr);
                if (result > max) max = result;
            } catch (e) {}
        }
    }
    max++;
    if (max >= 3) return max;
    return 0; 
};

function recur(dataSet: Map<number, number>, dp: number[][], indexA: number, indexB: number, arr: number[]): number {
    if (dp[indexA][indexB] !== -1) return dp[indexA][indexB];
    const a = arr[indexA];
    const b = arr[indexB];
    const c = a + b;
    const indexC = dataSet.get(c);
    if (indexC == undefined) {
        dp[indexA][indexB] = 1;
        return 1;
    }
    const next = recur(dataSet, dp, indexB, indexC, arr);
    dp[indexA][indexB] = next + 1;
    return dp[indexA][indexB];
}

console.log(ll([2,4,7,8,9,10,14,15,18,23,32,50]));