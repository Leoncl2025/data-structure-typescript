import { findGeaterEqualDescend } from './binarySearch';

describe('findGeaterEqualDescend', () => {
  it('should return correct index when target is in the array', () => {
    const arr = [10, 9, 8, 5, 3, 2, 1];
    expect(findGeaterEqualDescend(arr, 8)).toBe(2); // index of 8
    expect(findGeaterEqualDescend(arr, 10)).toBe(0); // first element
  });

  it('should return correct index when target is not in the array', () => {
    const arr = [10, 9, 7, 6, 2];
    expect(findGeaterEqualDescend(arr, 8)).toBe(1); // 9 is >= 8
    expect(findGeaterEqualDescend(arr, 11)).toBe(-1); // nothing >= 11
  });

  it('should return -1 when no element is >= target', () => {
    const arr = [5, 4, 3];
    expect(findGeaterEqualDescend(arr, 6)).toBe(-1);
  });

  it('should handle empty array', () => {
    const arr: number[] = [];
    expect(findGeaterEqualDescend(arr, 1)).toBe(-1);
  });
});