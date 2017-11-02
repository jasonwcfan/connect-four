import React from 'react';
import { SERVER_URL } from '../config';
import GameBoard from './GameBoard/GameBoard';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            playerId: null,
            game: null
        }

        this._handleJoinNewGame = this._handleJoinNewGame.bind(this);
    }

    async _handleJoinNewGame() {
        const response = await fetch(SERVER_URL, {
            method: 'POST'
        });

        const data = await response.json();

        this.setState({
            game: data.game,
            playerId: data.playerId
        });


    }

    render() {
        return (
            <div>{
                this.state.game != null ?
                <GameBoard game={this.state.game} /> :
                <button onClick={this._handleJoinNewGame}>Join New Game</button>
            }</div>
        )
    }
}

export default App;
