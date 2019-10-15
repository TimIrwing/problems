function nextGen(cells) {
    const resultMatrix = [];

    for (let row = 0; row < cells.length; ++row) {
        const newRow = [];

        for (let col = 0; col < cells[row].length; ++col) {
            const cell = cells[row][col];
            const neighbours = getNeighbours([row, col], cells);

            if (cell && (neighbours < 2 || neighbours > 3)) {
                newRow.push(0);
            } else if (!cell && neighbours === 3) {
                newRow.push(1);
            } else {
                newRow.push(cell);
            }
        }

        resultMatrix.push(newRow);
    }

    return resultMatrix;
}

function getNeighbours([x, y], matrix) {
    const directions = [
        [0, 1],
        [0, -1],
        [1, 0],
        [1, 1],
        [1, -1],
        [-1, 0],
        [-1, 1],
        [-1, -1],
    ];

    return directions.reduce((acc, [dirX, dirY]) => {
        const newX = x + dirX;
        const newY = y + dirY;

        if (
            newX < 0 ||
            newY < 0 ||
            newX > matrix.length - 1 ||
            newY > matrix[x].length - 1
        ) {
            return acc;
        }

        return acc + matrix[newX][newY];
    }, 0);
}
