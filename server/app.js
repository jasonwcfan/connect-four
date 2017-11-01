/**
 * Imports, environment config
 */
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import { connectMongo } from './lib/mongoTools';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import schema from './graphql/schema';

/**
 * Express configuration
**/

const start = async () => {
    const mongo = await connectMongo();
    const app = express();

    var trades = mongo.collection('trades');

    app.use('/graphql', bodyParser.json(), graphqlExpress({
        context: {mongo},
        schema
    }));
    app.use('/graphiql', graphiqlExpress({
        endpointURL: '/graphql'
    }));

    app.get('/test', async function(req, res) {
        var doc = await trades.findOne({});
        console.log(doc);
        res.send(doc);
    })

    app.listen(process.env.PORT, function() {
        console.log('Listening on port 3000...')
    })
}

start();
