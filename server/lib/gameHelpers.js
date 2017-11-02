import {
    RED_PLAYER_CODE,
    BLACK_PLAYER_CODE,
    EMPTY_CODE,
    ROWS,
    COLUMNS,
} from './gameConfig';

/*
 * These functions check for winners in a game of connect four. To improve
 * performance, they take the coordinates of the last move made and the code
 * of the player who made the move (either 1 or 2). This way, we can look at
 * just the pieces near the last move made instead of the entire board.
 */

/**
 * Checks if the piece at the given row and column cooridinates is part of a
 * winning set. Runs a cursor up and down the column to search for adjacent
 * pieces placed by the given player.
 */
export function checkVerticalWinner(board, playerCode, column, row) {
    var topCursor = row + 1;
    var bottomCursor = row - 1;
    var count = 1;

    while (topCursor <= ROWS - 1 || bottomCursor >= 0) {
        if (topCursor <= ROWS - 1 && board[column][topCursor] === playerCode) {
            count++;
            topCursor++;
            if (count >= 4) {
                return true;
            }
        } else {
            topCursor = ROWS;
        }

        if (bottomCursor >= 0 && board[column][bottomCursor] === playerCode) {
            count++;
            bottomCursor--;
            if (count >= 4) {
                return true;
            }
        } else {
            bottomCursor = -1;
        }
    }

    return false;
}

/**
 * Checks if the piece at the given row and column cooridinates is part of a
 * winning set. Runs a cursor left and right accross the row to search for
 * adjacent pieces placed by the given player.
 */
export function checkHorizontalWinner(board, playerCode, column, row) {
    var leftCursor = column - 1;
    var rightCursor = column + 1;
    var count = 1;

    while (leftCursor >= 0 || rightCursor <= COLUMNS - 1) {
        if (leftCursor >= 0 && board[leftCursor][row] === playerCode) {
            count++;
            leftCursor--;
            if (count >= 4) {
                return true;
            }
        } else {
            leftCursor = -1;
        }

        if (rightCursor <= COLUMNS - 1 && board[rightCursor][row] === playerCode) {
            count++;
            rightCursor++;
            if (count >= 4) {
                return true;
            }
        } else {
            rightCursor = COLUMNS;
        }
    }

    return false;
}

/**
 * Checks if the piece at the given row and column cooridinates is part of a
 * winning set. Runs a cursor right and up as well as left and down to search
 * for adjacent pieces placed by the given player.
 */
export function checkDiagonalIncreasingWinner(board, playerCode, column, row) {
    var leftCursor = column - 1;
    var rightCursor = column + 1;
    var topCursor = row + 1;
    var bottomCursor = row -1;
    var count = 1;

    while ((leftCursor >= 0 && bottomCursor >= 0) || (topCursor <= ROWS - 1 && rightCursor <= COLUMNS -1)) {
        if (leftCursor >= 0 && bottomCursor >=0 && board[leftCursor][bottomCursor] === playerCode) {
            count++;
            bottomCursor--;
            leftCursor--;
            if (count >= 4) {
                return true;
            }
        } else {
            leftCursor = -1;
        }

        if (rightCursor <= COLUMNS - 1 && topCursor <= ROWS -1 && board[rightCursor][bottomCursor] === playerCode) {
            count++;
            topCursor++;
            rightCursor++;
            if (count >= 4) {
                return true;
            }
        } else {
            rightCursor = COLUMNS;
        }
    }

    return false;
}

/**
 * Checks if the piece at the given row and column cooridinates is part of a
 * winning set. Runs a cursor left and up as well as right and down to search
 * for adjacent pieces placed by the given player.
 */
export function checkDiagonalDecreasingWinner(board, playerCode, column, row) {
    var leftCursor = column - 1;
    var rightCursor = column + 1;
    var topCursor = row + 1;
    var bottomCursor = row -1;
    var count = 1;

    while ((leftCursor >= 0 && topCursor <= ROWS - 1) || (rightCursor <= COLUMNS - 1 && bottomCursor >= 0)) {
        if (leftCursor >= 0 && topCursor <= ROWS - 1 && board[leftCursor][topCursor] === playerCode) {
            count++;
            leftCursor--;
            topCursor++;
            if (count >= 4) {
                return true;
            }
        } else {
            leftCursor = -1;
        }

        if (rightCursor <= COLUMNS - 1 && bottomCursor >= 0 && board[rightCursor][bottomCursor] === playerCode) {
            count++;
            rightCursor++;
            bottomCursor--;
            if (count >= 4) {
                return true;
            }
        } else {
            rightCursor = COLUMNS;
        }
    }

    return false;
}

/**
 * Return the correct player code for the game (1 or 2) based on the player's
 * unique ID
 */
export function getPlayerCode(playerId, game) {
    if (game.redPlayerId.equals(playerId)) {
        return RED_PLAYER_CODE;
    } else if (game.blackPlayerId.equals(playerId)) {
        return BLACK_PLAYER_CODE;
    } else {
        throw new Error('Invalid player ID for this game');
    }
}
