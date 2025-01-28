/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
    const memo = Array(grid.length).fill(null).map(() => Array(grid[0].length).fill(false));
    let ret = 0;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0;j < grid[0].length; j++) {
            if (grid[i][j] == "1" && !memo[i][j]) {
                visit1(grid, i, j, memo);
                ret++;
            }
        }
    }

    return ret;
};

var visit1 = function(grid, i, j, memo) {
    if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length) {
        return;
    }
    if (grid[i][j] != "1" || memo[i][j]) {
        return;
    }
    memo[i][j] = true;
    visit1(grid, i - 1, j, memo);
    visit1(grid, i + 1, j, memo);
    visit1(grid, i, j - 1, memo);
    visit1(grid, i, j + 1, memo);
};

console.log(numIslands(
    [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]
));