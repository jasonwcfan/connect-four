import { ObjectId } from 'mongodb';
import Game from '../lib/models/Game';
import mongoose from 'mongoose';

/**
 * Get a game from the database based on the given ID, if one exists
 */
export async function rejoinGame(req, res) {
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
export async function joinNewGame(req, res) {
    const newPlayerId = mongoose.Types.ObjectId();

    // Try to find a game with a player already in it
    var lobby = await Game.findOne({$or: [
        {redPlayerId: null},
        {blackPlayerId: null}
    ]});

    if (lobby != null) {
        lobby.blackPlayerId = newPlayerId;
        lobby = await lobby.save();

        res.send(lobby);
    } else {
        var newGame = new Game({
            redPlayerId: newPlayerId,
            blackPlayerId: null,
            turnId: newPlayerId
        });

        var newGame = await newGame.save();

        res.send(newGame);
    }


}

/**
 * Check the validity of a proposed move and record it
 */
export async function makeMove(req, res) {
    // Try converting the url param into a game ID to test validity
    var playerId = req.params.playerId;
    var column = req.body.column;

    if (playerId.length != 24) {
        res.status(400).send('Invalid player ID');
        return;
    }

    // Convert playerId to a mongoose ObjectId
    playerId = new mongoose.Types.ObjectId(playerId);

    var game = await getGameFromPlayerId(playerId);

    if (game == null) {
        res.status(400).send('No game found for this player');
        return;
    }

    if (!game.turnId.equals(playerId)) {
        res.status(400).send('Invalid move, not this player\'s turn');
        return;
    }

    if (game.blackPlayerId === null || game.redPlayerId === null) {
        res.status(400).send('Invalid move, one player is missing');
        return;
    }

    try {
        game.addPiece(playerId, column);
        game.changePlayer();
        game = await game.save();
        res.send(game);
    } catch(err) {
        console.log('Error in making the next move:', err);
        res.status(500).send(err);
        return;
    }
}

async function getGameFromPlayerId(playerId) {
    var game = await Game.findOne({$or: [
        {redPlayerId: playerId},
        {blackPlayerId: playerId}
    ]});

    return game;
}
