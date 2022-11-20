const graphiql = require("graphql");
const { GraphQLObjectType, GraphQLString } = graphiql;

const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: {
    email: { type: GraphQLString },
    id: { type: graphiql.GraphQLID },
  },
});

module.exports = UserType;
