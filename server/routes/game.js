import { ObjectId } from 'mongodb';
import Game from '../lib/models/Game';
import mongoose from 'mongoose';

/**
 * Get a game from the database based on the given ID, if one exists
 * @param  {Object}     mongo The MongoDB database
 * @return {Function}         A function that handles the requeset
 */
export function joinGame(mongo) {
    const games = mongo.collection('games');

    return async function(req, res) {
        var playerId = null;

        // Try converting the url param into a game ID to test validity
        try {
            playerId = new mongoose.Types.ObjectId(req.params.playerId);
        } catch(err) {
            res.send('invalid game ID');
            return;
        }

        console.log(playerId);

        var game = await games.findOne({$or: [
            {redPlayerId: playerId},
            {blackPlayerId: playerId}
        ]});

        if (game == null) {
            console.log('game not found');
            res.send('game not found');
        } else {
            console.log('found game');
            res.send(game)
        }
    }
}

/**
 * Create a new game
 * @param  {Object}     mongo The MongoDB database
 * @return {Function}         A function that handles the requeset
 */
export function createGame(mongo) {
    const games = mongo.collection('games');

    return async function(req, res) {
        var newGame = new Game({
            redPlayerId: mongoose.Types.ObjectId(),
            blackPlayerId: null,
            board: Array(6).fill(Array(7).fill(0))
        });

        var result = await newGame.save();

        res.send(result);
    }
}

export function makeMove(mongo) {
    return async function(req, res) {
        var gameId = null;

        // Try converting the url param into a game ID to test validity
        try {
            gameId = new ObjectId(req.params.playerId);
        } catch(err) {
            res.send('invalid game ID');
            return;
        }

        var game = await games.findOne({$or: [
            {redPlayerId: gameId},
            {blackPlayerId: gameId}
        ]});
    }
}
