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
    getTid: {
      type: GraphQLString,
      args: {
        tid: { type: GraphQLID },
      },
      resolve: async (parent, args, req) => {
        if (!req.roll || req.roll === "1") {
          throw new Error("user unauthorized");
        }
        const tinfo = await Infomodel.findOne({ tid: args.tid });
        if (tinfo && (req.roll === "2" || req.roll === "3")) {
          return "verified";
        }
        return null;
      },
    },
    //view entire transaction
    transdetail: {
      type: new GraphQLList(Infoschema),
      args: {
        tid: { type: GraphQLString },
        pin: { type: GraphQLString },
      },
      resolve: async (parent, args, req) => {
        if (!req.roll || req.roll !== "3") {
          throw new Error("unauthorized to view transaction detail");
        }
        let prehash = "";
        let block = [];
        //check for the id and pin
        if (args.tid) {
          let trace = await Infomodel.findOne({ tid: args.tid });
          //trace is avilable
          if (trace) {
            let i = 0;
            //process will continue till the pre is 0
            while (prehash !== "0") {
              block[i] = trace;
              prehash = trace.prehash;
              //pre get 0 loop will break
              if (prehash === "0") {
                break;
              }
              trace = await Infomodel.findOne({ hash: prehash });
              i++;
            }
            return block;
          } else {
            throw new Error("transaction id verification failed");
          }
        } else {
          throw new Error("transaction id or pin null ");
        }
      },
    },
  }),
});
export default rootquery;
