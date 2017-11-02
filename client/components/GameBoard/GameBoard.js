import React from 'react';
import { Link } from 'react-router-dom';
import Column from './Column';

class GameBoard extends React.Component {

    _renderGameBoard(board) {
        var columns = [];
        board.forEach((column) => {
            console.log(column);
        })
    }

    render() {
        return (
            <div>
                {this._renderGameBoard(this.props.game.board)}
            </div>
        )
    }
}

export default GameBoard;
