import { GraphQLObjectType, GraphQLString, GraphQLID } from "graphql";

const milk = new GraphQLObjectType({
  name: "milk",
  fields: () => ({
    _id: { type: GraphQLID },
    dairyform: { type: GraphQLString },
    snf: { type: GraphQLString },
    fat: { type: GraphQLString },
    packed_date: { type: GraphQLString },
  }),
});
export default milk;
