/**
 * Imports, environment config
 */
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import http from 'http';
import sio from 'socket.io';
import bodyParser from 'body-parser';
import { connectMongo } from './lib/mongoTools';

import { joinRoom, makeMove, leaveRoom } from './routes/game';

/**
 * Express configuration
**/

const start = async () => {
    const mongo = await connectMongo();
    const app = express();
    const server = http.createServer(app);
    const io = new sio(server);

    // On new client connection
    io.on('connection', async function(client) {
        console.log('client connected');

        // Join a lobby or create a new room, notifiying other room occupants
        var {game, playerId} = await joinRoom();
        client.join(game.gameId);
        client.broadcast.to(game.gameId).emit('player joined', {game});
        client.emit('joined game', {game, playerId});

        // On this client attempting to make a new move
        client.on('make move', async (column) => {
            try {
                // If move is valid, emit new game state to room occupants
                let nextGameState = await makeMove(playerId, column);
                io.in(nextGameState.gameId)
                    .emit('new move', {game: nextGameState})
            } catch(err) {
                // If move is invalid, emit error to this client
                client.emit('invalid move', err.message);
            }
        });

        // On disconnect, leave rooms
        client.on('disconnect', async () => {
            console.log('client disconnected');
            client.broadcast.to(game.gameId).emit('player left');
            await leaveRoom(playerId);
        });
    });


    server.listen(process.env.PORT, function() {
        console.log('Listening on port', process.env.PORT)
    })
}

start();
