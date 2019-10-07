/**
 * @param {character[][]} board
 * @return {number}
 */
const numRookCaptures = function(board) {
  const start = [0, 0];

  for (; start[0] < board.length; ++start[0]) {
    const idx = board[start[0]].indexOf(`R`);

    if (~idx) {
      start[1] = idx;
      break;
    }
  }

  return (
    Number(isCapturing(board, start, `l`)) +
    Number(isCapturing(board, start, `r`)) +
    Number(isCapturing(board, start, `t`)) +
    Number(isCapturing(board, start, `b`))
  );
};

function isCapturing(board, start, dir) {
  let xDir = 0;
  let yDir = 0;
  switch (dir[0].toLowerCase()) {
    case `l`:
      --xDir;
      break;

    case `r`:
      ++xDir;
      break;

    case `t`:
      --yDir;
      break;

    case `b`:
      ++yDir;
      break;
  }

  if (xDir) {
    for (let i = start[0] + xDir; i < board.length && i >= 0; i += xDir) {
      const cur = board[i][start[1]];
      if (cur !== `.`) {
        return cur === `p`;
      }
    }

    return false;
  }

  for (
    let i = start[1] + yDir;
    i < board[start[0]].length && i >= 0;
    i += yDir
  ) {
    const cur = board[start[0]][i];
    if (cur !== `.`) {
      return cur === `p`;
    }
  }

  return false;
}
