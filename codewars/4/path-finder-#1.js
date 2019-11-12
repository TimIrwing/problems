const WALL = 'W';
const DIRECTIONS = [[1, 0], [-1, 0], [0, 1], [0, -1]];

function pathFinder(maze) {
    const matrix = maze.split(/\s+/).map((row) => row.split(''));

    return !!findPaths(
        matrix,
        [0, 0],
        [matrix.length - 1, matrix[matrix.length - 1].length - 1],
    ).length;
}

function findPaths(matrix, start, end, path = [`${start[0]}.${start[1]}`]) {
    if (start[0] === end[0] && start[1] === end[1]) {
        return [path];
    }
    const paths = [];

    DIRECTIONS.forEach(([dirRow, dirCol]) => {
        const dest = getDest(matrix, start[0] + dirRow, start[1] + dirCol);

        if (dest.length && !path.includes(`${dest[0]}.${dest[1]}`)) {
            path.push(`${dest[0]}.${dest[1]}`);
            paths.push(...findPaths(matrix, dest, end, path));
        }
    });

    return paths;
}

function getDest(matrix, row, col) {
    if (
        matrix[row] === undefined ||
        matrix[row][col] === undefined ||
        matrix[row][col] === WALL
    ) {
        return [];
    }

    return [row, col];
}
