/**
 * Imports, environment config
 */
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import { connectMongo } from './lib/mongoTools';

import { joinGame, createGame, makeMove } from './routes/game';

/**
 * Express configuration
**/

const start = async () => {
    const mongo = await connectMongo();
    const app = express();

    app.get('/game/:playerId', bodyParser.json(), joinGame);
    app.post('/game/', bodyParser.json(), createGame);
    app.post('/game/:playerId', bodyParser.json(), makeMove);


    app.listen(process.env.PORT, function() {
        console.log('Listening on port', process.env.PORT)
    })
}

start();
