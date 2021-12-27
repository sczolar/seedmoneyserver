import { GraphQLObjectType, GraphQLString, GraphQLID } from "graphql";

const users = new GraphQLObjectType({
  name: "user",
  fields: () => ({
    _id: { type: GraphQLID },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    email: { type: GraphQLString },
    roll: { type: GraphQLString },
  }),
});
export default users;
