/**
 * @param {Array<Array<number>>} grid
 * @return {number}
 */
function maxIncreaseKeepingSkyline(grid) {
    const topSkyline = [];
    const leftSkyline = [];
    let difference = 0;

    mapMatrix(grid, (row, col) => {
        adjustSkyline(topSkyline, col, grid[row][col]);
        adjustSkyline(leftSkyline, row, grid[row][col]);
    });

    mapMatrix(grid, (row, col) => {
        while (
            grid[row][col] < topSkyline[col] &&
            grid[row][col] < leftSkyline[row]
        ) {
            ++grid[row][col];
            ++difference;
        }
    });

    return difference;
}

function adjustSkyline(arr, i, val) {
    if (arr[i] === undefined || arr[i] < val) {
        arr[i] = val;
    }
}

function mapMatrix(matrix, func) {
    for (let row = 0; row < matrix.length; ++row) {
        for (let col = 0; col < matrix[row].length; ++col) {
            func(row, col);
        }
    }
}
