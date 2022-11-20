const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString } = graphql;

const UserType = require("../schemas/types/user_type");
const { signup, login } = require("../services/auth");

const mutation = new GraphQLObjectType({
  name: "mutation",
  fields: {
    signup: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(parentValue, { email, password }, request) {
        return await signup({
          email,
          password,
          req: request,
        });
      },
    },
    logout: {
      type: UserType,
      resolve: (parentValue, args, request) => {
        const { user } = request;
        request.logout(function (err) {
          return user;
        });
      },
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(parentValue, { email, password }, request) {
        return await login({ email, password, req: request });
      },
    },
  },
});

module.exports = mutation;
