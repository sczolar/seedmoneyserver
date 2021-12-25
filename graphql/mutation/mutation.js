import { GraphQLObjectType, GraphQLString } from "graphql";
import Userschema from "../query/users/userschema.js";
import Usermodel from "../../model/user/usermodel.js";
import Infoschema from "../query/info/infoschema.js";
import Infomodel from "../../model/info/infomodel.js";
import { Encrypt } from "../../hash/datahash.js";

const rootmutation = new GraphQLObjectType({
  name: "seed_money",
  description: "seed data_s",
  fields: () => ({
    //create user
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
        return user.save();
      },
    },
    //information about farmor
    createinfo: {
      type: Infoschema,
      args: {
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
      },
      resolve: (parent, args) => {
        const data = {
          farmerid: args.farmerid,
          farmer_name: args.farmer_name,
          cane: args.cane,
          quality_li: args.quality_li,
          quality: args.quality,
          date: args.date,
          place: args.place,
          dairyform: args.dairyform,
          snf: args.snf,
          fat: args.fat,
          packed_date: args.packed_date,
        };
        const hash = Encrypt(data);
        const info = new Infomodel({ ...data, hash });
        console.log(hash);
        return info.save();
      },
    },
    // //milk process
    // createmilk: {
    //   type: Milkschema,
    //   args: {
    //     dairyform: { type: GraphQLString },
    //     snf: { type: GraphQLString },
    //     fat: { type: GraphQLString },
    //     packed_date: { type: GraphQLString },
    //   },
    //   resolve: (parent, args) => {
    //     const milk = new Milkmodel({
    //       dairyform: args.dairyform,
    //       snf: args.snf,
    //       fat: args.fat,
    //       packed_date: args.packed_date,
    //     });
    //     return milk.save();
    //   },
    // },
  }),
});
export default rootmutation;
