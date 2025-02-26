const base = 1000000007;
function numOfSubarrays(arr: number[]): number {
    let dpEven = 0;
    let dpOdd = 0;
    let ret = 0;
    arr.forEach((v, i) => {
        if (v % 2 === 0) {
            dpOdd = (dpOdd) % base;
            dpEven = (dpEven + 1) % base;
            ret = (ret + dpOdd) % base;
        } else {
            const lastDpOdd = dpOdd;
            dpOdd = (dpEven + 1) % base;
            dpEven = (lastDpOdd) % base;
            ret = (ret + dpOdd) % base;
        }
    });
    return ret;
};

console.log(numOfSubarrays([1, 3, 5])); // 4