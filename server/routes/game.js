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
    const newPlayerId = mongoose.Types.ObjectId();
    var newGame = new Game({
        redPlayerId: newPlayerId,
        blackPlayerId: null,
        turnId: newPlayerId
    });

    var result = await newGame.save();

    res.send(result);
}

/**
 * Check the validity of a proposed move and record it
 */
export async function makeMove(req, res) {
    // Try converting the url param into a game ID to test validity
    var playerId = null;
    try {
        playerId = new mongoose.Types.ObjectId(req.params.playerId);
    } catch(err) {
        res.status(400).send('Invalid player ID');
        return;
    }

    var column = req.body.column;
    var game = await getGameFromPlayerId(playerId);

    if (game == null) {
        res.status(400).send('No game found for this player');
        return;
    }

    try {
        game.addPiece(playerId, column);
    } catch(err) {
        console.log('Error in making the next move:', err);
        res.status(400).send(err);
        return;
    }

    game = await game.save();
    console.log(game);

    res.send(game);
}

async function getGameFromPlayerId(playerId) {
    var game = await Game.findOne({$or: [
        {redPlayerId: playerId},
        {blackPlayerId: playerId}
    ]});

    return game;
}
