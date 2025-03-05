function cc(n: number): number {
    if (n === 1) {
        return 1;
    }
    return sumN(n) * 4 - 4 * ( n - 1) - (n > 1 ? 3 : 0);
};

function sumN(n: number): number {
    return n * (n + 1) / 2;
}

console.log(cc(1));
console.log(cc(2));
console.log(cc(3));