import React from 'react';

class Column extends React.Component {

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

export default Column;
