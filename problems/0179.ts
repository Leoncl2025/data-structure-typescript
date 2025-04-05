function largestNumber(nums: number[]): string {
    const strs = nums.map(num => numberToString(num));
    strs.sort(compareString);
    const result = strs.join("");
    if (result[0] === "0") {
        return "0";
    }
    return result;
};

function numberToString(num: number): string {
    return num.toString();
}

function compareString(a: string, b: string): number {
    return (b + a).localeCompare(a + b);
}