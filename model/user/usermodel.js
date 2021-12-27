import mongoose from "mongoose";

const Schema = mongoose.Schema;

const usermodel = new Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
  },
  roll: {
    type: String,
  },
});

const user = mongoose.model("users", usermodel);

export default user;
