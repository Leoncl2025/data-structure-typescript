const modBase = BigInt(1000000007);

class ElementNoOpt {
    public count: bigint = BigInt(1);
    public baseSumAccGroup: bigint = BigInt(0);
    public baseSumGroup: bigint = BigInt(0);
    public get baseSumMinProdAccGroup(): bigint {
        return this.baseSumAccGroup * this.minToI;
    };
    public constructor(public value: bigint, public index: number, public sumToI: bigint = BigInt(0), public minToI: bigint = BigInt(0)) {
        this.count = BigInt(1);
        this.baseSumAccGroup = value;
        this.baseSumGroup = value;
    }
}

function totalStrength(strength: number[]): number {
    const strengthBigInt = strength.map(value => BigInt(value));
    console.log('strength', strengthBigInt.length);
    strengthBigInt.forEach((value, index) => {
        strengthBigInt[index] = value % modBase;
    });
    const elements = strengthBigInt.map((value, index) => new ElementNoOpt(value, index, value, value));
    elements[0].minToI = strengthBigInt[0];
    let Pn = (strengthBigInt[0]*strengthBigInt[0]) % modBase;
    let minSum = strengthBigInt[0];
    let result = Pn;
    let currentEnd = 1;
    for (let i = 1; i < strengthBigInt.length; i++) {
        const element = elements[i];
        let minAccB = BigInt(0);
        let sumMinProdAccB = BigInt(0);
        let deltaMinSum = BigInt(0);
        let countB = BigInt(0);
        let sumAccB = BigInt(0);
        let currentSum = BigInt(0);
        const indexGE = findGreaterOrEqual(elements, element.value, 0, currentEnd);
        if (indexGE !== -1) {
            let baseSumGroupNew = element.value;
            let j = currentEnd - 1;
            for (; j >= indexGE; j--) {
                const elePrev = elements[j];
                countB += elePrev.count;
                sumMinProdAccB = (sumMinProdAccB + elePrev.baseSumMinProdAccGroup + elePrev.minToI * elePrev.count * currentSum) % modBase;
                sumAccB = (sumAccB + elePrev.baseSumAccGroup + elePrev.count * currentSum) % modBase;
                currentSum = (currentSum + elePrev.baseSumGroup) % modBase;
                minAccB = (minAccB + elePrev.minToI * elePrev.count) % modBase;
                deltaMinSum += elePrev.count * (element.value - elePrev.minToI);
                baseSumGroupNew += elePrev.baseSumGroup;
                elePrev.minToI = element.value;
            }

            elements[indexGE] = element;
            const lastElement = element;
            lastElement.count = countB + BigInt(1);
            lastElement.baseSumGroup = baseSumGroupNew % modBase;
            lastElement.baseSumAccGroup = (sumAccB + lastElement.value * lastElement.count) % modBase;

            currentEnd = indexGE + 1;
        } else {
            elements[currentEnd] = element;
            currentEnd++;
        }
        const a = element.value;
        Pn = Pn + (a*minSum)%modBase + (a*a*countB)%modBase + a*sumAccB - a*minAccB - sumMinProdAccB + a*a;
        Pn = Pn % modBase;
        result = (result + Pn) % modBase;

        // update minSum
        minSum = (minSum + deltaMinSum + element.value) % modBase;
    }
    result = (result + modBase) % modBase;
    return Number(result);
};

function findGreaterOrEqual(minsElement: ElementNoOpt[], value: bigint, start: number, end: number): number {
    let left = start;
    let right = end;
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (minsElement[mid].value >= value) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    return left < end ? left : -1;
}

console.log(totalStrength([1,8,14,11,1,10])); // 1000000007
