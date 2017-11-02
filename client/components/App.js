import React from 'react';
import { SERVER_URL } from '../config';
import GameBoard from './GameBoard/GameBoard';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            playerId: null,
            game: null,
            error: null
        }

        this._handleJoinNewGame = this._handleJoinNewGame.bind(this);
        this._handleClickColumn = this._handleClickColumn.bind(this);
    }

    async _handleJoinNewGame() {
        const response = await fetch(SERVER_URL + '/game', {
            method: 'POST'
        });

        const data = await response.json();

        this.setState({
            game: data.game,
            playerId: data.playerId
        });


    }

    async _handleClickColumn(idx) {
        const response = await fetch(SERVER_URL + '/game/' + this.state.playerId, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                column: idx
            })
        });

        var nextState = {};

        if (response.status != 200) {
            nextState.error = await response.text();
        } else {
            const data = await response.json();
            nextState.game = data.game;
            nextState.error = null;
        }

        this.setState(nextState);
    }

    render() {
        return (
            <div>{
                this.state.game != null ?
                <GameBoard
                    game={this.state.game}
                    error={this.state.error}
                    playerId={this.state.playerId}
                    handleClickColumn={this._handleClickColumn}
                    /> :
                <button onClick={this._handleJoinNewGame}>Join New Game</button>
            }</div>
        )
    }
}

export default App;
