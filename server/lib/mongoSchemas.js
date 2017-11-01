import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import { Board } from './Board.js';

const gameSchema = mongoose.Schema({
    redPlayerId: String,
    blackPlayerId: String,
    board: [[Number]]
});
