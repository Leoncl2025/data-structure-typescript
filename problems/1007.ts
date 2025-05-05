function minDominoRotations(tops: number[], bottoms: number[]): number {
    const costTb = minCostF(tops.map((v, i) => [v, bottoms[i]]));
    if (costTb == 0) return costTb;
    const costBt = minCostF(bottoms.map((v, i) => [v, tops[i]]));
    if (costBt === -1 && costTb === -1) {
        return -1;
    }
    let minCost = tops.length;
    if (costBt !== -1) {
        minCost = Math.min(minCost, costBt);
    }
    if (costTb !== -1) {
        minCost = Math.min(minCost, costTb);
    }

    return minCost;
}

function minCostF(pairs: number[][]): number {
    let success = false;
    let minCost = pairs.length;
    for (let i = 1; i < 7; ++i) {
        let valid = true;
        let cost = 0;
        for (let j = 0; j < pairs.length; ++j) {
            const defaultVal = pairs[j][0];
            const switchedVal = pairs[j][1];
            if (defaultVal !== i) {
                if (switchedVal !== i) {
                    valid = false;
                    break;
                } else {
                    cost++;
                }
            }
        }

        if (valid) {
            success = true;
            minCost = Math.min(cost, minCost);
        }

        if (minCost === 0) {
            return minCost;
        }
    }

    if (!success) return -1;
    return minCost;
}