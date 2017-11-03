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

import { fetchGame, joinRoom, makeMove, leaveRoom } from './routes/game';

/**
 * Express configuration
**/

const start = async () => {
    const mongo = await connectMongo();
    const app = express();
    const server = http.createServer(app);
    const io = new sio(server);

    io.on('connection', async function(client) {
        console.log('client connected');

        const {game, playerId} = await joinRoom();

        console.log(game, playerId);

        client.join(game.gameId);
        io.to(game.gameId).emit('player joined');
        client.on('disconnect', () => {
            console.log('client disconnected');
            leaveRoom(playerId);
        })
    });


    server.listen(process.env.PORT, function() {
        console.log('Listening on port', process.env.PORT)
    })
}

start();
