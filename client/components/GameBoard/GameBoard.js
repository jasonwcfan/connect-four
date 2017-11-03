import React from 'react';
import Column from './Column';
import Header from './Header';

const styles = {
    gameBoard: {
        display: 'flex',
        justifyContent: 'space-around'
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
                <Header {...this.props} />
                <div style={styles.gameBoard}>
                    {this._renderGameBoard(this.props.game.board)}
                </div>
            </div>
        )
    }
}

export default GameBoard;
