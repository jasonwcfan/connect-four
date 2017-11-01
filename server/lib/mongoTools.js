import { MongoClient, ObjectId } from 'mongodb';

/**
 * Connect to MongoDB
 */

var db = null;

export const connectMongo = async () => {
    var mongoUrl = process.env.MONGO_URL;

    db = await MongoClient.connect(mongoUrl);

    return db;
};

export const executeQuery = async () => {

}
