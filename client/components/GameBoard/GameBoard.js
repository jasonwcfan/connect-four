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

    componentDidMount() {
        this.props.pollForUpdates();
    }

    _renderGameBoard(board) {
        return board.map((column, idx) => {
            return <Column
                key={idx}
                cells={column}
                handleClickColumn={() => this.props.handleClickColumn(idx)} />
        })
    }

    _renderGameMessage(playerId, turnId, winnerId) {
        if (winnerId != null) {
            return winnerId === playerId ?
                'Congratulations, you\'ve won the game!' :
                'Your opponent has won the game!'
        }

        if (turnId != null) {
            return turnId === playerId ? 'It\'s your turn, make a move' :
            'Waiting for opponent to make a move...';
        }
    }

    render() {
        return (
            <div>
                <div>
                    {'You are ' + this.props.playerColour + ' player.'}
                </div>
                <div>
                    {this._renderGameMessage(
                        this.props.playerId,
                        this.props.game.turnId,
                        this.props.game.winnerId
                    )}
                </div>
                <div style={styles.gameBoard}>
                    {this._renderGameBoard(this.props.game.board)}
                </div>
                <div style={styles.errorMessage}>{this.props.error}</div>
            </div>
        )
    }
}

export default GameBoard;
