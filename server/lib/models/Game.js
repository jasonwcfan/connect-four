import mongoose from 'mongoose';

const gameSchema = mongoose.Schema({
    redPlayerId: mongoose.Schema.Types.ObjectId,
    blackPlayerId: mongoose.Schema.Types.ObjectId,
    turnId: mongoose.Schema.Types.ObjectId,
    board: [[Number]]
});


gameSchema.methods.reset = () => {
    this.board = Array(6).fill(Array(7).fill(0));
}

gameSchema.methods.setBoard = (board) => {
    if (board.length != 6) {
        throw new Error('Board matrix must have 6 rows');
    };

    board.forEach((row) => {
        if (row.length != 7) {
            throw new Error('Board matrix must have 7 columns');
        }
    });

    this.board = board;
}

const Game = mongoose.model('Game', gameSchema);

export default Game;
