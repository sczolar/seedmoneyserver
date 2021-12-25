import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
} from "graphql";
import Userschema from "./users/userschema.js";
import Usermodel from "../../model/user/usermodel.js";
import Infoschema from "./info/infoschema.js";
import Infomodel from "../../model/info/infomodel.js";
import { Decrypt } from "../../hash/datahash.js";

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
    //get information about the farmor
    getinfo: {
      type: new GraphQLList(Infoschema),
      resolve: () => {
        return Infomodel.find();
      },
    },
    //get info by farmor _id
    getinfoid: {
      type: Infoschema,
      args: {
        _id: { type: GraphQLID },
        hash: { type: GraphQLString },
      },
      resolve: (parent, args) => {
        const decrypt = Decrypt(args.hash);
        console.log(decrypt);
        return Infomodel.findOne({ _id: args._id });
      },
    },
    // //get information about the farmor
    // getmilk: {
    //   type: new GraphQLList(Milkschema),
    //   resolve: () => {
    //     return Milkmodel.find();
    //   },
    // },
  }),
});
export default rootquery;
