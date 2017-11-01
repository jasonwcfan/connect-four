/**
 * Resolvers used by GraphQL to handle queries, mutations, etc
 */
const resolvers = {
  Query: {
      fetchTrades: async (root, data, {mongo: db}) => {
          const trades = db.collection('trades');
          const query = {
              importerCode: data.importerCode,
              exporterCode: data.exporterCode,
          }

          // Handle optional arguments
          if (data.period != null && !isNaN(parseInt(data.period))) {
              query.period = parseInt(data.period);
          }

          if (data.hsCode != null && !isNaN(parseInt(data.hsCode))) {
              query.hsCode = data.hsCode;
          }

          const result = await trades.find(query).toArray();

          return result;
      },
  },
  TradeRecord: {
      id: (root) => {
          return root._id || root.id
      }
  },
};

export default resolvers;
