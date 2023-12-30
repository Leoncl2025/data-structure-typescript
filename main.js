const vowels = new Set(['a', 'e', 'i', 'o', 'u']);

const toVowelValue = function(c) {
    return vowels.has(c) ? 1 : 0;
}

const toNonVowelValue = function(c) {
    return vowels.has(c) ? 0 : 1;
};

class Ele {
    constructor(start, end, vol, nonVol) {
        this.start = start;
        this.end = end;
        this.vol = vol;
        this.nonVol = nonVol;
        this.totalCount = -1;
    }
    isBeautiful(k) {
        return beautifulCount(this.vol, this.nonVol, k) > 0;
    }

    isInit() {
        return this.totalCount !== -1;
    }

    update(vol, nonVol, count) {
        this.vol = vol;
        this.nonVol = nonVol;
        this.totalCount = count;
    }
}

/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var beautifulSubstrings = function(s, k) {
    let memoOneTime = Array(s.length).fill(0).map((_, i) => new Ele(0, 0, 0, 0));
    let memonOneTimeNext = Array(s.length).fill(0).map((_, i) => new Ele(0, 0, 0, 0));
    // init
    memoOneTime[0].update(toVowelValue(s[0]), toNonVowelValue(s[0]), 0);
    for (let lastI = 1; lastI < s.length; ++lastI) {
        const prevLen = lastI;
        const currC = s[lastI];
        const currVol = toVowelValue(currC);
        const currNonVol = toNonVowelValue(currC);

        // init
        memonOneTimeNext[0].update(currVol, currNonVol, 0);
        let countIncludeStart = 0;
        for (let backI = 0; backI < prevLen; ++backI) {
            const eleNew = memoOneTime[backI];
            const eleUpdate = memonOneTimeNext[backI + 1];

            const volNew = currVol + eleNew.vol;
            const nonVolNew = currNonVol + eleNew.nonVol;
            const curBeauty = beautifulCount(volNew, nonVolNew, k);
            const countNew = eleNew.totalCount + curBeauty + countIncludeStart;
            eleUpdate.update(volNew, nonVolNew, countNew);

            // update countIncludeStart
            countIncludeStart += curBeauty;
        }
    
        // swap
        const tmp = memoOneTime;
        memoOneTime = memonOneTimeNext;
        memonOneTimeNext = tmp;
    }

    return memoOneTime[s.length - 1].totalCount;
};

var beautifulCount = function(vol, nonVol, k) {
    if (vol === nonVol && (vol * nonVol) % k === 0) {
        return 1;
    }
    return 0;
};

const data = require('./data');
let s = data.data;
//s = "baeyh";
// s = "uzuxpzou";
let k = 1000;
//k = 2;
// k = 3;
console.log(s.length);
console.log(beautifulSubstrings(s, k));