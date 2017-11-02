import mongoose from 'mongoose';
import {
    checkVerticalWinner,
    checkHorizontalWinner,
    checkDiagonalIncreasingWinner,
    checkDiagonalDecreasingWinner,
    getPlayerCode
} from '../gameHelpers';
import {
    RED_PLAYER_CODE,
    BLACK_PLAYER_CODE,
    EMPTY_CODE,
    ROWS,
    COLUMNS,
} from '../gameConfig';

/**
 * The Mongoose schema defining a Game object
 */
const gameSchema = mongoose.Schema({
    redPlayerId: mongoose.Schema.Types.ObjectId,
    blackPlayerId: mongoose.Schema.Types.ObjectId,
    turnId: mongoose.Schema.Types.ObjectId,
    winnerId: mongoose.Schema.Types.ObjectId,
    board: {
        type: [[Number]],
        default: Array(COLUMNS).fill(Array(ROWS).fill(EMPTY_CODE))
    }
});

/**
 * Set the board to its default state for a new game
 */
gameSchema.methods.reset = function() {
    this.board = Array(COLUMNS).fill(Array(ROWS).fill(EMPTY_CODE));
}

/**
 * Set the board to the configuration of the given board
 */
gameSchema.methods.setBoard = function() {
    if (board.length != COLUMNS) {
        throw new Error('Board matrix has wrong number of columns');
    };

    board.forEach((column) => {
        if (column.length != ROWS) {
            throw new Error('Board matrix has wrong number of rows');
        }
    });

    this.board = board;
}

/**
 * Return how many more pieces can be placed in this column before it is filled
 */
gameSchema.methods.getColumnCapacity = function(column) {
    if (column > COLUMNS - 1 || column < 0 || column === null) {
        throw new Error('Invalid column');
    }

    for (let i = ROWS - 1; i >= 0; i--) {
        if (this.board[column][i] != EMPTY_CODE) {
            console.log('capacity', ROWS - 1 - i);
            return ROWS - 1 - i;
        }
    }

    return ROWS;
}

/**
 * Add a piece for the given player in the given column, if valid
 */
gameSchema.methods.addPiece = function(playerId, column) {
    if (column > COLUMNS - 1 || column < 0 || column === null) {
        throw new Error('Invalid move, column is not valid');
    }

    if (this.getColumnCapacity(column) < 1) {
        throw new Error('Invalid move, column is full');
    }

    const playerCode = getPlayerCode(playerId, this);

    // Find the right cell to insert the new piece into
    for (let i = 0; i < ROWS; i++) {
        if (this.board[column][i] == EMPTY_CODE) {
            this.board[column][i] = playerCode;
            if (this.checkForWinner(playerId, column, i)) {
                this.winnerId = playerId;
            };
            this.markModified('board');
            return;
        }
    }
}

/**
 * Change the turnId to allow the next player to play.
 */
gameSchema.methods.changePlayer = function() {
    if (this.turnId.equals(this.redPlayerId)) {
        this.turnId = this.blackPlayerId;
    } else if (this.turnId.equals(this.blackPlayerId)) {
        this.turnId = this.redPlayerId;
    } else {
        throw new Error('Invalid player ID on turnId field')
    }
}

/**
 * Determine if this game has a winner based on the last move made at
 * [column, row]
 */
gameSchema.methods.checkForWinner = function(playerId, column, row) {
    const playerCode = getPlayerCode(playerId, this);
    var verticalCount = 1;

    // Check to see if this move is a winning move by examining tiles in all
    // directions from the last move made
    const vertical = checkVerticalWinner(this.board, playerCode, column, row);
    const horizontal = checkHorizontalWinner(this.board, playerCode, column, row);
    const diagIncr = checkDiagonalIncreasingWinner(this.board, playerCode, column, row);
    const diagDecr = checkDiagonalDecreasingWinner(this.board, playerCode, column, row)

    console.log('vertical:', vertical);
    console.log('horizontal:', horizontal);
    console.log('diagonal increasing:', diagIncr);
    console.log('diagonal decreasing:', diagDecr);

    return (vertical || horizontal || diagIncr || diagDecr);
}

const Game = mongoose.model('Game', gameSchema);

export default Game;
