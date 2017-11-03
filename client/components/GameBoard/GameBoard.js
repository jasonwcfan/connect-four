import React from 'react';
import Column from './Column';

const styles = {
    gameBoard: {
        display: 'flex'
    },
    errorMessage: {
        color: '#ff0000'
    }
};

class GameBoard extends React.Component {

    _renderGameBoard(board) {
        return board.map((column, idx) => {
            return <Column
                key={idx}
                cells={column}
                handleClickColumn={() => this.props.handleClickColumn(idx)} />
        })
    }

    render() {
        return (
            <div>
                <div>{
                    this.props.game.turnId === this.props.playerId ?
                        'It\'s your turn, make a move' :
                        'Waiting for opponent to make a move...'
                }</div>
                <div style={styles.gameBoard}>
                    {this._renderGameBoard(this.props.game.board)}
                </div>
                <div style={styles.errorMessage}>{this.props.error}</div>
            </div>
        )
    }
}

export default GameBoard;
