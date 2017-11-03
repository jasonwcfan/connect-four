import React from 'react';

const styles = {
    header: {
        display: 'flex',
        justifyContent: 'space-around'
    },
    messagesContainer: {
        width: '50%'
    },
    errorMessage: {
        color: '#ff0000',
        fontSize: '1.25em'
    },
    playerMessage: {
        fontSize: '2em'
    },
    gameMessage: {
        fontSize: '1.25em'
    },
    title: {
        display: 'flex',
        fontSize: '2.5em',
        alignItems: 'center'
    }
};

class Header extends React.Component {

    _renderGameMessage(playerId, turnId, winnerId, opponentLeft) {
        if (winnerId != null) {
            return winnerId === playerId ?
                'Congratulations, you\'ve won the game!' :
                'Your opponent has won the game!';
        }

        console.log(opponentLeft);

        if (opponentLeft) {
            return 'Opponent has left the game';
        }

        if (turnId != null) {
            return turnId === playerId ? 'It\'s your turn, make a move' :
            'Waiting for opponent to make a move...';
        }
    }

    render() {
        return (
            <div style={styles.header}>
                <div style={styles.messagesContainer}>
                    <div style={styles.playerMessage}>
                        {'You are ' + this.props.playerColour + ' player.'}
                    </div>
                    <div style={styles.gameMessage}>
                        {this._renderGameMessage(
                            this.props.playerId,
                            this.props.game.turnId,
                            this.props.game.winnerId,
                            this.props.opponentLeft
                        )}
                    </div>
                    <div style={styles.errorMessage}>{this.props.error}</div>
                </div>
                <div style={styles.title}>
                    CONNECT FOUR
                </div>
            </div>
        )
    }
}

export default Header;
