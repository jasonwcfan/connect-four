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
            opponentLeft: false,
            socket: null
        }

        this._handleJoinNewGame = this._handleJoinNewGame.bind(this);
        this._handleClickColumn = this._handleClickColumn.bind(this);
    }

    componentWillUnmount() {
        // Disconnect this player if the page is reloaded or navigated away from
        this.state.socket.emit('disconnect');
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
            if (data.game != null) {
                this.setState({
                    game: data.game
                });
            }
        });

        // The opponent has left, game is over
        socket.on('player left', () => {
            console.log('player left');
            this.setState({
                opponentLeft: true,
                error: 'Game is over'
            });
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
        if (!this.state.opponentLeft) {
            this.state.socket.emit('make move', column);
        }
    }

    render() {
        return (
            <div>{
                this.state.game != null ?
                <GameBoard
                    game={this.state.game}
                    error={this.state.error}
                    opponentLeft={this.state.opponentLeft}
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
