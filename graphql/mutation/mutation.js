import { GraphQLObjectType, GraphQLString } from "graphql";
import Userschema from "../query/users/userschema.js";
import Usermodel from "../../model/user/usermodel.js";

const rootmutation = new GraphQLObjectType({
  name: "ccps_create",
  description: "ccps data_s",
  fields: () => ({
    createuser: {
      type: Userschema,
      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        email: { type: GraphQLString },
      },
      resolve: (parent, args) => {
        const user = new Usermodel({
          username: args.username,
          password: args.password,
          email: args.email,
        });
        return user.save()
      },
    },
  }),
});
export default rootmutation;
