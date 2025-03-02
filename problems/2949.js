class MyMap {
    constructor() {
        this.map = new Map();
        this.mapIndexToInitAccValue = new Map();
        this.baseAccValue = 0;
    }

    findBeautyI(value) {
        const tartgetValue = -this.baseAccValue - value;
        return this.get(tartgetValue);
    }

    get(key) {
        return this.map.get(key);
    }

    set(keyAccValue, valueIndex, mapBeautyIPair) {
        // update base acc value
        this.baseAccValue += keyAccValue;
        const accValueInit = keyAccValue - this.baseAccValue;

        // remove index with same acc value
        let index = valueIndex - 1;
        while (mapBeautyIPair.has(index)) {
            const indexAnother = mapBeautyIPair.get(index);
            if (this.mapIndexToInitAccValue.has(indexAnother)) {
                const accValueSame = this.mapIndexToInitAccValue.get(indexAnother);
                if (!this.map.has(accValueSame)) {
                    break;
                }
                deleteMapSet(this.map, accValueSame, indexAnother);
            } else {
                throw new Error("should not happen");
            }

            index = indexAnother - 1;
        }

        addMapSet(this.map, accValueInit, valueIndex);
        this.mapIndexToInitAccValue.set(valueIndex, accValueInit);
    }

    has(key) {
        return this.map.has(key);
    }

    delete(key) {
        this.map.delete(key);
    }

    size() {
        return this.map.size;
    }

    keys() {
        return this.map.keys();
    }
}

var Debug = false;

const updateMapMax = function(map, key, value) {
    if (map.has(key) && map.get(key) >= value) {
        return;
    }
    map.set(key, value);
};

const deleteMapSet = function(map, key, value) {
    if (!map.has(key)) {
        return;
    }

    const set = map.get(key);
    set.delete(value);
    if (set.size === 0) {
        map.delete(key);
    }
};

const addMapSet = function(map, key, value) {
    if (!map.has(key)) {
        map.set(key, new Set());
    }

    const set = map.get(key);
    set.add(value);
};

const vowels = new Set(['a', 'e', 'i', 'o', 'u']);

const toVowelValue = function(c) {
    return vowels.has(c) ? 1 : -1;
}

let Ops = 0;

/**
 * Return beautiful substrings count:
 *  which meets following requirements:
 *      1. the number of vowels and non-vowels are equal
 *      2. the number of product of vowels and non-vowels is divisible by k
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var beautifulSubstrings = function(s, k) {
    const memoMap = new MyMap();
    // beautyCountList = getBeautyCountList(s, k);
    // map index to previous index list, and they two meet the requirement 1
    const mapBeautyIPair = new Map();
    // map index to Beauty II count and its current sum. [ [ [12, 3, 4], [14, 7, 2], [9, 9, 1], ... ], BCount, ProductSum, CountSum]
    // value:
    //  1. lists. [12, 3, 4], 12 is the prodcut of 3 and 4, 3 is the count of 4, 4 is the count of vowels
    //  2. BCount. the count of beautiful substrings
    //  3. ProductSum. the sum of product of vowels and non-vowels
    //  4. CountSum. the sum of count of vowels
    const mapIndexToBII = new Map();
    let ret = 0;


    for (let i = 0; i < s.length; i++) {
        const c = s[i];
        const valueCur = toVowelValue(c);
        const findIndex = memoMap.findBeautyI(valueCur);
        if (findIndex && findIndex.size > 0) {
            findIndex.forEach(index => {
                updateMapMax(mapBeautyIPair, i, index);
            });
            ret += calculateBeautyII(mapBeautyIPair, i, k, mapIndexToBII);
        }

        memoMap.set(valueCur, i, mapBeautyIPair);
    }

    return ret;
};

// calculate beauty II count and update mapIndexToBII
const calculateBeautyII = function(mapBeautyIPair, startIndex, k, mapIndexToBII) {
    let ret = 0;
    let index = startIndex;
    if (!mapBeautyIPair.has(index)) {
        return ret;
    }

    const pairIndex = mapBeautyIPair.get(index);
    const deltaDistance = getDistance(startIndex, pairIndex);
    const prevPairIndex = pairIndex - 1;
    if (mapIndexToBII.has(prevPairIndex)) {
        let [listPair, curCount, productSum, countSum] = mapIndexToBII.get(prevPairIndex);
        //const listPairNew = [...listPair];
        const listPairNew = listPair;
        const lastIndexOfPair = listPair.length - 1;

        // update listPair
        const [product, count, distance] = listPair[lastIndexOfPair];
        if (deltaDistance === distance) {
            const prodcutNew = product + distance;
            listPairNew[lastIndexOfPair] = [prodcutNew, count + 1, distance];
        } else {
            listPairNew.push([deltaDistance, 1, deltaDistance]);
        }

        countSum++;
        productSum += deltaDistance;

        if (listPairNew.length === 1) {
            ret = curCount + getBeautifulCount(listPairNew[0][0], k);
        } else {
            ret = calculateBeautyIIFromPairList(listPairNew, k, productSum, countSum);
        }

        mapIndexToBII.set(startIndex, [listPairNew, ret, productSum, countSum]);
    } else {
        ret += getBeautifulCount(deltaDistance, k);
        mapIndexToBII.set(startIndex, [[[deltaDistance * 1, 1, deltaDistance]], ret, deltaDistance, 1]);
    }

    return ret;
};

const calculateBeautyIIFromPairList = function(listPair, k, productSum, countSum) {
    if (k === 1) {
        return countSum;
    }

    let ret = 0;
    let base = 0;
    listPair.reverse().forEach(([product, count, distance]) => {
        ret += calcDelta(k, distance, count, base, product);
        base += product;
    });
    listPair.reverse();

    return ret;
};

const calcDelta = function(k, distance, count, base, productOfDistanceAndCount) {
    const minDistance = distance + base;
    const maxDistance = productOfDistanceAndCount + base;
    let ret = 0;

    for (let i = minDistance; i <= maxDistance; i += distance) {
        if ((i*i) % k === 0) {
            ret++;
        }
    }

    return ret;
};

var getDistance = function(from, to) {
    return Math.round(Math.abs(from + 1 - to) / 2);
};

var getBeautifulCount = function(distance, k) {
    return (distance * distance) % k === 0 ? 1 : 0;
};

const data = require('./data');
let s = data.data;
//s = "baeyh";
// s = "uzuxpzou";
// s = "eeebjoxxujuaeoqibd"; // 4
// s = "ilougekqlovegioemdvu";
// s = "bababababa";
// s = "uzuxpzou";
// s = "ilougekqlovegioemdvu";
let k = 1000;
k = 961;
k = 24;
//k = 2;
// k = 3;
// k = 8;
// k = 4;
// k = 2;
// k = 3;
// k = 4;

Debug = false;
console.log("===========================================================================")
console.log(s.length);
console.log(beautifulSubstrings(s, k), Ops);