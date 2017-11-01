/**
 * Imports, environment config
 */
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import { connectMongo } from './lib/mongoTools';

import { getGame, createGame } from './routes/game';

/**
 * Express configuration
**/

const start = async () => {
    const mongo = await connectMongo();
    const app = express();

    app.get('/game/*', bodyParser.json(), getGame(mongo));
    app.post('/game/', bodyParser.json(), createGame(mongo));



    app.listen(process.env.PORT, function() {
        console.log('Listening on port', process.env.PORT)
    })
}

start();
