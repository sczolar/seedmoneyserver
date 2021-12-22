import { GraphQLSchema } from "graphql";
import rootmutation from "./graphql/mutation/mutation.js";
import rootquery from "./graphql/query/query.js";

const schema = new GraphQLSchema({
  query: rootquery,
  mutation: rootmutation,
});

export default schema;
