import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

/**
 * Connect to MongoDB using Mongoose
 */

var db = null;

export const connectMongo = async () => {
    var mongoUrl = process.env.MONGO_URL;

    db = await mongoose.connect(mongoUrl, {
        useMongoClient: true
    });

    return db;
};

export const executeQuery = async () => {

}
