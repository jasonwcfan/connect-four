import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

/**
 * GraphQL type definitions
 */
const typeDefs = `
    type TradeRecord {
        id: ID!,
        exporterCode: Int!,
        exporterName: String!,
        importerCode: Int!,
        importerName: String!,
        hsCode: String!
        hsDescription: String,
        period: String!,
        tradeValue: Int,
        quantity: Int,
        altQuantity: Int,
        netWeight: Int,
        grossWeight: Int

    }

    type Query {
        fetchTrades(importerCode: Int!, exporterCode: Int!, period: String, hsCode: String): [TradeRecord!]!
    }
`;

export default makeExecutableSchema({typeDefs, resolvers});
