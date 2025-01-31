function largestIsland(grid: number[][]): number {
    if (grid.length === 1 && grid[0].length === 1) return 1;
    const cells: Cell[][] = grid.map((row, x) => row.map((type, y) => {
        const cell = new Cell(x, y);
        cell.type = type === 0 ? CellType.Water : CellType.Land;
        return cell;
    }));

    const groupCount = new Map<number, number>();
    cells.forEach((row, x) => row.forEach((cell, y) => {
        if (cell.type !== CellType.Land) return;
        connectCells(cells, x, y, groupCount, groupCount.size);
    }));

    const shoalCells = cells.flatMap(c => c).filter(cell => cell.type === CellType.Shoal);
    console.log(shoalCells);
    let max = 1;
    max = Math.max(max, Math.max(...Array.from(groupCount.values())));
    shoalCells.forEach(cell => {
        const groupIds = Array.from(cell.shoalGroup);
        const count = groupIds.reduce((acc, id) => acc + groupCount.get(id), 1);
        max = Math.max(max, count);
    });
    return max;
};

function connectCells(cells: Cell[][], x: number, y: number, groupCount: Map<number, number>, groupId: number) {
    if (!isInBound(cells, x, y) || cells[x][y].visited) return;
    const cell = cells[x][y];
    if (cell.type === CellType.Water || cell.type === CellType.Shoal) {
        cell.type = CellType.Shoal;
        cell.shoalGroup.add(groupId);
        return;
    } else if (cell.type === CellType.Land) {
        cell.visited = true;
        cell.groupId = groupId;
        addGroup(groupCount, groupId);
        // connect to 4 directions
        connectCells(cells, x - 1, y, groupCount, groupId);
        connectCells(cells, x + 1, y, groupCount, groupId);
        connectCells(cells, x, y - 1, groupCount, groupId);
        connectCells(cells, x, y + 1, groupCount, groupId);
    }
}

function addGroup(groupCount: Map<number, number>, groupId: number) {
    if (!groupCount.has(groupId)) {
        groupCount.set(groupId, 0);
    }
    groupCount.set(groupId, groupCount.get(groupId) + 1);
}

function isInBound(cells: Cell[][], x: number, y: number) {
    return x >= 0 && x < cells.length && y >= 0 && y < cells[0].length;
}

class Cell {
    public visited: boolean = false;
    public groupId: number = -1;
    public type: CellType = CellType.Water;
    public shoalGroup: Set<number> = new Set();
    constructor(public x: number, public y: number) {}
}

enum CellType {
    Water,
    Land,
    Shoal
}

let grid = [[1,0],[0,1]];
console.log(largestIsland(grid));