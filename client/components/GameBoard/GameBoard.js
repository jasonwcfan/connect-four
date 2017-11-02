import React from 'react';
import { Link } from 'react-router-dom';
import Column from './Column';

const styles = {
    gameBoard: {
        display: 'flex'
    }
};

class GameBoard extends React.Component {

    _renderGameBoard(board) {
        return board.map((column, idx) => {
            return <Column key={idx} cells={column} />
        })
    }

    render() {
        return (
            <div>
                <div>{this.props.game.turnId === this.props.playerId ? 'It\'s your turn, make a move' : 'Waiting for opponent to make a move...'}</div>
                <div style={styles.gameBoard}>
                    {this._renderGameBoard(this.props.game.board)}
                </div>
            </div>
        )
    }
}

export default GameBoard;
