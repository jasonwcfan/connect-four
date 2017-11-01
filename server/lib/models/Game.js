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
        default: Array(ROWS).fill(Array(COLUMNS).fill(EMPTY_CODE))
    }
});

/**
 * Set the board to its default state for a new game
 */
gameSchema.methods.reset = () => {
    this.board = Array(ROWS).fill(Array(COLUMNS).fill(EMPTY_CODE));
}

/**
 * Set the board to the configuration of the given board
 */
gameSchema.methods.setBoard = (board) => {
    if (board.length != ROWS) {
        throw new Error('Board matrix has wrong number of rows');
    };

    board.forEach((row) => {
        if (row.length != COLUMNS) {
            throw new Error('Board matrix has wrong number of columns');
        }
    });

    this.board = board;
}

/**
 * Return how many more pieces can be placed in this column before it is filled
 */
gameSchema.methods.getColumnCapacity = (column) => {
    this.board.forEach((index, row) => {
        if (row[column] != EMPTY_CODE) {
            return index;
        }
    })
    return ROWS;
}

const Game = mongoose.model('Game', gameSchema);

export default Game;
