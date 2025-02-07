/**
 Do not return anything, modify board in-place instead.
 */
 function gameOfLife(board: number[][]): void {
    let currentRow = new Array(board[0].length).fill(0);
    let lastRow = new Array(board[0].length).fill(0);
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            currentRow[j] = board[i][j];
            board[i][j] = getLife(board, i, j, currentRow, lastRow);
        }
        lastRow = currentRow.slice();
    }
 };

 function getLife(board: number[][], i: number, j: number, currentRow: number[], lastRow: number[]): number {
    let count = 0;
    for (let x = i - 1; x <= i + 1; x++) {
        for (let y = j - 1; y <= j + 1; y++) {
            if (x < 0 || y < 0 || x >= board.length || y >= board[0].length || (x === i && y === j)) {
                continue;
            }

            if (x > i || (x == i && y > j)) {
                count += board[x][y];
            } else {
                if (x === i) {
                    count += currentRow[y];
                } else {
                    count += lastRow[y];
                }
            }
        }
    }

    const currentLife = board[i][j];
    if (currentLife == 1) {
        if (count < 2 || count > 3) {
            return 0;
        } else {
            return 1;
        }
    }

    if (count === 3) {
        return 1;
    }
    return 0;
 }

 let board = [[0,1,0],[0,0,1],[1,1,1],[0,0,0]];
gameOfLife(board);