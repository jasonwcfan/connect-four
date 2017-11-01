/**
 * Imports, environment config
 */
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import { ObjectId } from 'mongodb';
import { connectMongo } from './lib/mongoTools';

/**
 * Express configuration
**/

const start = async () => {
    const mongo = await connectMongo();
    const app = express();

    var games = mongo.collection('games');

    app.get('/game/*', bodyParser.json(), async function(req, res) {
        const gameId = new ObjectId(req.params[0]);
        var game = await games.findOne({$or: [
            {redPlayerId: gameId},
            {blackPlayerId: gameId}
        ]});

        if (game == null) {
            console.log('no games');

            res.send('no game found');
        } else {
            console.log(game);
        }

    })

    app.listen(process.env.PORT, function() {
        console.log('Listening on port', process.env.PORT)
    })
}

start();
