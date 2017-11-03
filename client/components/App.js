import React from 'react';
import { SERVER_URL } from '../config';
import GameBoard from './GameBoard/GameBoard';
import io from 'socket.io-client';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            playerId: null,
            playerColour: null,
            game: null,
            error: null,
            socket: null
        }

        this._handleJoinNewGame = this._handleJoinNewGame.bind(this);
        this._handleClickColumn = this._handleClickColumn.bind(this);
    }

    async _handleJoinNewGame() {
        const socket = io.connect(SERVER_URL);

        // This player has joined the game
        socket.on('joined game', (data) => {
            var nextState = {};

            // Set up game data
            if (data.playerId === data.game.redPlayerId) {
                nextState.playerColour = 'red';
            } else if (data.playerId === data.game.blackPlayerId) {
                nextState.playerColour = 'black';
            } else {
                nextState.error = 'You don\'t belong in this game!';
                throw new Error('Wrong player for this game');
            }

            nextState.game = data.game;
            nextState.playerId = data.playerId;
            nextState.socket = socket;

            this.setState(nextState);
        });

        // The opponent has joined, update the game board
        socket.on('player joined', (data) => {
            console.log('player joined');
            console.log(data);
            if (data.game != null) {
                this.setState({
                    game: data.game
                });
            }
        })

        // A new move has been made, update the game board
        socket.on('new move', (data) => {
            if (data.game != null) {
                this.setState({
                    game: data.game,
                    error: null
                });
            }
        });

        // The move is invalid, update the error message
        socket.on('invalid move', (data) => {
            this.setState({
                error: data
            })
        });
    }

    async _handleClickColumn(column) {
        this.state.socket.emit('make move', column);
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
                    /> :
                <button onClick={this._handleJoinNewGame}>Join New Game</button>
            }</div>
        )
    }
}

export default App;
