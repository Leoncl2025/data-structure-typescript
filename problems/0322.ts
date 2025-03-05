function coinChange(coins: number[], amount: number): number {
    const dp: Map<number, number>[] = Array.from({ length: coins.length }, () => new Map());
    return recur(dp, 0, amount, coins.sort((a, b) => b - a));
};

function recur(dp: Map<number, number>[], index: number, amount: number, coins: number[]): number {
    if (amount <= 0) {
        return 0;
    }
    if (index >= coins.length && amount > 0) {
        return -1;
    }

    const coin = coins[index];

    const dpMap = dp[index];
    if (dpMap.has(amount)) {
        return dpMap.get(amount);
    }
    const maxCoins = Math.floor(amount / coin);
    let fewestCoins = Infinity;
    let hasSolution = false;
    for (let i = 0; i <= maxCoins; i++) {
        const nextCoins = recur(dp, index + 1, amount - i * coin, coins);
        if (nextCoins === -1) {
            continue;
        }
        hasSolution = true;
        fewestCoins = Math.min(fewestCoins, nextCoins + i);
    }
    dpMap.set(amount, hasSolution ? fewestCoins : -1);
    return hasSolution ? fewestCoins : -1;
}

console.log(coinChange([474,83,404,3], 264) === 8);