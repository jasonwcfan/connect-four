import { ObjectId } from 'mongodb';
import Game from '../lib/models/Game';
import mongoose from 'mongoose';

/**
 * Get a game from the database based on the given ID, if one exists
 */
export async function joinGame(req, res) {
    var game = await getGameFromPlayerId(req.params.playerId);

    if (game == null) {
        console.log('game not found');
        res.send('game not found');
    } else {
        console.log('found game');
        res.send(game)
    }
}

/**
 * Create a new game
 */
export async function createGame(req, res) {
    var newGame = new Game({
        redPlayerId: mongoose.Types.ObjectId(),
        blackPlayerId: null,
        board: Array(6).fill(Array(7).fill(0))
    });

    var result = await newGame.save();

    res.send(result);
}

/**
 * Check the validity of a proposed move and record it
 */
export async function makeMove(req, res) {
    var game = await getGameFromPlayerId(req.params.playerId);

    var nextMove = req.body.nextMove;
}

async function getGameFromPlayerId(playerId) {
    // Try converting the url param into a game ID to test validity
    try {
        playerId = new mongoose.Types.ObjectId(playerId);
    } catch(err) {
        res.send('invalid player ID');
        return;
    }
    console.log(playerId);
    var game = await Game.findOne({$or: [
        {redPlayerId: playerId},
        {blackPlayerId: playerId}
    ]});

    return game;
}
