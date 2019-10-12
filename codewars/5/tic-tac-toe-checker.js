const EMPTY = 0;
const X = 1;
const O = 2;

function isSolved(board) {
    if (isWon(X, board)) return 1;
    if (isWon(O, board)) return 2;

    return emptySpots(board) ? -1 : 0;
}

function isWon(elem, board) {
    return (
        isHorizontalLine(elem, board) ||
        isVerticalLine(elem, board) ||
        isDiagonalLine(elem, board)
    );
}

function isHorizontalLine(player, board) {
    outerLoop: for (let row = 0; row < board.length; ++row) {
        for (let col = 0; col < board[row].length; ++col) {
            if (player !== board[row][col]) continue outerLoop;
        }

        return true;
    }

    return false;
}

function isVerticalLine(player, board) {
    outerLoop: for (let row = 0; row < board.length; ++row) {
        for (let col = 0; col < board[row].length; ++col) {
            if (player !== board[col][row]) continue outerLoop;
        }

        return true;
    }

    return false;
}

function isDiagonalLine(player, board) {
    let left = true;
    let right = true;

    for (let row = 0; row < board.length; ++row) {
        if (player !== board[row][row]) left = false;
        if (player !== board[row][board[row].length - row]) right = false;

        if (!left && !right) return false;
    }

    return left || right;
}

function emptySpots(board) {
    for (const row of board) {
        for (const element of row) {
            if (element === EMPTY) return true;
        }
    }

    return false;
}
