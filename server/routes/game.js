import { ObjectId } from 'mongodb';
import Game from '../lib/models/Game';
import mongoose from 'mongoose';

/**
 * Create a new player ID and attempt to join a lobby with one player,
 * or create a new game if no lobbies exist.
 */
export async function joinRoom() {
    const newPlayerId = mongoose.Types.ObjectId();

    // Try to find a game with a player already in it
    var lobby = await Game.findOne({$or: [
        {redPlayerId: null},
        {blackPlayerId: null}
    ]});

    if (lobby != null) {
        lobby.blackPlayerId = newPlayerId;
        lobby = await lobby.save();
        return {
            game: lobby,
            playerId: newPlayerId
        };
    } else {
        var newGame = new Game({
            redPlayerId: newPlayerId,
            blackPlayerId: null,
            gameId: mongoose.Types.ObjectId(),
            turnId: newPlayerId
        });

        var newGame = await newGame.save();
        return {
            game: newGame,
            playerId: newPlayerId
        };
    }
}

/**
 * Remove the player from any rooms they are in. If this is the last player to
 * leave, destroy the room.
 */
export async function leaveRoom(playerId) {
    const games = await Game.find({$or: [
        {redPlayerId: playerId},
        {blackPlayerId: playerId}
    ]})

    games.forEach(async (game) => {
        if (playerId.equals(game.redPlayerId)) {
            game.redPlayerId = null;
        }

        if (playerId.equals(game.blackPlayerId)) {
            game.blackPlayerId = null;
        }

        if (game.redPlayerId == null && game.blackPlayerId == null) {
            await game.remove();
        }

        game.save();
    })
}

/**
 * Check the validity of a proposed move and attempt to make it, sending the
 * result back to the client
 */
export async function makeMove(playerId, game, column) {
    if (! playerId instanceof mongoose.Schema.Types.ObjectId) {
        throw new Error('Invalid player ID');
    }

    if (!(playerId.equals(game.redPlayerId) ||
            playerId.equals(game.blackPlayerId))) {
        throw new Error('The given player doesn\'t belong in this game');
    }

    if (!game.turnId.equals(playerId)) {
        throw new Error('Invalid move, not this player\'s turn');
    }

    if (game.blackPlayerId === null || game.redPlayerId === null) {
        throw new Error('Invalid move, one player is missing');
    }

    if (game.winnerId != null) {
        throw new Error('Invalid move, this game is over');
    }

    game.addPiece(playerId, column);
    game.changePlayer();
    game = await game.save();
    return game;
}

/**
 * Look up a game that has the given player in it.
 */
async function getGameFromPlayerId(playerId) {
    var game = await Game.findOne({$or: [
        {redPlayerId: playerId},
        {blackPlayerId: playerId}
    ]});

    return game;
}
