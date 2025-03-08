/**
 * Find the index of value that is equal or greater than target in a sorted array
 * @param numsDescend the array of nums sorted in descending order
 * @param target the target value to find
 */
export function findGeaterEqualDescend(numsDescend: number[], target: number): number {
    let left = -1;
    let right = numsDescend.length - 1;

    while (left < right) {
        const mid = Math.ceil((left + right) / 2);
        if (numsDescend[mid] < target) {
            right = mid - 1;
        } else {
            left = mid;
        }
    }
    if (right > -1) {
        return numsDescend[right] >= target ? right : -1;
    }

    return -1;
}