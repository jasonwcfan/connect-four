
export class Board {
    constructor() {
        // Initialize as empty board
        this.board = Array(6).fill(Array(7).fill(0));
    }

    setTiles(board) {
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
}
