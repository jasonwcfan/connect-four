import React from 'react';
import { SERVER_URL } from '../config';
import GameBoard from './GameBoard/GameBoard';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            playerId: null,
            playerColour: null,
            game: null,
            error: null
        }

        this._handleJoinNewGame = this._handleJoinNewGame.bind(this);
        this._handleClickColumn = this._handleClickColumn.bind(this);
        this._pollForUpdates = this._pollForUpdates.bind(this);
    }

    async _handleJoinNewGame() {
        const response = await fetch(SERVER_URL + '/game', {
            method: 'POST'
        });

        const data = await response.json();

        var newState = {};

        if (data.playerId === data.game.redPlayerId) {
            newState.playerColour = 'red';
        } else if (data.playerId === data.game.blackPlayerId) {
            newState.playerColour = 'black';
        } else {
            newState.error = 'You don\'t belong in this game!';
            throw new Error('Wrong player for this game');
        }

        newState.game = data.game;
        newState.playerId = data.playerId;

        this.setState(newState);
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

    async _pollForUpdates() {
        console.log('polling');

        const response = await fetch(SERVER_URL + '/game/' + this.state.playerId, {
            method: 'GET'
        });

        if (response.status === 200) {
            const data = await response.json();

            this.setState({
                game: data.game
            })
        }

        setTimeout(this._pollForUpdates, 1000);
    }

    render() {
        return (
            <div>{
                this.state.game != null ?
                <GameBoard
                    game={this.state.game}
                    error={this.state.error}
                    playerId={this.state.playerId}
                    playerColour={this.state.playerColour}
                    handleClickColumn={this._handleClickColumn}
                    pollForUpdates={this._pollForUpdates}
                    /> :
                <button onClick={this._handleJoinNewGame}>Join New Game</button>
            }</div>
        )
    }
}

export default App;
