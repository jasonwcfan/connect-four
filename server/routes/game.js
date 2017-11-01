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
    var game = await getGameFromPlayerId(req.params.playerId);

    var nextMove = req.body.nextMove;

    if (!game.turnId.equals(nextMove.playerId)) {
        res.status(400).send('Not your turn');
        return;
    }

    if (nextMove.column < 0 || nextMove.column > 6) {
        res.status(400).send(
            'Invalid move, column must be between 0 and 6 inclusive'
        );
        return;
    }

    if (game.getColumnCapacity(nextMove.column) < 1) {
        res.status(400).send('Invalid move, column must not be full')
    }

    game.addPiece(nextMove.playerId, nextMove.column);

    game = await game.save();
    
    res.send(game);
}

async function getGameFromPlayerId(playerId) {
    // Try converting the url param into a game ID to test validity
    try {
        playerId = new mongoose.Types.ObjectId(playerId);
    } catch(err) {
        res.status(400).send('invalid player ID');
        return;
    }
    console.log(playerId);
    var game = await Game.findOne({$or: [
        {redPlayerId: playerId},
        {blackPlayerId: playerId}
    ]});

    return game;
}
