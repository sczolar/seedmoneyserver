import { GraphQLObjectType, GraphQLString, GraphQLID } from "graphql";

const Info = new GraphQLObjectType({
  name: "info",
  fields: () => ({
    _id: { type: GraphQLID },
    farmerid: { type: GraphQLString },
    farmer_name: { type: GraphQLString },
    cane: { type: GraphQLString },
    quality_li: { type: GraphQLString },
    quality: { type: GraphQLString },
    date: { type: GraphQLString },
    place: { type: GraphQLString },
    dairyform: { type: GraphQLString },
    snf: { type: GraphQLString },
    fat: { type: GraphQLString },
    packed_date: { type: GraphQLString },
    hash: { type: GraphQLString },
  }),
});
export default Info;
