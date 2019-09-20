/**
 * @param {character[][]} grid
 * @return {number}
 */
Array.prototype.includes = function(arr) {
  let bool = false;

  for (const entry of this) {
    if (entry[0] === arr[0] && entry[1] === arr[1]) {
      bool = true;
      break;
    }
  }

  return bool;
};

const numIslands = function(grid) {
  if (grid.length === 0) return 0;

  const colMax = grid.length - 1;
  const rowMax = grid[0].length - 1;

  let count = 0;

  const visited = [];

  for (let i = 0; i < grid.length; ++i) {
    visited.push(new Array(grid[0].length).fill(false));
  }

  for (let i = 0; i <= colMax; ++i) {
    // rowMax = grid[i].length - 1;

    for (let j = 0; j <= rowMax; ++j) {
      if (grid[i][j] === '1' && !visited[i][j]) {
        visitLand(i, j);
        ++count;
      }
    }
  }

  return count;

  function visitLand(i, j) {
    const directions = [[1, 0], [-1, 0], [0, -1], [0, 1]];

    visited[i][j] = true;

    for (const dir of directions) {
      const iLocal = i + dir[0];
      const jLocal = j + dir[1];

      // console.log(iLocal, jLocal);
      if (borderCheck(iLocal, jLocal)) {
        visitLand(iLocal, jLocal);
      }
    }
  }

  function borderCheck(i, j) {
    return (
      i >= 0 &&
      i <= colMax &&
      j >= 0 &&
      j <= rowMax &&
      (!visited[i][j] && grid[i][j] !== '0')
    );
  }
};
