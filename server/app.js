/**
 * Imports, environment config
 */
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import { connectMongo } from './lib/mongoTools';

import { rejoinGame, joinNewGame, makeMove } from './routes/game';

/**
 * Express configuration
**/

const start = async () => {
    const mongo = await connectMongo();
    const app = express();

    app.get('/game/:playerId', bodyParser.json(), rejoinGame);
    app.post('/game/', bodyParser.json(), joinNewGame);
    app.post('/game/:playerId', bodyParser.json(), makeMove);


    app.listen(process.env.PORT, function() {
        console.log('Listening on port', process.env.PORT)
    })
}

start();
