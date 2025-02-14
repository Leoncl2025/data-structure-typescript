import { mockNums } from "./mock.data";
const modBase = 1000000007;

class Element {
    public minAccTotal: number = 0;
    constructor(public value: number, public count: number, public sumAcc: number, public minAcc: number, public sumMinProdAcc: number, public sumOrigin: number) { }
}

function totalStrength(strength: number[]): number {
    console.log('strength', strength.length);
    let Pn = strength[0]*strength[0];
    let sumAccOrigin = strength.map((v, i) => v);
    let minOrigin = sumAccOrigin.slice();
    strength.forEach((v, i) => {
        if (i === 0) return;
        minOrigin[i] = Math.min(minOrigin[i - 1], v);
        sumAccOrigin[i] = (sumAccOrigin[i - 1] + v) % modBase;
    });
    const minsElement = strength.map((v, i) => new Element(v, 1, v, v, v * v, v));
    minsElement[0].minAccTotal = minsElement[0].minAcc;
    let currentEnd = 1;
    let result = Pn;
    for (let i = 1; i < strength.length; i++) {
        const a = strength[i];
        let Pn1 = (Pn + a * minsElement[currentEnd - 1].minAccTotal) % modBase;
        const geIndex = findGreaterOrEqual(minsElement, a, 0, currentEnd);
        let Pn1B = 0;
        if (geIndex !== -1) {
            // group B
            const groupB = minsElement[geIndex];
            let sumAccB = 0;
            let minAccB = 0;
            let countB = 0;
            let sumMinProdAccB = 0;
            let sumLast = 0
            for (let j = currentEnd - 1; j >= geIndex; j--) {
                const element = minsElement[j];
                const sumAccNew = (element.sumAcc + sumLast * element.count) % modBase;
                sumAccB = (sumAccB + sumAccNew) % modBase;
                minAccB = (minAccB + element.minAcc) % modBase;
                countB += element.count;
                const sumMinProdAccNew = (sumAccNew * element.value) % modBase;
                sumMinProdAccB = (sumMinProdAccB + sumMinProdAccNew) % modBase;
                sumLast += element.sumOrigin;
            }
            groupB.sumOrigin += sumLast;
            groupB.count = countB + 1;
            groupB.minAcc = (a * groupB.count) % modBase;
            groupB.sumAcc = (sumAccB + groupB.minAcc) % modBase;
            groupB.minAccTotal = (groupB.minAcc + (minsElement[geIndex - 1]?.minAccTotal ?? 0)) % modBase;
            groupB.sumMinProdAcc = (groupB.sumAcc * a) % modBase;
            groupB.value = a;

            Pn1B = a*a*countB + a * sumAccB - a * minAccB - sumMinProdAccB;
            Pn1B = Pn1B % modBase;
            // update current end
            currentEnd = geIndex + 1;
        }
        else {
            minsElement[currentEnd] = new Element(a, 1, a, a, a*a, a);
            minsElement[currentEnd].minAccTotal = (a + (minsElement[currentEnd - 1]?.minAccTotal ?? 0)) % modBase;
            currentEnd++;
        }

        Pn = Pn1 + Pn1B;
        Pn += a * a;
        Pn = Pn % modBase;
        console.log('Pn', Pn);
        result = (result + Pn) % modBase;
    }
    return result;
};

function findGreaterOrEqual(minsElement: Element[], value: number, start: number, end: number): number {
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

let nums1 = mockNums;
nums1 = [1,2,4,3,1];
// [1,8,14,11,11,1,10]
console.log(totalStrength(nums1)); // 1000000007
