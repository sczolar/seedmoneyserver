import { GraphQLObjectType, GraphQLString, GraphQLList } from "graphql";
import Userschema from "./users/userschema.js";
import Usermodel from "../../model/user/usermodel.js";

const rootquery = new GraphQLObjectType({
  name: "get_data",
  fields: () => ({
    //find user
    user: {
      type: Userschema,
      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        const user = await Usermodel.findOne({
          $and: [{ username: args.username }, { password: args.password }],
        });
        console.log(user);
        if (!user) {
          throw new Error("user not found");
        } else {
          return user;
        }
      },
    },
    //user list
    users: {
      type: new GraphQLList(Userschema),
      resolve: () => {
        return Usermodel.find();
      },
    },
  }),
});
export default rootquery;
