const graphql = require("graphql");
const { GraphQLSchema } = graphql;
const mutation = require("./mutation");

const RootQueryType = require("./types/root-query");

module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation: mutation,
});
