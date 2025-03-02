/**
 * @param {number[]} difficulty
 * @param {number[]} profit
 * @param {number[]} worker
 * @return {number}
 */
var maxProfitAssignment = function(difficulty, profit, worker) {
    const jobs = difficulty.map((d, i) => new Job(d, profit[i]));
    jobs.sort((a, b) => a.difficulty - b.difficulty);
    const maxProfits = [];
    jobs.reduce((acc, job) => {
        let maxProfit = acc;
        if (job.profit > acc) {
            maxProfit = job.profit;
        }
        maxProfits.push(maxProfit);
        return maxProfit;
    }, 0);
    console.log(maxProfits);
    console.log(jobs);
    return worker.reduce((acc, w) => {
        const index = findLessOrEqualThan(jobs, w);
        console.log(`w: ${w}, index: ${index}`);
        if (index >= 0 && index < jobs.length) {
            return acc + maxProfits[index];
        }
        return acc;
    }, 0);
};

function findLessOrEqualThan(jobs, target) {
    let start = 0;
    let end = jobs.length;
    let mid = getMidIndex(start, end);
    while (start < end) {
        if(start === mid) {
            break;
        }
        if (jobs[mid].difficulty <= target) {
            start = mid;
        } else {
            end = mid;
        }
        mid = getMidIndex(start, end);
    }
    if (jobs[mid].difficulty <= target) {
        return mid;
    }
    return -1;
}


function getMidIndex(start, end) {
    return Math.floor((start + end) / 2);
}

class Job {
    constructor(difficulty, profit) {
        this.difficulty = difficulty;
        this.profit = profit;
    }
}

console.log(maxProfitAssignment([2,4,6,8,10], [10,20,30,40,50], [4,5,6,7]))