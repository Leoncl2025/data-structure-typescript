/**
 * @param {number[][]} grid
 * @return {number}
 */
var findMaxFish = function(grid) {
    const gridWaterCell = grid.map((row, rowIndex) => row.map((fish, colIndex) => new WaterCell(rowIndex, colIndex, fish)));
    return connectWaterCell(gridWaterCell);
};

var connectWaterCell = function(gridWaterCell) {
    const waterCells = gridWaterCell
        .reduce((acc, row) => acc.concat(row), [])
        .filter(waterCell => waterCell.isWaterCell);
    const groupCountMap = {};
    let groupIndex = 0;
    waterCells.forEach(waterCell => {
        if (waterCell.visited) {
            return;
        }

        groupIndex++;
        const neighbours = findAllNeighbourWaterCell(gridWaterCell, waterCell);
        neighbours.forEach(neighbour => {
            neighbour.visited = true;
            neighbour.group = groupIndex;
        });
    });

    waterCells.forEach(waterCell => {
        increaseCount(groupCountMap, waterCell.group, waterCell.fish);
    });

    const ret = Object.values(groupCountMap).reduce((acc, count) => Math.max(acc, count), 0);
    return ret;
};

var increaseCount = function(groupCountMap, groupIndex, fish) {
    if (groupCountMap[groupIndex] === undefined) {
        groupCountMap[groupIndex] = 0;
    }
    groupCountMap[groupIndex] += fish;
};

var findAllNeighbourWaterCell = function(gridWaterCell, waterCell) {
    if (waterCell.visited || !waterCell.isWaterCell) {
        return [];
    }

    let neighbours = findValidNotVisitedNeighbour(gridWaterCell, waterCell);
    neighbours.push(waterCell);
    neighbours.forEach(n => n.visited = true);
    const result = neighbours.slice();
    while (neighbours.length > 0) {
        const neighbour = neighbours.pop();
        const neighboursNext = findValidNotVisitedNeighbour(gridWaterCell, neighbour);
        neighboursNext.forEach(n => n.visited = true);
        result.push(...neighboursNext);
        neighbours.push(...neighboursNext);
    }

    return result;
};

var findValidNotVisitedNeighbour = function(gridWaterCell, waterCell) {
    const neighbours = [];
    const row = waterCell.row;
    const col = waterCell.col;
    if (row - 1 >= 0) {
        neighbours.push(gridWaterCell[row - 1][col]);
    }
    if (row + 1 < gridWaterCell.length) {
        neighbours.push(gridWaterCell[row + 1][col]);
    }
    if (col - 1 >= 0) {
        neighbours.push(gridWaterCell[row][col - 1]);
    }
    if (col + 1 < gridWaterCell[0].length) {
        neighbours.push(gridWaterCell[row][col + 1]);
    }

    return neighbours
        .filter(neighbour => neighbour.isWaterCell && !neighbour.visited);
};

class WaterCell {
    constructor(row, col, fish) {
        this.row = row;
        this.col = col;
        this.fish = fish;
        this.visited = false;
        this.group = undefined;
    }

    get isWaterCell() {
        return this.fish > 0;
    }
}

console.log(findMaxFish([[0,2,1,0],[4,0,0,3],[1,0,0,4],[0,3,2,0]]));