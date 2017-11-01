import mongoose from 'mongoose';

const RED_PLAYER_CODE = 1;
const BLACK_PLAYER_CODE = 2;
const EMPTY_CODE = 0;
const ROWS = 6;
const COLUMNS = 7;

const gameSchema = mongoose.Schema({
    redPlayerId: mongoose.Schema.Types.ObjectId,
    blackPlayerId: mongoose.Schema.Types.ObjectId,
    turnId: mongoose.Schema.Types.ObjectId,
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
    if (board.length != COLUMS) {
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

    this.board[column].forEach((index, cell) => {
        if (cell != EMPTY_CODE) {
            return index;
        }
    })
    return ROWS;
}

/**
 * Add a piece for the given player in the given column, if valid
 */
gameSchema.methods.addPiece = function(playerId, column) {
    if (column > COLUMNS - 1 || column < 0 || column === null) {
        throw new Error('Invalid move, column is not valid');
    }

    var playerCode = null;

    if (this.redPlayerId.equals(playerId)) {
        playerCode = RED_PLAYER_CODE;
    } else if (this.blackPlayerId.equals(playerId)) {
        playerCode = BLACK_PLAYER_CODE;
    } else {
        throw new Error('Invalid player ID for this game');
    }

    if (this.getColumnCapacity(column) < 1) {
        throw new Error('Invalid move, column must not be full');
    }

    if (!this.turnId.equals(playerId)) {
        throw new Error('Invalid move, not this player\'s turn');
    }

    // Find the right cell to insert the new piece into
    for (let i = 0; i < ROWS; i++) {
        if (this.board[column][i] == EMPTY_CODE) {
            this.board[column][i] = playerCode;
            this.markModified('board');
            return;
        }
    }
}

gameSchema.methods.changePlayer = function() {
    // TODO
}

const Game = mongoose.model('Game', gameSchema);

export default Game;
