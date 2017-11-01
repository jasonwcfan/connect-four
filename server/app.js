/**
 * Imports, environment config
 */
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import { connectMongo } from './lib/mongoTools';

/**
 * Express configuration
**/

const start = async () => {
    const mongo = await connectMongo();
    const app = express();

    var games = mongo.collection('games');

    app.get('/game/*', bodyParser.json(), async function(req, res) {
        console.log(req.params[0]);
        var game = await games.findOne({});
        console.log(doc);
        res.send(200);
    })

    app.listen(process.env.PORT, function() {
        console.log('Listening on port', process.env.PORT)
    })
}

start();
